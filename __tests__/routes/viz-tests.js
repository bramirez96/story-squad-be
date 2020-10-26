const request = require('supertest');
const server = require('../../api/app');

module.exports = () => {
  describe('data visualization tests', () => {
    describe('GET /parent/viz?childId=:id', () => {
      it('should return a line graph', async () => {
        const res = await request(server).get('/parent/viz?childId=1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('line');
        expect(res.body.line).toHaveProperty('data');
        expect(res.body.line).toHaveProperty('layout');
      });

      it('should now return a histogram', async () => {
        const res = await request(server).get('/parent/viz?childId=1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('hist');
        expect(res.body.hist).toHaveProperty('data');
        expect(res.body.hist).toHaveProperty('layout');
      });

      it('should return a 404 when no submissions are found', async () => {
        const res = await request(server).get('/parent/viz?childId=10');

        expect(res.status).toBe(404);
      });
    });
  });
};
