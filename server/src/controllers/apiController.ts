import { Request, Response } from 'express';
import Message from '../models/message';
import User from '../models/user';

// GET /api/messages
const getMessages = async (req: Request, res: Response) => {
  try {
    // get messages from DB, sort by newest first
    const messages = await Message.find().populate('user', { _id: 0, username: 1 }).sort({ createdAt: -1 });
    // send messages as JSON
    res.json(messages);

  } catch(err) {
    // send error
    res.status(500).json({ message: err.message });
  }
}

// POST /api/messages
const postMessage = async (req: Request, res: Response) => {
  // find user by username
  const user = await User.findOne({ username: req.body.user });

  // create new message
  const message = new Message({
    title: req.body.title,
    text: req.body.text,
    user: user,
  });

  try {
    // save message to DB
    const saved = await message.save();
    res.status(201).json(saved);

  } catch(err) {
    // send error
    res.status(400).json({ message: err.message });
  }
}

const apiController = {
  getMessages,
  postMessage,
}

export default apiController;
