const form = document.getElementById('rentalForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  form.style.display = 'none';
  confirmation.style.display = 'block';
});

const addDateBtn = document.querySelector('.add-date-btn');
const dateContainer = document.getElementById('unavailableDatesContainer');
const dateCount = document.getElementById('dateCount');

function updateDateCount() {
  const totalDates = dateContainer.querySelectorAll('input[type="date"]').length;
  dateCount.textContent = `(${totalDates} date${totalDates !== 1 ? 's' : ''} selected)`;
}

// Setup: if first input is "fake", turn it into real on click
const fakeDate = document.querySelector('.fake-date');
fakeDate.addEventListener('focus', function () {
  this.type = 'date';            // Switch to real date picker
  this.placeholder = '';         // Clear placeholder
  this.classList.remove('fake-date'); // Remove special class
  updateDateCount();             // Update count
});

addDateBtn.addEventListener('click', () => {
  const newDateInput = document.createElement('input');
  newDateInput.type = 'date';
  newDateInput.name = 'unavailableDates[]';
  newDateInput.style.display = 'block';
  newDateInput.style.marginBottom = '10px';
  newDateInput.addEventListener('change', updateDateCount);
  dateContainer.appendChild(newDateInput);
  updateDateCount();
});

// Update count on load
updateDateCount();
