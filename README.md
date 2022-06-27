# rates-with-cache
Gets a list of rates for a given currency symbol. Caches the data for 60s.

# tests
- Cache test: Will test the cache instance and the cache time to live.
- App test: Will test if the response comes from the cache or not and if the external API is called.
