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
  

// Show the review form
document.getElementById('write-review-btn').addEventListener('click', () => {
    document.getElementById('review-form').style.display = 'flex';
  });
  
  // Handle new review submission
  document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('reviewer-name').value.trim();
    const rating = document.getElementById('reviewer-rating').value;
    const text = document.getElementById('review-text').value.trim();
  
    if (!name || !rating || !text) {
      alert('Please fill out all fields.');
      return;
    }
  
    const newReviewHTML = `
      <div class="review">
        <p><strong>${name}</strong> ${"⭐".repeat(rating)}</p>
        <p>"${text}"</p>
      </div>
    `;
  
    const reviewsSection = document.querySelector('.reviews');
    reviewsSection.innerHTML += newReviewHTML;
  
    // Reset form
    document.getElementById('review-form').reset();
    document.getElementById('review-form').style.display = 'none';
  });
  