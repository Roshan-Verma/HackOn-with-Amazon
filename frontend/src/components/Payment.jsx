import React from 'react'
import drop from '../assets/drop.svg';
import { useState , useContext, useEffect } from 'react';
import { PRODUCTS } from '../products';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/show-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const [debitShow, setdebitShow] = useState(false)
    const [UPI, setUPI] = useState(false)
    const [Credit, setCredit] = useState(false)
    const [COD, setCOD] = useState(false)
    const [netBanking, setnetBanking] = useState(false)
    const [EMI, setEMI] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState('None');
    const [recommmendedPaymentMethod, setPayment] = useState('None');
    const { cartItems , addToCart, removeFromCart, setCartItems, clear } = useContext(ShopContext);

    const location = useLocation();

    const totalPrice = location.state.totalPrice;

    useEffect(() => {
        axios.get("http://localhost:5000/predict")
        .then((response) => {
            setPayment(response.data['recommended_payment_method']);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    },[]);

    const handledebit = () =>{
        setPaymentMethod('Debit Card');
        setdebitShow(!debitShow);
        setCredit(false);
        setCOD(false);
        setnetBanking(false);
        setEMI(false);
        setUPI(false);
    }

    const handleUPI = () =>{
        setPaymentMethod('UPI');
        setUPI(!UPI);
        setCredit(false);
        setCOD(false);
        setnetBanking(false);
        setEMI(false);
        setdebitShow(false);
    }

    const handleEMI = () =>{
        setPaymentMethod('EMI');
        setEMI(!EMI);
        setCredit(false);
        setCOD(false);
        setnetBanking(false);
        setUPI(false);
        setdebitShow(false);
    }

    const handlenetBanking = () =>{
        setPaymentMethod('Net Banking');
        setnetBanking(!netBanking);
        setCredit(false);
        setCOD(false);
        setEMI(false);
        setUPI(false);
        setdebitShow(false);
    }

    const handleCOD = () =>{
        setPaymentMethod('COD');
        setCOD(!COD);
        setCredit(false);
        setnetBanking(false);
        setEMI(false);
        setUPI(false);
        setdebitShow(false);
    }

    const handleCredit = () =>{
        setPaymentMethod('Credit Card');
        setCredit(!Credit);
        setCOD(false);
        setnetBanking(false);
        setEMI(false);
        setUPI(false);
        setdebitShow(false);
    }

    const getDefaultCart = () => {
        let cart = {};
        for (let i = 1; i < PRODUCTS.length + 1; i++) {
          cart[i] = 0;
        }
        return cart;
      };

      useEffect(() => {
        console.log('After clearing:', cartItems);
      }, [cartItems]);

    const navigate = useNavigate();
    const handleCheckout = () =>{
        if( paymentMethod == 'None' ){
            alert('Please select a payment method');
            return;
        }
        axios.post("http://localhost:5000/checkout", { cartItems, paymentMethod })
        .then((response) => {
            console.log(response); 
            setCartItems(getDefaultCart());
            alert("Transaction Succesfull! You will be redirected to Home Page")
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
            alert("Transaction Failed!")
        });
    }

  return (
    <div className='flex'>
        <div className="left w-[60%] m-4 p-6 flex flex-col gap-6">
            <div className='border flex justify-between items-center p-2 rounded-md h-16 border-black bg-black text-white'>
                <h2 className='text-2xl'>Preferred Payment Method : {recommmendedPaymentMethod}</h2>
            </div>
            
                <div className="methods flex flex-col gap-4 ">

                    <div className='border min-h-[40px] flex flex-col gap-2 p-2 rounded-md bg-gray-400  border-black'>
                    
                        <div className="flex justify-between ">
                            
                            <h2 className='text-lg'>UPI</h2>
                            <div className="drop cursor-pointer"  onClick={handleUPI} >
                                <img src={drop} alt="" />
                            </div>

                        </div>

                        <div className={UPI ? "flex flex-col gap-1" : 'hidden'} >
                                    <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='UPI ID' />
                                </div>

                            </div>


                    <div className='border min-h-[40px] flex flex-col gap-2 bg-gray-400  p-2 rounded-md border-black'>

                        <div className="flex justify-between">
                            <h2 className="text-lg">EMI/Pay Later</h2>
                            <div className="drop cursor-pointer" onClick={handleEMI} >
                                <img src={drop} alt="" />
                            </div>

                        </div>

                        <div className={EMI ? "flex flex-col gap-1" : 'hidden'} >
                                <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card Holder Name' />
                                <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card Number' />
                                <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card CVV' />
                            </div>

                    </div>

                    <div className='border min-h-[40px] flex flex-col gap-2 bg-gray-400  p-2 rounded-md border-black'>

                        
                        <div className=" upi flex justify-between">
                            
                            <h2 className="text-lg">Debit Card</h2>
                            <div className="drop cursor-pointer" onClick={handledebit}>
                                <img src={drop} alt="" />
                            </div>
                            
                        </div>

                        <div className={debitShow ? "flex flex-col bg-gray-400  gap-1" : 'hidden'} >
                            <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card Holder Name' />
                            <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card Number' />
                            <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card CVV' />
                        </div>


                    </div>


                    <div className='border min-h-[40px] flex flex-col bg-gray-400  gap-2 p-2 rounded-md border-black'>

                        <div className="flex justify-between">
                            <h2 className="text-lg">Credit Card</h2>
                            <div className="drop cursor-pointer" onClick={handleCredit}>
                                <img src={drop} alt="" />
                            </div>
                        </div>

                        <div className={Credit ? "flex flex-col gap-1" : 'hidden'} >
                            <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card Holder Name' />
                            <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card Number' />
                            <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Card CVV' />
                        </div>

                    </div>

                    <div className='border min-h-[40px] flex flex-col bg-gray-400  gap-2 p-2 rounded-md border-black'>

                        <div className=" flex justify-between">
                            <h2 className="text-lg">Net Banking</h2>
                            <div className="drop cursor-pointer" onClick={handlenetBanking}>
                                <img src={drop} alt="" />
                            </div>
                        </div>

                        
                        <div className={netBanking ? "flex flex-col gap-1" : 'hidden'} >
                            <input className='p-2 rounded-md  w-[60%]' type="text" placeholder='Bank Name' />
                            
                        </div>



                    </div>


                    
                    <div className='border min-h-[40px] flex flex-col bg-gray-400 gap-2 p-2 rounded-md border-black'>

                   

                        <div className="flex justify-between">
                            <h2 className="text-lg">COD</h2>
                            <div className="drop cursor-pointer" onClick={handleCOD}>
                                <img src={drop} alt="" />
                            </div>
                        </div>

                          
                        <div className={COD ? "flex flex-col items-end gap-1" : 'hidden'} >
                            <button className='p-2 rounded-md bg-[#ff9900]'>Click Here</button>
                        </div>


                    </div>

                </div>
            
        </div>

        <div className="right m-10 rounded-md p-4 gap-4 flex flex-col border border-black w-[25%]">

            <div className="w-full bg-[#ff9900]  p-2 rounded-md">Total : ${totalPrice}</div>

            <div className='bought flex flex-col gap-4'>

                {PRODUCTS.map((product) => {
                   
                    if (cartItems[product.id] != 0) {
                    return (
                        <div className="flex justify-between p-2 rounded-md bg-white">

                            <span className="text-lg">{product.name}</span>
                            <div>
                                <div className="flex justify-between">
                                    <span>Quantity : </span>
                                    <span className=""  >{cartItems[product.id]}</span>
                                </div>
                                <div className="">
                                    <span>Price : </span>
                                    <span>${product.price * cartItems[product.id]}</span>
                                </div>
                            </div>
                        </div>
                    );
                    }
                })}

            </div>

            <button className='flex justify-center bg-[#ff9900] p-2 rounded-md' onClick={handleCheckout}>CheckOut</button>

        </div>

    </div>
  )
}

export default Payment
