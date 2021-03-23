/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postService from '../services/postService'

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, thunkAPI) => {
    try {
      const response = await postService.getPosts()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id, thunkAPI) => {
    try {
      const response = await postService.getPost(id)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const getPostsByCategory = createAsyncThunk(
  'posts/getPostsByCategory',
  async (category, thunkAPI) => {
    try {
      const response = await postService.getPostsByCategory(category)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post, thunkAPI) => {
    try {
      const response = await postService.addPost(post)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const editPost = createAsyncThunk(
  'posts/editPost',
  async (post, thunkAPI) => {
    try {
      const response = await postService.editPost(post.id, post)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      const response = await postService.deletePost(id)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const votePost = createAsyncThunk(
  'posts/votePost',
  async ({ id, vote }, thunkAPI) => {
    try {
      const response = await postService.votePost(id, vote)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    itemsByCategory: [],
    loading: 'idle',
    loadingByCategory: 'idle',
    error: '',
  },
  reducers: {
    postsSortedByVote(state) {
      state.items.sort((a, b) => b.voteScore - a.voteScore)
    },
    postsSortedByTimestamp(state) {
      state.items.sort((a, b) => b.timestamp - a.timestamp)
    },
    postsByCategorySortedByVote(state) {
      state.itemsByCategory.sort((a, b) => b.voteScore - a.voteScore)
    },
    postsByCategorySortedByTimestamp(state) {
      state.itemsByCategory.sort((a, b) => b.timestamp - a.timestamp)
    },
    incrementPostCommentCounter(state, action) {
      const post = state.items.find((p) => p.id === action.payload)
      if (post) post.commentCount += 1
    },
    decrementPostCommentCounter(state, action) {
      const post = state.items.find((p) => p.id === action.payload)
      if (post) post.commentCount -= 1
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.items = []
      state.loading = 'loading'
    },
    [getPosts.fulfilled]: (state, action) => {
      state.items = action.payload
      state.loading = 'loaded'
    },
    [getPosts.rejected]: (state, action) => {
      state.error = action.error.message
      state.loading = 'error'
    },
    [getPostsByCategory.pending]: (state) => {
      state.itemsByCategory = []
      state.loadingByCategory = 'loading'
    },
    [getPostsByCategory.fulfilled]: (state, action) => {
      state.itemsByCategory = action.payload
      state.loadingByCategory = 'loaded'
    },
    [getPostsByCategory.rejected]: (state, action) => {
      state.error = action.error.message
      state.loadingByCategory = 'error'
    },
    [addPost.fulfilled]: (state, action) => {
      state.items.push(action.payload)
      state.itemsByCategory.push(action.payload)
    },
    [editPost.fulfilled]: (state, action) => {
      const { id, timestamp, title, body, author, category } = action.payload
      const currentPost = state.items.find((post) => post.id === id)

      if (currentPost) {
        currentPost.timestamp = timestamp
        currentPost.title = title
        currentPost.body = body
        currentPost.author = author
        currentPost.category = category
      }
    },
    [deletePost.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
      state.itemsByCategory = state.itemsByCategory.filter(
        (item) => item.id !== action.payload.id
      )
    },
    [votePost.fulfilled]: (state, action) => {
      const { id, vote } = action.meta.arg
      const currentPost = state.items.find((p) => p.id === id)

      if (vote === 'upVote') currentPost.voteScore += 1
      if (vote === 'downVote') currentPost.voteScore -= 1
    },
  },
})

export const {
  postsSortedByVote,
  postsSortedByTimestamp,
  postsByCategorySortedByVote,
  postsByCategorySortedByTimestamp,
  incrementPostCommentCounter,
  decrementPostCommentCounter,
} = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.items

export const selectPostsByCategory = (state) => state.posts.itemsByCategory

export const selectPostById = (state, postId) =>
  state.posts.items.find((post) => post.id === postId)

export const selectCategoryPostById = (state, postId) =>
  state.posts.itemsByCategory.find((post) => post.id === postId)
