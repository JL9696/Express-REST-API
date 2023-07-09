const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({ _id: '64a177350f5fcc14b21ac851', performer: 'Test Performer One', genre: 'Test Genre One', price: 40, day: 1, image: 'Test Image' });
    await testConcertOne.save();
    const testConcertTwo = new Concert({ _id: '64a177350f5fcc14b21ac852', performer: 'Test Performer Two', genre: 'Test Genre Two', price: 100, day: 2, image: 'Test Image' });
    await testConcertTwo.save();
    const testConcertThree = new Concert({ _id: '64a177350f5fcc14b21ac853', performer: 'Test Performer Three', genre: 'Test Genre Three', price: 150, day: 3, image: 'Test Image' });
    await testConcertThree.save();
  });

  it('should return a concert by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should return a concert by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Test Performer One');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('should return a concert by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Test Genre One');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('should return a concert by price', async () => {
    const res = await request(server).get('/api/concerts/price/50/100');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  after(async () => {
    await Concert.deleteMany({});
  });
});