import { useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import HelloWorld from '../pages/HelloWorld'

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/hello-world',
      element: <HelloWorld />
    }
  ])
  return element
}

export default Routes
