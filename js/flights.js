document.getElementById('modal-content').addEventListener('submit', (e) => {
    e.preventDefault();

    const flight_code = document.getElementById('iata_code').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure_date = document.getElementById('departure_date').value;
    const arrival_date = document.getElementById('arrival_date').value;
    const aclass = document.getElementById('class').value;
    const price = document.getElementById('price').value;

    fetch('/add-flight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            flight_code,
            departure_airport: from,
            arrival_airport: to,
            departure_time: departure_date,
            arrival_time: arrival_date,
            price,
            aclass
        })
    })
        .then(res => res.json())
        .then(async data => {
            const res = await fetch(`/generate-seats/${data.results[0].id}/${data.aclass}`, {method: 'POST'})
            if(res.ok) alert('Created Flight Success!')
            else alert('Failed')
            window.location.href = '/flights.html';
        })
});


async function deleteFlight(flightCode) {
    const confirmDelete = confirm(`Are you sure you want to delete flight ${flightCode}?`);
    if (!confirmDelete) return;

    const res = await fetch(`/flights/${flightCode}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        alert("Flight deleted!");
        loadFlights();
    } else {
        const error = await res.text();
        alert("Delete failed: " + error);
    }
}

async function editFlight(flightCode) {
    const modal = new bootstrap.Modal(document.getElementById('editFlightModal'));
    modal.show();

    const res = await fetch(`/flights/${flightCode}`);
    const flight = await res.json();
    console.log((flight[0].departure_time.slice(0, 16)))

    document.getElementById('edit_flight_code').value = flight[0].flight_code;
    document.getElementById('edit_departure_date').value = flight[0].departure_time.slice(0, 16);
    document.getElementById('edit_arrival_date').value = flight[0].arrival_time.slice(0, 16);
    document.getElementById('edit_price').value = flight[0].price;

    document.getElementById('editFlightForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedFlight = {
            flight_code: document.getElementById('edit_flight_code').value,
            departure_time: document.getElementById('edit_departure_date').value,
            arrival_time: document.getElementById('edit_arrival_date').value,
            price: document.getElementById('edit_price').value,
        };

        const res = await fetch(`/flights/${flightCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFlight),
        });

        if (res.ok) {
            alert('Flight updated successfully!');
            modal.hide();
            window.location.reload();
        } else {
            alert('Failed to update flight');
        }
    });
}
