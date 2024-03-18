import { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import './checkout.css'
import { Padding } from '@mui/icons-material';
import { CartContext } from '../context/CartProvider';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar, useMediaQuery } from '@mui/material';

export default function Checkout() {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(max-width: 500px)');
    console.log(isDesktop);

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

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

    const btnCheckoutHandler = () => {
        localStorage.removeItem('cart');
        navigate(0)
    }

    useEffect(() => {
        if (auth.checkLogin() === false) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Header />
            <main>
                <h2 className='mb-4'>CHECKOUT</h2>
                <div className="custom-container ">
                    {isDesktop ? data.cart.map((data) => (
                        <div className="row mb-3 mb-4 p-2 bt-2 border-bottom checkout-container">
                            <div className="col-auto align-self-center">
                                <img src={data.image} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="product image" className='img-fluid productCart-image' />
                            </div>
                            <div className="col p-0">
                                <h2 className='productCart-text'>{data.title}</h2>
                                <h3 className='productCart-text'>${data.price * data.quantity} </h3>
                                <div className="row">
                                    <div className="col-auto">
                                        {data.quantity > 1 ? <button className='btn btn-light cart-button' onClick={() => btnSubtractQuantityHandler(data.id)}>-</button> : ''}
                                    </div>
                                    <div className="col-auto fw-bold align-self-center justify-content-center cart-quantity" >
                                        {data.quantity}
                                    </div>
                                    <div className="col-auto">
                                        <button className='btn btn-light cart-button' onClick={() => btnAddQuantityHandler(data.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto text-center align-self-center p-0">
                                <button className='btn btn-danger p-2 cart-button' style={{ fontSize: '24px', width: '50px' }} onClick={() => btnRemoveHandler(data.id)}>X</button>
                            </div>
                        </div>
                    ))
                        :
                        <table className="table table-responsive">
                            <thead>
                                <tr className='table-head'>
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
                                        <th scope="row"><img src={data.image} alt="Product Image" className='product-images' /></th>
                                        <td>{data.title}</td>
                                        <td className='text-center'>{data.price}</td>
                                        <td className='text-center fw-bold'>{data.quantity > 1 ? <button className='btn btn-light quantity-container' onClick={() => { btnSubtractQuantityHandler(data.id) }}>-</button> : ''} {data.quantity} <button className='btn btn-light quantity-container' onClick={() => { btnAddQuantityHandler(data.id) }}>+</button></td>
                                        <td className='text-center'>${data.quantity * data.price}</td>
                                        <td className='text-center' onClick={() => btnRemoveHandler(data.id)}><button className='btn btn-danger'>X</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    <h4 className='d-flex justify-content-center'>TOTAL: ${Math.floor(data.cart.reduce((accumulator,curr) => accumulator + (curr.price*curr.quantity), 0) * 100)/100}</h4>
             <div className="d-flex justify-content-center align-self-center ">

                   <button className='btn btn-danger fs-2 fw-bold' onClick={btnCheckoutHandler}>CHECKOUT NOW</button>
                  </div>
                </div>
                <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success">Checkout Success</Alert>
      </Snackbar>
            </main>

        </>
    )
}