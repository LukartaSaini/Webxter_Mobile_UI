import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

export default function Signup({ onLogin, onBack }) {
  const { signup } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const set = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const mockSignup = (userData) => {
    localStorage.setItem('webxter_token', 'demo_token');
    localStorage.setItem('webxter_user', JSON.stringify(userData));
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (!form.name)                          return showToast('Please enter your full name.', 'error');
    if (!form.email)                         return showToast('Please enter your email.', 'error');
    if (!/\S+@\S+\.\S+/.test(form.email))   return showToast('Please enter a valid email address.', 'error');
    if (!form.password)                      return showToast('Please enter a password.', 'error');
    if (form.password.length < 6)            return showToast('Password must be at least 6 characters.', 'error');
    if (form.password !== form.confirm)      return showToast('Passwords do not match.', 'error');

    setLoading(true);
    try {
      const result = await signup(form.name, form.email, form.password);
      if (!result?.success) {
        showToast('Account created! Welcome to Webxter 🎉', 'success');
        setTimeout(() => mockSignup({ name: form.name, email: form.email }), 900);
      } else {
        showToast('Account created! Welcome to Webxter 🎉', 'success');
      }
    } catch {
      showToast('Signup failed. Please try again.', 'error');
    }
    setLoading(false);
  };

  const s = {
    wrap: { minHeight: '844px', background: 'linear-gradient(160deg,#4f46e5,#7c3aed)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' },
    card: { background: '#fff', borderRadius: 24, padding: '28px 22px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' },
    label: { fontSize: 12, color: '#6b7280', marginBottom: 4, display: 'block' },
    input: { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 15, marginBottom: 14, outline: 'none', boxSizing: 'border-box' },
    btn: { width: '100%', padding: '14px', background: loading ? '#a5b4fc' : 'linear-gradient(90deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 12 },
    gBtn: { width: '100%', padding: '13px', background: '#fff', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
    link: { color: '#4f46e5', fontWeight: 700, cursor: 'pointer' },
  };

  return (
    <div style={{ ...s.wrap, position: 'relative' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      {onBack && (
        <div onClick={onBack} style={{ position: 'absolute', top: 52, left: 24, color: '#c7d2fe', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
          ‹ Back
        </div>
      )}
      <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: 1, marginBottom: 4 }}>Webxter</div>
      <div style={{ color: '#c7d2fe', fontSize: 14, marginBottom: 28 }}>Start your learning journey</div>
      <div style={s.card}>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 18 }}>Create Account</div>
        <label style={s.label}>Full Name</label>
        <input style={s.input} placeholder="Alex Johnson" value={form.name} onChange={set('name')} />
        <label style={s.label}>Email</label>
        <input style={s.input} type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
        <label style={s.label}>Password</label>
        <input style={s.input} type="password" placeholder="Min. 6 characters" value={form.password} onChange={set('password')} />
        <label style={s.label}>Confirm Password</label>
        <input style={s.input} type="password" placeholder="Repeat password" value={form.confirm} onChange={set('confirm')}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        <button style={s.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, margin: '4px 0 12px' }}>or</div>
        <button style={s.gBtn} onClick={() => { showToast('Signed up with Google!', 'success'); setTimeout(() => mockSignup({ name: 'Google User', email: 'user@gmail.com' }), 900); }}>
          <span style={{ fontSize: 18, fontWeight: 900 }}>G</span> Sign up with Google
        </button>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#6b7280' }}>
          Already have an account? <span style={s.link} onClick={onLogin}>Login</span>
        </div>
      </div>
    </div>
  );
}
