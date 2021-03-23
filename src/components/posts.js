/* eslint-disable import/named */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPosts,
  selectAllPosts,
  postsSortedByVote,
  postsSortedByTimestamp,
} from '../store/postsSlice'
import PostList from './postList'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const apiCallStatus = useSelector((state) => state.posts.loading)
  const apiCallError = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (apiCallStatus === 'idle') {
      dispatch(getPosts())
    }
  }, [apiCallStatus])

  if (apiCallStatus === 'loading')
    return <div className="loader">Loading...</div>

  if (apiCallStatus === 'error')
    return <div className="loader">{apiCallError}</div>

  return (
    <>
      <div className="is-flex is-justify-content-space-around is-flex-wrap-wrap">
        <Link className="button mt-4 is-link" to="/new-post">
          Add New Post
        </Link>
        <div className="is-flex">
          <button
            className="button mt-4 mx-1 is-link"
            type="button"
            onClick={() => dispatch(getPosts())}
          >
            Reset Sort
          </button>
          <button
            className="button mt-4 mx-1 is-link"
            type="button"
            onClick={() => dispatch(postsSortedByTimestamp())}
          >
            Most Recent
          </button>
          <button
            className="button mt-4 mx-1 is-link"
            type="button"
            onClick={() => dispatch(postsSortedByVote())}
          >
            Most Voted
          </button>
        </div>
      </div>
      <PostList className="tile is-ancestor" posts={posts} />
    </>
  )
}

export default Posts
