import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom' // Certifique-se de usar 'react-router-dom' se estiver usando o createBrowserRouter
import RouletteComponent from './pages/RouletteGame.jsx'
import RatingPage from './pages/Rating.jsx'

const pages = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      { index: true , element: <RatingPage/> },    // CORRIGIDO: Usa index: true para a rota padrão
      { path: 'wheel' , element: <RouletteComponent/> }, // CORRIGIDO: Remove a barra inicial '/'
    ]
  }
])
// ...


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages}> </RouterProvider>
  </StrictMode>,
)
