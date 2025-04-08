window.onload = async () => {
    const token = window.localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const user_id = decodedToken.id;

    const res = await fetch(`/ticket/${user_id}`)
    const tickets = await res.json();

    const c1 = document.getElementById('current1');
    c1.innerHTML = '';


    c1.innerHTML = tickets.map(ticket => `
        <div class="booking-card">
            <div class="booking-header">
                <div class="booking-title">${ticket.flight_code} (${ticket.seat_class})</div>
                <div class="booking-status status-confirmed">Confirmed</div>
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <div class="detail-label">Departure time</div>
                    <div class="detail-value">${formatDate(ticket.departure_time)}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label">Arrival time</div>
                    <div class="detail-value">${formatDate(ticket.arrival_time)}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label">Seat number</div>
                    <div class="detail-value">${ticket.seat_number}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label">Total Amount</div>
                    <div class="detail-value">$${ticket.payment_amount}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label">Payment Status</div>
                    <div class="detail-value">${ticket.payment_status.toLowerCase()}</div>
                </div>
            </div>
        </div>
        `)
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