/* function authen() {
            const emailInput = document.getElementById('emailInput');
            const passwordInput = document.getElementById('passwordInput');
            const adminEmail = 'adminrights@gmail.com';

            const inputValue1 = emailInput.value;
            const inputValue2 = passwordInput.value;
          
    if (!inputValue1 || !inputValue2) {
        alert("Please fill all fields");
        return;
    }


    //fetch store

    //compar redic
           if (inputValue1 === adminEmail) {
                window.location = '/admin/dashboard';
            } 
            else {
               document.getElementById('loginPage').style.display = 'none';
               document.getElementById('signupMgs').style.display = 'block';
            }
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


 */


fetch('/user/login', {
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
    });