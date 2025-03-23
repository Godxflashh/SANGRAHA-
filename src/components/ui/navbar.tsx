import { Search, Library, Sun, Moon, Menu, BookOpen, GraduationCap, Brain, Rocket, LineChart, Heart, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/auth/AuthContext';
import { AuthModal } from '../auth/AuthModal';

const categories = [
  { name: 'Academic', icon: GraduationCap },
  { name: 'Self-Improvement', icon: Brain },
  { name: 'Fiction', icon: BookOpen },
  { name: 'Technology', icon: Rocket },
  { name: 'Business', icon: LineChart },
  { name: 'Psychology', icon: Heart },
];

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Library className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold text-white">Sangraha</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search books, authors, or genres..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                {isDark ? <Sun className="h-5 w-5 text-gray-300" /> : <Moon className="h-5 w-5 text-gray-300" />}
              </button>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-gray-300" />
                  <button
                    onClick={() => signOut()}
                    className="text-gray-300 hover:text-indigo-400"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <Menu className="h-6 w-6 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "md:hidden",
          isMenuOpen ? "block" : "hidden"
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg"
                >
                  <Icon className="h-5 w-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
            <div className="relative px-3 py-2">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search books, authors, or genres..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}