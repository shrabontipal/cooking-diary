import { useState } from 'react'
import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Input } from './components/ui/input'
import { Search, Plus } from 'lucide-react'
import { Button } from './components/ui/button'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/layout/Hero'
import RecipeCard from './components/layout/RecipeCard'
import { Recipe } from './types'

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
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = popularRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Hero />

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              className="pl-10 py-6" 
              placeholder="Search recipes by name, ingredients, or tags..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="popular" className="mb-8">
          <TabsList className="mb-4 bg-purple-100">
            <TabsTrigger value="popular" className="data-[state=active]:bg-pink-200 data-[state=active]:text-pink-700">Popular Recipes</TabsTrigger>
            <TabsTrigger value="my-recipes" className="data-[state=active]:bg-pink-200 data-[state=active]:text-pink-700">My Recipes</TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-pink-200 data-[state=active]:text-pink-700">Favorites</TabsTrigger>
            <TabsTrigger value="shared" className="data-[state=active]:bg-pink-200 data-[state=active]:text-pink-700">Shared</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Popular Recipes</h2>
            <p className="text-purple-600 mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>Discover trending recipes from around the world</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-recipes">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">You haven't added any recipes yet</h3>
              <p className="text-gray-500 mt-2 mb-6">Start building your collection by adding your favorite recipes</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Your First Recipe
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No favorite recipes yet</h3>
              <p className="text-gray-500 mt-2 mb-6">Browse popular recipes and mark your favorites</p>
              <Button variant="outline">Browse Popular Recipes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="shared">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No shared recipes yet</h3>
              <p className="text-gray-500 mt-2 mb-6">Share your recipes with friends and family</p>
              <Button variant="outline">Browse Your Recipes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
