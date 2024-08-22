import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ThemeLayout from './layout/ThemeLayout';
import Home from './pages/Home';

function App() {
  const themeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<ThemeLayout />}>
          <Route index element={<Home />} />
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={themeRoutes} />
    </>
  )
}

export default App
