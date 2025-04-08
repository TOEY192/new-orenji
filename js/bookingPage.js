let selectedSeats = [];
let detail;

window.onload = async () => {
    const flight_code = localStorage.getItem('selected_flight');
    const header = document.getElementById('flight');
    const info = document.getElementById('info');
    header.innerHTML = '';
    info.innerHTML = '';

    try {
        const res = await fetch(`/flights/${flight_code}`);
        detail = await res.json();
        console.log(detail)
        header.innerHTML = `Flight code : ${detail[0].flight_code}`;
        info.innerHTML = `Details : ${detail[0].departure_airport} to ${detail[0].arrival_airport}, ${formatDate(detail[0].departure_time)} to ${formatDate(detail[0].arrival_time)}`;

        const response = await fetch(`/seats/${detail[0].id}`);
        const seats = await response.json();
        console.log(seats)
        renderSeats(seats)

    } catch (err) {
        console.error('Failed to load airports:', err);
        fromSelect.innerHTML = '<option disabled>Error loading airports</option>';
        toSelect.innerHTML = '<option disabled>Error loading airports</option>';
    }
};

function renderSeats(seats) {
    const seats_container = document.getElementById('seats');
    const seatPrice = detail[0].price;
    if (seats.length === 0) {
        seats_container.innerHTML = `<p class="no-results">No seats found for your flight</p>`;
        return;
    }

    seats_container.innerHTML = seats.map(seat => {
        const seatClassStyle = seat.is_booked === 1 ? 'background-color: rgb(245, 245, 245);' : 'background-color: rgb(255, 142, 142)';
        const disabledAttribute = seat.is_booked === 1 ? 'disabled' : '';

        return `
            <button 
                id="seat-${seat.seat_number}"
                style="${seatClassStyle}" 
                class="flex-item" 
                onclick="toggleSeatSelection('${seat.seat_number}', ${seat.is_booked === 1 ? 'true' : 'false'})"
                ${disabledAttribute}>
                ${seat.seat_number}
            </button>
        `;
    }).join('');

    document.getElementById('totalPrice').innerHTML = `Total price: ${selectedSeats.length * seatPrice}`;
}

function toggleSeatSelection(seatNumber, isBooked) {
    if (isBooked) {
        alert('This seat is already booked.');
        return;
    }

    const seatButton = document.getElementById(`seat-${seatNumber}`);

    const index = selectedSeats.indexOf(seatNumber);
    if (index === -1) {
        selectedSeats.push(seatNumber);
        seatButton.style.backgroundColor = 'rgb(137, 241, 163)';
    } else {
        selectedSeats.splice(index, 1);
        seatButton.style.backgroundColor = 'rgb(255, 142, 142)';
    }

    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const seatPrice = detail[0].price;
    totalPriceElement.innerHTML = `Total price: ${selectedSeats.length * seatPrice}`;
}

document.getElementById('btn-confirm').addEventListener('click', async (e) => {
    e.preventDefault();
    showQRCodeAlert(1);
    // const res = await fetch('booking', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         flight_id: detail[0].id,
    //         seat: selectedSeats
    //     })
    // })

    // if (res.ok) alert('Comfirm Booking')
    // else alert('Failed Booking')

    // const booking_id = await res.json();
    // console.log(booking_id.booking)
    // const response = await fetch('/payments', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         booking_id: booking_id.booking,
    //         amount: selectedSeats.length * detail[0].price,
    //         payment_method: 'BANK_TRANSFER'
    //     })
    // })
    // if (response.ok) {
    //     alert('Created payment')
    //     showQRCodeAlert(booking_id.booking);
    // }
    // else alert('Failed Created payment')

})

function showQRCodeAlert(id) {
    const qrData = `${window.location.origin}/payments-redirect/${id}`;  // ตัวอย่าง URL สำหรับ QR Code

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
        cancelButtonText: 'Close',
        confirmButtonText: 'Comfirm',
        confirmButtonColor: '#3085d6',
        preConfirm: function () {
            return fetch(`/payments-confirmed/${id}`)
                .then(response => response.json())
                .then(data => {
                    if(data[0].status === 'COMPLETED') {
                        alert('Payment Successful!');
                        window.close()
                        window.location.href = '/mybooking.html'
                    }
                    else {
                        alert('Payment Failed, Please Scan QR Code to make payment')
                    }
                })
                .catch(error => {
                    alert('Payment Failed');
                });
        }
      });
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

