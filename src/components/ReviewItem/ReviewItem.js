import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = ({ product, handleRemoveItem }) => {
    const { img, name, price, shipping, quantity, _id } = product;
    return (
        <div className='review-product'>
            <div className='product-details'>
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <p className='name'>{name}</p>
                    <p>Price: ${price}</p>
                    <p>Shipping Charge: ${shipping}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            </div>
            <div>
                <button className='dlt-btn' onClick={() => handleRemoveItem(_id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
            </div>
        </div>
    );
};

export default ReviewItem;