import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from "axios"

const AddEditOrder = () => {

    const [order, setOrder] = useState([])
    const location = useLocation();
    const productID = location.pathname.split("/")[2];
    const [products, setProducts] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [orderr, setOrderr] = useState({
        Order: '',
        Date: '',
        Products: [],
        FinalPrice: '',
    });

    
 
    useEffect(() => {
      const fetchRecipe = async () => {
        try{
          const response = await axios.get(`https://reactchallenge.onrender.com/order/${productID}`)
          setOrder(response.data)
        }catch(err){
          console.error(err)
        }
      }
  
      fetchRecipe()
  
    }, [order, productID])
 
    useEffect(() => {
      const fetchRecipe = async () => {
        try{
          const response = await axios.get("https://reactchallenge.onrender.com/")
          setProducts(response.data)
        }catch(err){
          console.error(err)
        }
      }
  
      fetchRecipe()
  
    }, [products])

    const calculateFinalPrice = (products) => {
      if (Array.isArray(products)) {
        const totalPrice = products.reduce(
          (accumulator, product) => accumulator + product.unitPrice, 0
        );
        return totalPrice;
      } else {
        return 0;
      }
    };

  return (
    <div>
        <header>
            <h1>Edit Order</h1>
        </header>
        <div>
            <form>
                <div>
                  {order && (
                    <div>
                    <p>Name: {order.name}</p>
                    <p>Order: {order.Order}</p>
                    <p>Date: {order.Date}</p>
                    <p># Products: 
                      {order.Products && order.Products.map(products =>
                        <div>{products.name}</div>
                      )}</p>
                    <p>Final Price: ${calculateFinalPrice(order.Products)}</p>
                    </div>
                  )}
                  
                </div>
                
                <Link to={`/EditOrder/${order.id}/AddProduct`} >
                  <button>Edit Order</button>
                </Link>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Qyt</th>
                        <th>Total Price</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((products) => (
                        <tr key={products.id}>
                            <td>{products.id}</td>
                            <td>{products.name}</td>
                            <td>{products.unitPrice}</td>
                            <th>{products.qty} </th>
                            <th>{products.unitPrice * products.qty}</th>
                            <th>
                              <Link to={`/EditOrder/${order.id}/AddProduct`}>
                                <button>Add Product</button>
                              </Link>

                              <Link to={`/EditOrder/${order.id}/AddProduct`}>
                                <button>Remove Product</button>
                              </Link>
                            </th>
                        </tr>
                    ))} 
                </tbody>
            </table> 
        </div>
    </div>
  )
}

export default AddEditOrder