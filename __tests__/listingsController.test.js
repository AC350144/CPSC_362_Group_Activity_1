const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const listingsController = require('../backend/controllers/listingsController');
const Listing = require('../backend/models/Listing');

jest.mock('../backend/models/Listing');

const app = express();
app.use(express.json());

// Mock routes
app.post('/listings', listingsController.createListing);
app.get('/listings/user/:userId', listingsController.getListingsByUserId);
app.get('/listings', listingsController.getAllListings);
app.get('/listings/:id', listingsController.getListingById);
app.delete('/listings/:id', listingsController.deleteListing);
app.put('/listings/:id', listingsController.updateListing);

describe('Listings Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createListing', () => {
    it('should return 201 when listing is created', async () => {
      const mockSave = jest.fn().mockResolvedValue({});
      Listing.mockImplementation(() => ({ save: mockSave }));

      const response = await request(app)
        .post('/listings')
        .send({
          userId: new mongoose.Types.ObjectId().toString(),
          name: 'Test',
          shortDescription: 'Short',
          longDescription: 'Long',
          price: 100,
          address: '123 St',
          city: 'City',
          state: 'CA',
          country: 'USA',
          zip: '00000',
          checkin: '12:00',
          checkout: '10:00',
        });

      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid userId', async () => {
      const response = await request(app)
        .post('/listings')
        .send({ userId: '123' });

      expect(response.status).toBe(400);
    });
  });

  describe('getListingsByUserId', () => {
    it('should return listings for a user', async () => {
      Listing.find.mockResolvedValue([{ name: 'Listing1' }]);

      const userId = new mongoose.Types.ObjectId().toString();
      const response = await request(app).get(`/listings/user/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body[0].name).toBe('Listing1');
    });
  });

  describe('getAllListings', () => {
    it('should return all listings', async () => {
      Listing.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([{ name: 'Apt' }])
      });

      const response = await request(app).get('/listings');

      expect(response.status).toBe(200);
      expect(response.body[0].name).toBe('Apt');
    });
  });

  describe('getListingById', () => {
    it('should return listing if found', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      Listing.findById.mockResolvedValue({ imageUrls: ['/img.jpg'] });

      const response = await request(app).get(`/listings/${id}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 if listing not found', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      Listing.findById.mockResolvedValue(null);

      const response = await request(app).get(`/listings/${id}`);
      expect(response.status).toBe(404);
    });
  });

  describe('deleteListing', () => {
    it('should delete a listing', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      Listing.findByIdAndDelete.mockResolvedValue({});

      const response = await request(app).delete(`/listings/${id}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 if listing not found', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      Listing.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete(`/listings/${id}`);
      expect(response.status).toBe(404);
    });
  });

  describe('updateListing', () => {
    it('should update and return listing', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      Listing.findByIdAndUpdate.mockResolvedValue({ name: 'Updated' });

      const response = await request(app)
        .put(`/listings/${id}`)
        .send({ name: 'Updated', address: 'New Addr', price: 150 });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated');
    });

    it('should return 404 if listing not found', async () => {
      const id = new mongoose.Types.ObjectId().toString();
      Listing.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put(`/listings/${id}`)
        .send({ name: 'X', address: 'Y', price: 100 });

      expect(response.status).toBe(404);
    });
  });
});