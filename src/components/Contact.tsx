import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';

type ContactProps = {
  address: string;
  businessId: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function getApiBaseUrl(): string {
  if (typeof window !== 'undefined' && window.KORA_CONFIG?.apiBaseUrl) {
    return window.KORA_CONFIG.apiBaseUrl.trim().replace(/\/+$/, '');
  }
  return 'https://kora-agent.quseappdev.com';
}

function Contact({ address, businessId }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  const recaptchaSiteKey = window.KORA_CONFIG?.recaptchaSiteKey || '6LfRt44sAAAAACVTvFvGjoufmEcZqZk_pT4T_5Xd'; // Fallback to a test key

  useEffect(() => {
    if (window.grecaptcha && recaptchaRef.current) {
      recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: recaptchaSiteKey,
        callback: (token) => setRecaptchaToken(token),
        'expired-callback': () => setRecaptchaToken(''),
      });
    }
  }, [recaptchaSiteKey]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !message) {
      setError('Please fill out all fields.');
      return;
    }
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA.');
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
          captcha_token: recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
      setRecaptchaToken('');

    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again later.');
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
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <div ref={recaptchaRef} style={{ marginBottom: '1rem' }}></div>
              <button type="submit" className="btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
              {status === 'success' && <p style={{ color: 'green', marginTop: '1rem' }}>Thank you! Your message has been sent.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
