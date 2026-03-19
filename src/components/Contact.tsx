import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { getApiBaseUrl, getRecaptchaSiteKey } from '../config';

type ContactProps = {
  address: string;
  businessId: string;
};

function Contact({ address, businessId }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (recaptchaRef.current && window.grecaptcha && window.grecaptcha.render) {
        if (recaptchaWidgetId.current === null) {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: getRecaptchaSiteKey(),
          });
          clearInterval(interval);
        }
      }
    }, 100); // Check every 100ms for grecaptcha to be loaded

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedbackMessage('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedbackMessage('Please fill out all fields.');
      setStatus('error');
      return;
    }
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFeedbackMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    const captchaToken = window.grecaptcha.getResponse(recaptchaWidgetId.current ?? undefined);
    if (!captchaToken) {
      setFeedbackMessage('Please complete the CAPTCHA.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/v1/public/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          form_type: 'contact',
          form_data: { name, email, message },
          submitter_email: email,
          captcha_token: captchaToken,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage('Thank you for your message! We will get back to you soon.');
        setName('');
        setEmail('');
        setMessage('');
        if (recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        }
      } else {
        const errorData = await response.json();
        setStatus('error');
        setFeedbackMessage(errorData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setFeedbackMessage('An unexpected error occurred. Please try again.');
    }
  };

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
          <div className="contact-form-container">
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <div ref={recaptchaRef} className="g-recaptcha"></div>
              <button type="submit" className="btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {feedbackMessage && (
                <p className={`feedback-message ${status}`}>
                  {feedbackMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;