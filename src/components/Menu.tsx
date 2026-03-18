type MenuProps = {
  cuisine: string[];
};

function Menu({ cuisine }: MenuProps) {
  return (
    <section id="menu" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container">
        <h2>Our Menu</h2>
        <p style={{ textAlign: 'center' }}>
          We proudly serve a variety of delicious dishes. Our specialities include:
        </p>
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
          {cuisine.join(' • ')}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          Full menu coming soon!
        </p>
      </div>
    </section>
  );
}

export default Menu;