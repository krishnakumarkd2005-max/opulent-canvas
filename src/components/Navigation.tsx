import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' }
];

export const Navigation = () => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    
    if (!nav || !logo) return;

    // Initial entrance animation
    gsap.set([logo, ...nav.children], { opacity: 0, y: -20 });
    
    gsap.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.to(nav.children, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.4
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Link to="/" className="group">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-300">
                <span className="text-primary-foreground font-serif font-bold text-lg">P</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-gold transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};