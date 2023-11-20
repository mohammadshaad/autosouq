import React, { useEffect } from 'react'
import { Navbar } from './Navbar';
import { Products } from './Products'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Landing } from './Landing';

export const Home = ({ user }) => {

    const history = useHistory();


    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Products />
        </div>
    )
}
