import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register SplitText plugin (you might need to handle this differently based on your GSAP license)
if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(SplitText);
  } catch (error) {
    console.log('SplitText plugin not available, using fallback animation');
  }
}

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const visual = visualRef.current;
    
    if (!container || !title || !subtitle || !cta || !visual) return;

    // Set initial states
    gsap.set([title, subtitle, cta, visual], { opacity: 0, y: 60 });

    const tl = gsap.timeline({ delay: 0.2 });

    // Try to use SplitText if available, otherwise use simple animation
    if ((window as any).SplitText) {
      const splitTitle = new (window as any).SplitText(title, { type: "chars,words" });
      
      gsap.set(splitTitle.chars, { opacity: 0, y: 100, rotationX: -90 });
      
      tl.to(splitTitle.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.02
      });
    } else {
      // Fallback animation
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    // Animate other elements
    tl.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3")
    .to(visual, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6");

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      gsap.to(visual, {
        x: xPos * 20,
        y: yPos * 10,
        rotationY: xPos * 5,
        rotationX: yPos * -5,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 
                ref={titleRef}
                className="text-hero font-serif font-bold text-foreground leading-[0.9] tracking-tight"
                style={{ perspective: '1000px' }}
              >
                Creative
                <br />
                <span className="text-primary">Portfolio</span>
              </h1>
              
              <div className="w-24 h-1 bg-gradient-gold rounded-full" />
              
              <p 
                ref={subtitleRef}
                className="text-lg text-muted-foreground leading-relaxed max-w-md"
              >
                Crafting exceptional digital experiences through thoughtful design and elegant code. Where creativity meets technical excellence.
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button className="btn-hero">
                Explore Work
                <svg 
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </button>
              
              <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium tracking-wide border border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                Download CV
              </button>
            </div>
          </div>

          {/* Visual Column */}
          <div ref={visualRef} className="relative">
            <div className="relative">
              {/* Main Visual Card */}
              <div className="surface-card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/5] bg-gradient-hero rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-gold flex items-center justify-center">
                        <span className="text-2xl text-primary-foreground font-serif font-bold">P</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-serif font-semibold text-foreground">Portfolio</h3>
                        <p className="text-sm text-muted-foreground">Premium Design</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-gold rounded-full opacity-20 blur-sm" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/30 rounded-full opacity-40 blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};