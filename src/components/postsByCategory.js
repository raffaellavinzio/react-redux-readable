/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPostsByCategory,
  selectPostsByCategory,
  postsByCategorySortedByVote,
  postsByCategorySortedByTimestamp,
} from '../store/postsSlice'
import PostList from './postList'

const PostsByCategory = ({ match }) => {
  const { category } = match.params
  const dispatch = useDispatch()
  const apiCallStatus = useSelector((state) => state.posts.loadingByCategory)
  const apiCallError = useSelector((state) => state.posts.error)
  const postsByCategory = useSelector(selectPostsByCategory)

  useEffect(() => {
    dispatch(getPostsByCategory(category))
  }, [category])

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
            onClick={() => dispatch(getPostsByCategory(category))}
          >
            Reset Sort
          </button>
          <button
            className="button mt-4 mx-1 is-link"
            type="button"
            onClick={() => dispatch(postsByCategorySortedByTimestamp())}
          >
            Sort by Most Recent
          </button>
          <button
            className="button mt-4 mx-1 is-link"
            type="button"
            onClick={() => dispatch(postsByCategorySortedByVote())}
          >
            Sort by Most Voted
          </button>
        </div>
      </div>
      <PostList posts={postsByCategory} />
    </>
  )
}

export default PostsByCategory
