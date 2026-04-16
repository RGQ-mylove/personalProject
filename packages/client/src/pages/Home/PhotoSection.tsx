const PHOTOS = [
  { emoji: '🏔️', label: 'Mountains' },
  { emoji: '🌊', label: 'Ocean' },
  { emoji: '🌅', label: 'Sunset' },
  { emoji: '🏙️', label: 'City' },
  { emoji: '🌿', label: 'Nature' },
  { emoji: '🌌', label: 'Stars' },
];

const PhotoSection = () => (
  <section className="photo-section">
    <h2>Moments</h2>
    <div className="photo-rail">
      {PHOTOS.map((p) => (
        <div key={p.label} className="photo-card">
          <div className="photo-card-placeholder">
            <span>{p.emoji}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PhotoSection;
