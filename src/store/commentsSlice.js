/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/commentService'

export const getPostComments = createAsyncThunk(
  'comments/getPostComments',
  async (postId, thunkAPI) => {
    try {
      const response = await commentService.getPostComments(postId)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment, thunkAPI) => {
    try {
      const response = await commentService.addComment(comment)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const editComment = createAsyncThunk(
  'comments/editComment',
  async (comment, thunkAPI) => {
    try {
      const response = await commentService.editComment(comment.id, comment)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, thunkAPI) => {
    try {
      const response = await commentService.deleteComment(commentId)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const voteComment = createAsyncThunk(
  'comments/voteComment',
  async ({ id, vote }, thunkAPI) => {
    try {
      const response = await commentService.voteComment(id, vote)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
  },
  extraReducers: {
    [getPostComments.fulfilled]: (state, { payload }) => {
      state.items = payload
    },
    [addComment.fulfilled]: (state, action) => {
      state.items.push(action.payload)
    },
    // eslint-disable-next-line no-unused-vars
    [editComment.fulfilled]: (state, action) => {
      const { id, timestamp, parentId, body, author } = action.payload
      const currentComment = state.items.find((comment) => comment.id === id)
      currentComment.timestamp = timestamp
      currentComment.parentId = parentId
      currentComment.body = body
      currentComment.author = author
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    [voteComment.fulfilled]: (state, action) => {
      const { id, vote } = action.meta.arg
      const comment = state.items.find((item) => item.id === id)

      if (vote === 'upVote') comment.voteScore += 1
      if (vote === 'downVote') comment.voteScore -= 1
    },
  },
})

export default commentsSlice.reducer

export const selectPostComments = (state) => state.comments.items

export const selectCommentById = (state, commentId) =>
  state.comments.items.find((comment) => comment.id === commentId)
