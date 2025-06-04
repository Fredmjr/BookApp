fetch('/admin/dashboard', {
  method: 'GET',
})
         const storedToken = localStorage.getItem('jwtToken');
        console.log('JWT token stored in localStorage:', storedToken);