# OMDB Backend API

node.js backend using Express. uses OMDB API.

## Testing results

Api has been tested. in-memory cache is also caching perfectly.
<img width="833" height="481" alt="image" src="https://github.com/user-attachments/assets/e692dc7e-1a2a-4540-83eb-8d40d245fa9b" />


## Setup



```bash
# (incase you aren't in backend directory)
cd backend/ 

# (else)

npm install
```

### 2. Configure Environment

/backend/.env will have,

```env
PORT=5000
OMDB_API_KEY=your_actual_omdb_api_key_here
CACHE_TTL_SECONDS=3600
CACHE_MAX_ENTRIES=200
```

get your omdb api for this. add to .env file.

### 3. Start the Server

```bash
# Production mode
npm start

# Development mode (with nodemon)
npm run dev
```

The server starts on `http://localhost:5000`

## API Endpoints

### Health Check

```
GET /api/health
```

### Search Movies

```
GET /api/search?query=batman&page=1
```

**Query Parameters:**
- `query` or `q` (required): Search term
- `page` (optional): Page number (default: 1)

**Response:**
```json
[
  {
    "id": "tt0372784",
    "title": "Batman Begins",
    "year": "2005",
    "type": "movie",
    "poster": "https://..."
  }
]
```

**Headers:**
- `X-Cache`: `HIT` or `MISS`

### Get Movie Details

```
GET /api/movie/:id
```

**Parameters:**
- `id` (required): IMDb ID (e.g., tt0372784)

**Headers:**
- `X-Cache`: `HIT` or `MISS`

## Caching

- Cache uses TTL (Time To Live) entries expire after configured seconds
- LRU eviction. removes oldest entry when max size is reached
- Cache keys format:
  - Search: `search:{query}:page:{page}`
  - Movie: `movie:{id}`
- Check `X-Cache` header to see if response was cached

## Error Handling

All endpoints return error responses in JSON format:

```json
{
  "error": "Error message"
}
```

## Testing

Test the API using curl or any HTTP client:

```bash
# Health check
"http://localhost:5000/api/health"

# Search
"http://localhost:5000/api/search?query=batman&page=1"

# Get movie
"http://localhost:5000/api/movie/tt0372784"
```
