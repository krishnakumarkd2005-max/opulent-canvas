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
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, visualRef.current], {
      opacity: 0,
      y: 30
    });

    // Word-by-word animation with gentle overshoot
    if (titleRef.current && (window as any).SplitText) {
      const split = new (window as any).SplitText(titleRef.current, { type: "words" });
      tl.from(split.words, {
        opacity: 0,
        y: 40,
        rotation: 2,
        duration: 1.2,
        stagger: 0.08,
        ease: "back.out(1.1)"
      });
    } else {
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.6")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(visualRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");

    // 3-layer parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!visualRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      // Layer 1 - Main visual
      gsap.to(visualRef.current.querySelector('.layer-1'), {
        rotationY: x * 8,
        rotationX: y * -8,
        z: 20,
        duration: 1.2,
        ease: "power2.out"
      });
      
      // Layer 2 - Mid elements
      gsap.to(visualRef.current.querySelector('.layer-2'), {
        rotationY: x * 5,
        rotationX: y * -5,
        z: 10,
        duration: 1.0,
        ease: "power2.out"
      });
      
      // Layer 3 - Background elements
      gsap.to(visualRef.current.querySelector('.layer-3'), {
        rotationY: x * 3,
        rotationX: y * -3,
        z: 5,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    // CTA micro-glint on hover
    const ctaButtons = ctaRef.current?.querySelectorAll('button');
    ctaButtons?.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Create glint effect
        const glint = document.createElement('div');
        glint.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full';
        button.appendChild(glint);
        
        gsap.to(glint, {
          x: '200%',
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => glint.remove()
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen grid lg:grid-cols-12 gap-8 items-center px-6 pt-24 pb-16 container mx-auto"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Left Column - Content */}
      <div className="lg:col-span-6 space-y-8">
        <div className="w-20 h-px bg-gradient-gold"></div>
        
        <h1 
          ref={titleRef}
          className="text-hero font-serif font-bold leading-none tracking-tight text-foreground"
        >
          Designing Quiet Luxury for Ambitious Brands
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg text-muted-foreground max-w-lg leading-relaxed"
        >
          Visual systems, motion design & digital craft — I design narratives that feel like heirlooms.
        </p>
        
        <div ref={ctaRef} className="flex gap-4 flex-wrap">
          <button className="btn-hero relative overflow-hidden">
            View Work
          </button>
          <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium tracking-wide border border-border bg-background text-foreground hover:bg-surface transition-all duration-300 relative overflow-hidden">
            Download CV (PDF)
          </button>
        </div>
      </div>
      
      {/* Right Column - Visual with 3-layer parallax */}
      <div className="lg:col-span-6 flex justify-center items-center">
        <div 
          ref={visualRef}
          className="relative w-96 h-96"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Layer 3 - Background */}
          <div className="layer-3 absolute inset-0 bg-gradient-hero rounded-lg transform rotate-2 opacity-60"></div>
          
          {/* Layer 2 - Mid */}
          <div className="layer-2 absolute inset-4 bg-surface rounded-lg shadow-soft transform -rotate-1"></div>
          
          {/* Layer 1 - Foreground */}
          <div className="layer-1 absolute inset-8 bg-surface-elevated rounded-lg shadow-medium surface-card flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-xl text-primary-foreground font-serif font-bold">D</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-semibold text-foreground">Design</h3>
                <p className="text-sm text-muted-foreground">Quiet Luxury</p>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-8 right-8 w-4 h-4 bg-primary rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-12 left-12 w-3 h-3 bg-accent rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-8 w-2 h-2 bg-primary rounded-full opacity-30"></div>
          
          {/* Central Glow */}
          <div className="absolute inset-0 bg-gradient-gold opacity-5 rounded-lg blur-xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};