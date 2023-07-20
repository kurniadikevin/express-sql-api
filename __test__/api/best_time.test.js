const request= require('supertest');
const app= require('../../app');

test('GET /best-time/all should return a list of all best_time', async () => {
    const response = await request(app).get('/best-time/all');
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /best-time/by-id/:bestTimeId should return best time based on best-time id', async () => {
    const response = await request(app).get('/best-time/by-id/1');
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  });

  test('GET /best-time/by-user-id/:userId should return a  best_time based on user id', async () => {
    const response = await request(app).get('/best-time/by-user-id/1');
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  });

  test('GET /best-time/top/:number should return a best_time top by number input', async () => {
    const response = await request(app).get('/best-time/top/10');
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(10);
  });

  test('GET /best-time/top/:category/:number should return a best_time top by category by number input', async () => {
    const response = await request(app).get('/best-time/top/word/10');
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  
  });

  test('GET /best-time/top/:category/:type/:number should return a best_time category and type by number input', async () => {
    const response = await request(app).get('/best-time/top/word/Medium/10');
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
   
  });