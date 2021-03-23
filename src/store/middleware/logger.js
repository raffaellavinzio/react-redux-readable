// eslint-disable-next-line no-unused-vars
const logger = (param) => (store) => (next) => (action) => {
  // eslint-disable-next-line no-console
  console.log('logging', param)
  next(action)
}

export default logger
