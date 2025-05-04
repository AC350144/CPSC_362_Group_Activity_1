const request = require('supertest');
const express = require('express');
const bookingsController = require('../backend/controllers/bookingsController');
const Booking = require('../backend/models/Bookings');
const Listing = require('../backend/models/Listing');

jest.mock('../backend/models/Bookings');
jest.mock('../backend/models/Listing');

const app = express();
app.use(express.json());

// Mock routes
app.post('/bookings', bookingsController.createBooking);
app.delete('/bookings/:id', bookingsController.cancelBooking);
app.get('/bookings/user/:userId', bookingsController.getBookingsByUser);

describe('Bookings Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /bookings (createBooking)', () => {
    it('should create a booking successfully', async () => {
      Booking.prototype.save = jest.fn().mockResolvedValue();

      const res = await request(app).post('/bookings').send({
        userId: 'user123',
        listingId: 'listing123',
        checkinDate: '2025-06-01',
        checkoutDate: '2025-06-05',
        guests: 2
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: 'Booking successful' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/bookings').send({
        userId: 'user123'
        // Missing listingId, checkinDate, checkoutDate, guests
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: 'Missing required fields' });
    });

    it('should return 500 on server error', async () => {
      Booking.prototype.save = jest.fn().mockRejectedValue(new Error('DB error'));

      const res = await request(app).post('/bookings').send({
        userId: 'user123',
        listingId: 'listing123',
        checkinDate: '2025-06-01',
        checkoutDate: '2025-06-05',
        guests: 2
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: 'Server error' });
    });
  });

  describe('DELETE /bookings/:id (cancelBooking)', () => {
    it('should cancel a booking successfully', async () => {
      Booking.findById.mockResolvedValue({ _id: 'booking123' });
      Booking.findByIdAndDelete.mockResolvedValue();

      const res = await request(app).delete('/bookings/booking123');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Booking cancelled successfully' });
    });

    it('should return 404 if booking not found', async () => {
      Booking.findById.mockResolvedValue(null);

      const res = await request(app).delete('/bookings/booking123');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Booking not found' });
    });

    it('should return 500 on error', async () => {
      Booking.findById.mockRejectedValue(new Error('DB error'));

      const res = await request(app).delete('/bookings/booking123');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error cancelling booking');
    });
  });

  describe('GET /bookings/user/:userId (getBookingsByUser)', () => {
    it('should return bookings with listing names', async () => {
      Booking.find.mockResolvedValue([
        {
          _id: 'b1',
          userId: 'user123',
          listingId: 'listing123',
          toObject: function () {
            return {
              _id: 'b1',
              userId: 'user123',
              listingId: 'listing123',
            };
          }
        }
      ]);

      Listing.findById.mockResolvedValue({ name: 'Test Listing' });

      const res = await request(app).get('/bookings/user/user123');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        {
          _id: 'b1',
          userId: 'user123',
          listingId: 'listing123',
          listingName: 'Test Listing'
        }
      ]);
    });

    it('should use "Unknown Listing" if listing not found', async () => {
      Booking.find.mockResolvedValue([
        {
          _id: 'b2',
          userId: 'user123',
          listingId: 'nonexistent',
          toObject: function () {
            return {
              _id: 'b2',
              userId: 'user123',
              listingId: 'nonexistent',
            };
          }
        }
      ]);

      Listing.findById.mockResolvedValue(null);

      const res = await request(app).get('/bookings/user/user123');

      expect(res.statusCode).toBe(200);
      expect(res.body[0].listingName).toBe('Unknown Listing');
    });

    it('should return 500 on error', async () => {
      Booking.find.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/bookings/user/user123');

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: 'Error fetching bookings' });
    });
  });
});