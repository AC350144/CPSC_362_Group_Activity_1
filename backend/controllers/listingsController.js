const Listing = require('../models/Listing');

const createListing = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const {
      name,
      shortDescription,
      longDescription,
      price,
      address,
      city,
      state,
      country,
      zip,
      checkin,
      checkout,
    } = req.body;

    const newListing = new Listing({
      name,
      shortDescription,
      longDescription,
      price,
      address,
      city,
      state,
      country,
      zip,
      checkin,
      checkout,
      imageUrls,
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Listing creation error:', error);
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
};

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error });
  }
};

const deleteListing = async (req, res) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Listing not found');
    res.send('Listing deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createListing,
  getAllListings,
  deleteListing
};
