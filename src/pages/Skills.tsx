import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  percentage: number;
  description: string;
  tools: string[];
}

const skills: Skill[] = [
  {
    name: "Visual Design",
    percentage: 95,
    description: "Creating cohesive visual systems that communicate brand values through typography, color, and layout.",
    tools: ["Figma", "Adobe Creative Suite", "Sketch"]
  },
  {
    name: "Motion & Interaction",
    percentage: 92,
    description: "Designing meaningful animations and micro-interactions that enhance user experience and delight.",
    tools: ["After Effects", "Principle", "Framer"]
  },
  {
    name: "Frontend Development",
    percentage: 85,
    description: "Building responsive, accessible interfaces with modern web technologies and design systems.",
    tools: ["React", "TypeScript", "GSAP"]
  },
  {
    name: "Branding",
    percentage: 90,
    description: "Developing comprehensive brand identities that resonate with target audiences across all touchpoints.",
    tools: ["Illustrator", "InDesign", "Brand Guidelines"]
  }
];

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

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

      // Skills cards cascade
      const skillCards = skillsGridRef.current?.querySelectorAll('.skill-card');
      if (skillCards) {
        gsap.from(skillCards, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: skillsGridRef.current,
            start: "top 75%"
          }
        });

        // Animate progress rings
        skillCards.forEach((card, index) => {
          const progressRing = card.querySelector('.progress-ring');
          const progressValue = card.querySelector('.progress-value');
          
          if (progressRing && progressValue) {
            gsap.from(progressRing, {
              rotation: -90,
              drawSVG: "0%",
              duration: 1.5,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 80%"
              }
            });

            gsap.from(progressValue, {
              textContent: 0,
              duration: 1.5,
              ease: "power2.out",
              delay: index * 0.1,
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: card,
                start: "top 80%"
              }
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  return (
    <main ref={containerRef} className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-display font-serif font-bold mb-6">Skills</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical capabilities and creative expertise.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={skillsGridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card group cursor-pointer"
              onClick={() => handleSkillClick(skill)}
            >
              <div className="surface-card p-8 rounded-lg text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                {/* Radial Progress */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="hsl(var(--border))"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${skill.percentage * 2.51} 251`}
                      className="progress-ring transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="progress-value text-lg font-bold text-foreground">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{skill.name}</h3>
                <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-center gap-1 mb-2">
                    {skill.tools.slice(0, 2).map((tool, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-surface rounded-full text-muted-foreground">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Click to expand</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Skill Detail */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="surface-card max-w-lg w-full p-8 rounded-lg shadow-large">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-heading font-serif font-bold text-foreground">
                  {selectedSkill.name}
                </h3>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedSkill.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Skills;