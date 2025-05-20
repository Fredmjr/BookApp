import { useState } from 'react'
import React from 'react'


function Home() {
    let [loginPage, setloginPage] = useState(false)
    let [loginpageVisisbility, setloginpageVisisbility] = useState('hidden')
    
    function loginFuc (){
        if (loginPage == true){
          setloginpageVisisbility('hidden');
          setloginPage(false)
          console.log('success')
        } else if (loginPage == false){
          setloginpageVisisbility('');
          setloginPage(true)
          console.log('failed')
          console.log(loginpageVisisbility)
        }
    }
    
    return (
      <>
      <div id="naviBar" onLoad={loginFuc}>
          <p>Booklist</p>
          <button onClick={loginFuc} id="loginBtn">login</button>
          </div>
      <div id="booksPage">
          <div id="books">
              <div id="bookListAll"></div>
          </div>
      </div>
  
      <div id="loginPage" style={{visibility: loginpageVisisbility}}>
          <p>Login Page</p>
          <p>The is not yet configured, click below to move to next page</p>
          <p><a href="/adminpage">admin page</a></p>
          <p><a href="/userpage">user page</a></p>
      </div>
      </>
    )
  }
  export default Home