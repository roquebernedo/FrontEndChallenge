import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import '../styles/AddEditOrder.scss'

const AddEditOrder = () => {

    const [products, setProducts] = useState([])
    const [addOrder, setAddOrder] = useState({
      name: "",
      Order: "",
      Date: new Date(),
      Products: [],
    })
    const navigate = useNavigate()
 
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
  
    }, [])

    const onSubmit = async e => {
      e.preventDefault()
      try{
          await axios.post("https://reactchallenge.onrender.com/order", addOrder)
          navigate("/")
        } catch (error) {
          console.log(error);
      }
    }

    const handleChange = (e) => {
      setAddOrder(prev => ({...prev, [e.target.name]: e.target.value}))
      console.log(addOrder)
    }

  return (
    <div className='containe'>
        <header>
            <h1>Add Order</h1>
        </header>
        <div className='box-main'>
            <form className='box-form' onSubmit={onSubmit}>
                <label>Name:</label>
                <input type='text' placeholder='Name' name='name' onChange={handleChange} required/>
                <label>Order:</label>
                <input type='number' placeholder='Order #' name='Order' onChange={handleChange} required/>
                <label>Date:</label>
                <input type='text' placeholder='Disable' name='Date' onChange={handleChange} readOnly/>
                <label># Products:</label>
                <input type='text' placeholder='Disable' name='Products' onChange={handleChange} readOnly/>
                <label>Final Price:</label>
                <input type='text' placeholder='Disable' name='FinalPrice' onChange={handleChange} readOnly/>
                <div className='new-Order'>
                  <button className='button-new-Order' type='submit'>Add New Order</button>
                </div>
            </form>
            
            <h2 className='subtitle'>Productos Disponibles</h2>

            <table className='table-products'>
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
                        <th>${products.unitPrice}</th>
                        <th>{products.qty} </th>
                        <th>${products.unitPrice * products.qty}</th>
                    </tr>
                ))}
              </tbody>
            </table> 
        </div>
    </div>
  )
}

export default AddEditOrder