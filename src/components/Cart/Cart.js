import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Cart = ({ cart }) => {
    let total = 0;
    let shippingCharge = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shippingCharge = shippingCharge + product.shipping * product.quantity;
    }

    // Tax info
    const tax = parseFloat((total * .1).toFixed(2));
    // Grand total
    const grandTotal = total + shippingCharge + tax;
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${total} </p>
            <p>Total Shipping: ${shippingCharge} </p>
            <p>Tax: ${tax}</p>
            <p className='grand-total'>Grand Total: ${grandTotal} </p>
            <button className='btn-clear'>Clear Cart <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>

            <Link to='/order' className='btn-review'>Review Order <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></Link>
        </div>
    );
};

export default Cart;