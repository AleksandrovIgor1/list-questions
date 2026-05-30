import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'
import { Suspense } from 'react'

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  )
}
export default App;