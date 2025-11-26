const axios = require('axios');
const { apiKey } = require('../config');
const { OMDB_BASE_URL } = require('../config/constants');

exports.search = async (title, page = 1) => {
  const url = `${OMDB_BASE_URL}?apikey=${apiKey}&s=${encodeURIComponent(title)}&page=${page}`;
  const res = await axios.get(url);
  if (res.data.Response === 'False') return [];
  return res.data;
};

exports.getById = async (id) => {
  const url = `${OMDB_BASE_URL}?apikey=${apiKey}&i=${id}&plot=full`;
  const res = await axios.get(url);
  if (res.data.Response === 'False') return null;
  return res.data;
};

