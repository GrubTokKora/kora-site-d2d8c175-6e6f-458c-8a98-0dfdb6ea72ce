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
 * Retrieves the Google reCAPTCHA v2 site key.
 * Falls back to a public test key if not provided.
 */
export function getRecaptchaSiteKey(): string {
  if (typeof window !== 'undefined') {
    const maybeConfig = (window as any).KORA_CONFIG;
    const configured = typeof maybeConfig?.recaptchaSiteKey === 'string' ? maybeConfig.recaptchaSiteKey.trim() : '';
    if (configured) {
      return configured;
    }
  }
  // This is Google's public test site key for reCAPTCHA v2.
  // It will always pass validation. A real key should be provided by the runtime.
  return '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
}