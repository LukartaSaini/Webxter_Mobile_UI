import React from 'react';
import { useApp } from '../context/AppContext';
import { IconBook, IconVideo, IconCertificate, IconHistory, IconUser } from '../components/Icons';

const GRAD = 'linear-gradient(135deg,#3B82F6,#A855F7)';
const NAVY = '#0B1120';

export default function Dashboard({ onTabChange }) {
  const { user, enrolled, getProgress, certificates, history, totalHours, setSelectedCourseId } = useApp();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div style={{ background: '#F1F3F4', minHeight: '100%' }}>

      {/* ── HEADER ── */}
      <div style={{ background:'linear-gradient(135deg, rgb(81 110 185), #1c3050)', padding: '52px 22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        {/* Greeting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: 20 }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: 12, marginBottom: 4 }}>{greeting()} 👋</div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{user.name.split(' ')[0]}</div>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
              <span style={{ color: '#64748b', fontSize: 11 }}>Active learner</span>
            </div> */}
          </div>
          <div onClick={() => onTabChange('profile')} style={{ cursor: 'pointer', position: 'relative' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: '#fff', boxShadow: '0 4px 16px rgba(59,130,246,0.4)' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            {/* <div style={{ position: 'absolute', bottom: 2, right: 2, width: 11, height: 11, borderRadius: '50%', background: '#34d399', border: `2px solid ${NAVY}` }} /> */}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* Continue Learning */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#202124' }}>Continue Learning</div>
          <div style={{ fontSize: 12, color: '#1A73E8', fontWeight: 600, cursor: 'pointer' }} onClick={() => onTabChange('courses')}>See all →</div>
        </div>

        {enrolled.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 12, padding: '28px', textAlign: 'center', marginBottom: 16, border: '1px solid #E0E0E0' }}>
            <IconBook size={36} color="#dadce0" />
            <div style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginTop: 10, marginBottom: 6 }}>No courses yet</div>
            <div style={{ fontSize: 13, color: '#9AA0A6', marginBottom: 16 }}>Browse the catalog and start learning</div>
            <button style={{ padding: '9px 22px', background: '#1A73E8', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }} onClick={() => onTabChange('courses')}>Browse Courses</button>
          </div>
        ) : (
          enrolled.slice(0, 3).map(c => {
            const progress = getProgress(c);
            const done = c.lectures.filter(l => l.done).length;
            return (
              <div key={c.id} onClick={() => { setSelectedCourseId(c.id); onTabChange('lectures', c.id); }}
                style={{ background: '#fff', borderRadius: 12, marginBottom: 10, cursor: 'pointer', overflow: 'hidden', border: '1px solid #E0E0E0' }}>
                <div style={{ height: 5, background: `linear-gradient(90deg,${c.color},${c.color}88)` }} />
                <div style={{ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `transparent`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconBook size={20} color="#9AA0A6" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#202124', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: '#9AA0A6', marginBottom: 6 }}>{done}/{c.lectures.length} · {progress}%</div>
                    <div style={{ background: '#F1F3F4', borderRadius: 99, height: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, background: GRAD, height: '100%', borderRadius: 99, transition: 'width 0.6s' }} />
                    </div>
                  </div>
                  <div style={{ color: '#dadce0', fontSize: 20 }}>›</div>
                </div>
              </div>
            );
          })
        )}

        {/* Quick Access */}
        <div style={{ fontSize: 15, fontWeight: 700, color: '#202124', marginBottom: 12, marginTop: 8 }}>Quick Access</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { Icon: IconVideo,       label: 'Lectures',     sub: 'Watch & track',  tab: 'lectures',     bg: '#789ccd' },
            { Icon: IconHistory,     label: 'History',      sub: 'Past activity',  tab: 'history',      bg: '#ab93d5' },
            { Icon: IconCertificate, label: 'Certificates', sub: 'Achievements',   tab: 'certificates', bg: '#ab93d5' },
            { Icon: IconUser,        label: 'Profile',      sub: 'Settings',       tab: 'profile',      bg: '#789ccd' },
          ].map(q => (
            <div key={q.tab} onClick={() => onTabChange(q.tab)}
              style={{ background: q.bg, borderRadius: 14, padding: '18px 14px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              <div style={{ position: 'absolute', bottom: -8, right: -8, opacity: 0.15 }}>
                <q.Icon size={56} color="#fff" />
              </div>
              <div style={{ marginBottom: 10 }}><q.Icon size={26} color="#fff" /></div>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{q.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 3 }}>{q.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        {history.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#202124' }}>Recent Activity</div>
              <div style={{ fontSize: 12, color: '#1A73E8', fontWeight: 600, cursor: 'pointer' }} onClick={() => onTabChange('history')}>See all →</div>
            </div>
            {history.slice(0, 3).map((h, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '11px 14px', marginBottom: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #E0E0E0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: h.courseColor + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconVideo size={16} color={h.courseColor} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#202124', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.lecture.title}</div>
                  <div style={{ fontSize: 11, color: '#9AA0A6', marginTop: 1 }}>{h.courseTitle}</div>
                </div>
                <div style={{ background: '#E6F4EA', color: '#1E8E3E', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99 }}>✓ Done</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}