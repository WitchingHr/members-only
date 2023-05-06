import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';

// sign up new user
const sign_up = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // check if username already exists
    const usernameTaken = await User.findOne({ username: req.body.username });
    if (usernameTaken) {
      res.status(400).send('Username already taken');
      return;
    };

    // hash password
    const hashedpassword = bcrypt.hashSync(req.body.password, 10);

    // create new user
    const user = new User({
      username: req.body.username,
      password: hashedpassword,
    });

    // save user to DB
    const result = await user.save();
    res.status(201).send(result);
  } catch(err) {
    next(err);
  }
};

const indexController = {
  sign_up,
};

export default indexController;