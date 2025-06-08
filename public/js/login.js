//Auto login
const nameless = ()=>{
       console.log(localStorage.getItem('jwtToken'))
    if(localStorage.getItem('jwtToken')){
       autologin()
    } else{
        return
    }
}

nameless();


function autologin (){
        fetch('/admin/dashboard',{
        method: 'GET',
         headers: {
  'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    },

    })
    .then(response => response.text())
    .then(data => {
        let page = document.querySelector('main');
        console.log(data)
        page.outerHTML = `${data}`;
    })
}




function authen() {
            const emailInput = document.getElementById('emailInput');
            const passwordInput = document.getElementById('passwordInput');

            const inputValue1 = emailInput.value;
            const inputValue2 = passwordInput.value;
          
    if (!inputValue1 || !inputValue2) {
        alert("Please fill all fields");
        return;
    }

    let clientData = {
    "email": inputValue1,
    "password": inputValue2, 
    } 
    console.log(clientData)
//jjjjjjjjjjjjjjjjj
fetch('/user/login', {
    
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(clientData)
})
    .then(response => response.json())
    .then(data => {          
        if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        console.log(data.token);
    }
     /*  if(data.redirect){
      window.location.href = data.redirectUrl;
      } */
    });
    console.log(localStorage.getItem('jwtToken'));
    fetch('/admin/dashboard',{
        method: 'GET',
         headers: {
  'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    },

    })
    .then(response => response.text())
    .then(data => {
        let page = document.querySelector('html');
        console.log(data)
        page.innerHTML = `${data}`;
    })
}

    const signupLoginBtn = document.getElementById('signupLoginBtn');
    signupLoginBtn.addEventListener('click', ()=>{
       document.getElementById('loginPage').style.display = 'none';
        document.getElementById('signUpPage').style.display = 'block';
    })
    const crdialSignuptBtn = document.getElementById('crdialSignuptBtn');
    crdialSignuptBtn.addEventListener('click', ()=>{
       document.getElementById('signupMgs').style.display = 'none';
        document.getElementById('signUpPage').style.display = 'block';
    })


//(1)creating an account, (2)receiving jw token & (3)storing it in localstorage
function crtAccount(){
    const emailField = document.getElementById('emailField').value;
    const passwordField = document.getElementById('passwordField').value;

    data = {
        "email": emailField,
        "password": passwordField
    }

     fetch('/user/signup', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
     })
     .then(response=>response.json())
     .then(data=>console.log(data))

//redirect to dashboard page
   if (!emailField  || !passwordField) {
        alert("Please fill all fields");
        return;
    }
    
    if (emailField  || passwordField) {
        window.location = '/user/dashboard';
    } 

}





/* fetch('/user/login', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(
        {
  "email":"adminrights@gmail.com",
  "password": "D7?q7Ajg:Sv4jwZ"
}

    )
})
    .then(response => response.json())
    .then(data => {
          if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        console.log(data.token);
    }

      if(data.redirect){
      window.location.href = data.redirectUrl;
      }
    }); */