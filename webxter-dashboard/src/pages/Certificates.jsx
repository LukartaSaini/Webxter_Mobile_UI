import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Certificates({ onBack }) {
  const { certificates, enrolled, getProgress, user } = useApp();
  const [active, setActive] = useState(null);
  const inProgress = enrolled.filter(c => getProgress(c) < 100);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ background:  'linear-gradient(120deg, rgb(81 110 185) 0%, #1c3050 100%)', padding: '52px 22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div onClick={onBack} style={{ color: '#6ee7b7', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>‹ Back</div>
        <div style={{ color: '#6ee7b7', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>ACHIEVEMENTS</div>
        <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>Certificates</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>{certificates.length} earned · {inProgress.length} in progress</div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>

        {/* Earned */}
        <div style={{ fontSize: 13, fontWeight: 700, color: '#5F6368', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Earned</div>

        {certificates.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px', textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🏆</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0B1120', marginBottom: 6 }}>No certificates yet</div>
            <div style={{ fontSize: 13, color: '#9AA0A6' }}>Complete all lectures in a course to earn one</div>
          </div>
        ) : (
          certificates.map(c => (
            <div key={c.id} onClick={() => setActive(c)}
              style={{ borderRadius: 20, marginBottom: 14, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
              {/* Certificate card */}
              <div style={{ background: `linear-gradient(135deg,${c.color},${c.color}bb)`, padding: '20px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.12 }}>🏆</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>CERTIFICATE OF COMPLETION</div>
                <div style={{ color: '#fff', fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Awarded to {user.name}</div>
              </div>
              <div style={{ background: '#fff', padding: '12px 20px', display: 'flex', gap: 10 }}>
                <button style={{ flex: 1, padding: '9px', background: c.color + '15', color: c.color, border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>⬇ Download</button>
                <button style={{ flex: 1, padding: '9px', background: '#f0f9ff', color: '#0284c7', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>🔗 LinkedIn</button>
              </div>
            </div>
          ))
        )}

        {/* In Progress */}
        {inProgress.length > 0 && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#5F6368', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginTop: 8 }}>In Progress</div>
            {inProgress.map(c => {
              const progress = getProgress(c);
              const remaining = c.lectures.filter(l => !l.done).length;
              return (
                <div key={c.id} style={{ background: '#fff', borderRadius: 18, padding: '16px', marginBottom: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 13, background: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📖</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120' }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2 }}>{remaining} lectures left</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: c.color }}>{progress}%</div>
                  </div>
                  <div style={{ background: '#F1F3F4', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, background: `linear-gradient(90deg, #789CCD, #AB93D5)`,height: '100%', borderRadius: 99, transition: 'width 0.5s' }} />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Certificate modal */}
      {active && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }} onClick={() => setActive(null)}>
          <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ background: `linear-gradient(135deg,${active.color},${active.color}99)`, padding: '32px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, opacity: 0.08 }}>🏆</div>
              <div style={{ fontSize: 44, marginBottom: 8, position: 'relative' }}>🏆</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>CERTIFICATE OF COMPLETION</div>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 900, marginBottom: 6 }}>{active.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>Awarded to</div>
              <div style={{ color: '#fff', fontSize: 18, fontWeight: 800, marginTop: 4 }}>{user.name}</div>
            </div>
            <div style={{ padding: '20px', display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, padding: '13px', background: active.color, color: '#fff', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>⬇ Download</button>
              <button onClick={() => setActive(null)} style={{ padding: '13px 18px', background: '#F1F3F4', color: '#5F6368', border: 'none', borderRadius: 14, fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





