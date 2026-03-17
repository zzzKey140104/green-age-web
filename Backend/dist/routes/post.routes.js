import { Router } from "express";
import { getPosts, getSearch, postCreate, } from "../controllers/post.controller.js";
const router = Router();
router.get("/", getPosts);
router.post("/", postCreate);
router.get("/search", getSearch);
export default router;
