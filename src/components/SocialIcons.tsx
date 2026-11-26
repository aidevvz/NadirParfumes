export function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.8c0 3.6-2.5 6-5.8 6-3.1 0-5.6-2.5-5.6-5.6 0-3.4 2.9-6 6.6-5.5v2.8c-1.8-.4-3.6.7-3.6 2.7 0 1.6 1.2 2.8 2.7 2.8 1.6 0 2.8-1.1 2.8-3.3V3h2.9z" />
    </svg>
  );
}
