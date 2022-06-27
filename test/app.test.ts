import {server} from "../src/app";
import { services } from '../src/services';
import { agent as request } from 'supertest';
import chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import ChaiSpies from 'chai-spies';

const expect = chai.expect;
const req = request(server);

chai.use(ChaiAsPromised);
chai.use(ChaiSpies);


describe('Testing cache works', () => {
    beforeEach(() => {
        chai.spy.on(services.coinApi, 'getAllExchangeRates', () => Promise.resolve([1,2,3]));
    });
    
    afterEach(() => {
        chai.spy.restore(services.coinApi);
    });
    it('should get data from the external API when data is not cached and getAllExchangeRates is called', async () => {
        const res = await req.get('/v1/rates/BTC')
        expect(res.statusCode).to.equal(200);
        expect(services.coinApi.getAllExchangeRates).to.have.been.called.exactly(1);
    });
    it('should reply with status 304 if data is cached and getAllExchangeRates is not called', async () => {
        const res = await req.get('/v1/rates/BTC')
        expect(res.statusCode).to.equal(304);
        expect(services.coinApi.getAllExchangeRates).to.have.been.called.exactly(0);
    });
});