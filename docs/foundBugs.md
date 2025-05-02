# Bug Report – RESTful Booker API

## Bug #1: PATCH update fails when updating only one date field

**Severity:** High  
**Environment:** https://restful-booker.herokuapp.com  
**Date found:** 2025-05-02  
**Status:** Open

### Steps to Reproduce:
1. Create a valid booking
2. Send a PATCH request to /booking/{id} with only the checkin or checkout date updated

Example payload:
```json
{
  "bookingdates": {
    "checkin": "2024-06-01"
  }
}
```
**Expected Result:** Only the provided field (checkin) is updated and the other date remains unchanged
**Actual Result:** bookingdates: { checkin: '2024-06-01', checkout: '0NaN-aN-aN' }

## Bug #2: Booking creation returns 200 instead of 201

**Severity:** High  
**Environment:** https://restful-booker.herokuapp.com  
**Date found:** 2025-05-02  
**Status:** Open

### Steps to Reproduce:
1. Send a POST /booking request with valid payload

**Expected Result:** Response status: 201 (Created)
**Actual Result:** Response status: 200 (OK)

## Bug #3: Deletion returns 201 Created instead of 200 OK or 204 No Content

**Severity:** High  
**Environment:** https://restful-booker.herokuapp.com  
**Date found:** 2025-05-02  
**Status:** Open

### Steps to Reproduce:
1. Authenticate and delete an existing booking using DELETE /booking/{id}

**Expected Result:** 200 (OK) or 204 (No Content)
**Actual Result:** 201 (Created) and body as well will contain "Created"

## Bug #4: Missing required fields during creation returns 500 instead of 400

**Severity:** High  
**Environment:** https://restful-booker.herokuapp.com  
**Date found:** 2025-05-02  
**Status:** Open

### Steps to Reproduce:
1. Send a POST /booking request with one or more required fields missing

Example payload:
```json
{
  "firstname": "Toni"
}
```
**Expected Result:** Response status: 400 (Bad Request)
**Actual Result:** Response status: 500 (Internal Server Error)

## Bug #5: Invalid credentials return 200 OK instead of 401 Unauthorized

**Severity:** High  
**Environment:** https://restful-booker.herokuapp.com  
**Date found:** 2025-05-02  
**Status:** Open

### Steps to Reproduce:
1. Send a POST /auth request with incorrect credentials

Example payload:
```json
{
  "username": "wrong",
  "password": "wrong"
}
```
**Expected Result:** Response status: 401 (Unauthorized) and body contains reason for failure
**Actual Result:** Response status: 200 (OK). Body contains failure reason, but status code is misleading

## Bug #6: Authentication possible without required headers

**Severity:** Low 
**Environment:** https://restful-booker.herokuapp.com  
**Date found:** 2025-05-02  
**Status:** Open

### Steps to Reproduce:
1. Send a POST /auth request with valid payload, without setting Content-Type or Accept headers

**Expected Result:** Authentication should fail or return error
**Actual Result:** Authentication succeeds, token is returned

