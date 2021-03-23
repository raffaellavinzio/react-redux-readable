import { baseUrl } from './utils/config.json'
import http from './httpService'

const commentUrl = (commentId) => `${baseUrl}/comments/${commentId}`

// Get all the comments for a single post
const getPostComments = (postId) =>
  http.get(`${baseUrl}/posts/${postId}/comments`)

// Get the details for a single comment
const getComment = (commentId) => http.get(commentUrl(commentId))

// used for voting a comment
const voteComment = (commentId, commentVote) =>
  http.post(commentUrl(commentId), { id: commentId, option: commentVote })

// Sets a comment's deleted flag to 'true'
const deleteComment = (commentId) => http.delete(commentUrl(commentId))

// Add a comment to a post
const addComment = (comment) => http.post(`${baseUrl}/comments`, comment)

// Edit the details of an existing comment
const editComment = (commentId, comment) => {
  const updatedComment = { ...comment, timestamp: Date.now() }
  return http.put(commentUrl(commentId), updatedComment)
}

export default {
  getPostComments,
  getComment,
  voteComment,
  deleteComment,
  addComment,
  editComment,
}
