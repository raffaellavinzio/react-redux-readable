/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  votePost,
  deletePost,
  selectPostById,
  selectCategoryPostById,
} from '../store/postsSlice'

const Post = ({ id }) => {
  const dispatch = useDispatch()
  const postHome = useSelector((state) => selectPostById(state, id))
  const postCategoryPage = useSelector((state) =>
    selectCategoryPostById(state, id)
  )
  const { title, author, commentCount, voteScore, category } =
    postHome || postCategoryPage

  return (
    <div className="tile is-child is-6 is-primary">
      <div className="card m-2">
        <Link to={`/${category}/${id}`}>
          <header className="card-header">
            <p className="card-header-title">{category}</p>
          </header>
          <div className="card-content">
            <p className="title">{title}</p>
            <p className="subtitle">by {author}</p>
            <div className="is-flex is-justify-content-space-between">
              <span className="has-text-dark">Comments: {commentCount}</span>
              <span className="has-text-dark">Votes Score: {voteScore}</span>
            </div>
          </div>
        </Link>
        <footer className="card-footer">
          <a
            href=""
            className="card-footer-item is-uppercase"
            onClick={(e) => {
              e.preventDefault()
              dispatch(votePost({ id, vote: 'upVote' }))
            }}
          >
            Upvote
          </a>
          <a
            href=""
            className="card-footer-item is-uppercase"
            onClick={(e) => {
              e.preventDefault()
              dispatch(votePost({ id, vote: 'downVote' }))
            }}
          >
            Downvote
          </a>
          <Link className="card-footer-item is-uppercase" to={`/edit/${id}`}>
            Edit
          </Link>
          <a
            href=""
            className="card-footer-item is-uppercase"
            onClick={(e) => {
              e.preventDefault()
              dispatch(deletePost(id))
            }}
          >
            Delete
          </a>
        </footer>
      </div>
    </div>
  )
}
export default Post
