import express from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';

// get dotenv config if not in production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// get JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

// sign up new user
const sign_up = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // check if username already exists
    const usernameTaken = await User.findOne({ username: req.body.username });

    // if username already exists, send error
    if (usernameTaken) {
      res.status(400).json({ message: 'Username already taken' });
      return;
    };

    // encrypt password
    const hashedpassword = bcrypt.hashSync(req.body.password, 10);

    // create new user
    const user = new User({
      username: req.body.username,
      password: hashedpassword,
    });

    // save user to DB and send response
    await user.save();
    res.status(201).json({ message: 'User created' });

  } catch(err) {
    next(err);
  }
};

// log in user
const log_in = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // check if user exists
    const user = await User.findOne({ username: req.body.username });

    // if user doesn't exist or password is incorrect, send error
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    
    // compare password
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        next(err);
      }
      // if password is incorrect, send error
      if (!result) {
        res.status(400).json({ message: 'Incorrect password' });

      // if password is correct, send token and username
      } else {
        // create token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).json({ username: user.username, token });
      }
    });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
    next(err);
  }
};

// verify token on page reload
const verify = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // get token from header
    const token = req.headers.authorization?.split(' ')[1];

    // if no token, send error
    if (!token) {
      throw new Error('No token provided');
    }

    // verify token
    const { _id } = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    if (!_id) {
      throw new Error('Invalid token');
    }

    // get user from DB
    const user = await User.findById(_id, "username");

    if (!user) {
      throw new Error('Server error');
    }

    // if token is valid, send response
    res.status(200).json({ message: 'Authorized', username: user?.username });

  } catch(err) {
    // token is invalid, send error
    res.status(401).json({ message: err.message || 'Unauthorized' });
    next(err);
  }
};

const indexController = {
  sign_up,
  log_in,
  verify,
};

export default indexController;