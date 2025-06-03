
const loginIcon = document.getElementById('loginIcon');
const header = document.getElementById('header');
document.addEventListener('click', (event)=>{
    if(loginIcon.contains(event.target)){
        header.style.display = 'none'
    }
})
