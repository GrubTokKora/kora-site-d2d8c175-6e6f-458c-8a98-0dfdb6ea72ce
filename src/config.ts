// This file centralizes runtime configuration access.
// It reads from the global window.KORA_CONFIG object, which is
// expected to be injected by the hosting environment.

/**
 * Retrieves the API base URL.
 * Falls back to a default if not provided.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const maybeConfig = (window as any).KORA_CONFIG;
    const configured = typeof maybeConfig?.apiBaseUrl === 'string' ? maybeConfig.apiBaseUrl.trim() : '';
    if (configured) {
      return configured.replace(/\/+$/, '');
    }
  }
  // Fallback for local development or if not injected.
  return 'https://kora-agent.quseappdev.com';
}

/**
 * Retrieves the reCAPTCHA v2 site key.
 * Falls back to a placeholder if not provided.
 */
export function getRecaptchaSiteKey(): string {
  if (typeof window !== 'undefined') {
    const maybeConfig = (window as any).KORA_CONFIG;
    const configured = typeof maybeConfig?.recaptchaSiteKey === 'string' ? maybeConfig.recaptchaSiteKey.trim() : '';
    if (configured) {
      return configured;
    }
  }
  // A placeholder key for local development.
  // This key will show a warning but is usable for testing.
  return '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
}

