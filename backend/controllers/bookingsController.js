const Booking = require('../models/Bookings');
const Listing = require('../models/Listing');

exports.createBooking = async (req, res) => {
  const { listingId, checkinDate, checkoutDate } = req.body;
  const userId = req.user._id;

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

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

exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
  
    try {
      const booking = await Booking.findOne({ _id: id, userId });
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found or not yours' });
      }
  
      booking.status = 'cancelled';
      await booking.save();
  
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
  };