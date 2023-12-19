import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../styles/EditOrder.scss'

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
    <div className='containe'>
        <header>
            <h1>Edit Order</h1>
        </header>
        <div className='box-main'>
            <form className='box-form'>
                {order && (
                  <div>
                    <div className='box'><label>Name:</label> {order.name}</div>
                    <div className='box'><label>Order:</label> {order.Order}</div>
                    <div className='box'><label>Date:</label> {order.Date}</div>
                    <div className='edit-products-order box'>
                      <div><label>Products:</label> </div>
                      <div className='products-edit'>
                        {order.Products && order.Products.map(products =>
                          <div>{products.name}</div>
                        )}
                      </div>
                    </div>
                    <div className='box'><label>Final Price:</label> ${calculateFinalPrice(order.Products)}</div>
                  </div>
                )}
                
                <Link to={`/EditOrder/${order.id}/AddProduct`} >
                  <button className='button-new-Order'>Edit Order</button>
                </Link>
            </form>

            <table className='table-product'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Qyt</th>
                        <th>Total Price</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((products) => (
                        <tr key={products.id}>
                            <th>{products.id}</th>
                            <th>{products.name}</th>
                            <th>{products.unitPrice}</th>
                            <th>{products.qty} </th>
                            <th>{products.unitPrice * products.qty}</th>
                        </tr>
                    ))} 
                </tbody>
            </table> 
        </div>
    </div>
  )
}

export default AddEditOrder