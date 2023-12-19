import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom';
import '../styles/AddProducts.scss'

const AddProducts = () => {

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
            const response = await axios.get(`https://reactchallenge.onrender.com/order/${productID}/AddProduct`)
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

    const handleRemoveProduct = async (productId) => {
        try {
            await axios.delete(`https://reactchallenge.onrender.com/delete-order/${productID}/product/${productId}`);
            const response = await axios.get(`https://reactchallenge.onrender.com/order/${productID}`);
            setOrder(response.data);
        } catch (error) {
            console.error(error);
        }
    };

  const handleAddProduct = async (productId) => {
        try {
          await axios.put(`https://reactchallenge.onrender.com/orden/${productID}`, {
            ...orderr,
            Products: [...orderr.Products, productId],
          });
          const response = await axios.get(`https://reactchallenge.onrender.com/order/${productID}`);
          setOrder(response.data);
        } catch (error) {
          console.error(error);
        }
    };
    
  return (
    <div>
        <h1>AddProducts</h1>
        <table className='table-products'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Price</th>
                            <th>QTY</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product) => (
                        <tr key={product.id}>
                            <th>{product.name}</th>
                            <th>{product.unitPrice}</th>
                            <th>{product.qty} </th>
                            <th className='option-button'>
                              <button className='add-product' onClick={() => handleAddProduct(product.id)}>Add Product</button>
                              <button className='remove-product' onClick={() => handleRemoveProduct(product.id)}>Remove Product</button>
                            </th>
                        </tr>
                    ))} 
                    </tbody>
                </table>
        
    </div>
  )
}

export default AddProducts