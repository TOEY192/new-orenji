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
                <div class="booking-title">${ticket.flight_code} <span id="cname" class="${ticket.seat_class === 'Economy' ? 'eco' : (ticket.seat_class === 'Business' ? 'busi' : 'fclass')}">(${ticket.seat_class})</span></div>
                <div class="booking-status status-confirmed"><p id="confirm">Confirmed</p></div>
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <div class="detail-label"><p id="departureTime">Departure time</p></div>
                    <div class="detail-value">${formatDate(ticket.departure_time)}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label"><p id="arrivalTime">Arrival time</p></div>
                    <div class="detail-value">${formatDate(ticket.arrival_time)}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label"><p id="seat">Seat number</p></div>
                    <div class="detail-value">${ticket.seat_number}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label"><p id="price">Price</p></div>
                    <div class="detail-value">$${ticket.payment_amount}</div>
                </div>
                <div class="booking-detail">
                    <div class="detail-label"><p id="payment">Payment Status</p></div>
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