const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('../backend/routes/authRoutes.js');
const app = require('../backend/server');
const authController = require('../backend/controllers/authController'); 
const User = require('../backend/models/User');
const bcrypt = require('bcrypt');

jest.mock('../backend/models/User');
jest.mock('bcrypt');

app.use(express.json());
app.use('/', authRoutes);

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /login', () => {
    it('should login successfully with correct credentials', async () => {
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const res = await request(app).post('/login').send({
        username: 'testuser',
        password: 'password123'
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ userId: mockUser._id });
    });

    it('should return 400 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post('/login').send({
        username: 'unknownuser',
        password: 'password123'
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: 'User not found!' });
    });

    it('should return 400 if password is incorrect', async () => {
      const mockUser = { password: 'hashedpassword' };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app).post('/login').send({
        username: 'testuser',
        password: 'wrongpassword'
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: 'Invalid password!' });
    });

    it('should return 500 on server error', async () => {
      User.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app).post('/login').send({
        username: 'testuser',
        password: 'password123'
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: 'Server error' });
    });
  });

  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedpassword');
      User.prototype.save = jest.fn().mockResolvedValue();

      const res = await request(app).post('/register').send({
        username: 'newuser',
        email: 'new@example.com',
        password: 'newpassword'
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: 'User registered successfully!' });
    });

    it('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({ username: 'existinguser' });

      const res = await request(app).post('/register').send({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'password123'
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: 'User already exists!' });
    });

    it('should return 500 on server error during registration', async () => {
      User.findOne.mockRejectedValue(new Error('DB error'));

      const res = await request(app).post('/register').send({
        username: 'erroruser',
        email: 'error@example.com',
        password: 'password123'
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: 'Server error' });
    });
  });
});