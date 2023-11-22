import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Dashboard from '../pages/Dashboard'
import Drive from '../pages/Drive'
import Template from '../pages/Template'
import Upload from '../pages/Upload'

const RootRouter = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Drive />,
        },
        {
          path: '/connect',
          element: <Dashboard />,
        },
        {
          path: '/upload',
          element: <Upload />
        },
        {
          path:'/template',
          element:<Template/>
        }
      ],
    },
  ])

  return <RouterProvider router={routes} />
}
export default RootRouter
