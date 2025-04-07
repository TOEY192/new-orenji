document.getElementById('btn_logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Logged out');
    window.location.href = '/login';
});
