document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server Response: ', data);
        if (data.message === 'Login successful') {
            console.log('Login successful:', data);
            alert('Login successful!');
            const token = data.token; 
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userRole = decodedToken.role;
            window.location.href = '/';
            if (userRole !== 'admin') {
                window.location.href = '/';
            }
            else {
                window.location.href = '/admin.html'
            }
        } else {
            alert('Invalid email or password');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed. Please try again.', error);
    });
})