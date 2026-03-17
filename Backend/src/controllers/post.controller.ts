import type { Request, Response } from "express";
import { created, ok } from "../helpers/http.js";
import {
  createPost,
  listPosts,
  searchPosts,
} from "../services/post.service.js";
import {
  createPostBodySchema,
  searchQuerySchema,
} from "../validators/post.validators.js";

export async function getPosts(_req: Request, res: Response) {
  const posts = await listPosts();
  return ok(res, posts);
}

export async function postCreate(req: Request, res: Response) {
  const body = createPostBodySchema.parse(req.body);
  const post = await createPost(body);
  return created(res, post);
}

export async function getSearch(req: Request, res: Response) {
  const { q } = searchQuerySchema.parse(req.query);
  const results = await searchPosts(q);
  return ok(res, { q, results });
}
