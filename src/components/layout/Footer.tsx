const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>Cooking Diary</h3>
            <p className="text-pink-200" style={{ fontFamily: "'Quicksand', sans-serif" }}>Your personal recipe collection and cooking journal.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <li><a href="#" className="text-pink-200 hover:text-white">Home</a></li>
              <li><a href="#" className="text-pink-200 hover:text-white">Browse Recipes</a></li>
              <li><a href="#" className="text-pink-200 hover:text-white">Add New Recipe</a></li>
              <li><a href="#" className="text-pink-200 hover:text-white">My Collections</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Connect</h4>
            <ul className="space-y-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <li><a href="#" className="text-pink-200 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-pink-200 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-pink-200 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-pink-200 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-pink-700 mt-8 pt-6 text-center text-pink-300">
          <p>&copy; {new Date().getFullYear()} Cooking Diary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
