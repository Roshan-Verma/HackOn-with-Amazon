import React from 'react'
import { Link } from 'react-router-dom'
import amazonLogo from '../assets/amazon-logo.png';
import cartIcon from '../assets/cart.png';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Budget');
 };
  return (
    <div className = "w-full flex justify-between items-center bg-black py-3 px-1">

      <div className='flex md:gap-10 md:w-[40%]'>
        <Link to="/">
          <img className='w-28 h-8' src={amazonLogo} alt="" id="amazon-logo"/>
        </Link>
        <div className = 'w-full flex border border-black rounded-md outline-none' >
          <input className = 'w-full outline-none rounded-l-md p-1' type="text" id="search-input" placeholder="Search..."/>
          <button className='w-1 md:w-28 rounded-r-md bg-[#ff9900]' id="search-button">Search</button>
        </div>
      </div>

      <div className = 'flex gap-5'>
        <div className='flex gap-4'>
          {/* <Link to='/Budget'> */}
          <button onClick={handleClick} className='w-18 text-sm h-10 p-1 md:p-2 rounded-md bg-[#ff9900]' id = "">Budget</button>
          {/* </Link> */}
          <Link to='/dashboard'>
            <button className='w-18 text-sm h-10 p-1 md:p-2 rounded-md bg-[#ff9900]' id = "navbar-dashboard-btn">Dashboard</button>
          </Link>
            <a href="https://029e1983bcbb1cdec5.gradio.live">
            <button className='p-1 md:p-2 rounded-md bg-[#ff9900]' id = "navbar-chatbot-btn">Chatbot</button>
            </a>
        </div>

          <Link to="/cart">
            <div className='flex gap-1 items-center'>
            
                <img className = 'h-8' src={cartIcon} alt="" id = "cart-icon"/>
                <span className = 'text-white' id = "navbar-cart-label">Cart</span>
            
            </div>
          </Link>
          <div className=''>
              <div className = 'w-10 h-10 rounded-3xl flex justify-center items-center bg-white' id = "navbar-profile-text">R</div>
          </div>
      </div>


    </div>
  )
}

export default navbar
