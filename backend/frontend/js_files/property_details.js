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

    const addReviewArea = document.querySelector('.add-review-area');
    const reviewElement = document.createRange().createContextualFragment(newReviewHTML);

    // Insert the review **before** the "add review area" (but only once)
    addReviewArea.parentNode.insertBefore(reviewElement, addReviewArea);

    // Reset form and hide it
    document.getElementById('review-form').reset();
    document.getElementById('review-form').style.display = 'none';
  });