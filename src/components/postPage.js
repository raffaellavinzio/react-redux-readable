/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  votePost,
  deletePost,
  getPostById,
  selectPostById,
  selectCategoryPostById,
} from '../store/postsSlice'
import Comments from './comments'

const PostPage = ({ match }) => {
  const dispatch = useDispatch()

  const { id } = match.params
  const [redirect, setRedirect] = useState(false)

  const postHome = useSelector((state) => selectPostById(state, id))
  const postCategoryPage = useSelector((state) =>
    selectCategoryPostById(state, id)
  )

  const post = postHome || postCategoryPage || {}
  const apiCallStatus = useSelector((state) => state.posts.loading)
  const apiCallError = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (apiCallStatus === 'idle') {
      dispatch(getPostById(id))
    }
  }, [apiCallStatus])

  if (post && Object.keys(post).length === 0 && apiCallStatus === 'loaded') {
    return redirect ? <Redirect to="/" /> : <Redirect to="/not-found" />
  }

  const {
    title,
    timestamp,
    author,
    body,
    commentCount,
    voteScore,
    category,
  } = post

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  if (apiCallStatus === 'loading')
    return <div className="loader">Loading...</div>

  if (apiCallStatus === 'error')
    return <div className="loader">{apiCallError}</div>

  return (
    <div className="columns mt-4">
      <div className="column" />
      <div className="card column m-2">
        <header className="card-header">
          <p className="card-header-title">
            {new Date(timestamp).toLocaleString('en-US', options)}
            <span className="is-uppercase"> - {category}</span>
          </p>
        </header>
        <div className="card-content">
          <p className="title mx-2">{title}</p>
          <p className="subtitle mx-2">by {author}</p>
          <div className="is-flex">
            <span className="has-text-dark has-text-weight-bold mx-2">
              Comments: {commentCount}
            </span>
            <span className="has-text-dark has-text-weight-bold mx-2">
              Votes Score: {voteScore}
            </span>
          </div>
          <p className="mt-4 mx-2">{body}</p>
        </div>
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
              setRedirect(true)
            }}
          >
            Delete
          </a>
        </footer>
        <Comments postId={id} />
      </div>
      <div className="column" />
    </div>
  )
}
export default PostPage
