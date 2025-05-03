const Booking = require('../models/Bookings');
const Listing = require('../models/Listing');

exports.createBooking = async (req, res) => {
    const { userId, listingId, checkinDate, checkoutDate, guests } = req.body;
  
    try {
      if (!userId || !listingId || !checkinDate || !checkoutDate || !guests) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newBooking = new Booking({
        userId,
        listingId,
        checkinDate: new Date(checkinDate),
        checkoutDate: new Date(checkoutDate),
        guests,
      });
  
      await newBooking.save();
      res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Server error' });
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