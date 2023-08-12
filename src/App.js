import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Shop from './components/Shop/Shop';
import Main from './components/layouts/Main';
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import { productsAndCartLoader } from './loaders/productsAndCartLoader';


function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Main></Main>,
      children: [
        {
          path: '/', element: <Shop></Shop>,
          loader: () => fetch('http://localhost:5000/products')
        },
        {
          path: '/order',
          element: <Order></Order>,
          loader: productsAndCartLoader
        },
        { path: '/inventory', element: <Inventory></Inventory> },
        { path: '/login', element: <Login></Login> }
      ]
    },

    { path: '*', element: <h1>Page not Found</h1> }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
