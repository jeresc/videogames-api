/* eslint-disable */

import session from 'supertest-session';
import app from '#app';

const agent = session(app);

const correct = {
  name: 'GTA Argentina Edition',
  description: 'A good game made in Argentina, tierra de Maradona',
  platforms: ['PS3', 'PS4'],
  image:
    'http://3.bp.blogspot.com/_o6PeYNxMNQo/TDypRRCrxBI/AAAAAAAAACE/rEc3a9qan8w/w1200-h630-p-k-no-nu/123750910poq41.jpg',
  released: '2013-09-17',
  rating: 5.0,
};

describe('Routes', () => {
  describe('GET /videogames', () => {
    test('should get 200', async () => {
      const response = await agent.get('/api/videogames').send();
      expect(response.status).toBe(200);
    });
  });

  describe('GET /videogames with queries', () => {
    test('should get 200', async () => {
      const response = await agent.get('/api/videogames?name=gta').send();
      expect(response.status).toBe(200);
    });

    test('should get one or many results', async () => {
      const response = await agent.get('/api/videogames?name=gta').send();
      expect(response.body).toBeInstanceOf(Array);
    });

    test('should get no results for a non-existent name', async () => {
      const response = await agent.get('/api/videogames?name=yyy').send();
      expect(response.body).toEqual([]);
    });
  });

  describe('GET /videogames with params', () => {
    test('should get 200', async () => {
      const response = await agent.get('/api/videogames/1').send();
      expect(response.status).toBe(200);
    });

    test('should get results for videogame from API', async () => {
      const response = await agent
        .get('/api/videogames/1')
        .set('Accept', 'application/json')
        .expect(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBeDefined();
    });

    test('should get results for videogame from DB', async () => {
      const response = await agent.post('/api/videogames').send(correct);
      expect(response.status).toBe(201);
      const postRes = response.body;

      const getRes = await agent.get(`/api/videogames/${postRes.id}`).send();
      expect(getRes.body).toEqual(postRes);
    });

    test('should get no results for a non-existent ID', async () => {
      const response = await agent.get('/videogames/9999999').send();
      expect(response.body).toEqual({});
    });
  });

  describe('POST /videogames', () => {
    test('should respond with a new object when POST was successful', async () => {
      const response = await agent.post('/api/videogames').send(correct);
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBeDefined();
    });

    test('should get 400 when POST failed', async () => {
      const response = await agent.post('/api/videogames').send({});
      expect(response.status).toBe(400);
    });
  });

  describe('GET /genres', () => {
    test('should get 200', async () => {
      const response = await agent.get('/api/genres').send();
      expect(response.status).toBe(200);
    });
  });
});
