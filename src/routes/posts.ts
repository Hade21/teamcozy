import express from "express";
import {
  authorizeAccount,
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/posts";

const router = express.Router();

router.get("/", getPost);
router.post("/", authorizeAccount, createPost);
router.patch("/:id", authorizeAccount, updatePost);
router.delete("/:id", authorizeAccount, deletePost);

export default router;
