import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export default function Landing() {
  const { login, signup } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const mockAuth = (userData) => {
    localStorage.setItem('webxter_token', 'demo_token');
    localStorage.setItem('webxter_user', JSON.stringify(userData));
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (!form.email) return showToast('Please enter your email.', 'error');
    if (!/\S+@\S+\.\S+/.test(form.email)) return showToast('Enter a valid email address.', 'error');
    if (!form.password) return showToast('Please enter your password.', 'error');
    if (mode === 'signup') {
      if (!form.name) return showToast('Please enter your full name.', 'error');
      if (form.password.length < 6) return showToast('Password must be at least 6 characters.', 'error');
      if (form.password !== form.confirm) return showToast('Passwords do not match.', 'error');
    }

    setLoading(true);
    try {
      const result = mode === 'login'
        ? await login(form.email, form.password)
        : await signup(form.name, form.email, form.password);

      if (result?.success) {
        showToast(mode === 'login' ? 'Welcome back!' : 'Account created! 🎉', 'success');
      } else {
        // No backend yet — allow any credentials as demo
        showToast(mode === 'login' ? 'Welcome back!' : 'Account created! 🎉', 'success');
        setTimeout(() => mockAuth({ name: form.name || form.email.split('@')[0], email: form.email }), 800);
      }
    } catch {
      // Fallback for demo
      showToast(mode === 'login' ? 'Welcome back!' : 'Account created! 🎉', 'success');
      setTimeout(() => mockAuth({ name: form.name || form.email.split('@')[0], email: form.email }), 800);
    }
    setLoading(false);
  };

  const s = {
    wrap: { minHeight: '844px', background: 'linear-gradient(160deg,#0f0c29 0%,#1e1b4b 50%,#4f46e5 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', position: 'relative', overflow: 'hidden' },
    blob1: { position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', filter: 'blur(50px)' },
    blob2: { position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(79,70,229,0.25)', filter: 'blur(40px)' },
    card: { background: '#fff', borderRadius: 28, padding: '28px 22px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.25)', position: 'relative' },
    tabs: { display: 'flex', background: '#f3f4f6', borderRadius: 14, padding: 4, marginBottom: 22 },
    tabBtn: (active) => ({ flex: 1, padding: '10px', borderRadius: 11, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, transition: 'all 0.2s', background: active ? '#fff' : 'transparent', color: active ? '#4f46e5' : '#9ca3af', boxShadow: active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }),
    label: { fontSize: 12, color: '#6b7280', marginBottom: 4, display: 'block' },
    input: { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 12 },
    btn: { width: '100%', padding: '14px', background: loading ? '#a5b4fc' : 'linear-gradient(90deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 12 },
    gBtn: { width: '100%', padding: '12px', background: '#fff', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  };

  return (
    <div style={s.wrap}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <div style={s.blob1} /><div style={s.blob2} />

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 28, position: 'relative' }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 12px' }}>🎓</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>Webxter</div>
        <div style={{ fontSize: 12, color: '#a5b4fc', marginTop: 4 }}>Your Personal Learning Platform</div>
      </div>

      {/* Card */}
      <div style={s.card}>
        {/* Login / Sign Up tabs */}
        <div style={s.tabs}>
          <button style={s.tabBtn(mode === 'login')} onClick={() => setMode('login')}>Login</button>
          <button style={s.tabBtn(mode === 'signup')} onClick={() => setMode('signup')}>Sign Up</button>
        </div>

        {mode === 'signup' && (
          <>
            <label style={s.label}>Full Name</label>
            <input style={s.input} placeholder="Alex Johnson" value={form.name} onChange={set('name')} />
          </>
        )}

        <label style={s.label}>Email</label>
        <input style={s.input} type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />

        <label style={s.label}>Password</label>
        <input style={s.input} type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />

        {mode === 'signup' && (
          <>
            <label style={s.label}>Confirm Password</label>
            <input style={s.input} type="password" placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} />
          </>
        )}

        <button style={s.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? '...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, margin: '4px 0 12px' }}>or</div>

        <button style={s.gBtn} onClick={() => mockAuth({ name: 'Google User', email: 'user@gmail.com' })}>
          <span style={{ fontSize: 16, fontWeight: 900 }}>G</span>
          {mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
        </button>
      </div>

      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 20, position: 'relative' }}>
        © 2026 Webxter · Free to use
      </div>
    </div>
  );
}

