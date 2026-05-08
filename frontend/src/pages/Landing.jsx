import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, MonitorPlay, Infinity, Award, Sparkles, Zap } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page" style={{minHeight: '100vh', width: '100%', backgroundColor: 'var(--bg-main)', color: 'var(--text-dark)', position: 'relative', overflow: 'hidden'}}>
      
      {/* Fun Background Blobs */}
      <div style={{position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, var(--card-purple) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(60px)', zIndex: 0}}></div>
      <div style={{position: 'absolute', bottom: '10%', right: '-5%', width: '30%', height: '40%', background: 'radial-gradient(circle, var(--card-green) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(60px)', zIndex: 0}}></div>
      <div style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', height: '20%', background: 'radial-gradient(circle, var(--card-yellow) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(80px)', zIndex: 0}}></div>

      {/* Navigation */}
      <nav style={{position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', padding: '1.5rem 4rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <div style={{background: 'var(--text-dark)', color: 'white', padding: '0.4rem', borderRadius: '8px'}}><BookOpen size={20} /></div> Mini LMS
        </div>
        <div style={{display: 'flex', gap: '1.5rem'}}>
          <button className="btn btn-outline" style={{borderRadius: '99px'}} onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-primary" style={{borderRadius: '99px', background: 'var(--text-dark)', color: 'white'}} onClick={() => navigate('/register')}>Get Started <Zap size={16}/></button>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{position: 'relative', zIndex: 10, padding: '8rem 2rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto'}} className="animate-fade-in">
         <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e9e6ff', color: '#6A5ACD', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2rem'}}>
            <Sparkles size={16} /> New Platform Launch 2026
         </div>
         <h1 style={{fontSize: '4.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-2px'}}>
            Master your potential with <br/><span style={{background: 'linear-gradient(90deg, #6A5ACD, #4CAF50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>immersive learning.</span>
         </h1>
         <p style={{fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6}}>
            A premium educational platform offering perfectly structured courses, infinite playback, and deep analytical tracking built for modern minds.
         </p>
         <button className="btn" style={{fontSize: '1.1rem', fontWeight: 700, padding: '1.2rem 3rem', borderRadius: '99px', background: 'linear-gradient(45deg, #6A5ACD, #9b9aff)', color: 'white', boxShadow: '0 10px 25px rgba(106, 90, 205, 0.3)'}} onClick={() => navigate('/register')}>
            Start Exploring Courses <ArrowRight size={20} />
         </button>
      </header>

      {/* Infinite Marquee Section */}
      <div style={{position: 'relative', zIndex: 10, padding: '3rem 0', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(5px)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', transform: 'rotate(-1deg) scale(1.02)'}}>
         <p style={{textAlign:'center', fontSize:'0.85rem', fontWeight:700, color:'var(--text-muted)', marginBottom:'1.5rem', letterSpacing:'2px', textTransform:'uppercase'}}>Trusted by industry leading organizations</p>
         <div className="marquee-container" style={{transform: 'rotate(1deg)'}}>
             <div className="marquee-content">
                {[...Array(2)].map((_, i) => (
                    <div key={i} style={{display:'flex', gap:'5rem', alignItems:'center', paddingRight:'5rem'}}>
                        {['Harvard', 'Google', 'MIT', 'Microsoft', 'Stanford', 'Amazon', 'NASA'].map((logo, idx) => (
                            <h2 key={idx} style={{opacity: 0.3, fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', transition: 'opacity 0.3s'}} className="hover-opacity-1">{logo}</h2>
                        ))}
                    </div>
                ))}
             </div>
         </div>
      </div>

      {/* Bento Grid Section */}
      <section style={{position: 'relative', zIndex: 10, padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto'}}>
         <h2 style={{fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem', textAlign: 'center', letterSpacing: '-1px'}}>Everything you need to <span style={{position: 'relative', display: 'inline-block'}}><span style={{position: 'relative', zIndex: 1}}>succeed.</span><span style={{position: 'absolute', bottom: '10%', left: 0, width: '100%', height: '30%', background: 'var(--card-yellow)', zIndex: 0}}></span></span></h2>
         
         <div className="bento-grid">
            <div className="bento-item span-2 hoverable fun-card" style={{background: 'var(--card-purple)', color: 'white', display:'flex', flexDirection:'column', justifyContent:'center', position: 'relative', overflow: 'hidden'}}>
              <div className="float-anim" style={{position: 'absolute', right: '-10%', top: '-20%', opacity: 0.1}}><MonitorPlay size={400} /></div>
              <MonitorPlay size={48} style={{marginBottom: '1.5rem', zIndex: 1}} />
              <h3 style={{fontSize: '2rem', marginBottom: '1rem', fontWeight: 800, zIndex: 1, letterSpacing: '-1px'}}>Immersive Player</h3>
              <p style={{opacity: 0.9, fontSize: '1.1rem', zIndex: 1, maxWidth: '80%'}}>Stream premium educational content across all your devices without any annoying interruptions.</p>
            </div>
            
            <div className="bento-item hoverable fun-card" style={{background: 'var(--card-green)', display: 'flex', flexDirection: 'column'}}>
              <div style={{background: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'auto'}}>
                 <Award size={30} style={{color: 'var(--card-green)'}} />
              </div>
              <div>
                 <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: 800, letterSpacing: '-0.5px'}}>Expert Tutors</h3>
                 <p style={{color: 'var(--text-dark)', opacity: 0.8, fontSize: '0.95rem'}}>Learn straight from verified industry professionals.</p>
              </div>
            </div>

            <div className="bento-item hoverable fun-card" style={{background: 'var(--card-yellow)', display: 'flex', flexDirection: 'column'}}>
              <div style={{background: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'auto'}}>
                  <Infinity size={30} style={{color: 'var(--card-yellow)'}} />
              </div>
              <div>
                 <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: 800, letterSpacing: '-0.5px'}}>Lifetime Access</h3>
                 <p style={{color: 'var(--text-dark)', opacity: 0.8, fontSize: '0.95rem'}}>Once enrolled, your premium courses never expire.</p>
              </div>
            </div>
         </div>
      </section>

      <footer style={{position: 'relative', zIndex: 10, padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid rgba(0,0,0,0.05)'}}>
         <p>© 2026 Mini LMS natively built by Antigravity.</p>
      </footer>
    </div>
  );
};

export default Landing;
