const request= require('supertest');
const app= require('../../app');

const bearerToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoic2VjcmV0In0sImlhdCI6MTY4OTg1NDA4NX0._PCK9i5ctIaMyP5qA4iOjFIhS9Y1xPlPFwoG-lWLNjg'

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

  // CREATE
  test('POST /best-time/create create new best time', async () => {
    const sampleData={
      "user_id" : 101,
      "category" : "time",
      "type" : "60",
      "wpm" : 80
  }
    const response = await request(app)
    .post('/best-time/create')
    .set('Authorization', `Bearer ${bearerToken}`)
    .send(sampleData)
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  },10000);

  // UPDATE
  test('POST /best-time/update/:bestTimeId update best time by bestTimeId', async () => {
    const sampleData={
      "wpm" : 121
  }
  const bestTimeId= 2
    const response = await request(app)
    .post(`/best-time/update/${bestTimeId}`)
    .set('Authorization', `Bearer ${bearerToken}`)
    .send(sampleData)
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  },10000);

  // DELETE
  test('POST /best-time/delete/:bestTimeId update best time by bestTimeId', async () => {
  const bestTimeId= 2
    const response = await request(app)
    .post(`/best-time/delete/${bestTimeId}`)
    .set('Authorization', `Bearer ${bearerToken}`)
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  },10000);




