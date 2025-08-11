import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingAnimationProps {
  onComplete: () => void;
}

export const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    
    if (!container || !logo || !text) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        setTimeout(onComplete, 300);
      }
    });

    // Set initial states
    gsap.set(container, { opacity: 1 });
    gsap.set(logo, { opacity: 0, scale: 0.8 });
    gsap.set(text, { opacity: 0, y: 20 });

    // Animate logo entrance
    tl.to(logo, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    // Animate text
    .to(text, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    // Hold for a moment
    .to({}, { duration: 0.6 })
    // Fade out
    .to([logo, text], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in"
    })
    .to(container, {
      opacity: 0,
      duration: 0.4,
      ease: "power3.in"
    }, "-=0.2");

  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      <div className="text-center">
        {/* Logo SVG */}
        <svg
          ref={logoRef}
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="mx-auto mb-6"
        >
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            strokeDasharray="220"
            strokeDashoffset="220"
            style={{
              animation: 'drawCircle 1.5s ease-out forwards'
            }}
          />
          <text
            x="40"
            y="48"
            textAnchor="middle"
            className="font-serif text-2xl font-bold fill-primary"
          >
            P
          </text>
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(36, 42%, 50%)" />
              <stop offset="100%" stopColor="hsl(36, 52%, 60%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Loading Text */}
        <div ref={textRef} className="text-muted-foreground text-sm font-medium tracking-widest">
          PORTFOLIO
        </div>
      </div>

      <style>{`
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};