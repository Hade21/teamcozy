import PostMessage from "../models/postMessages";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const authorizeAccount = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const token = header && header?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden Access!" });
    }
    req.body.user = user;
    next();
  });
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await PostMessage.find();

    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) return res.status(404).json(error.message);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authorizeAccount(req, res, next);
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error)
      return res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authorizeAccount(req, res, next);
  const { id: _id } = req.params;
  const post = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ message: "No post found with id" });

    const upatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    return res.status(200).json(updatePost);
  } catch (error) {
    if (error instanceof Error)
      return res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authorizeAccount(req, res, next);
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ message: "No post found with id" });
    await PostMessage.findByIdAndRemove(_id);

    return res.status(200).json({ message: "Post deleted succesfully" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(404).json({ message: error.message });
  }
};
