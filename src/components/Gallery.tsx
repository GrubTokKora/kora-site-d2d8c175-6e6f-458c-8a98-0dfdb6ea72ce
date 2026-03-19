import { siteData } from '../data';

function Gallery() {
  const { gallery: images } = siteData;

  return (
    <section id="gallery">
      <div className="container">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item" 
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              role="img"
              aria-label={image.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;