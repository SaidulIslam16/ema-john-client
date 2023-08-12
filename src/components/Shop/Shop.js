import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import { useLoaderData } from 'react-router-dom';

const Shop = () => {
    // const products = useLoaderData();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [totalProducts, setTotalProducts] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {
        fetch('http://localhost:5000/totalProducts')
            .then(res => res.json())
            .then(data => {
                setTotalProducts(data.totalProducts)
            })
    }, [])

    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];
    /**
    * 1. Determine the total number of items.
    * 2. Decide the number of items per page.
    * 3. Calculate the total number of pages.
    */


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const jsonData = await response.json();
            setProducts(jsonData);
        };

        fetchData();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        console.log('kicked for loacal data')
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByID', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                console.log(cartProducts)
                const savedCart = [];
                for (const id in storedCart) {
                    let addedProduct = cartProducts.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        // console.log(addedProduct)
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart)
            })


        // console.log('local storage finished')
    }, [])

    const options = [5, 10, 20, 50, 100];

    const handleOptionChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setItemsPerPage(newValue);
    };

    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct);
        const exists = cart.find(product => product._id === selectedProduct._id);
        let newCart = [];
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity += 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct._id)
    }
    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product product={product} key={product._id} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <p>current page: {currentPage}</p>

                {
                    pageNumbers.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        key={page}
                        className={currentPage === page ? 'selected' : ''}
                    >{page + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleOptionChange}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;