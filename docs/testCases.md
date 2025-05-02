# Test Cases for Restful Booker API

---

## Test Case 1: Create a booking and retrieve it
- **Flow:** Create a new booking and after that verify that it was saved correctly.
- **Test Case Description:** 
1. Execute a POST /booking request with required payload that will contain all needed fields (firstname, lastname, totalprice, depositpaid, bookingdates (which includes checkin and checkout) and additionalneeds). Upon successful creation, a 201 response is returned with the original payload and a newly assigned booking ID. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Extract the bookingid from the response, execute a GET /booking/{bookingid} with it and that will retrieve booking with specified bookingid with status 200. Required headers for this request are:'Accept': 'application/json'.
3. Finally when it is all done compare the original payload data from the POST request with returned booking data. All fields should match exactly.

- **Endpoints:** POST /booking -> GET /booking/{id}
- **Methods:** POST, GET
- **Data:** Valid booking payload: 
{
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-10-01",
      "checkout": "2024-10-10"
    },
    "additionalneeds": "Breakfast"
}. All fields except of additionalneeds are required.
- **Expected Result:** Booking is created successfully (201) and retrieved data matches data from original payload
- **Type:** Positive
- **Smoke Test:** Yes


## Test Case 2: Create a booking and update all fields
- **Flow:** Authenticate first(because new auth token is needed for the access to the PUT), create a new booking, right after that update it with all new fields and then verify that everything was saved correctly.
- **Test Case Description:** 
1. Execute a POST /auth request with the required payload that contains valid credentials (username and password) and when authentication is executed successfully a response (token for PUT, DELETE and PATCH methods) with status 200 will be received. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Execute a POST /booking request with required payload that will contain all needed fields (firstname, lastname, totalprice, depositpaid, bookingdates (which includes checkin and checkout) and additionalneeds). Upon successful creation, a 201 response is returned with the original payload and a newly assigned booking ID. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
3. Extract the bookingid from the response and execute a PUT /booking/{bookingid} with required payload (that needs to contain all fields except for additionalneeds).When update is done successfully, response with updated booking will be retrieved with status 200. Required headers for this request are: 'Content-Type': 'application/json', 'Accept': 'application/json' and 'Cookie': 'token=authToken'.
4. Execute a GET /booking/{bookingid} with same bookingid, that will retrieve a booking with specified bookingid with status 200. Required headers for this request are:'Accept': 'application/json'.
5. Compare the updated payload data from the PUT request with returned booking data. All fields should match exactly.

- **Endpoints:** POST /auth -> POST /booking -> PUT /booking/{id} -> GET /booking/{id}
- **Methods:** POST, PUT, GET
- **Data:** Initial AUTH payload: 
{
    "username" : "admin",
    "password" : "password123"
}

Initial POST payload: 
{
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-10-01",
      "checkout": "2024-10-10"
    },
    "additionalneeds": "Breakfast"
}. All fields except of additionalneeds are required.

Updated PUT payload: 
{
    "firstname": "Toni",
    "lastname": "Kapetanovic",
    "totalprice": 200,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-06-01",
      "checkout": "2024-06-10"
    },
    "additionalneeds": "Dinner"
}. All fields except of additionalneeds are required.
- **Expected Result:** Authentication is done successfully (200), booking is created successfully (201), booking is updated successfully (200) and retrieved data matches data from updated payload
- **Type:** Positive
- **Smoke Test:** Yes

## Test Case 3: Create a booking and partially update it
- **Flow:** Authenticate first(because new auth token is needed for the access to the PUT), create a new booking, right after that update it with all new fields and then verify that everything was saved correctly.
- **Test Case Description:** 
1. Execute a POST /auth request with the required payload that contains valid credentials (username and password) and when authentication is executed successfully a response (token for PUT, DELETE and PATCH methods) with status 200 will be received. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Execute a POST /booking request with required payload that will contain all needed fields (firstname, lastname, totalprice, depositpaid, bookingdates (which includes checkin and checkout) and additionalneeds). Upon successful creation, a 201 response is returned with the original payload and a newly assigned booking ID.  Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
3. Extract the bookingid from the response and execute a PATCH /booking/{bookingid} with required payload that will contain only fields you want to be updated. When update is done successfully, response with updated booking will be retrieved with status 200. Required headers for this request are: 'Content-Type': 'application/json', 'Accept': 'application/json' and 'Cookie': 'token=authToken'.
4. Execute a GET /booking/{bookingid} with same bookingid, that will retrieve a booking with specified bookingid with status 200. Required headers for this request are:'Accept': 'application/json'.
5. Compare the updated booking data returned from the PATCH request with returned booking data from the GET request. All fields should match exactly.

- **Endpoints:** POST /auth -> POST /booking -> PATCH /booking/{id} -> GET /booking/{id}
- **Methods:** POST, PATCH, GET
- **Data:** Initial AUTH payload: 
{
    "username" : "admin",
    "password" : "password123"
}

Initial POST payload: 
{
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-10-01",
      "checkout": "2024-10-10"
    },
    "additionalneeds": "Breakfast"
}. All fields except of additionalneeds are required.

Updated PATCH payload: 
{
    "firstname": "Toni",
    "lastname": "Kapetanovic",
    "totalprice": 200,
}. 
- **Expected Result:** Authentication is done successfully (200), booking is created successfully (200), booking is updated successfully (200) and retrieved data matches data from updated payload
- **Type:** Positive
- **Smoke Test:** No


## Test Case 4: Create and delete booking
- **Flow:** Authenticate first(because new auth token is needed for the access to the DELETE), create a new booking, right after that delete it and then verify booking was actually deleted.
- **Test Case Description:** 
1. Execute a POST /auth request with the required payload that contains valid credentials (username and password) and when authentication is executed successfully a response (token for PUT, DELETE and PATCH methods) with status 200 will be received. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Execute a POST /booking request with required payload that will contain all needed fields (firstname, lastname, totalprice, depositpaid, bookingdates (which includes checkin and checkout) and additionalneeds). Upon successful creation, a 201 response is returned with the original payload and a newly assigned booking ID. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
3. Extract the bookingid from the response and execute a DELETE /booking/{bookingid}. When removal is done successfully, response will be retrieved with status 200 or 204 (No Content). Required headers for this request are:'Accept': 'application/json'.
4. Execute a GET /booking/{bookingid} with same bookingid and that will retrieve a response with status 404. Required headers for this request are:'Accept': 'application/json'.

- **Endpoints:** POST /auth -> POST /booking -> DELETE /booking/{id} -> GET /booking/{id}
- **Methods:** POST, DELETE, GET
- **Data:** Initial AUTH payload: 
{
    "username" : "admin",
    "password" : "password123"
}

Initial POST payload: 
{
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-10-01",
      "checkout": "2024-10-10"
    },
    "additionalneeds": "Breakfast"
}. All fields except of additionalneeds are required.

- **Expected Result:** Authentication is done successfully (200), booking is created successfully (201), booking is deleted successfully (200 or 204) and retrieved data matches data from updated payload
- **Type:** Positive
- **Smoke Test:** Yes

## Test Case 5: Retrieve all booking IDs
- **Flow:** Get all booking ids
- **Test Case Description:** 
1. Execute a GET /booking that will retrieve a response with an array of objects (bookings) containing just bookingid field and a status 200. Required headers for this request are:'Accept': 'application/json'.

- **Endpoints:** GET /booking
- **Methods:** GET
- **Data:** None
- **Expected Result:** Retrieved response contains an array of objects (bookings) containing just bookingid field and has a status 200
- **Type:** Positive
- **Smoke Test:** Yes

## Test Case 6: Retrieve booking by ID
- **Flow:** Get a specific booking 
- **Test Case Description:** 
1. Execute a GET /booking/{id} (with id of the booking that exists) that will retrieve a response with a specified booking and a status 200. Required headers for this request are:'Accept': 'application/json'.

- **Endpoints:** GET /booking/{id}
- **Methods:** GET
- **Data:** None
- **Expected Result:** Retrieved response contains a specified booking (with all fields) and has a status 200
- **Type:** Positive
- **Smoke Test:** Yes

## Test Case 7: Filter bookings by firstname
- **Flow:** Get a bookings that are under the first name of "Toni"
- **Test Case Description:** 
1. Execute a GET /booking?firstname=Toni that will retrieve a response with an array of bookings that are under the firstname of Toni (containing just bookingid field) and a status 200. Required headers for this request are:'Accept': 'application/json'. Required headers for this request are:'Accept': 'application/json'.
2. Go through the array of bookings, for each one of them execute GET /booking/{id} and check if all of them really have firstname field set to Toni. Required headers for this request are:'Accept': 'application/json'.

- **Endpoints:** GET /booking?firstname=Toni, GET /booking/{id}
- **Methods:** GET
- **Data:** None
- **Expected Result:** Retrieved response contains all of the bookings that have firstname field set to Toni and has a status 200
- **Type:** Positive
- **Smoke Test:** No

## Test Case 8: Create booking with missing fields
- **Flow:** Create a new booking without some of the required fields.
- **Test Case Description:** 
1. Execute a POST /booking request with required payload that will miss one or more of the required fields (firstname, lastname, totalprice, depositpaid, bookingdates (which includes checkin and checkout)). Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Response will have status 400 (Bad Request)

- **Endpoints:** POST /booking
- **Methods:** POST
- **Data:** {
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-10-01",
      "checkout": "2024-10-10"
    },
    "additionalneeds": "Breakfast"
}. In this case I excluded firstname field, but same will happen if any of the required fields is missing. 
- **Expected Result:** Retrieved response has a status 400 (Bad Request)
- **Type:** Negative
- **Smoke Test:** No

## Test Case 9: Get booking with invalid ID
- **Flow:** Get a booking with bookingid that doesn't exist.
- **Test Case Description:** 
1. Execute a GET /booking/{id} with non-existing bookingid. Required headers for this request are:'Accept': 'application/json'.
2. Response will have status 404 (Not Found)

- **Endpoints:** GET /booking/{id}
- **Methods:** GET
- **Data:** None
- **Expected Result:** Retrieved response has a status 404 (Not Found)
- **Type:** Negative
- **Smoke Test:** No

## Test Case 10: Update booking without authentication
- **Flow:** Update a booking without previously doing authentication.
- **Test Case Description:** 
1. Execute a PUT (or PATCH) /booking/{id} (with id of the booking that exists) without providing valid token. Required headers for this request are: 'Content-Type': 'application/json', 'Accept': 'application/json' and 'Cookie': 'token=invalidToken'.
2. Response will have status 403 (Forbidden)

- **Endpoints:** PUT (or PATCH) /booking/{id}
- **Methods:** PUT (or PATCH)
- **Data:** Updated PUT (or PATCH) payload: 
{
    "firstname": "Toni",
    "lastname": "Kapetanovic",
    "totalprice": 200,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-06-01",
      "checkout": "2024-06-10"
    },
    "additionalneeds": "Dinner"
}
- **Expected Result:** Retrieved response has a status 403 (Forbidden)
- **Type:** Negative
- **Smoke Test:** Yes

## Test Case 11: Delete booking with invalid token
- **Flow:** Delete a booking without previously doing authentication.
- **Test Case Description:** 
1. Execute a DELETE /booking/{id} (with id of the booking that exists) without providing valid token. Required headers for this request are: 'Cookie': 'token=invalidToken'.
2. Response will have status 403 (Forbidden)

- **Endpoints:** DELETE /booking/{id}
- **Methods:** DELETE
- **Data:** None
- **Expected Result:** Retrieved response has a status 403 (Forbidden)
- **Type:** Negative
- **Smoke Test:** No

## Test Case 12: Authenticate with valid credentials
- **Flow:** Doing authentication with valid credentials.
- **Test Case Description:** 
1. Execute a POST /auth with valid credentials. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Response will have status 200 and will contain token that is needed for PUT, DELETE and PATCH methods

- **Endpoints:** POST /auth
- **Methods:** POST
- **Data:** Initial AUTH payload: 
{
    "username" : "admin",
    "password" : "password123"
}
- **Expected Result:** Retrieved response conatins valid token and has a status 200
- **Type:** Positive
- **Smoke Test:** Yes

## Test Case 13: Authenticate with invalid credentials
- **Flow:** Doing authentication with invalid credentials.
- **Test Case Description:** 
1. Execute a POST /auth with invalid credentials. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Response will have status 401 (Unauthorized) and will contain object with field reason set to "Bad credentials".

- **Endpoints:** POST /auth
- **Methods:** POST
- **Data:** Initial AUTH payload: 
{
    "username" : "invalidUsername",
    "password" : "invalidPassword"
}
- **Expected Result:** Retrieved response conatins valid token and has a status 200
- **Type:** Negative
- **Smoke Test:** No

## Test Case 14: Send invalid HTTP method to endpoint
- **Flow:** Use wrong method on the endpoint.
- **Test Case Description:** 
1. Execute a DELETE /auth. Required headers for this request are: 'Content-Type': 'application/json', 'Accept': 'application/json' and 'Cookie': 'token=token'.
2. Response will have status 405 (Method Not Allowed).

- **Endpoints:** DELETE /auth
- **Methods:** DELETE
- **Data:** None
- **Expected Result:** Retrieved response will have status 405 (Method Not Allowed)
- **Type:** Negative
- **Smoke Test:** No

## Test Case 15: End-to-end flow: create, get, update, delete
- **Flow:** Authenticate first(because new auth token is needed for the access to the PUT and DELETE), create a new booking, right after that update it with all new fields and after all of that delete it. After each of methods check if the data is valid. 
- **Test Case Description:** 
1. Execute a POST /auth request with the required payload that contains valid credentials (username and password) and when authentication is executed successfully a response (token for PUT, DELETE and PATCH methods) with status 200 will be received. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
2. Execute a POST /booking request with required payload that will contain all needed fields (firstname, lastname, totalprice, depositpaid, bookingdates (which includes checkin and checkout) and additionalneeds). Upon successful creation, a 201 response is returned with the original payload and a newly assigned booking ID. Required headers for this request are: 'Content-Type': 'application/json' and 'Accept': 'application/json'.
3. Execute a PUT /booking/{bookingid} with required payload (that needs to contain all fields except for additionalneeds).When update is done successfully, response with updated booking will be retrieved with status 200. Required headers for this request are: 'Content-Type': 'application/json', 'Accept': 'application/json' and 'Cookie': 'token=authToken'.
4. Execute a DELETE /booking/{bookingid}. When removal is done successfully, response will be retrieved with status 200 or 204 (No Content). Required headers for this request are:'Accept': 'application/json'.
5. Execute a GET /booking/{bookingid} with same bookingid, after each one of the steps and check their responses . Required headers for this request are:'Accept': 'application/json'.

- **Endpoints:** POST /auth -> POST /booking -> GET /booking/{id} -> PUT /booking/{id} -> GET /booking/{id} -> DELETE /booking/{id} -> GET /booking/{id}
- **Methods:** POST, PUT, DELETE, GET
- **Data:** Initial AUTH payload: 
{
    "username" : "admin",
    "password" : "password123"
}

Initial POST payload: 
{
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-10-01",
      "checkout": "2024-10-10"
    },
    "additionalneeds": "Breakfast"
}. All fields except of additionalneeds are required.

Updated PUT payload: 
{
    "firstname": "Toni",
    "lastname": "Kapetanovic",
    "totalprice": 200,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2024-06-01",
      "checkout": "2024-06-10"
    },
    "additionalneeds": "Dinner"
}. All fields except of additionalneeds are required.
- **Expected Result:** Authentication is done successfully (200), booking is created successfully (201), booking is updated successfully (200) and booking is deleted successfully (200 or 204).
- **Type:** Positive
- **Smoke Test:** Yes
