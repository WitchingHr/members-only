import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import indexController from './controllers/indexController';
import apiRouter from './routes/api';

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
app.use(compression());
app.use(helmet());
app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 20 // limit each IP to 100 requests per windowMs
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/verify', indexController.verify);
app.post('/signup', indexController.sign_up);
app.post('/login', indexController.log_in);
app.use('/api', apiRouter);

// start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});