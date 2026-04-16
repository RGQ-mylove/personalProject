import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import './ParticleBackground.css';

const ACCENT_COLORS = ['#00d4ff', '#a855f7', '#22d3ee', '#6366f1', '#818cf8'];
const COMPLIMENTS = [
  'Brilliant ✨', 'Creative Mind 🎨', 'Kind Heart 💖', 'Quick Learner 🧠',
  'Great Taste 🎵', 'Inspiring ✨', 'Wonderful 🌟', 'Unique Soul 🦋',
  'Talented 🎯', 'Amazing 💫', 'Strong 💪', 'Thoughtful 🌙',
  'Visionary 🔭', 'Fearless 🦁', 'Radiant ☀️', 'Authentic 💎',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  text?: string;
  textOpacity: number;
  life?: number;
  maxLife?: number;
}

export interface ParticleBackgroundRef {
  addParticle: (x: number, y: number, text?: string) => void;
}

const ParticleBackground = forwardRef<ParticleBackgroundRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const createParticle = useCallback((x: number, y: number, text?: string): Particle => {
    return {
      x: x ?? Math.random() * window.innerWidth,
      y: y ?? Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: text ? 3 : Math.random() * 2 + 1,
      color: ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)],
      opacity: Math.random() * 0.5 + 0.3,
      text: text || undefined,
      textOpacity: 0,
      life: text ? 300 : undefined,
      maxLife: text ? 300 : undefined,
    };
  }, []);

  useImperativeHandle(ref, () => ({
    addParticle: (x: number, y: number, text?: string) => {
      const count = text ? 1 : 5;
      for (let i = 0; i < count; i++) {
        const offsetX = text ? 0 : (Math.random() - 0.5) * 60;
        const offsetY = text ? 0 : (Math.random() - 0.5) * 60;
        const p = createParticle(x + offsetX, y + offsetY, text);
        particlesRef.current.push(p);
      }
    },
  }), [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Enable pointer events for mouse tracking
    canvas.style.pointerEvents = 'auto';

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles
    const count = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 8000));
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
      ));
    }

    let hoveredParticle: Particle | null = null;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      let newHovered: Particle | null = null;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Life management for added particles
        if (p.life !== undefined) {
          p.life!--;
          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }
          const lifeRatio = p.life / (p.maxLife || 1);
          p.opacity = lifeRatio * 0.8;
        }

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Hover detection
        if (dist < 30 && !p.text) {
          newHovered = p;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Tooltip
      if (tooltipRef.current) {
        if (newHovered && newHovered !== hoveredParticle) {
          const compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
          tooltipRef.current.textContent = compliment;
          newHovered.text = compliment;
        }
        if (newHovered) {
          tooltipRef.current.style.left = `${newHovered.x + 15}px`;
          tooltipRef.current.style.top = `${newHovered.y - 10}px`;
          tooltipRef.current.classList.add('visible');
        } else {
          tooltipRef.current.classList.remove('visible');
        }
      }
      hoveredParticle = newHovered;

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [createParticle]);

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas" />
      <div ref={tooltipRef} className="particle-tooltip" />
    </>
  );
});

ParticleBackground.displayName = 'ParticleBackground';
export default ParticleBackground;
