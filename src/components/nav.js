/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, selectAllCategories } from '../store/categoriesSlice'

const Nav = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)

  const apiCallStatus = useSelector((state) => state.categories.loading)
  const apiCallError = useSelector((state) => state.categories.error)

  useEffect(() => {
    if (apiCallStatus === 'idle') {
      dispatch(getCategories())
    }
  }, [apiCallStatus])

  if (apiCallStatus === 'loading')
    return <div className="loader">Loading...</div>

  if (apiCallStatus === 'error')
    return <div className="loader">{apiCallError}</div>

  return (
    <nav className="navbar" role="navigation">
      <Link to="/" className="navbar-item">
        all
      </Link>
      {categories.map((category) => (
        <Link
          className="navbar-item"
          key={category.name}
          to={`/${category.name}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
