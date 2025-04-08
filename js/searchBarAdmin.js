document.querySelector('.input-group input').addEventListener('input', function (e) {
    const searchQuery = e.target.value.toLowerCase();
    filterFlights(searchQuery);
});

function filterFlights(searchQuery) {
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const flightCode = row.cells[0].textContent.toLowerCase();
        const departureAirport = row.cells[1].textContent.toLowerCase();
        const arrivalAirport = row.cells[2].textContent.toLowerCase();

        if (flightCode.includes(searchQuery) || departureAirport.includes(searchQuery) || arrivalAirport.includes(searchQuery)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}