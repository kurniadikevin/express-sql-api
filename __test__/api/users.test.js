const request= require('supertest');
const app= require('../../app');

const bearerToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoic2VjcmV0In0sImlhdCI6MTY4OTg1NDA4NX0._PCK9i5ctIaMyP5qA4iOjFIhS9Y1xPlPFwoG-lWLNjg'

test('GET /users/all should return a list of all users name and id', async () => {
    const response = await request(app)
    .get('/users/all')
    .set('Authorization', `Bearer ${bearerToken}`);
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  });

  test('GET /users/by-id/:userId should return a user info for specific id', async () => {
    const userId=1
    const response = await request(app)
    .get(`/users/by-id/${userId}`)
    .set('Authorization', `Bearer ${bearerToken}`);
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  });

  //LOGIN USER
  test('POST /users/login', async () => {
    const userData={
      "name" : "hashguy",
      "password" : "secret"
  }
    const response = await request(app)
    .post('/users/login')
    .send(userData)
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  },10000);

  //SIGN UP USER
  test('POST /users/create', async () => {
    const userData={
      "name" : "sample",
      "password" : "secret"
  }
    const response = await request(app)
    .post('/users/create')
    .send(userData)
    // Check the response status code
    expect(response.status).toBe(200);
    // Check the response body or other properties
    expect(response.body).toBeDefined();
  },10000);



