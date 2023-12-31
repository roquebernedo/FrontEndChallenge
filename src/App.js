import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MyOrders from './views/MyOrders';
import AddEditOrder from './views/AddEditOrder';
import EditOrder from './views/EditOrder';
import AddProducts from './views/AddProducts';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MyOrders/>
  },
  {
    path: "/AddEditOrder",
    element: <AddEditOrder/>
  },
  {
    path: "/EditOrder/:id",
    element: <EditOrder />
  },
  {
    path: "/EditOrder/:id/AddProduct",
    element: <AddProducts />
  }
])

function App() {
  return (
      <div>
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
