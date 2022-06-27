import { Cache } from '../../src/models/Cache'
import chai from 'chai';
import ChaiAsPromised from 'chai-as-promised'
chai.use(ChaiAsPromised);
const assert = chai.assert;
import * as sinon from 'sinon';



describe('Testing Cache model', () => {
    it('should return an instance of Cache with correct properties', async () => {
        const cache = new Cache('testCache', 60000)
        assert.instanceOf(cache, Cache);
        assert.equal(cache.cacheName, 'testCache');
        assert.equal(cache.cacheTTL, 60000);
    });
    it('should clear data after TTL', async () => {
        const clock = sinon.useFakeTimers();                      //using fakeTimers
        const cache = new Cache('testCache', 60000);              //instantiate cache with 60s TTL
        cache.set('testKey', [1,2,3]);                            //caching some data.
        assert.deepEqual(cache.get('testKey'), [1,2,3]);          //verify data is cached.
        clock.tick(60001);                                        //advance clock to make cache expire and call clear method on the cacheData map.
        assert.equal(cache.cacheData.size, 0);                    //verify cache is flushed with map size = 0.
        assert.isNull(cache.get('testKey'));                      //get method on Cache returns null if key is not there.
    });
})