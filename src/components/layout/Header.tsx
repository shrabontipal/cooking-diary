import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-4xl font-bold text-pink-500" style={{ fontFamily: "'Pacifico', cursive" }}>Cooking Diary</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="text-pink-500 border-pink-500 hover:bg-pink-50">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-pink-500 hover:bg-pink-600">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
