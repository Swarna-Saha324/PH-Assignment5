
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    // 1. Prevent the page from refreshing on form submit
    event.preventDefault();

    // 2. Get the values from the input fields
    const userValue = document.getElementById('username').value;
    const passwordValue = document.getElementById('password').value;

    // 3. Check if they match 'admin' and 'admin123'
    if (userValue === 'admin' && passwordValue === 'admin123') {
      
      
      // 4. Redirect to another page (change dashboard.html to your actual file)
      window.location.href = 'dashboard.html'; 
    } else {
      // 5. If it's wrong, show an error
      alert('Invalid username or password!');
    }
  });
