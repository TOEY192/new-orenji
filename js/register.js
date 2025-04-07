document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const first_name = document.getElementById('firstname').value;
    const last_name = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passport_number = document.getElementById('passport_number').value;


    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            passport_number
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server Response: ', data);
        if (data.message === 'User registered successfully') {
            console.log('Register successful:', data);
            alert('Register successful!');
            window.location.href = '/login';
        } else {
            alert('Invalid email or password');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.', error);
    });
})