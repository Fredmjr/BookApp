import React from 'react'
import { Link } from 'react-router-dom';
export const Loginpage = () => {
  return (
    <>
    <div className='loginPage'>
        Loginpage
        <div>
            <span><Link to="/Adminpage"><span>Adminpage</span></Link></span>
            <span><Link to="/Userpage"><span>Userpage</span></Link></span> 
        </div>
    </div>
    </>
  )
}

export default Loginpage
