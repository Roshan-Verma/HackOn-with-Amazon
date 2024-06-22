import React from "react";
import './ProductList.css'
import boxImg from '../assets/box.png'

const ProductList = ({ itemsList, addToCart }) => {
  return (
    <div className="product-list">
      {
        itemsList.map((item) => {
            return(
                <div className="product-card">
                    <img src={boxImg} alt="skjdh" className="product-img"/>
                    <h2>
                        {item.name}
                    </h2>
                    <div className="product-price-div">
                        <div className="product-price">
                            ${item.price}
                        </div>
                        <button className="add-to-cart-button" onClick={() => addToCart(item)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            )
        })
      }
    </div>
  );
};

export default ProductList;
