window.onload = async () => {
    const booking = JSON.parse(localStorage.getItem('booking_info'));
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');

    const res = await fetch('/airports');
    const airports = await res.json();

    fromSelect.innerHTML = '<option disabled value="">Select...</option>';
    toSelect.innerHTML = '<option disabled value="">Select...</option>';

    airports.forEach((airport) => {
        const fromOption = document.createElement('option');
        fromOption.value = airport.iata_code;
        fromOption.textContent = `${airport.name} (${airport.iata_code})`;

        const toOption = document.createElement('option');
        toOption.value = airport.iata_code;
        toOption.textContent = `${airport.name} (${airport.iata_code})`;

        fromSelect.appendChild(fromOption);
        toSelect.appendChild(toOption);
    });

    if (booking) {
        fromSelect.value = booking.from || '';
        toSelect.value = booking.to || '';
        const dateInput = document.getElementById('departure_date');
        dateInput.value = booking.departure_date || '';
    }
};

document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page refresh

    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure_date = document.getElementById('departure_date').value;

    try {
        const response = await fetch(`/search?from=${from}&to=${to}&departure_date=${departure_date}`);
        const flights = await response.json();

        renderResults(flights);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerHTML = `<p style="color:red;">Error fetching data</p>`;
    }
});

function renderResults(flights) {
    const resultsContainer = document.getElementById('results');
    if (flights.length === 0) {
        resultsContainer.innerHTML = `<p class="no-results">No flights found for your search</p>`;
        return;
    }

    resultsContainer.innerHTML = flights.map(flight => `
      <div class="search-result-card">
        <div>
        <h4><span id="flight">Flight: </span>${flight.flight_code} <span id="cname" class="${flight.class === 'Economy' ? 'eco' : (flights.class === 'Business' ? 'busi' : 'fclass')}">(${flight.class})</span></h4>
        <p><strong>${flight.departure_airport}</strong> ➡️ <strong>${flight.arrival_airport}</strong></p>
        <p><span id="departureTime">Departure Time: </span>${formatDate(flight.departure_time)}</p>
        <p><span id="arrivalTime">Arrival Time: </span>${formatDate(flight.arrival_time)}</p>
        </div>
        <div style="display: flex; flex-direction: column; ">
        <p><span id="price">Price: </span><strong>$${flight.price}</strong></p>
        <button class="select-btn" onclick="selectFlight('${flight.flight_code}')" id="selectFlight">Select Flight</button>
        </div>
        </div>
    `).join('');
    changeLanguageSearch()
}

function selectFlight(flightCode) {
    console.log(`Flight ${flightCode} selected.`);
    localStorage.setItem('selected_flight', flightCode);
    window.location.href = '/booking.html'
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


