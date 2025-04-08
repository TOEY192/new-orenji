const token = localStorage.getItem('token');

if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userRole = decodedToken.role;
    if (userRole !== 'admin') {
        window.location.href = '/';
    }
} else {
    window.location.href = '/login.html';
}