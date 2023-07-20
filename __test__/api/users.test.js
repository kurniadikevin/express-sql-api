const request= require('supertest');
const app= require('../../app');

test('GET /users/all should return a list of all users but forbidden', async () => {
    const response = await request(app).get('/users/all');
    // Check the response status code
    expect(response.status).toBe(403);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  });
