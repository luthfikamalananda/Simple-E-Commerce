import { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import './checkout.css'
import { Padding } from '@mui/icons-material';
import { CartContext } from '../context/CartProvider';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const navigate = useNavigate();

    // Context
    const data = useContext(CartContext); 
    const auth = useContext(AuthContext)

    const btnRemoveHandler = (id) => {
        data.removeFromCart(id);
    }

    const btnAddQuantityHandler = (id) => {
        data.addQuantityCart(id)
    }

    const btnSubtractQuantityHandler = (id) => {
        data.subtractQuantityCart(id)
    }

    useEffect(() => {
        if (auth.checkLogin() === false) {
          navigate('/login')
        } 
      },[])

    return (
        <>
            <Header />
            <main>
                <div className="container-fluid table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Name</th>
                                <th scope="col" className='text-center'>Price</th>
                                <th scope="col" className='text-center'>Quantity</th>
                                <th scope="col" className='text-center'>Total</th>
                                <th scope="col" className='text-center'>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.cart.map((data) =>
                                <tr key={data.id}>
                                    <th scope="row"><img src={data.image} alt="Product Image" className='product-images'/></th>
                                    <td>{data.title}</td>
                                    <td className='text-center'>{data.price}</td>
                                    <td className='text-center'>{data.quantity > 1 ? <button onClick={() => {btnSubtractQuantityHandler(data.id)}}>-</button> : ''} {data.quantity} <button onClick={() => {btnAddQuantityHandler(data.id)}}>+</button></td>
                                    <td className='text-center'>{data.quantity * data.price}</td>
                                    <td className='text-center' onClick={() => btnRemoveHandler(data.id)}>X</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

        </>
    )
}