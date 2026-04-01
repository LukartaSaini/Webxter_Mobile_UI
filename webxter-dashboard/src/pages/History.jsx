import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function History({ onBack }) {
  const { history } = useApp();
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const shown = filter === 'notes' ? history.filter(h => h.lecture.notes) : history;

  // Group by course
  const grouped = shown.reduce((acc, h) => {
    if (!acc[h.courseTitle]) acc[h.courseTitle] = { color: h.courseColor, items: [] };
    acc[h.courseTitle].items.push(h);
    return acc;
  }, {});

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0B1120,#b45309)', padding: '52px 22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div onClick={onBack} style={{ color: '#fcd34d', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>‹ Back</div>
        <div style={{ color: '#fcd34d', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>LEARNING HISTORY</div>
        <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>History</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>{history.length} lectures completed</div>

        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: 4, marginTop: 18 }}>
          {[{ key: 'all', label: `All (${history.length})` }, { key: 'notes', label: `Notes (${history.filter(h => h.lecture.notes).length})` }].map(t => (
            <button key={t.key} onClick={() => setFilter(t.key)}
              style={{ flex: 1, padding: '9px', borderRadius: 11, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, transition: 'all 0.2s', background: filter === t.key ? '#fff' : 'transparent', color: filter === t.key ? '#b45309' : 'rgba(255,255,255,0.7)' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#5F6368', marginBottom: 6 }}>Nothing here yet</div>
            <div style={{ fontSize: 13, color: '#9AA0A6' }}>{filter === 'notes' ? 'Save notes on lectures to see them here' : 'Complete lectures to build your history'}</div>
          </div>
        ) : (
          Object.entries(grouped).map(([courseTitle, group]) => (
            <div key={courseTitle} style={{ marginBottom: 20 }}>
              {/* Course label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <div style={{ fontSize: 13, fontWeight: 700, color: '#5F6368' }}>{courseTitle}</div>
                <div style={{ flex: 1, height: 1, background: '#E0E0E0' }} />
                <div style={{ fontSize: 11, color: '#9AA0A6' }}>{group.items.length} lectures</div>
              </div>

              {group.items.map((h, i) => (
                <div key={i} onClick={() => setActive(h)}
                  style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', marginBottom: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: group.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🎬</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.lecture.title}</div>
                    <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2, display: 'flex', gap: 8 }}>
                      <span>⏱ {h.lecture.duration}</span>
                      {h.lecture.notes && <span style={{ color: '#f59e0b' }}>📝 Notes saved</span>}
                    </div>
                  </div>
                  <div style={{ color: '#c7c7cc', fontSize: 18 }}>›</div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Bottom sheet */}
      {active && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }} onClick={() => setActive(null)}>
          <div style={{ background: '#fff', borderRadius: '28px 28px 0 0', padding: '8px 24px 32px', width: '100%', maxHeight: '70vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: '#E0E0E0', margin: '12px auto 20px' }} />
            <div style={{ display: 'inline-block', background: active.courseColor + '18', color: active.courseColor, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, marginBottom: 8, textTransform: 'uppercase' }}>{active.courseTitle}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0B1120', marginBottom: 4 }}>{active.lecture.title}</div>
            <div style={{ fontSize: 13, color: '#9AA0A6', marginBottom: 20 }}>⏱ {active.lecture.duration}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120', marginBottom: 10 }}>📝 Saved Notes</div>
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: active.lecture.notes ? '#5F6368' : '#9AA0A6', lineHeight: 1.7, minHeight: 60 }}>
              {active.lecture.notes || 'No notes saved for this lecture.'}
            </div>
            <button onClick={() => setActive(null)}
              style={{ width: '100%', marginTop: 16, padding: '13px', background: '#F1F3F4', color: '#5F6368', border: 'none', borderRadius: 14, fontWeight: 700, cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}





