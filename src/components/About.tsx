type AboutProps = {
  description: string;
};

function About({ description }: AboutProps) {
  return (
    <section id="about">
      <div className="container">
        <h2>About Us</h2>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          {description}
        </p>
      </div>
    </section>
  );
}

export default About;