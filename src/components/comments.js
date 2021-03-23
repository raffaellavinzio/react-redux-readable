/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPostComments, selectPostComments } from '../store/commentsSlice'
import Comment from './comment'
import CommentForm from './commentForm'

const Comments = ({ postId }) => {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const [commentId, setCommentId] = useState('')

  const comments = useSelector(selectPostComments)

  const handleAddComment = () => {
    setShowForm(true)
    setCommentId('')
  }

  const handleEditComment = (id) => {
    setShowForm(true)
    setCommentId(id)
  }

  useEffect(() => {
    dispatch(getPostComments(postId))
  }, [postId])

  return (
    <div className="column mt-6 has-background-link-light">
      <button
        className="button m-2 is-link"
        type="button"
        onClick={handleAddComment}
      >
        Add New Comment
      </button>
      {showForm && (
        <CommentForm
          className="card"
          setShowForm={setShowForm}
          postId={postId}
          commentId={commentId}
        />
      )}
      <ul className="is-flex is-flex-wrap-wrap m-2">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            postId={postId}
            handleEditComment={handleEditComment}
          />
        ))}
      </ul>
    </div>
  )
}

export default Comments
