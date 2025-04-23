import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 mb-8">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold text-purple-700 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Personal Recipe Collection</h2>
        <p className="text-lg text-purple-600 mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Save, organize, and share your favorite recipes. Add recipes as text, voice recordings, or videos.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Button className="bg-pink-500 hover:bg-pink-600">
            <Plus className="mr-2 h-4 w-4" /> Add New Recipe
          </Button>
          <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">Browse Collections</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
