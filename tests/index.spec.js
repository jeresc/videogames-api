/* eslint-disable */

import app from '#app';
import request from 'supertest';
import { sequelize } from '#helpers';

const agent = request(app);

const correct = {
  name: 'GTA Argentina Edition',
  description: 'A good game made in Argentina, tierra de Maradona',
  platforms: ['PlayStation'],
  image:
    'http://3.bp.blogspot.com/_o6PeYNxMNQo/TDypRRCrxBI/AAAAAAAAACE/rEc3a9qan8w/w1200-h630-p-k-no-nu/123750910poq41.jpg',
  released: '2013-09-17',
  rating: 5.0,
  genres: [10, 2]
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
      expect(response.body.results).toBeInstanceOf(Array);
    });

    test('should get no results for a non-existent name', async () => {
      const response = await agent.get(`/api/videogames?name=${Math.random() * 5000}`).send();
      expect(response.body.results).toEqual([]);
    });
  });

  describe('GET /videogames with params', () => {
    test('should get 200', async () => {
      const response = await agent.get('/api/videogames/99')
      expect(response.status).toBe(200);
    });

    test('should get results for videogame from API', async () => {
      const response = await agent.get('/api/videogames/22').send()
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBeDefined();
    });

    test('should get results for videogame from DB', async () => {
      const response = await agent.post('/api/videogames').send(correct);
      expect(response.status).toBe(201);
      const postRes = response.body;

      const getRes = await agent.get(`/api/videogames/${postRes.id}`).send();
      expect(getRes.body).toBeInstanceOf(Object);
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
