const express = require('express');
const router = express.Router();
const { createListing, getAllListings } = require('../controllers/listingsController');

router.post('/', createListing);
router.get('/', getAllListings);

module.exports = router;