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
                <div class="booking-status ${ticket.payment_status.toLowerCase() === 'completed' ? 'status-confirmed' : 'status-pending'}"><p id="${ticket.payment_status.toLowerCase() === 'completed' ? 'confirm' : 'pending'}">${ticket.payment_status.toLowerCase() === 'completed' ? 'Confirmed' : 'Pending'}</p></div>
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
                <div class="booking-detail" id="pay" style="${ticket.payment_status.toLowerCase() === 'completed' ? 'display:none;' : 'display:block;'} margin-bottom: 0">
                    <span style="display: block; margin: 10px 0 5px 0; background-color:rgb(235, 235, 235); height: 1px; width: 100%;"></span>

                    <div style="display:flex; align-items: center; gap: 7px; margin-top: 12px">
                        <p id="scanqr" style="font-size: 14px">Scan QR Code: </p>
                        <button class="detail-value" id="getqr" onclick="showQRCodeAlert(${ticket.id})">get qr code</button>
                    </div>
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

function showQRCodeAlert(id) {
    const qrData = `${window.location.origin}/payments-redirect/${id}`;

    
    QRCode.toDataURL(qrData, function (err, url) {
        if (err) {
            console.error(err);
            return;
        }

        Swal.fire({
            title: 'Scan QR Code to make payment',
            imageUrl: url,
            imageAlt: 'QR Code',
            showCancelButton: true,
            confirmButtonText: 'Comfirm',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            preConfirm: function () {
                return fetch(`/payments-confirmed/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data[0].status === 'COMPLETED') {
                            alert('Payment Successful!');
                            window.location.href = '/mybooking.html'
                        }
                        else {
                            Swal.showValidationMessage('Payment Failed, Please Scan QR Code to make payment')
                        }
                    })
                    .catch(error => {
                        Swal.showValidationMessage('Payment Failed');
                    });
            }
        });
    });
}