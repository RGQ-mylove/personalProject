const SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Go', 'Python',
  'Docker', 'K8s', 'MySQL', 'Redis', 'Linux',
];

const SOCIALS = [
  { icon: '💬', label: 'QQ', value: '123456789' },
  { icon: '📧', label: 'Email', value: 'rq@example.com' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/renqiqing' },
  { icon: '🎮', label: 'Steam', value: 'renqiqing' },
];

const HeroSection = () => (
  <section className="hero-section">
    {/* Left: Info */}
    <div className="hero-info">
      <div className="hero-greeting">Hello, I'm</div>
      <h1 className="hero-name">Ren QiQing</h1>
      <p className="hero-bio">
        热爱编程与创造的 Full-stack Developer，喜欢探索新技术，
        用代码构建有趣的事物。相信技术可以让世界变得更美好。
      </p>

      {/* Social links */}
      <div className="hero-socials">
        {SOCIALS.map((s) => (
          <div key={s.label} className="hero-social-item">
            <span className="hero-social-icon">{s.icon}</span>
            <div>
              <div className="hero-social-label">{s.label}</div>
              <div className="hero-social-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="hero-skills">
        <div className="hero-skills-title">Tech Stack</div>
        <div className="hero-tags">
          {SKILLS.map((skill) => (
            <span key={skill} className="hero-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="scroll-hint">&#8595; 向下探索</div>
    </div>

    {/* Right: Photo */}
    <div className="hero-photo">
      <div className="hero-photo-card glass">
        <div className="hero-photo-placeholder">
          <span>🧑‍💻</span>
        </div>
        <div className="hero-photo-label">Ren QiQing</div>
        <div className="hero-photo-sub">Code · Create · Share</div>
      </div>
    </div>
  </section>
);

export default HeroSection;
