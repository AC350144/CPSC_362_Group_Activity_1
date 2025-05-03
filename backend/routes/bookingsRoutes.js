const express = require('express');
const router = express.Router();
const { createBooking, cancelBooking } = require('../controllers/bookingsController');

router.post('/', createBooking);
router.delete('/:id', cancelBooking);

module.exports = router;