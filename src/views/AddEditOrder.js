import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

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
    <div>
        <header>
            <h1>Add Order</h1>
        </header>
        <div>
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input type='text' name='name' onChange={handleChange} required/>
                <label>Order</label>
                <input type='number' placeholder='Order #' name='Order' onChange={handleChange} required/>
                <label>Date</label>
                <input type='text' placeholder='Disable' name='Date' onChange={handleChange} readOnly/>
                <label># Products</label>
                <input type='text' placeholder='Disable' name='Products' onChange={handleChange} readOnly/>
                <label>Final Price</label>
                <input type='text' placeholder='Disable' name='FinalPrice' onChange={handleChange} readOnly/>
                <div>
                  <button type='submit'>Add New Order</button>
                </div>
            </form>
            
            <h2>Productos Disponibles</h2>

            <table>
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
                        <td>{products.id}</td>
                        <td>{products.name}</td>
                        <td>{products.unitPrice}</td>
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