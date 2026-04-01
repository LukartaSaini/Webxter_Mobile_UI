import React, { useEffect, useState } from 'react';

export default function Splash({ onDone }) {
  const [phase, setPhase] = useState(0);
  // phase 0 → logo fades in + scales up
  // phase 1 → tagline slides up
  // phase 2 → progress bar fills
  // phase 3 → whole screen fades out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2600);
    const t4 = setTimeout(() => onDone(), 3200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 999,
      background: 'linear-gradient(160deg,#1e1b4b 0%,#312e81 50%,#4f46e5 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 3 ? 0 : 1,
      transition: phase === 3 ? 'opacity 0.6s ease' : 'none',
    }}>

      {/* Glow rings */}
      <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: '1px solid rgba(165,180,252,0.15)', animation: 'pulse 2.5s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(165,180,252,0.2)', animation: 'pulse 2.5s ease-in-out infinite 0.4s' }} />

      {/* Logo icon */}
      <div style={{
        width: 90, height: 90, borderRadius: 26,
        background: 'linear-gradient(135deg,rgba(255,255,255,0.25),rgba(255,255,255,0.08))',
        backdropFilter: 'blur(10px)',
        border: '1.5px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44, marginBottom: 20,
        opacity: phase >= 0 ? 1 : 0,
        transform: phase >= 0 ? 'scale(1)' : 'scale(0.5)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: '0 8px 32px rgba(79,70,229,0.4)',
      }}>🎓</div>

      {/* App name */}
      <div style={{
        fontSize: 36, fontWeight: 900, color: '#fff',
        letterSpacing: 2, marginBottom: 6,
        opacity: phase >= 0 ? 1 : 0,
        transform: phase >= 0 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
      }}>Webxter</div>

      {/* Tagline */}
      <div style={{
        fontSize: 14, color: '#a5b4fc', letterSpacing: 1, fontWeight: 500,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        marginBottom: 52,
      }}>Learn · Grow · Achieve</div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 60,
        width: 140,
        opacity: phase >= 2 ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 99, height: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            background: 'linear-gradient(90deg,#a5b4fc,#fff)',
            width: phase >= 2 ? '100%' : '0%',
            transition: phase >= 2 ? 'width 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }} />
        </div>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 10, letterSpacing: 1 }}>
          LOADING
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2,
          borderRadius: '50%',
          background: `rgba(165,180,252,${0.2 + (i % 3) * 0.1})`,
          top: `${15 + i * 12}%`,
          left: `${10 + i * 14}%`,
          animation: `float${i % 3} ${3 + i * 0.5}s ease-in-out infinite`,
        }} />
      ))}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.5; }
        }
        @keyframes float0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
