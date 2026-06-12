# AutoXperio API Documentation

## Base URL

Local:
http://localhost:5000

Production:
https://autoxperio.onrender.com

---

# Authentication APIs

## Login

POST /api/auth/login

### Request

```json
{
  "email": "healreaper@example.com",
  "password": "12345678",
  "role": "owner"
}
```

### Response

```json
{
  "token": "JWT_TOKEN",
  "role": "owner",
  "email": "healreaper@example.com"
}
```

Screenshot:
docs/screenshots/Owner Login.png

---

## Customer Login

POST /api/auth/login

```json
{
  "email": "arsh@autoxperio.com",
  "password": "arsh_autoxperio123#",
  "role": "customer"
}
```

Screenshot:
docs/screenshots/Customer Login.png

---

# Inventory APIs

## Get Inventory

GET /api/inventory

Screenshot:
docs/screenshots/GET Inventory.png

---

## Create Inventory Item

POST /api/inventory

```json
{
  "name": "Brake Disc",
  "code": "BD-001",
  "category": "Brake System",
  "quantity": 25,
  "unitPrice": 55
}
```

Screenshot:
docs/screenshots/POST Inventory.png

---

## Update Inventory Item

PUT /api/inventory/:id

Screenshot:
docs/screenshots/PUT Inventory by id.png

---

## Delete Inventory Item

DELETE /api/inventory/:id

Screenshot:
docs/screenshots/DELETE Inventory by id.png

---

# Booking APIs

## Get Bookings

GET /api/bookings

Screenshot:
docs/screenshots/GET Booking.png

---

## Booking Statistics

GET /api/bookings/stats

Screenshot:
docs/screenshots/GET Booking Stats.png

---

## Create Booking

POST /api/bookings

```json
{
  "vehicleNumber": "BR01AB1234",
  "serviceType": "Oil Change",
  "preferredDate": "2026-06-20",
  "preferredTime": "10:00 AM",
  "issueDescription": "Routine maintenance"
}
```

Screenshot:
docs/screenshots/POST Booking.png

---

## Update Booking Status

PATCH /api/bookings/:id/status

```json
{
  "status": "Completed"
}
```

Screenshot:
docs/screenshots/PATCH Booking Status.png

---

# Billing APIs

## Get Bills

GET /api/billing

Screenshot:
docs/screenshots/GET Billing.png

---

## Create Bill

POST /api/billing

Screenshot:
docs/screenshots/POST Billing.png

---

# Security

* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Role-Based Access Control

# Database

MongoDB Atlas

# Architecture

MVC Pattern

* Models
* Routes
* Middleware
* Frontend
