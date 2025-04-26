// Booking button behavior

document.getElementById('reserve-btn').addEventListener('click', () => {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
  
    if (!checkin || !checkout || !guests) {
      alert('Please fill out all fields.');
      return;
    }
  
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = `
      <h3>Reservation Summary</h3>
      <p><strong>Check-in:</strong> ${checkin}</p>
      <p><strong>Check-out:</strong> ${checkout}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Total:</strong> $${250 * (calculateNights(checkin, checkout))} (at $250/night)</p>
    `;
  });
  
  function calculateNights(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  }
  