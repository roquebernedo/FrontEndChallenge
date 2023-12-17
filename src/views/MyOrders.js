import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"

const MyOrders = () => {

    const [orders, setOrders] = useState([])
    const [deleteOrder, setDeleteOrder] = useState([])
    const location = useLocation();
    const productID = location.pathname.split("/")[2];
 
    useEffect(() => {
      const fetchRecipe = async () => {
        try{
          const response = await axios.get("http://localhost:8000/orders")
          setOrders(response.data)
          console.log(orders)
        }catch(err){
          console.error(err)
        }
      }
  
      fetchRecipe()
  
    }, [])

    console.log(orders)

    const handleRemoveOrder = async (productID) => {
      try {
        console.log(productID)
        await axios.delete(`http://localhost:8000/orderr/${productID}`);
        // Recargar la lista de órdenes después de eliminar una
        const response = await axios.get("http://localhost:8000/orders");
        setOrders(response.data);
        console.log(productID)
      } catch (error) {
        console.error(error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    };
    
    const calculateFinalPrice = (products) => {
      const totalPrice = products.reduce(
        (accumulator, product) => accumulator + product.unitPrice,
        0
      );
  
      return totalPrice;
    };
    
  return (
    <div>
        <header>
            <h1>My Orders</h1>
        </header>
        <div>
            <table class="table table-striped">
                <tr class="bg-info">
                    <th>ID</th>
                    <th>Order #</th>
                    <th>date</th>
                    <th># Products</th>
                    <th>Final price</th>
                    <th>Options</th>
                </tr>

                {orders.map((orders) => (
                    <tr key={orders._id}>
                        <td>{orders.id}</td>
                        <td>{orders.Order}</td>
                        <td>{orders.Date}</td>
                        <th>
                        {orders.Products && orders.Products.map(product => (
                          <div key={product._id}>
                            <div>{product.name}</div>
                          </div>
                        ))}
                        </th>
                        <th>
                        {calculateFinalPrice(orders.Products)}
                        </th>
                        <th>
                          <Link to={`/EditOrder/${orders.id}`} key={orders._id} >
                            <button>Edit Order</button>
                          </Link>
                          <Link key={orders._id} >
                            <button onClick={() => handleRemoveOrder(orders.id)}>Remove Product</button>
                          </Link>
                          
                        </th>
                    </tr>
                ))}
            </table>    
            
            <div>
                <Link to="/AddEditOrder">
                    <button>Add Order</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default MyOrders