/* eslint-disable react/prop-types */
import React from 'react'
import Post from './post'

const PostList = ({ posts }) => (
  <div className="is-flex is-flex-wrap-wrap m-2">
    {posts.map((post) => (
      <Post key={post.id} id={post.id} />
    ))}
    {posts.length === 0 && (
      <div style={{ width: '100%' }} className="container card m-6 p-6">
        <h1>No posts here!</h1>
      </div>
    )}
  </div>
)

export default PostList
