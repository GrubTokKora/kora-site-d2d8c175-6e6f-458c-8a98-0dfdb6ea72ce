import { useState } from 'react';
import type { FormEvent } from 'react';
import { subscribeToNewsletter } from '../newsletter';

type FooterProps = {
  businessId: string;
};

function Footer({ businessId }: FooterProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!emailOptIn && !smsOptIn) {
      setMessage('Please select at least one subscription option.');
      return;
    }
    if (smsOptIn && !phone) {
      setMessage('Please provide a phone number for SMS updates.');
      return;
    }
    if (emailOptIn && !email) {
      setMessage('Please provide an email for email updates.');
      return;
    }

    setStatus('loading');
    const result = await subscribeToNewsletter({
      businessId,
      email: emailOptIn ? email : undefined,
      phoneNumber: smsOptIn ? phone : undefined,
      emailOptIn,
      smsOptIn,
    });

    if (result.success) {
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      setPhone('');
    } else {
      setStatus('error');
      setMessage(result.message || 'An error occurred.');
    }
  };

  return (
    <footer className="main-footer">
      <div className="container">
        <h3>Join Our Newsletter</h3>
        <p>Get updates on special offers and events.</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Your Phone (for SMS)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="checkbox-group">
            <label>
              <input type="checkbox" checked={emailOptIn} onChange={(e) => setEmailOptIn(e.target.checked)} />
              Email
            </label>
            <label>
              <input type="checkbox" checked={smsOptIn} onChange={(e) => setSmsOptIn(e.target.checked)} />
              SMS
            </label>
          </div>
          <button type="submit" className="btn" disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
        </form>
        <p style={{ marginTop: '2rem' }}>
          &copy; {new Date().getFullYear()} Terracotta Multicuisine Restaurant & Banquet. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;