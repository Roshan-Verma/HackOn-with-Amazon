import React, { useContext , useState } from "react";
import {useNavigate } from 'react-router-dom'
import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/show-context";
import "./cart.css";
import axios from "axios";

export const Cart = () => {
  const { cartItems , addToCart, removeFromCart } = useContext(ShopContext);
  const handleMinus = (product_id) =>{
    removeFromCart(product_id);
  }

  const handlePositive = (product_id) =>{
    addToCart(product_id);
  }

  const navigate = useNavigate();  

  const [totalPrice, setTotalPrice] = useState(0);

  React.useEffect(() => {
    const newTotalPrice = Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = PRODUCTS.find(p => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleClick2 = () => {
    if (totalPrice == 0 ){
      alert("Please add products to your cart!")
      return
    }
    axios.post("http://localhost:5000/api/data", { 'totalPrice' : totalPrice })
    .then((response) => {
      console.log(response);
      navigate('/pay', { state: { totalPrice: totalPrice } });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="cart">
      <div className="cart-title">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-main">
        <div className="cartItems">
          {PRODUCTS.map((product) => {
            // console.log(PRODUCTS);
            if (cartItems[product.id] != 0) {
              return (
                <div className="cart-item">
                  <div>
                    <img src={product.imgSrc} class="product-img-cart" />
                  </div>
                  <span className="prod-name-cart">{product.name}</span>
                  <div className="flex justify-between">
                    <button onClick = {() => handleMinus(product.id)} className="bg-gray-300 w-5 rounded-sm cursor-pointer"> - </button>
                    <input className="quan" value={cartItems[product.id]} />
                    <button onClick = {() => handlePositive(product.id)} className=" bg-gray-300 w-5 rounded-sm cursor-pointer"> + </button>
                  </div>
                  <div className="flex justify-center">
                    <span>${product.price * cartItems[product.id]}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="cart-total space-y-10">

          <div className="flex gap-5">

            <h2>SubTotal : </h2>

            {/* {Object.entries(cartItems).reduce((total, [productId, quantity]) => {
              const product = PRODUCTS.find(p => p.id === parseInt(productId));
              return total + (product ? product.price * quantity : 0);
            }, 0)} */}

            ${totalPrice.toFixed(2)}

          </div>
          <div className="">
            <button onClick={handleClick2} className="w-full bg-[#ff9900] rounded-md h-9 text-lg">
              Proceed to Checkout
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
};
