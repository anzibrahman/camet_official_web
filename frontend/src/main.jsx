import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import SolutionPage from './pages/SolutionPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductsPage from './pages/ProductsPage'
import GalleryPage from './pages/GalleryPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import TallyAddonsPage from './pages/TallyAddonsPage'
import SupportPage from './pages/SupportPage'
import AdminHeroEditor from './pages/AdminHeroEditor'
import SolutionDetails from './pages/SolutionDetails'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/solutions', element: <SolutionPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/products', element: <ProductsPage /> },
      {path:'/Gallery',element: <GalleryPage/>},
      { path: '/products/:slug', element: <ProductDetailsPage /> },
      { path: '/solutions/:slug', element: <SolutionDetails /> },
      { path: '/Admin', element: <AdminHeroEditor /> }, 
      { path: '/solutions/tally-addons', element: <TallyAddonsPage /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
