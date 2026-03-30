const photos = [
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    alt: "Family Moments",
    label: "Family Moments",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
    alt: "The Engagement",
    label: "The Engagement",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    alt: "Shared Joy",
    label: "Shared Joy",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80",
    alt: "Traditional Union",
    label: "Traditional Union",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2 className="section-title">Moments Captured</h2>

        <div className="gallery-grid">
          {photos.map((photo) => (
            <div key={photo.label} className="gallery-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
