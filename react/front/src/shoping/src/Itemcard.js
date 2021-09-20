import React from 'react';
import {useCart} from 'react-use-cart';

const Itemcard = (props) => {
  const {addItem} = useCart();

  return (
        <div className = "col-11 col-md-6 col-lg-3 mx-4">
        <div class="cardnp-0 overflow-hidden h-100 shadow">
        <img src= {props.img} class="card-img-top img-fluid"/>
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <h5 class="card-title">₹{props.price}</h5>
          <p class="card-text">{props.desc}</p>
          <button class="btn btn-success" onClick = {() =>addItem(props.item)}>Add to Card</button>
        </div>
      </div>
      </div>
    );
};

export default Itemcard;