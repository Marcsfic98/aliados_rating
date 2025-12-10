import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router'
import RouletteComponent from './pages/RouletteGame.jsx'
import RatingPage from './pages/Rating.jsx'

const pages = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      { path: '/' , element: <RatingPage/> },
      { path: '/wheel' , element: <RouletteComponent/> },
   
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages}> </RouterProvider>
  </StrictMode>,
)
