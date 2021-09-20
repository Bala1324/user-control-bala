import React from 'react';
import Itemcard from "./Itemcard";
import data from './data';

const Home = ({updateUser}) => {

    return (
        <>
          <h1 className = "text-center mt-3">All Items</h1>
          <div className="button" onClick={() => updateUser({})} >Logout</div>
          <section className = "py-4 container">
            <div className = "row justify-content-center">
              {data.productData.map((item,index)=>{
                return(
                  <Itemcard img ={item.img} 
                  title={item.title} 
                  desc = {item.desc} 
                  price={item.price} 
                  item = {item}
                  key={index}
                  />
                )
              })}
             
              </div>
              </section>  
        </>
    );
};

export default Home;<h1>Home</h1>