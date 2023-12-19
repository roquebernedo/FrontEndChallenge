import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import '../styles/MyOrders.scss'
import Modal from '../components/Modal'

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

    
  const calculateFinalPrice = (products) => {
    const totalPrice = products.reduce(
      (accumulator, product) => accumulator + product.unitPrice, 0);
  
      return totalPrice;
  };

  const [modalDisplay, setModalDisplay] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setModalDisplay(true);
  };

  const closeModal = () => {
    setModalDisplay(false);
  };

  const closeOnOutsideClick = (event) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
    console.log(event.target)
  };

  const handleRemoveOrder = async (productID) => {
    try {
      await axios.delete(`https://reactchallenge.onrender.com/orderr/${productID}`);
      const response = await axios.get("https://reactchallenge.onrender.com/orders");
      setOrders(response.data);
      closeModal()
    } catch (error) {
      console.error(error);
    }
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
                        <th className='option-buttons'>
                          <Link to={`/EditOrder/${orders.id}`} key={orders._id}>
                            <button className='edit-order'>Edit Order</button>
                          </Link>
                          <Link>
                            <button onClick={openModal} className='remove-order'>Remove Order</button>
                            <Modal
                              closeModal={closeModal}
                              modalDisplay={modalDisplay}
                              closeOnOutsideClick={closeOnOutsideClick}
                              text={'Are you sure you wanna delete the Order?'}
                              handle={() => handleRemoveOrder(orders.id)}
                            />
                          </Link>
                        </th>
                    </tr>
                ))}
                </tbody>
            </table>    
            
            <div className='newOrder'>
                <Link to="/AddEditOrder">
                    <button className='button-new-Order'>Add Order</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default MyOrders