import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcryptjs';
import User from './models/user';
import cors from 'cors';
import indexRouter from './routes/index';
import indexController from './controllers/indexController';

// get dotenv config if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// connect to DB
const DB_PASS = process.env.DB_PASS;
const dev_db_url = `mongodb+srv://db-user:${DB_PASS}@cluster0.1reujyd.mongodb.net/members-only?retryWrites=true&w=majority`;
const db_url = process.env.DB_URL || dev_db_url;
mongoose.connect(db_url).then(() => console.log('Connected to DB'));

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  }));

// configure passport strategy
passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      // look up user in DB by username
      const user = await User.findOne({ username: username });
      // if user not found, return message
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      // encrypt entered password and compare to password from DB
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) throw err;
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      });
    } catch(err) {
      return done(err);
    };
  })
);

// use cookies to keep user logged in between requests
passport.serializeUser(function(user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.post('/signup', indexController.sign_up);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});