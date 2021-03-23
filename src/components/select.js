/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'

const Select = ({ name, label, options, error, value, ...rest }) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {label}{' '}
    </label>
    <div className="control">
      <div className="select">
        <select style={{ width: '50%' }} {...rest} name={name} id={name}>
          <option value={value}>{value}</option>
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    {error && <p className="help is-danger">{error}</p>}
  </div>
)

export default Select
