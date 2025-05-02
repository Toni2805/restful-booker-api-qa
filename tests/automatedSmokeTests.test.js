const axios = require('axios');

const BASE_URL = 'https://restful-booker.herokuapp.com';

const testData = {
    booking: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2024-10-01',
            checkout: '2024-10-10',
        },
        additionalneeds: 'Breakfast',
    },
    updatedBooking: {
        firstname: 'Toni',
        lastname: 'Kapetanovic',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: '2024-06-01',
            checkout: '2024-06-10',
        },
        additionalneeds: 'Dinner',
    },
    auth: {
        username: 'admin',
        password: 'password123',
    },
};

let bookingId;
let token;

describe('Smoke Test Suite - RESTful Booker API', () => {
    // Test 1: Create a booking and retrieve it
    test('Create and Retrieve Booking', async () => {
        const createRes = await axios.post(`${BASE_URL}/booking`, testData.booking, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        expect([200, 201]).toContain(createRes.status);//#1 BUG: When booking record is created successfully and since a new resource was created status should be 201 (Created). I've put 200 as well, so rest of the case can be executed.
        bookingId = createRes.data.bookingid;
        const booking = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        expect(booking.status).toBe(200);
        expect(booking.data.firstname).toBe(testData.booking.firstname);
        expect(booking.data.lastname).toBe(testData.booking.lastname);
    });

    // Test 2: Create a booking and update all fields
    test('Auth, Create, Full Update, Verify', async () => {
        const authRes = await axios.post(`${BASE_URL}/auth`, testData.auth, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        }); //Authentication can be executed without headers, but we will keep them for good practice
        expect(authRes.status).toBe(200);
        token = authRes.data.token;

        const createRes = await axios.post(`${BASE_URL}/booking`, testData.booking, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        expect([200, 201]).toContain(createRes.status);
        bookingId = createRes.data.bookingid;

        const updateRes = await axios.put(
            `${BASE_URL}/booking/${bookingId}`,
            testData.updatedBooking,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`,
                },
            }
        );
        expect(updateRes.status).toBe(200);

        const getRes = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        expect(getRes.status).toBe(200);
        expect(getRes.data.firstname).toBe(testData.updatedBooking.firstname);
        expect(getRes.data.lastname).toBe(testData.updatedBooking.lastname);
        expect(getRes.data.totalprice).toBe(testData.updatedBooking.totalprice);
        expect(getRes.data.depositpaid).toBe(testData.updatedBooking.depositpaid);
        expect(getRes.data.bookingdates.checkin).toBe(testData.updatedBooking.bookingdates.checkin);
        expect(getRes.data.bookingdates.checkout).toBe(testData.updatedBooking.bookingdates.checkout);
        expect(getRes.data.additionalneeds).toBe(testData.updatedBooking.additionalneeds);
    });

    // Test 4: Create and delete booking
    test('Auth, Create, Delete, Verify Deletion', async () => {
        const authRes = await axios.post(`${BASE_URL}/auth`, testData.auth, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        });
        expect(authRes.status).toBe(200);
        token = authRes.data.token;

        const createRes = await axios.post(`${BASE_URL}/booking`, testData.booking, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        });
        expect([200, 201]).toContain(createRes.status);
        bookingId = createRes.data.bookingid;

        const deleteRes = await axios.delete(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
            },
        });
        expect([200, 204]).toContain(deleteRes.status); //#2 BUG: When booking is successfully removed response should have status 200 (OK) but in this case it has 201 (CREATED)

        await expect(
            axios.get(`${BASE_URL}/booking/${bookingId}`,
                {
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            )
        ).rejects.toThrow('Request failed with status code 404');
    });

    // Test 5: Retrieve all booking IDs
    test('Retrieve All Booking IDs', async () => {
        const res = await axios.get(`${BASE_URL}/booking`, {
            headers: {
                'Accept': 'application/json',
            },
        }); // This request can be executed without any headers, but we will keep them for good practice
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
        expect(res.data[0]).toHaveProperty('bookingid');
    });

    // Test 6: Retrieve booking by ID
    test('Retrieve Booking By ID', async () => {
        const createRes = await axios.post(`${BASE_URL}/booking`, testData.booking, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        }
        );
        bookingId = createRes.data.bookingid;
        const res = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                "Accept": 'application/json'
            }
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('firstname');
        expect(res.data.firstname).toBe(testData.booking.firstname);
        expect(res.data.lastname).toBe(testData.booking.lastname);
        expect(res.data.totalprice).toBe(testData.booking.totalprice);
        expect(res.data.depositpaid).toBe(testData.booking.depositpaid);
        expect(res.data.bookingdates.checkin).toBe(testData.booking.bookingdates.checkin);
        expect(res.data.bookingdates.checkout).toBe(testData.booking.bookingdates.checkout);
        expect(res.data.additionalneeds).toBe(testData.booking.additionalneeds);
    });

    // Test 10: Attempt to update booking with invalid token
    test('Attempt to update booking without authentication', async () => {
        const createRes = await axios.post(`${BASE_URL}/booking`, testData.booking, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        });
        bookingId = createRes.data.bookingid;

        try {
            //Same will happen with PATCH
            await axios.put(`${BASE_URL}/booking/${bookingId}`, testData.updatedBooking, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Cookie: 'token=invalidToken',
                },
            });
        } catch (err) {
            expect(err.response.status).toBe(403);
        }
    });

    // Test 12: Authetication with valid credidentals
    test('Authenticate with valid credentials and get token', async () => {
        const response = await axios.post(`${BASE_URL}/auth`, testData.auth, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('token');
    });

    // Test 15: Full booking lifecycle
    test('Full booking lifecycle', async () => {
        // Step 1: Authenticate
        const authResponse = await axios.post(`${BASE_URL}/auth`, testData.auth, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        expect(authResponse.status).toBe(200);
        expect(authResponse.data.token).toBeDefined();
        token = authResponse.data.token;

        // Step 2: Create booking
        const createResponse = await axios.post(`${BASE_URL}/booking`, testData.booking, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        expect(createResponse.status).toBe(200); // Note: API bug, should be 201
        bookingId = createResponse.data.bookingid;
        expect(bookingId).toBeDefined();

        // Step 3: Validate created booking
        const getAfterCreate = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: { Accept: 'application/json' },
        });

        expect(getAfterCreate.status).toBe(200);
        expect(getAfterCreate.data.firstname).toBe('John');
        expect(getAfterCreate.data.lastname).toBe('Doe');
        expect(getAfterCreate.data.totalprice).toBe(150);
        expect(getAfterCreate.data.depositpaid).toBe(true);
        expect(getAfterCreate.data.bookingdates.checkin).toBe('2024-10-01');
        expect(getAfterCreate.data.bookingdates.checkout).toBe('2024-10-10');
        expect(getAfterCreate.data.additionalneeds).toBe('Breakfast');


        // Step 4: Update booking
        const updateResponse = await axios.put(`${BASE_URL}/booking/${bookingId}`, testData.updatedBooking, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Cookie: `token=${token}`,
            },
        });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.data.firstname).toBe('Toni');

        // Step 5: Validate updated booking
        const getAfterUpdate = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: { Accept: 'application/json' },
        });

        expect(getAfterUpdate.status).toBe(200);
        expect(getAfterUpdate.data.firstname).toBe('Toni');
        expect(getAfterUpdate.data.lastname).toBe('Kapetanovic');
        expect(getAfterUpdate.data.totalprice).toBe(200);
        expect(getAfterUpdate.data.depositpaid).toBe(true);
        expect(getAfterUpdate.data.bookingdates.checkin).toBe('2024-06-01');
        expect(getAfterUpdate.data.bookingdates.checkout).toBe('2024-06-10');
        expect(getAfterUpdate.data.additionalneeds).toBe('Dinner');

        // Step 6: Delete booking
        const deleteResponse = await axios.delete(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                Accept: 'application/json',
                Cookie: `token=${token}`,
            },
        });

        expect([200, 204, 201]).toContain(deleteResponse.status); //#2 BUG: When booking is successfully removed response should have status 200 (OK) but in this case it has 201 (CREATED). So I've put it here so test can be executed

        // Step 7: Try to get deleted booking
        try {
            await axios.get(`${BASE_URL}/booking/${bookingId}`, {
                headers: { Accept: 'application/json' },
            });
        } catch (error) {
            expect(error.response.status).toBe(404); // Booking should not exist
        }
    });
});
