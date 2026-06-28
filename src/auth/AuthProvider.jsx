import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// Tracks the Supabase auth session and exposes the two actions the app needs:
// send a passwordless magic link, and sign out.
const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Passwordless sign-in: emails a one-click link that redirects back here.
  const signInWithMagicLink = useCallback(async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: (email || '').trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = { session, loading, signInWithMagicLink, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
