import express from 'express';
import apiController from '../controllers/apiController';

const apiRouter = express.Router();

// get all messages
apiRouter.get('/messages', apiController.getMessages);
apiRouter.post('/messages', apiController.postMessage);
  
export default apiRouter;
