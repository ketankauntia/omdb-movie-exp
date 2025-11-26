'use client';

import Link from 'next/link';
import { Film } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-screen-xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-linear-to-br from-purple-600 to-purple-800 p-2 rounded-lg">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                OMDB Explorer
              </h1>
              <p className="text-xs text-gray-500">Discover amazing movies</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/#favorites" 
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

