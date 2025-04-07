document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure_date = document.getElementById('departure_date').value;
    
    localStorage.setItem('booking_info', JSON.stringify({ from, to, departure_date }));

    window.location.href = '/search.html';
})