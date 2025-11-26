const { cacheTTL, cacheMax } = require('./index');

class InMemoryCache {
  constructor() {
    this.map = new Map();
  }

  get(key) {
    const entry = this.map.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.map.delete(key);
      return null;
    }

    return entry.value;
  }

  set(key, value, ttlSeconds = cacheTTL) {
    if (this.map.size >= cacheMax) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }

    this.map.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000
    });
  }

  del(key) {
    this.map.delete(key);
  }
}

module.exports = new InMemoryCache();

