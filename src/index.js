import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { store, persistor } from './store/store'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App className="container is-fluid" />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
