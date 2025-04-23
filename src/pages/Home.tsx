import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Search, Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import Hero from '../components/layout/Hero'
import RecipeCard from '../components/layout/RecipeCard'
import { Recipe } from '../types'

interface HomeProps {
  recipes: Recipe[];
}

const Home = ({ recipes }: HomeProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
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
  );
}

export default Home;
