import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="container card m-6 p-6">
    <h1>404 error - page not found</h1>
    <Link to="/">Go Home</Link>
  </div>
)

export default NotFound
