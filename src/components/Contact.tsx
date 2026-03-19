import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { getApiBaseUrl, getRecaptchaSiteKey } from '../config';

type ContactProps = {
  address: string;
  businessId: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function Contact({ address, businessId }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string; captcha?: string }>({});

  const recaptchaContainer = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  const recaptchaSiteKey = getRecaptchaSiteKey();

  useEffect(() => {
    if (window.grecaptcha && window.grecaptcha.render && recaptchaContainer.current && !recaptchaWidgetId.current) {
      recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainer.current, {
        sitekey: recaptchaSiteKey,
      });
    }
  }, [recaptchaSiteKey]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string; captcha?: string } = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!message.trim()) newErrors.message = 'Message is required.';
    
    const token = window.grecaptcha?.getResponse(recaptchaWidgetId.current ?? undefined);
    if (!token) {
      newErrors.captcha = 'Please complete the CAPTCHA.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormMessage('');
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    const token = window.grecaptcha.getResponse(recaptchaWidgetId.current ?? undefined);

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
          captcha_token: token,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      setStatus('success');
      setFormMessage('Thank you for your message! We will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
      window.grecaptcha.reset(recaptchaWidgetId.current ?? undefined);
    } catch (error) {
      setStatus('error');
      setFormMessage('Sorry, there was an error sending your message. Please try again later.');
    }
  };

  return (
    <section id="contact" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
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
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                {errors.message && <p className="error-text">{errors.message}</p>}
              </div>
              <div className="form-group">
                <div ref={recaptchaContainer}></div>
                {errors.captcha && <p className="error-text">{errors.captcha}</p>}
              </div>
              <button type="submit" className="btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {formMessage && (
                <p className={`form-status-message ${status === 'success' ? 'success' : 'error'}`}>
                  {formMessage}
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