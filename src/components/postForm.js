/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import {
  addPost,
  editPost,
  selectPostById,
  selectCategoryPostById,
} from '../store/postsSlice'
import { selectAllCategories } from '../store/categoriesSlice'
import Select from './select'
import Input from './input'
import TextArea from './textArea'

const PostForm = ({ match }) => {
  // default to empty string for the new post case
  const postId = match.path === '/new-post' ? '' : match.params.id
  const dispatch = useDispatch()
  const history = useHistory()

  const postHome = useSelector((state) => selectPostById(state, postId))
  const postCategoryPage = useSelector((state) =>
    selectCategoryPostById(state, postId)
  )

  const { title, author, body, category } = postHome || postCategoryPage || {}

  const categories = useSelector(selectAllCategories)

  const [values, setValues] = useState({
    title: title || '',
    body: body || '',
    author: author || '',
    category: category || '',
  })

  const [errors, setErrors] = useState({
    title: '',
    body: '',
    author: '',
    category: '',
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
    if (!postId) {
      dispatch(
        addPost({
          id: nanoid(),
          timestamp: Date.now(),
          title: values.title,
          body: values.body,
          author: values.author,
          category: values.category,
        })
      )
    } else {
      dispatch(
        editPost({
          id: postId,
          timestamp: Date.now(),
          title: values.title,
          body: values.body,
          author: values.author,
          category: values.category,
        })
      )
    }
    if (category === values.category) {
      history.goBack()
    } else {
      history.replace(`/${values.category}/${postId}`)
    }
    setErrors({
      title: '',
      body: '',
      author: '',
      category: '',
    })
  }

  return (
    <div className="columns">
      <div className="column" />
      <form className="column m-2" onSubmit={handleSubmit}>
        <p className="title">Add/Edit New Post</p>
        <Input
          name="title"
          label="Title"
          type="text"
          value={values.title}
          error={errors.title}
          onChange={handleChange}
        />
        <TextArea
          name="body"
          label="Body"
          value={values.body}
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
        <Select
          options={categories}
          name="category"
          label="Category"
          value={values.category}
          onChange={handleChange}
          error={errors.category}
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
      <div className="column" />
    </div>
  )
}

export default PostForm
