# OMDB Movie Explorer - Frontend

fontend part :

Next.js 14+ with App Router
TypeScript
Tailwind CSS
Shadcn UI components
React Query for client caching
Axios for HTTP requests
Lucide React for icons

Backend API running at http://localhost:5000/api

## Setup Instructions

### Install dependencies

```bash
npm install
```

### Configure environment

Create a file named .env.local in the frontend root directory:

```
NEXT_PUBLIC_API_BASE=http://localhost:5000/api
```

### Run development server

```bash
npm run dev
```

Application will be available at http://localhost:3000

### Build for production

```bash
npm run build
npm start
```

Two endpoints are used:

GET /api/search?query=TEXT&page=NUMBER
Returns array of movie search results

GET /api/movie/:id
Returns detailed movie information

All API calls go through the backend. The frontend does not call OMDB directly.

## Features

Search with 300ms debouncing
Responsive grid layout
Movie detail pages
Favorites stored in localStorage under key omdb_favs_v1
Client side caching with React Query
Loading and error states
Empty states
