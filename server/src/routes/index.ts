import express from 'express';
const router = express.Router();

import indexController from '../controllers/indexController';

router.post('/signup', indexController.sign_up);

export default router;