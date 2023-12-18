import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const MyOrders = () => {

    const [orders, setOrders] = useState([])
    
    useEffect(() => {
      const fetchRecipe = async () => {
        try{
          const response = await axios.get("https://reactchallenge.onrender.com/orders")
          setOrders(response.data)
        }catch(err){
          console.error(err)
        }
      }
  
      fetchRecipe()
    
    }, [orders])

    const handleRemoveOrder = async (productID) => {
      try {
        console.log(productID)
        await axios.delete(`https://reactchallenge.onrender.com/orderr/${productID}`);
        const response = await axios.get("https://reactchallenge.onrender.com/orders");
        setOrders(response.data);
        console.log(productID)
      } catch (error) {
        console.error(error);
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
            <table className="table table-striped">
                <thead>
                  <tr className="bg-info">
                      <th>ID</th>
                      <th>Order #</th>
                      <th>date</th>
                      <th># Products</th>
                      <th>Final price</th>
                      <th>Options</th>
                  </tr>
                </thead>

                <tbody>
                {orders.map((orders) => (
                    <tr key={orders.id}>
                        <th>{orders.id}</th>
                        <th>{orders.Order}</th>
                        <th>{orders.Date.substring(0,10)}</th>
                        <th>
                        {orders.Products && orders.Products.map((product, index) => (
                          <div key={index}>
                            <div>{product.name}</div>
                          </div>
                        ))}
                        </th>
                        <th>
                        ${calculateFinalPrice(orders.Products)}
                        </th>
                        <th>
                          <Link to={`/EditOrder/${orders.id}`} key={orders._id} >
                            <button>Edit Order</button>
                          </Link>
                          <Link >
                            <button onClick={() => handleRemoveOrder(orders.id)}>Remove Order</button>
                          </Link>
                          
                        </th>
                    </tr>
                ))}
                </tbody>
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