/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import {
  addComment,
  editComment,
  selectCommentById,
} from '../store/commentsSlice'
import { incrementPostCommentCounter } from '../store/postsSlice'
import Input from './input'
import TextArea from './textArea'

const CommentForm = ({ setShowForm, postId, commentId }) => {
  const dispatch = useDispatch()
  const { id, author, body } =
    useSelector((state) => selectCommentById(state, commentId)) || {}

  const [values, setValues] = useState({
    body: body || '',
    author: author || '',
  })

  const [errors, setErrors] = useState({
    body: '',
    author: '',
  })

  const isEmpty = !Object.values(values).some((x) => x !== null && x !== '')

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!commentId) {
      dispatch(
        addComment({
          id: nanoid(),
          timestamp: Date.now(),
          parentId: postId,
          body: values.body,
          author: values.author,
        })
      )
      dispatch(incrementPostCommentCounter(postId))
    } else {
      dispatch(
        editComment({
          id,
          timestamp: Date.now(),
          body: values.body,
          author: values.author,
          parentId: postId,
        })
      )
    }
    setErrors({
      body: '',
      author: '',
    })
    setShowForm(false)
  }

  return (
    <form className="column m-4" onSubmit={handleSubmit}>
      <p className="title">Add/Update New Comment</p>
      <TextArea
        name="body"
        label="Body"
        value={values.body}
        error={errors.body}
        onChange={handleChange}
      />
      <Input
        name="author"
        label="Author"
        type="text"
        value={values.author}
        error={errors.author}
        onChange={handleChange}
      />
      <div className="control">
        <button
          className="button is-link mt-4"
          type="submit"
          disabled={isEmpty}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default CommentForm
