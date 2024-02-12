import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { store } from './app/store'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path='/*'
          element={<App />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
)
