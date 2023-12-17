import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from "axios"

const AddEditOrder = () => {

    const [order, setOrder] = useState([])
    const location = useLocation();
    const productID = location.pathname.split("/")[2];
    const [products, setProducts] = useState([])
    const [orderr, setOrderr] = useState({
        Order: '',
        Date: '',
        Products: [],
        FinalPrice: '',
    });
    console.log(productID)
 
    useEffect(() => {
      const fetchRecipe = async () => {
        try{
          const response = await axios.get(`http://localhost:8000/order/${productID}`)
          setOrder(response.data)
          console.log(order)
        }catch(err){
          console.error(err)
        }
      }
  
      fetchRecipe()
  
    }, [])
    console.log(order)
 
    useEffect(() => {
      const fetchRecipe = async () => {
        try{
          const response = await axios.get("http://localhost:8000/")
          setProducts(response.data)
          console.log(products)
        }catch(err){
          console.error(err)
        }
      }
  
      fetchRecipe()
  
    }, [])
    console.log(products)

    const handleAddProduct = async (productId) => {
        try {
          // Realiza la solicitud PUT para agregar el producto a la orden
          await axios.put(`http://localhost:8000/orden/${productID}`, {
            ...orderr,
            Products: [...orderr.Products, productId],
          });
          // Actualiza la orden después de agregar el producto
          const response = await axios.get(`http://localhost:8000/order/${productID}`);
          setOrder(response.data);
        } catch (error) {
          console.error(error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
    };

  return (
    <div>
        <header>
            <h1>Edit Order</h1>
        </header>
        <div>
            <form>
                <label>Order #</label>
                <input type='text' placeholder='Order #' name='Order'/>
                <label>Date</label>
                <input type='text' name='Date'/>
                <label># Products</label>
                <input type='text' name='Products'/>
                <label>Final Price</label>
                <input type='text' name='FinalPrice'/>
            </form>
            
            <div>
                <Link to="/AddEditOrder">
                    <button>Add New Product to the Order</button>
                </Link>
            </div>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>Qyt</th>
                    <th>Total Price</th>
                    <th>Options</th>
                </tr>

                {products.map((products) => (
                    <tr key={products._id}>
                        <td>{products.id}</td>
                        <td>{products.name}</td>
                        <td>{products.unitPrice}</td>
                        <th>{products.qty} </th>
                        <th>{products.unitPrice * products.qty}</th>
                        <th>
                            <button onClick={() => handleAddProduct(products.id)}>Add Product</button>
                            <button>Remove Product</button>
                        </th>
                    </tr>
                ))} 
            </table> 
        </div>
    </div>
  )
}

export default AddEditOrder