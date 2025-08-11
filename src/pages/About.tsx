import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%"
        }
      });

      // Intro paragraph with page peel effect
      gsap.from(introRef.current, {
        opacity: 0,
        y: 30,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%"
        }
      });

      // Timeline items stagger
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.from(timelineItems, {
          opacity: 0,
          x: -40,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%"
          }
        });
      }

      // Pull quote reveal
      gsap.from(quoteRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-display font-serif font-bold mb-6">About</h1>
        </div>

        {/* Magazine Layout */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Intro Paragraph */}
            <p 
              ref={introRef}
              className="text-lg leading-relaxed text-foreground font-medium"
            >
              I'm a product designer & motion director crafting premium digital experiences for ambitious brands. 
              With over 6 years in the field, I specialize in creating sophisticated visual systems that tell 
              compelling stories and drive meaningful engagement.
            </p>

            {/* Timeline */}
            <div ref={timelineRef} className="space-y-6">
              <h3 className="text-heading font-serif font-bold text-foreground mb-8">Experience</h3>
              
              <div className="timeline-item group">
                <div className="flex items-start gap-6 p-6 surface-card rounded-lg hover:shadow-medium transition-all duration-300">
                  <div className="text-sm text-muted-foreground font-medium min-w-[60px]">2024</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Lead Designer</h4>
                    <p className="text-muted-foreground">Lumen Studio</p>
                  </div>
                </div>
              </div>

              <div className="timeline-item group">
                <div className="flex items-start gap-6 p-6 surface-card rounded-lg hover:shadow-medium transition-all duration-300">
                  <div className="text-sm text-muted-foreground font-medium min-w-[60px]">2022</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Senior Motion Designer</h4>
                    <p className="text-muted-foreground">Atelier Co.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Pull Quote */}
            <blockquote 
              ref={quoteRef}
              className="surface-card p-8 rounded-lg"
            >
              <p className="text-xl font-serif italic text-foreground leading-relaxed mb-4">
                "Design is how something feels — not just how it looks."
              </p>
              <div className="w-12 h-px bg-primary"></div>
            </blockquote>

            {/* CTA */}
            <div className="space-y-4">
              <button className="w-full btn-hero">
                Download CV (PDF)
              </button>
              <p className="text-sm text-muted-foreground text-center">
                Updated December 2024 • 2.1 MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;