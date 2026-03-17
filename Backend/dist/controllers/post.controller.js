import { created, ok } from "../helpers/http.js";
import { createPostBodySchema, searchQuerySchema, } from "../validators/post.validators.js";
import { createPost, listPosts, searchPosts, } from "../services/post.service.js";
export async function getPosts(_req, res) {
    const posts = await listPosts();
    return ok(res, posts);
}
export async function postCreate(req, res) {
    const body = createPostBodySchema.parse(req.body);
    const post = await createPost(body);
    return created(res, post);
}
export async function getSearch(req, res) {
    const { q } = searchQuerySchema.parse(req.query);
    const results = await searchPosts(q);
    return ok(res, { q, results });
}
