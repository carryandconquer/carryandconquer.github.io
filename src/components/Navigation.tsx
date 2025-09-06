import { Button } from "@/components/ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MetricsCarousel } from "./MetricsCarousel"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { SearchCommand } from "./SearchCommand"

export function Navigation() {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  
  const isActive = (path: string) => location.pathname === path
  
  // Keyboard shortcut to open search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
  
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
          
          {/* Search Trigger */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => setSearchOpen(true)}
              className="relative w-64 h-9 justify-start bg-white/10 border-white/20 text-white/60 hover:text-white hover:bg-white/20 rounded-full px-3"
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="text-sm">Search people, companies...</span>
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-xs text-white/60 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          
          {/* Search Command Dialog */}
          <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
      </div>
      </nav>
    </div>
  )
}