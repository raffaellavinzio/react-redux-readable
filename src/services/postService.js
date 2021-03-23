import { baseUrl } from './utils/config.json'
import http from './httpService'

const postUrl = (postId) => `${baseUrl}/posts/${postId}`

const getPosts = () => http.get(`${baseUrl}/posts`)

// Get all of the posts for a particular category
const getPostsByCategory = (category) =>
  http.get(`${baseUrl}/${category}/posts`)

// Get the details for a single post
const getPost = (postId) => http.get(postUrl(postId))

// used for voting a post
const votePost = (postId, postVote) =>
  http.post(postUrl(postId), { id: postId, option: postVote })

// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.
const deletePost = (postId) => http.delete(postUrl(postId))

// Add a post to a post
const addPost = (post) => http.post(`${baseUrl}/posts`, post)

// Edit the details of an existing post
const editPost = (postId, post) => {
  const updatedPost = { ...post, timestamp: Date.now() }
  return http.put(postUrl(postId), updatedPost)
}

export default {
  getPosts,
  getPostsByCategory,
  getPost,
  votePost,
  deletePost,
  addPost,
  editPost,
}
