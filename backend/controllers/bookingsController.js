const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

const createBooking = async (req, res) => {
  const { listingId, checkinDate, checkoutDate } = req.body;
  const userId = req.user._id; // Assuming you're using authentication middleware

  try {
    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Create the booking
    const newBooking = new Booking({
      listingId,
      userId,
      checkinDate,
      checkoutDate,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

const cancelBooking = async (req, res) => {
    const { id } = req.params; // Booking ID to cancel
    const userId = req.user._id; // Assuming you're using authentication middleware
  
    try {
      // Find the booking by ID and ensure the user is the one who booked it
      const booking = await Booking.findOne({ _id: id, userId });
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found or not yours' });
      }
  
      // Cancel the booking
      booking.status = 'cancelled';
      await booking.save();
  
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
  };