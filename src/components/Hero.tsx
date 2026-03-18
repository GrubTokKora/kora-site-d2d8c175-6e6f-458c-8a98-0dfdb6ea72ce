type HeroProps = {
  title: string;
  subtitle: string;
};

function Hero({ title, subtitle }: HeroProps) {
  return (
    <section id="home" className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}

export default Hero;