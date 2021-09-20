
import React from 'react';
import Card from './Card';
import Home from './Home';
import {CartProvider} from 'react-use-cart';

const Provider = ({updateUser}) => {
    return (
        <div>
             <CartProvider>
           <Home updateUser={updateUser}></Home>
           <Card></Card>
         </CartProvider>
            
        </div>
    );
};

export default Provider;