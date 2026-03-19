type ContactProps = {
  address: string;
};

function Contact({ address }: ContactProps) {
  return (
    <section id="contact" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Contact Us</h2>
        <div className="contact-info" style={{ marginTop: '2rem' }}>
          <h3>Visit Us</h3>
          <p>{address}</p>
          <h3>Call Us</h3>
          <p>Phone: (123) 456-7890</p>
          <h3>Email Us</h3>
          <p>Email: contact@terracottarestaurant.com</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;