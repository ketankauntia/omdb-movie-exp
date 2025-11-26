export function Footer() {
  return (
    <footer className="border-t mt-16 bg-gray-50">
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              OMDB Explorer. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powered by OMDB API
            </p>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="http://www.omdbapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              OMDB API
            </a>
            <a 
              href="https://github.com/ketankauntia/omdb-movie-exp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

