import React from 'react'
import { Link } from 'react-router-dom';

const Adminpage = () => {
  return (
    <>
    <p>Adminpage</p>
    <button><Link to="/Upload"><span>Upload book</span></Link></button>
    <div>
    <p>img</p>
    <button><Link to="/editpage"><span>edit</span></Link></button>
    <button>delete</button> 
    </div>

    </>
  )
}

export default Adminpage