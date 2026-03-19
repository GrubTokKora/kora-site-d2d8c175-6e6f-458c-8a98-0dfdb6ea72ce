type ContactProps = {
  address: string;
};

function Contact({ address }: ContactProps) {
  return (
    <section id="contact" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container">
        <h2>Contact Us</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Visit Us</h3>
            <p>{address}</p>
            <h3>Call Us</h3>
            <p>Phone: (123) 456-7890</p>
            <h3>Email Us</h3>
            <p>Email: contact@terracottarestaurant.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;