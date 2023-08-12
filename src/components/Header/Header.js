import React from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <NavLink to='/'>Shop</NavLink>
                <NavLink to='/order'>Order</NavLink>
                {/* <NavLink to='/order-review'>Order Review</NavLink> */}
                <NavLink to='/inventory'>Manage Inventory</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </div>
        </nav>
    );
};

export default Header;