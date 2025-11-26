const cache = require('../config/cache');
const omdbService = require('../services/omdbService');
const formatter = require('../utils/formatter');

exports.search = async (req, res, next) => {
  try {
    const query = req.query.query || req.query.q;
    const page = req.query.page || 1;

    if (!query) {
      return res.status(400).json({ error: 'query parameter required' });
    }

    const key = `search:${query.toLowerCase().trim()}:page:${page}`;
    const cached = cache.get(key);

    if (cached) {
      res.set('X-Cache', 'HIT');
      return res.json(cached);
    }

    const raw = await omdbService.search(query, page);
    const dto = formatter.formatSearchList(raw);

    cache.set(key, dto);
    res.set('X-Cache', 'MISS');
    res.json(dto);
  } catch (err) {
    next(err);
  }
};

