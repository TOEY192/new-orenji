document.getElementById('btn_logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('selected_flight');
    localStorage.removeItem('booking_info');
    alert('Logged out');
    window.location.href = '/login';
});
