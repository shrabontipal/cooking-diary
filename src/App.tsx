import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import { Recipe } from './types'
import { Toaster } from './components/ui/toaster'

const popularRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    source: 'Food Network',
    imageUrl: 'https://www.giallozafferano.com/images/228-22832/Spaghetti-Carbonara_1200x800.jpg',
    tags: ['Italian', 'Pasta', 'Quick']
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    description: 'Grilled chunks of chicken enveloped in a creamy spiced tomato sauce.',
    source: 'BBC Good Food',
    imageUrl: 'https://www.seriouseats.com/thmb/DbQHUK2yNCALBnZE-H1M2AKLkok=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG',
    tags: ['Indian', 'Curry', 'Spicy']
  },
  {
    id: 3,
    title: 'French Ratatouille',
    description: 'A bright and chunky summer vegetable stew, packed with the best of summer produce.',
    source: 'Bon Appétit',
    imageUrl: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?q=80&w=1000&auto=format&fit=crop',
    tags: ['French', 'Vegetarian', 'Healthy']
  },
  {
    id: 4,
    title: 'Classic Beef Burger',
    description: 'Juicy homemade beef patties with all the classic burger toppings.',
    source: 'Serious Eats',
    imageUrl: 'https://www.seriouseats.com/thmb/e16lLOoVEix_JZTv7iNyAuWkPn8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg',
    tags: ['American', 'Beef', 'Grilling']
  },
  {
    id: 5,
    title: 'Homemade Pizza Margherita',
    description: 'Simple and classic pizza with tomato sauce, fresh mozzarella, and basil.',
    source: 'Jamie Oliver',
    imageUrl: 'https://www.recipetineats.com/wp-content/uploads/2020/05/Pizza-Crust-without-yeast_5-SQ.jpg',
    tags: ['Italian', 'Pizza', 'Vegetarian']
  },
  {
    id: 6,
    title: 'Thai Green Curry',
    description: 'A fragrant Thai green curry with coconut milk, vegetables, and your choice of protein.',
    source: 'Thai Food Online',
    imageUrl: 'https://hot-thai-kitchen.com/wp-content/uploads/2022/11/green-curry-new-sq-2.jpg',
    tags: ['Thai', 'Curry', 'Spicy']
  }
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-pink-50">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home recipes={popularRecipes} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App
