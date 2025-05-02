const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createListing, getAllListings } = require('../controllers/listingsController');

router.post('/', upload.array('images', 5), createListing);
router.get('/', getAllListings);

module.exports = router;