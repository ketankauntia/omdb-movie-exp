module.exports = {
  apiKey: process.env.OMDB_API_KEY,
  port: process.env.PORT || 5000,
  cacheTTL: Number(process.env.CACHE_TTL_SECONDS) || 3600,
  cacheMax: Number(process.env.CACHE_MAX_ENTRIES) || 200
};

