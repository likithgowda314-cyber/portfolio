import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Terminal, Wrench, Zap, Globe, Coffee, Mail, ArrowUpRight } from 'lucide-react';
import './index.css';

const BentoCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`glass-panel p-8 flex flex-col ${className}`}
    style={{ padding: '2rem' }}
  >
    {children}
  </motion.div>
);

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://api.github.com/users/likithgowda314-cyber/repos?sort=updated&per_page=20');
        const data = await res.json();
        const featured = ['clutter-clear', 'port-reaper', 'stack-sleuth', 'context-weaver'];
        setProjects(data.filter(repo => featured.includes(repo.name)));
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <div className="mesh-bg" />
      
      <main className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        
        {/* HERO SECTION */}
        <motion.header 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1 }}
          style={{ marginBottom: '4rem', maxWidth: '800px' }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ 
              display: 'inline-block', 
              padding: '0.5rem 1rem', 
              borderRadius: '99px',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--accent-cyan)'
            }}
            className="mono"
          >
            Software Engineer & Tooling Expert
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            Likith <span className="text-gradient">Gowda</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.8 }}>
            Building modern Developer Tools (DX), workflow automations, and AI-native applications. 
            Finding real-world bottlenecks and writing clean code to solve them.
          </p>
        </motion.header>

        {/* BENTO GRID */}
        <div className="bento-grid">
          
          {/* About Card - Spans 2 columns, 2 rows */}
          <BentoCard delay={0.1} className="about-card" style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
            <Terminal size={32} color="var(--accent-purple)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About Me</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              I focus on integrating <strong>Python</strong>, <strong>Node.js</strong>, and <strong>AI APIs</strong>
              to build things that actually work — whether it's an autonomous context generator, a port reaper, 
              or a background watchdog script to organize files.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              <a 
                href="https://github.com/likithgowda314-cyber" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  color: 'var(--text-primary)', textDecoration: 'none',
                  padding: '0.75rem 1.5rem', background: 'var(--bg-secondary)',
                  borderRadius: '12px', border: '1px solid var(--glass-border)',
                  fontWeight: 500, transition: 'all 0.2s'
                }}
              >
                <Github size={20} /> View GitHub
              </a>
            </div>
          </BentoCard>

          {/* Core Skills - Spans 2 cols */}
          <BentoCard delay={0.2} style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Core Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {['Python', 'Node.js', 'React', 'TypeScript', 'Java', 'Docker'].map((tech) => (
                <div key={tech} style={{ 
                  padding: '0.5rem 1rem', background: 'var(--bg-secondary)',
                  borderRadius: '8px', border: '1px solid var(--glass-border)',
                  color: 'var(--text-secondary)', fontSize: '0.875rem'
                }} className="mono">
                  {tech}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Small Feature Cards */}
          <BentoCard delay={0.3}>
            <Zap size={28} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Automation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Eliminating repetitive tasks with smart CLI tools.</p>
          </BentoCard>

          <BentoCard delay={0.4}>
            <Wrench size={28} color="var(--accent-blue)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Dev Tools</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Creating utilities to improve developer experience.</p>
          </BentoCard>

        </div>

        {/* PROJECTS SECTION */}
        <div style={{ marginTop: '6rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Featured Work</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {loading ? (
              <div style={{ color: 'var(--text-secondary)' }} className="mono">Loading projects from GitHub...</div>
            ) : projects.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)' }} className="mono">No featured projects found.</div>
            ) : (
              projects.map((repo, i) => (
                <motion.a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={repo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-panel"
                  style={{ 
                    padding: '2rem', display: 'flex', flexDirection: 'column', 
                    textDecoration: 'none', color: 'inherit',
                    position: 'relative', overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                      <Globe size={24} color="var(--accent-cyan)" />
                    </div>
                    <ArrowUpRight size={24} color="var(--text-secondary)" />
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{repo.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', flex: 1 }}>
                    {repo.description || "A developer tool."}
                  </p>
                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {repo.topics.slice(0, 3).map(t => (
                        <span key={t} className="mono" style={{ 
                          fontSize: '0.75rem', color: 'var(--accent-purple)', 
                          padding: '0.25rem 0.75rem', background: 'rgba(168, 85, 247, 0.1)',
                          borderRadius: '99px'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.a>
              ))
            )}
          </div>
        </div>

      </main>
    </>
  );
}

export default App;
