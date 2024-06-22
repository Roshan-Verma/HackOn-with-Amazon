import React, { useContext } from 'react'
import { PRODUCTS } from "../../products";
import './shop.css';
import { ShopContext } from '../../context/show-context';

export const Shop = () => {
  const { addToCart, cartItems } = useContext(ShopContext);
  return (
    <div className="product-list">
        {
            PRODUCTS.map( (product, key) => {
                return <div className="product-card">
                  <div className='product-image'>
                    <img src={product.imgSrc} className="product-img"/>
                  </div>
                  
                  <div className='product-desc'>
                    <h2>
                        {product.name}
                    </h2>
                    <div className="product-price-div">
                        <div className="product-price">
                            ${product.price}
                        </div>
                        <button className="add-to-cart-button" onClick={() => addToCart(product.id)}>
                            Add to Cart {cartItems[product.id] > 0 && <> ({cartItems[product.id]}) </>}
                        </button>
                    </div>
                  </div>
                  
              </div>
            })
        }
    </div>
  )
};
