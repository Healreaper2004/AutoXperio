# AutoXperio - Garage Management System

## Overview

AutoXperio is a full-stack Garage Management System designed to streamline vehicle service operations, inventory management, customer bookings, and billing processes. The application provides secure authentication, role-based access control, and real-time management capabilities for garage owners and customers.

## Tech Stack:
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- JavaScript
- HTML/CSS

## Key Features:
- Authentication & Authorization
- Role-Based Access Control
- Service Booking Management
- Inventory Management
- Billing System

## Features

### Authentication & Authorization

* User Registration and Login
* Password Hashing using bcryptjs
* JWT-based Authentication
* Role-Based Access Control

  * Owner/Admin
  * Customer

### Service Booking Management

* Create Service Bookings
* View Booking History
* Manage Booking Status
* Track Service Requests

### Inventory Management

* Add New Parts
* Update Stock Levels
* Delete Inventory Items
* Search and Filter Inventory

### Billing System

* Generate Bills
* Service Cost Calculation
* Parts Cost Management
* Customer Invoice Tracking

### Dashboard & Analytics

* Booking Statistics
* Inventory Overview
* Revenue Insights
* Service Monitoring

## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### Frontend

* HTML5
* CSS3
* JavaScript

## Project Structure

backend/
├── models/
├── routes/
├── middleware/
├── seeders/
├── public/
├── app.js
└── package.json

Frontend/
├── HTML Pages
├── CSS Files
└── JavaScript Modules

## Installation

### Clone Repository

git clone <repository-url>

### Install Dependencies

npm install

### Configure Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### Start Server

npm start

## API Modules

### Authentication

* Register User
* Login User
* JWT Verification

### Bookings

* Create Booking
* View Bookings
* Update Booking
* Delete Booking

### Inventory

* Add Item
* Update Item
* Delete Item
* View Inventory

### Billing

* Generate Bill
* View Bills
* Update Bill Records

## Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Role-Based Authorization
* Input Validation

## Scalability Considerations

* Modular MVC Architecture
* Separate Route and Model Layers
* MongoDB-Based Data Management
* Ready for Dockerization
* Can be Extended with Redis Caching and Microservices

## Future Enhancements

* Payment Gateway Integration
* Docker Deployment
* Redis Caching
* Real-Time Notifications
* Advanced Analytics Dashboard

## Author

Ayush Arya