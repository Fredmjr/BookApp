import React from 'react'
import './app.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navibar from './components/NaviBar.jsx'
import Home from './components/Home.jsx'
import Loginpage from './components/Loginpage.jsx'
import Adminpage from './components/Adminpage.jsx'
import Userpage from './components/Userpage.jsx'
import Editpage from './components/Editpage.jsx'
import Upload from './components/Upload.jsx'

const App = () => {
  return (
    <  >
    <div className='bg-neutral-600 h-screen text-white text-sm'>
       <BrowserRouter>
    <Navibar/>
    <Routes>
      <Route index element={<Home/>}></Route>      
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/Loginpage' element={<Loginpage/>}></Route>
      <Route path='/Adminpage' element={<Adminpage/>}></Route>
      <Route path='/Userpage' element={<Userpage/>}></Route>
      <Route path='/Editpage' element={<Editpage/>}></Route>
      <Route path='/Upload' element={<Upload/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App