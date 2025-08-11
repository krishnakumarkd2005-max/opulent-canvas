import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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

      // Form animation
      const formElements = formRef.current?.querySelectorAll('.form-element');
      if (formElements) {
        gsap.from(formElements, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%"
          }
        });
      }

      // Input focus animations
      const inputs = formRef.current?.querySelectorAll('input, textarea');
      inputs?.forEach(input => {
        const label = input.parentElement?.querySelector('label');
        
        input.addEventListener('focus', () => {
          gsap.to(label, {
            scale: 0.85,
            y: -20,
            color: 'hsl(var(--primary))',
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Liquid gold underline effect
          gsap.to(input, {
            borderBottomColor: 'hsl(var(--primary))',
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        input.addEventListener('blur', () => {
          if (!(input as HTMLInputElement).value) {
            gsap.to(label, {
              scale: 1,
              y: 0,
              color: 'hsl(var(--muted-foreground))',
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          gsap.to(input, {
            borderBottomColor: 'hsl(var(--border))',
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form collapse animation
    gsap.to(formRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setIsSubmitted(true);
        
        // Success animation
        gsap.fromTo('.success-check', {
          scale: 0,
          rotation: -180
        }, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
        
        // Particle burst effect (simplified)
        gsap.from('.success-particles div', {
          scale: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out"
        });
      }
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@yourname.design');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <main ref={containerRef} className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-display font-serif font-bold mb-6">Contact</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to create something extraordinary together? Let's start a conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="surface-card p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-4">Availability</h3>
              <p className="text-muted-foreground mb-4">
                Open to freelance & full-time collaborations. 
              </p>
              <p className="text-sm text-muted-foreground">
                Reply times: 24–48 hours
              </p>
            </div>

            <div className="surface-card p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-4">Get in touch</h3>
              <div className="space-y-3">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                >
                  <span>hello@yourname.design</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary">
                    {copiedEmail ? '✓ Copied' : 'Copy'}
                  </span>
                </button>
                
                <div className="flex gap-4 mt-6">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Behance
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Dribbble
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="surface-card p-8 rounded-lg">
              {!isSubmitted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-element relative">
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-transparent border-0 border-b border-border py-3 text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your Name"
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 top-3 text-muted-foreground transition-all pointer-events-none"
                      >
                        Your Name
                      </label>
                    </div>

                    <div className="form-element relative">
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-transparent border-0 border-b border-border py-3 text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="Email Address"
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 top-3 text-muted-foreground transition-all pointer-events-none"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="form-element relative">
                    <input
                      type="text"
                      id="subject"
                      className="w-full bg-transparent border-0 border-b border-border py-3 text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                      placeholder="Subject"
                      required
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-0 top-3 text-muted-foreground transition-all pointer-events-none"
                    >
                      Subject
                    </label>
                  </div>

                  <div className="form-element relative">
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full bg-transparent border-0 border-b border-border py-3 text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Your Message"
                      required
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-3 text-muted-foreground transition-all pointer-events-none"
                    >
                      Your Message
                    </label>
                  </div>

                  <div className="form-element">
                    <button type="submit" className="btn-hero">
                      Send Message
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-16">
                  <div className="success-check inline-block w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                    <span className="text-primary-foreground text-2xl">✓</span>
                  </div>
                  
                  <div className="success-particles absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        style={{
                          left: `${30 + i * 10}%`,
                          top: `${40 + (i % 2) * 20}%`
                        }}
                      />
                    ))}
                  </div>
                  
                  <h3 className="text-heading font-serif font-bold text-foreground mb-4">
                    Message Sent Successfully
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you within 24-48 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;