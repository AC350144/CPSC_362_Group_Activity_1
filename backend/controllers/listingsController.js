const Listing = require('../models/Listing');

const createListing = async (req, res) => {
  const { 
    name, 
    shortDescription, 
    longDescription, 
    price, 
    location, 
    address, 
    city, 
    state, 
    country, 
    zip, 
    imageUrls
  } = req.body;

  try {
    const newListing = new Listing({
      name,
      shortDescription, 
      longDescription,
      price,
      location,
      address,
      city,
      state,
      country,
      zip,
      imageUrls
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: 'Error creating listing', error });
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

module.exports = { createListing, getAllListings };