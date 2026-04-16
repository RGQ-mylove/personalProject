import { useState, useEffect, useRef } from 'react';

const LYRICS = [
  { time: 0, text: '♪ Intro ♪' },
  { time: 4, text: 'Under the neon lights we dance' },
  { time: 8, text: 'Through the digital expanse' },
  { time: 12, text: 'Code and rhythm intertwined' },
  { time: 16, text: 'In this world that we designed' },
  { time: 20, text: 'Every pixel tells a story' },
  { time: 24, text: 'Every line a bit of glory' },
  { time: 28, text: 'We are builders, we are dreamers' },
  { time: 32, text: 'Digital world believers ♪' },
];

const DURATION = 36;

const MusicSection = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          const next = p + 0.1;
          if (next >= DURATION) {
            setPlaying(false);
            return 0;
          }
          const pct = next / DURATION;
          const idx = LYRICS.findIndex((l, i) => {
            const nextL = LYRICS[i + 1];
            return pct >= l.time / DURATION && (!nextL || pct < nextL.time / DURATION);
          });
          if (idx >= 0) setActiveLine(idx);
          return next;
        });
      }, 100);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const toggle = () => setPlaying(!playing);

  return (
    <section className="music-section">
      <div className="music-card glass">
        <div className="music-header">
          <div className="music-cover">🎵</div>
          <div className="music-info">
            <h3>Digital Dreams</h3>
            <p>Cyber Synthwave</p>
          </div>
        </div>
        <div className="music-controls">
          <button className="music-btn" onClick={toggle}>
            {playing ? '⏸' : '▶'}
          </button>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {Math.floor(progress / DURATION * 100)}%
          </span>
        </div>
        <div className="music-progress">
          <div
            className="music-progress-fill"
            style={{ width: `${(progress / DURATION) * 100}%` }}
          />
        </div>
        <div className="music-lyrics">
          {LYRICS.map((line, i) => (
            <div key={i} className={i === activeLine ? 'active-line' : ''}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
