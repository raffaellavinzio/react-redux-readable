/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Nav from './components/nav'
import PostForm from './components/postForm'
import PostPage from './components/postPage'
import Posts from './components/posts'
import PostsByCategory from './components/postsByCategory'
import NotFound from './components/notFound'

const App = () => (
  <Router>
    <>
      <Nav />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Posts />
            </>
          )}
        />
        <Route exact path="/not-found" render={() => <NotFound />} />
        <Route
          exact
          path="/new-post"
          render={(props) => <PostForm {...props} />}
        />
        <Route
          exact
          path="/:category"
          render={(props) => (
            <>
              <PostsByCategory {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/edit/:id"
          render={(props) => (
            <>
              <PostForm {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/:category/:id"
          render={(props) => (
            <>
              <PostPage {...props} />
            </>
          )}
        />
        <Redirect to="/not-found" />
      </Switch>
    </>
  </Router>
)

export default App
