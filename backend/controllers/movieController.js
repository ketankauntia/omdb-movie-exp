const cache = require('../config/cache');
const omdbService = require('../services/omdbService');
const formatter = require('../utils/formatter');

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Movie ID required' });
    }

    const key = `movie:${id}`;
    const cached = cache.get(key);

    if (cached) {
      res.set('X-Cache', 'HIT');
      return res.json(cached);
    }

    const raw = await omdbService.getById(id);

    if (!raw) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const dto = formatter.formatMovie(raw);

    cache.set(key, dto);
    res.set('X-Cache', 'MISS');
    res.json(dto);
  } catch (err) {
    next(err);
  }
};

