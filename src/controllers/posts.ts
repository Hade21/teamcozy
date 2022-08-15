import PostMessage from "../models/postMessages";
import { Request, Response } from "express";

export const getPost = (req: Request, res: Response) => {
  res.send("Hello from posts!");
};

export const createPost = async (req: Request, res: Response) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    }
  }
};
