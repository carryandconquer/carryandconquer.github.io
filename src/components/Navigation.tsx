import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"

export function Navigation() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
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
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/analysis" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/analysis') 
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Analysis
            </Link>
            <Link 
              to="/events" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/events') 
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/key-deals" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/key-deals') 
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Key Deals
            </Link>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button className="bg-gradient-button hover:shadow-glow transition-all duration-300 hover:scale-105 rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}