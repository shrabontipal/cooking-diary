import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Mic, Video, Share2 } from 'lucide-react'
import { Recipe } from '../../types'

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-pink-100">
      <div className="aspect-video w-full overflow-hidden bg-purple-100 flex items-center justify-center relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://source.unsplash.com/featured/800x600/?${recipe.tags[0]?.toLowerCase() || 'food'},cooking`;
          }}
        />
      </div>
      <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
        <CardTitle style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-purple-700">{recipe.title}</CardTitle>
        <CardDescription className="text-pink-600">Source: {recipe.source}</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="text-purple-800">{recipe.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {recipe.tags.map(tag => (
            <span key={tag} className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gradient-to-r from-purple-50 to-pink-50">
        <Button variant="outline" size="sm" className="text-purple-600 border-purple-600 hover:bg-purple-50">View Recipe</Button>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-pink-500 hover:bg-pink-100">
            <Mic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-pink-500 hover:bg-pink-100">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-pink-500 hover:bg-pink-100">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default RecipeCard
