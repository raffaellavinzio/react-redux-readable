/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  voteComment,
  deleteComment,
  selectCommentById,
} from '../store/commentsSlice'
import { decrementPostCommentCounter } from '../store/postsSlice'

const Comment = ({ id, postId, handleEditComment }) => {
  const dispatch = useDispatch()
  const { body, author, voteScore } =
    useSelector((state) => selectCommentById(state, id)) || {}

  const handleDeleteComment = () => {
    dispatch(deleteComment(id))
    dispatch(decrementPostCommentCounter(postId))
  }

  return (
    <div className="tile is-child is-primary">
      <div className="card m-2">
        <header className="card-header">
          <p className="card-header-title">Votes Score: {voteScore}</p>
        </header>
        <div className="card-content">
          <p className="title">{body}</p>
          <p className="subtitle">by {author}</p>
        </div>
        <footer className="card-footer">
          <a
            href=""
            className="card-footer-item"
            onClick={(e) => {
              e.preventDefault()
              dispatch(voteComment({ id, vote: 'upVote' }))
            }}
          >
            Upvote
          </a>
          <a
            href=""
            className="card-footer-item"
            onClick={(e) => {
              e.preventDefault()
              dispatch(voteComment({ id, vote: 'downVote' }))
            }}
          >
            Downvote
          </a>
          <a
            href=""
            className="card-footer-item"
            onClick={(e) => {
              e.preventDefault()
              handleEditComment(id)
            }}
          >
            Edit
          </a>
          <a
            href=""
            className="card-footer-item"
            onClick={(e) => {
              e.preventDefault()
              handleDeleteComment()
            }}
          >
            Delete
          </a>
        </footer>
      </div>
    </div>
  )
}
export default Comment
