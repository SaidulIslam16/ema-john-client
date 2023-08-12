import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const { category, img, name, price, quantity, ratings, ratingsCount, seller, shipping, stock, id } = props.product;
    return (
        <div className='product'>
            <img src={img ? img : "no-image found"} alt="" />
            <div className='product-info'>
                <h2>{name}</h2>
                <h3>Price: ${price}</h3>
                <p>Manufacturer : {seller}</p>
                <p>Rating : {ratings}</p>
            </div>
            <button className='btn' onClick={() => props.handleAddToCart(props.product)}>Add to Cart
                <FontAwesomeIcon className='icon' icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;