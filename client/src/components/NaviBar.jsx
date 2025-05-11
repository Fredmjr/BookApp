import React from 'react'
import { Link } from 'react-router-dom';

const NaviBar = () => {
  return (
    <div className='naviPanel'>
        <span>Bookapp</span>
        <span className='flex gap-3'>
        <Link to="/Loginpage"><span>Loginpage</span></Link>
        <Link to="/Home"><span>home</span></Link>
        </span>
    </div>
  )
}

export default NaviBar