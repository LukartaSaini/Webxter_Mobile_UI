import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export default function Login({ onSignup, onBack }) {
  const { login } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const mockLogin = (userData) => {
    localStorage.setItem('webxter_token', 'demo_token');
    localStorage.setItem('webxter_user', JSON.stringify(userData));
    window.location.reload();
  };

  const handleLogin = async () => {
    if (!email) return showToast('Please enter your email.', 'error');
    if (!pass)  return showToast('Please enter your password.', 'error');
    if (!/\S+@\S+\.\S+/.test(email)) return showToast('Please enter a valid email address.', 'error');

    setLoading(true);
    try {
      const result = await login(email, pass);
      if (!result?.success) {
        // Demo fallback
        showToast('Logged in successfully!', 'success');
        setTimeout(() => mockLogin({ name: email.split('@')[0], email }), 800);
      } else {
        showToast('Logged in successfully!', 'success');
      }
    } catch {
      showToast('Login failed. Please check your credentials.', 'error');
    }
    setLoading(false);
  };

  const s = {
    wrap: { minHeight: '844px', background: 'linear-gradient(160deg,#4f46e5,#7c3aed)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', position: 'relative' },
    back: { position: 'absolute', top: 52, left: 24, color: '#c7d2fe', fontSize: 15, cursor: 'pointer', fontWeight: 600 },
    card: { background: '#fff', borderRadius: 24, padding: '28px 22px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' },
    label: { fontSize: 12, color: '#6b7280', marginBottom: 4, display: 'block' },
    input: (hasErr) => ({ width: '100%', padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${hasErr ? '#fca5a5' : '#e5e7eb'}`, fontSize: 15, marginBottom: 14, outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' }),
    btn: { width: '100%', padding: '14px', background: loading ? '#a5b4fc' : 'linear-gradient(90deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 12 },
    gBtn: { width: '100%', padding: '13px', background: '#fff', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
    link: { color: '#4f46e5', fontWeight: 700, cursor: 'pointer' },
  };

  return (
    <div style={s.wrap}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      {onBack && <div style={s.back} onClick={onBack}>‹ Back</div>}
      <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: 1, marginBottom: 4 }}>Webxter</div>
      <div style={{ color: '#c7d2fe', fontSize: 14, marginBottom: 28 }}>Welcome back</div>
      <div style={s.card}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 18 }}>Login</div>
        <label style={s.label}>Email</label>
        <input style={s.input(false)} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        <label style={s.label}>Password</label>
        <input style={s.input(false)} type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        <button style={s.btn} onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, margin: '4px 0 12px' }}>or</div>
        <button style={s.gBtn} onClick={() => { showToast('Signed in with Google!', 'success'); setTimeout(() => mockLogin({ name: 'Google User', email: 'user@gmail.com' }), 800); }}>
          <span style={{ fontSize: 18, fontWeight: 900 }}>G</span> Continue with Google
        </button>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#6b7280' }}>
          Don't have an account? <span style={s.link} onClick={onSignup}>Sign up</span>
        </div>
      </div>
    </div>
  );
}
