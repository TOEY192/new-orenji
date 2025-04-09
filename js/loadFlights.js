document.addEventListener('DOMContentLoaded', async () => {
    await loadFlights();
});

async function loadFlights() {
    const res = await fetch('/flights');
    const flights = await res.json();

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    flights.forEach(flight => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${flight.flight_code}</td>
        <td>${flight.departure_airport}</td>
        <td>${flight.arrival_airport}</td>
        <td>${formatDate(flight.departure_time)}</td>
        <td>${formatDate(flight.arrival_time)}</td>
        <td>${flight.price}</td>
        <td>${flight.available_seats}</td>
        <td>${flight.class}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editFlight('${flight.flight_code}')"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-danger" id="btn-del" onclick="deleteFlight('${flight.flight_code}')"><i class="bi bi-trash"></i></button>
        </td>
      `;
        tbody.appendChild(tr);
    });
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Bangkok'
    });
}