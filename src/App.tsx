import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'

export const App = () => {
  return <RouterProvider router={appRouter} />
}
