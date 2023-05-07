import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
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

// create express app
const app = express();

// configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/verify', indexController.verify);
app.post('/signup', indexController.sign_up);
app.post('/login', indexController.log_in);

// start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});