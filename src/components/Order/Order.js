import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';

const Order = () => {
    const { products, previousCart } = useLoaderData();
    const [cart, setCart] = useState(previousCart);

    // remvoe product event handlr

    const handleRemoveItem = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        console.log(cart, id);
        setCart(remaining);
        removeFromDb(id);
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>


        </div>
    );
};

export default Order;