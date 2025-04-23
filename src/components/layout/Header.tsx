import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-gradient-to-r from-pink-400 to-purple-400 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="ghost" 
              className="p-1 md:p-2 text-white hover:bg-pink-300/30"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Link to="/">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: "'Pacifico', cursive" }}>Cooking Diary</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-pink-300/30"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-white text-pink-500 hover:bg-gray-100"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-1 text-white"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-gradient-to-r from-pink-300 to-purple-300 border-t border-white/20 animate-in slide-in-from-top">
            <div className="flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="w-full text-white border-white hover:bg-pink-300/30"
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button 
                className="w-full bg-white text-pink-500 hover:bg-gray-100"
                onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}
              >
                Create Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
