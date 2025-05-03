const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const { createListing, getAllListings, deleteListing } = require('../controllers/listingsController');

router.post('/', upload.array('images', 5), createListing);
router.get('/', getAllListings);
router.delete('/:id', deleteListing);

module.exports = router;
