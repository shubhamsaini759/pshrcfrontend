import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import Store from './store/index.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    // <BrowserRouter>
      <QueryClientProvider client={queryClient} >
        <Provider store={Store} >
          <ToastContainer />
            <App />
        </Provider>
      </QueryClientProvider>
    // </BrowserRouter>
)
