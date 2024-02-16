import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import { store } from './app/store'
import App from './App'
import './index.css'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

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
