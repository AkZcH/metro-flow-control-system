
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Train } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Train className="h-8 w-8 text-metro-accent" />
              <span className="ml-2 text-xl font-bold text-metro-primary">MetroTix</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-metro-primary hover:bg-metro-gray hover:text-metro-secondary">
              Home
            </Link>
            <Link to="/book" className="px-3 py-2 rounded-md text-metro-primary hover:bg-metro-gray hover:text-metro-secondary">
              Book Ticket
            </Link>
            <Link to="/simulation" className="px-3 py-2 rounded-md text-metro-primary hover:bg-metro-gray hover:text-metro-secondary">
              Gate Simulation
            </Link>
            <Link to="/dashboard" className="px-3 py-2 rounded-md text-metro-primary hover:bg-metro-gray hover:text-metro-secondary">
              Dashboard
            </Link>
            <Button className="bg-metro-accent hover:bg-metro-accent/90 text-white">
              Login
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-metro-primary hover:text-metro-secondary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-metro-primary hover:bg-metro-gray"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/book"
              className="block px-3 py-2 rounded-md text-base font-medium text-metro-primary hover:bg-metro-gray"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Ticket
            </Link>
            <Link 
              to="/simulation"
              className="block px-3 py-2 rounded-md text-base font-medium text-metro-primary hover:bg-metro-gray"
              onClick={() => setIsMenuOpen(false)}
            >
              Gate Simulation
            </Link>
            <Link 
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-metro-primary hover:bg-metro-gray"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Button 
              className="w-full bg-metro-accent hover:bg-metro-accent/90 text-white mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
