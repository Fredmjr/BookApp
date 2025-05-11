import React from 'react'
import { Link } from 'react-router-dom';

const Userpage = () => {
  return (
    <div>
       <p>User Dashboard</p>
      <button><Link to="/Upload"><span>Upload book</span></Link></button>
    </div>
  )
}

export default Userpage