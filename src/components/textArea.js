/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'

const TextArea = ({ name, label, error, ...rest }) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <div className="control">
      <textarea
        style={{ width: '100%' }}
        className="textarea"
        {...rest}
        name={name}
        id={name}
      />
    </div>
    {error && <p className="help is-danger">{error}</p>}
  </div>
)

export default TextArea
