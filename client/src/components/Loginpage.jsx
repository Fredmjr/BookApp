
import React from 'react'
import { Link } from 'react-router-dom';

let token;  
function loginFunc(){
  fetch('/user/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
      "email": "barry@gmail.com",
      "password": "000000"
    }
    )
  })
  .then(response => response.json())
  .then(data => {
      console.log(data)
      token = data.token
  })
}


export const Loginpage = () => {
  return (
    <>
    <div className='loginPage'>
        Loginpage
        <div>
            <span><Link to="/Adminpage"><span>Adminpage</span></Link></span>
            <span><Link to="/Userpage"><span>Userpage</span></Link></span> 
        </div>
        <button onClick={loginFunc()}>click</button>
    </div>
    </>
  )
}

export default Loginpage
