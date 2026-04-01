import React, { useEffect } from 'react';

// type: 'error' | 'success' | 'info'
export default function Toast({ message, type = 'error', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    error:   { bg: '#fef2f2', border: '#fca5a5', icon: '✕', iconBg: '#ef4444', text: '#991b1b' },
    success: { bg: '#f0fdf4', border: '#86efac', icon: '✓', iconBg: '#16a34a', text: '#166534' },
    info:    { bg: '#eff6ff', border: '#93c5fd', icon: 'ℹ', iconBg: '#2563eb', text: '#1e40af' },
  };
  const c = colors[type];

  return (
    <div style={{
      position: 'fixed', top: 56, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, width: 'calc(100% - 32px)', maxWidth: 358,
      background: c.bg, border: `1.5px solid ${c.border}`,
      borderRadius: 16, padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      animation: 'slideDown 0.3s ease',
    }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.iconBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
        {c.icon}
      </div>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: c.text, lineHeight: 1.4 }}>{message}</div>
      <div onClick={onClose} style={{ color: c.text, opacity: 0.5, cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>✕</div>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
