import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/posts";

const router = express.Router();

router.get("/", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
