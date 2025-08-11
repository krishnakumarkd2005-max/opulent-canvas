import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  description: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "aurum",
    title: "Aurum",
    subtitle: "Luxury Watch E-commerce",
    role: "Lead Designer",
    year: "2024",
    description: "Complete digital transformation for a premium timepiece retailer, featuring immersive product experiences and sophisticated micro-interactions.",
    featured: true
  },
  {
    id: "nocturne",
    title: "Nocturne",
    subtitle: "Boutique Hotel Brand System",
    role: "Brand Designer",
    year: "2023",
    description: "Comprehensive brand identity and digital presence for an upscale hospitality group."
  },
  {
    id: "tiller",
    title: "Tiller",
    subtitle: "Fintech Dashboard",
    role: "Product Designer",
    year: "2022",
    description: "Data-rich financial platform with intuitive visualization and seamless user workflows."
  }
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

      // Project cards cascade
      const projectCards = gridRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        gsap.from(projectCards, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%"
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <main ref={containerRef} className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-display font-serif font-bold mb-6">Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated selection of premium digital experiences and brand identities.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="space-y-8">
          {/* Featured Project */}
          {projects.filter(p => p.featured).map((project) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="surface-card p-8 lg:p-12 rounded-lg hover:shadow-large transition-all duration-500 hover:-translate-y-2">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-primary">Featured</span>
                      <div className="h-px flex-1 bg-border"></div>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    
                    <h2 className="text-display font-serif font-bold text-foreground">
                      {project.title}
                    </h2>
                    
                    <h3 className="text-xl text-muted-foreground">
                      {project.subtitle}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-foreground">
                        {project.role}
                      </span>
                      <span className="text-muted-foreground">→</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-6">
                    <div className="aspect-[4/3] bg-gradient-hero rounded-lg relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      {/* Project Preview */}
                      <div className="absolute inset-4 bg-surface rounded-lg shadow-soft"></div>
                      <div className="absolute inset-8 bg-surface-elevated rounded-lg"></div>
                      
                      {/* Hover Video Preview Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(p => !p.featured).map((project) => (
              <div
                key={project.id}
                className="project-card group cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="surface-card p-6 rounded-lg hover:shadow-large transition-all duration-500 hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="aspect-[4/3] bg-gradient-hero rounded-lg mb-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-4 bg-surface rounded-lg shadow-soft"></div>
                    <div className="absolute inset-8 bg-surface-elevated rounded-lg"></div>
                    
                    {/* Copper glow on hover */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-serif font-bold text-foreground">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    
                    <p className="text-muted-foreground">{project.subtitle}</p>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="pt-2">
                      <span className="text-sm font-medium text-primary">
                        {project.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="surface-card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-lg shadow-large">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-display font-serif font-bold text-foreground mb-2">
                    {selectedProject.title}
                  </h2>
                  <h3 className="text-xl text-muted-foreground">
                    {selectedProject.subtitle}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* Project Gallery */}
              <div className="aspect-[16/9] bg-gradient-hero rounded-lg mb-8">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Project Gallery Coming Soon
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This project showcases the intersection of luxury branding and modern digital experiences, 
                    featuring sophisticated animation systems and meticulous attention to detail.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Role</h4>
                    <p className="text-muted-foreground">{selectedProject.role}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Year</h4>
                    <p className="text-muted-foreground">{selectedProject.year}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'GSAP', 'Three.js'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Projects;