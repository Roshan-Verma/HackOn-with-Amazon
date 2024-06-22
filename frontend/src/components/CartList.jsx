import React from 'react'
import boxImg from '../assets/box.png'

const CartList = ({cartItems}) => {
  return (
    <div>
      {
        cartItems.map((cartItem, cartIndex) => {
            return (
                <div>
                    <div>
                        <img src={boxImg} />
                    </div>
                    <span>
                        {cartItem.name}
                    </span>
                    <button>
                        -
                    </button>
                    <span>
                        {cartItem.quantity}
                    </span>
                    <button>
                        +
                    </button>
                    <span>
                        {cartItem.price * cartItem.quantity}
                    </span>
                    
                </div>
            )
        })
      }
    </div>
  )
}

export default CartList
