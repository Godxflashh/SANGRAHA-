import React from 'react';
import { Navbar } from './components/ui/navbar';
import { BookCard } from './components/book-card';

// Sample data with better book examples and descriptions
const featuredBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    genre: "Self-Improvement",
    description: "Transform your life with tiny changes that yield remarkable results. Learn how small habits can lead to extraordinary outcomes."
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1000",
    genre: "Finance",
    description: "Timeless lessons on wealth, greed, and happiness. Exploring the strange ways people think about money."
  },
  {
    id: 3,
    title: "Deep Learning",
    author: "Ian Goodfellow",
    coverUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    genre: "Technology",
    description: "Comprehensive guide to deep learning, artificial intelligence, and neural networks."
  },
  {
    id: 4,
    title: "The Lean Startup",
    author: "Eric Ries",
    coverUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=1000",
    genre: "Business",
    description: "Revolutionary approach to building businesses and launching products that customers actually want."
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 sm:text-6xl md:text-7xl">
            Sangraha
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Your next-gen e-Library with AI-powered recommendations and blockchain-based ownership.
          </p>
        </div>

        {/* Featured Books Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-100">
              Featured Books
            </h2>
            <button className="px-4 py-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
                genre={book.genre}
                description={book.description}
              />
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-8">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Academic & Textbooks", count: "2,500+", color: "from-blue-500 to-cyan-400" },
              { name: "Self-Improvement", count: "1,200+", color: "from-purple-500 to-pink-400" },
              { name: "Technology & Startup", count: "800+", color: "from-green-500 to-emerald-400" },
              { name: "Business & Finance", count: "1,500+", color: "from-orange-500 to-amber-400" },
              { name: "Fiction & Literature", count: "3,000+", color: "from-red-500 to-rose-400" },
              { name: "Psychology & Philosophy", count: "900+", color: "from-indigo-500 to-violet-400" }
            ].map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl bg-gray-900 p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${category.color}`} />
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {category.count} Books
                </p>
                <div className="mt-4 flex items-center text-sm text-indigo-400 group-hover:text-indigo-300">
                  Explore Category
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;