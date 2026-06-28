import { useState } from 'react';
import { colors, fonts } from '../theme';
import { useAuth } from './AuthProvider';

// Passwordless sign-in screen. Enter an email, get a magic link, click it.
export function SignIn() {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e?.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      await signInWithMagicLink(email);
      setSent(true);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <Brand />
      {sent ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: `400 26px ${fonts.serif}`, color: colors.ink, marginBottom: 10 }}>
            Check your inbox
          </div>
          <div style={{ font: `400 14px/1.5 ${fonts.sans}`, color: colors.muted2, marginBottom: 22 }}>
            We sent a sign-in link to <b style={{ color: colors.ink }}>{email}</b>. Open it on this
            device to continue.
          </div>
          <button
            onClick={() => setSent(false)}
            style={{ font: `600 13px ${fonts.sans}`, color: colors.accent }}
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div style={{ font: `400 27px ${fonts.serif}`, color: colors.ink, marginBottom: 6 }}>
            Welcome home
          </div>
          <div style={{ font: `400 14px/1.5 ${fonts.sans}`, color: colors.muted2, marginBottom: 22 }}>
            Sign in to keep your household in sync. No password — we'll email you a link.
          </div>

          <label style={{ font: `600 12px ${fonts.sans}`, color: colors.muted2, display: 'block', marginBottom: 8 }}>
            Email
          </label>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              border: '1px solid #e5d6c3',
              background: colors.inputBg,
              borderRadius: 12,
              padding: '12px 14px',
              font: `500 14px ${fonts.sans}`,
              color: colors.ink,
              outline: 'none',
              marginBottom: error ? 8 : 18,
            }}
          />
          {error && (
            <div style={{ font: `500 12.5px ${fonts.sans}`, color: colors.accentDark, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !email.trim()}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: 22,
              background: colors.accent,
              color: '#fff',
              font: `600 14px ${fonts.sans}`,
              boxShadow: '0 2px 8px rgba(194,114,74,.3)',
              opacity: busy || !email.trim() ? 0.6 : 1,
              cursor: busy || !email.trim() ? 'default' : 'pointer',
            }}
          >
            {busy ? 'Sending…' : 'Send me a link'}
          </button>
        </form>
      )}
    </Shell>
  );
}

// Centered card on the warm background — shared by SignIn and Onboarding.
export function Shell({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: '100%',
          background: colors.card,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 22,
          padding: '34px 34px 36px',
          boxShadow: '0 24px 60px rgba(40,25,15,.12)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: colors.accent }} />
      <div style={{ font: `400 25px ${fonts.serif}`, color: colors.ink, lineHeight: 1 }}>Tend</div>
    </div>
  );
}
