import { Button } from "@/components/ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MetricsCarousel } from "./MetricsCarousel"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  
  const isActive = (path: string) => location.pathname === path
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to a search results page or handle search logic
      // For now, we'll redirect to people page with search
      navigate(`/people?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <MetricsCarousel />
      <nav className="bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
              Carry & Conquer
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-accent-green to-accent-teal text-white shadow-glow' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/analysis" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/analysis') 
                  ? 'bg-gradient-to-r from-accent-green to-accent-teal text-white shadow-glow' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Analysis
            </Link>
            <Link 
              to="/key-deals" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/key-deals') 
                  ? 'bg-gradient-to-r from-accent-green to-accent-teal text-white shadow-glow' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Key Deals
            </Link>
            <Link 
              to="/snapshot" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/snapshot') 
                  ? 'bg-gradient-to-r from-accent-green to-accent-teal text-white shadow-glow' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Snapshot
            </Link>
            <Link 
              to="/events" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/events') 
                  ? 'bg-gradient-to-r from-accent-green to-accent-teal text-white shadow-glow' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Events
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search people, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-full focus:ring-2 focus:ring-accent-green focus:border-transparent"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      </nav>
    </div>
  )
}