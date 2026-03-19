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

