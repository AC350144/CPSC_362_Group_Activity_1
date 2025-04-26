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

// Add new date input and update count
addDateBtn.addEventListener('click', () => {
  const newDateInput = document.createElement('input');
  newDateInput.type = 'date';
  newDateInput.name = 'unavailableDates[]';
  newDateInput.addEventListener('change', updateDateCount);
  dateContainer.appendChild(newDateInput);
  updateDateCount();
});

// Update count on initial load
updateDateCount();
