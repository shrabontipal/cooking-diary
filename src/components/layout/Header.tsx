import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-4xl font-bold text-pink-500" style={{ fontFamily: "'Pacifico', cursive" }}>Cooking Diary</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="text-pink-500 border-pink-500 hover:bg-pink-50"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-pink-500 hover:bg-pink-600"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
