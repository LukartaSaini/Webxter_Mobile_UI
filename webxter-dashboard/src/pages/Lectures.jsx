import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { IconVideo, IconNote, IconLink, IconCheck, IconLock, IconBook, IconChevronRight, IconGoogleMeet, IconZoom, IconClock } from '../components/Icons';

const NAVY = '#0B1120';

// ── Anti-capture ──
function useAntiCapture(active) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'PrintScreen' || (e.metaKey && e.shiftKey)) {
        e.preventDefault();
        const el = document.getElementById('drm-overlay');
        if (el) { el.style.display = 'flex'; setTimeout(() => { el.style.display = 'none'; }, 2000); }
      }
    };
    const onVis = () => {
      const el = document.getElementById('drm-overlay');
      if (el) el.style.display = document.hidden ? 'flex' : 'none';
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('visibilitychange', onVis); };
  }, [active]);
}

function DRMOverlay() {
  return (
    <div id="drm-overlay" style={{ display: 'none', position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '28px 28px 0 0' }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>🔒</div>
      <div style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>Content Protected</div>
      <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6, textAlign: 'center', maxWidth: 220 }}>Recording and screenshots are not allowed.</div>
    </div>
  );
}

// ── Video Player ──
function parseDuration(dur) { const m = dur.match(/(\d+)/); return m ? parseInt(m[1]) * 60 : 60; }
function fmt(s) { return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`; }

function VideoPlayer({ lecture, color, onComplete }) {
  const total = parseDuration(lecture.duration);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(lecture.done);
  const ref = useRef(null);
  useAntiCapture(playing);

  useEffect(() => {
    if (!playing || current >= total) return;
    ref.current = setInterval(() => {
      setCurrent(p => {
        if (p + 1 >= total) { clearInterval(ref.current); setPlaying(false); setCompleted(true); return total; }
        return p + 1;
      });
    }, 100);
    return () => clearInterval(ref.current);
  }, [playing, current, total]);

  const pct = (current / total) * 100;

  return (
    <div style={{ position: 'relative' }}>
      <DRMOverlay />
      <div style={{ background: 'linear-gradient(135deg, rgb(81 110 185), #1c3050)', borderRadius: 14, padding: '24px 16px', textAlign: 'center', marginBottom: 12, userSelect: 'none', WebkitUserSelect: 'none', position: 'relative', overflow: 'hidden' }} onContextMenu={e => e.preventDefault()}>
        <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 10, color: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }}>© Webxter</div>
        {completed ? (
          <div><div style={{ fontSize: 40, marginBottom: 8 }}>✅</div><div style={{ color: '#fff', fontWeight: 800 }}>Lecture Complete!</div></div>
        ) : (
          <div>
            <div onClick={() => setPlaying(p => !p)} style={{ width: 56, height: 56, borderRadius: '50%', background: `${color}33`, border: `2px solid ${color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 auto 8px' }}>
              {playing ? <span style={{ color: '#fff', fontSize: 18 }}>⏸</span> : <span style={{ color: '#fff', fontSize: 18 }}>▶</span>}
            </div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>{playing ? 'Playing...' : 'Tap to play'}</div>
          </div>
        )}
      </div>
      <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '12px 14px', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{completed ? '✅ Done' : `${fmt(current)} / ${fmt(total)}`}</span>
          {completed && <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>✓ Done</span>}
        </div>
        <div style={{ background: '#e2e8f0', borderRadius: 99, height: 5, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ width: `${pct}%`, background: `linear-gradient(90deg,#3B82F6,#A855F7)`, height: '100%', borderRadius: 99, transition: 'width 0.1s linear' }} />
        </div>
        {!completed && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setPlaying(p => !p)} style={{ flex: 1, padding: '9px', background: playing ? '#f1f5f9' : 'linear-gradient(135deg,#3B82F6,#A855F7)', color: playing ? NAVY : '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{playing ? '⏸ Pause' : '▶ Play'}</button>
            <button onClick={() => { setCurrent(0); setPlaying(false); }} style={{ padding: '9px 14px', background: '#f1f5f9', color: NAVY, border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>↺</button>
          </div>
        )}
        {completed && <button onClick={onComplete} style={{ width: '100%', padding: '10px', background: '#dcfce7', color: '#16a34a', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Continue →</button>}
      </div>
    </div>
  );
}

// ── Course Card (Google Classroom style) ──
function CourseCard({ course, getProgress, onClick }) {
  const progress = getProgress(course);
  const done = course.lectures.filter(l => l.done).length;
  const bannerColors = [
   ['#789CCD','#789CCD'], // blue
  ['#AB93D5','#AB93D5'], // purple
  ['#789CCD','#789CCD'], // blue
  ['#AB93D5','#AB93D5'], // purple
  ['#789CCD','#789CCD'], // blue
  ['#AB93D5','#AB93D5'], // purple
  ];
  const [bg1, bg2] = bannerColors[course.id % bannerColors.length];

  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', cursor: 'pointer', border: '1px solid #f1f5f9' }}>
      {/* Banner */}
      <div style={{ background: `linear-gradient(135deg,${bg1},${bg2})`, height: 80, position: 'relative', padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'absolute', top: -10, right: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{course.category}</div>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 800, lineHeight: 1.2, marginTop: 2 }}>{course.title}</div>
      </div>
      {/* Footer */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#6b7280' }}>{done}/{course.lectures.length} lectures</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#6366F1' }}>{progress}%</span>
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 99, height: 4, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#3B82F6,#A855F7)', height: '100%', borderRadius: 99 }} />
        </div>
      </div>
    </div>
  );
}

// ── Course Detail Page (Google Classroom tabs) ──
function CourseDetail({ course, getProgress, toggleLecture, saveNote, onBack }) {
  const [tab, setTab] = useState('classwork');
  const [active, setActive] = useState(null);
  const [noteEdit, setNoteEdit] = useState('');
  const [sheetTab, setSheetTab] = useState('video');
  const progress = getProgress(course);
  const done = course.lectures.filter(l => l.done).length;
  const courseLinks = course.links || [];
  const courseMeetLinks = course.meetLinks || [];

  const tabs = [
    { key: 'stream', label: 'Stream' },
    { key: 'classwork', label: 'Classwork' },
    { key: 'links', label: 'Links' },
  ];

  return (
    <div style={{ background: '#f8f9fb', minHeight: '100%' }}>
      {/* Header banner */}
      <div style={{ background:'linear-gradient(135deg, rgb(81 110 185), #1c3050)', padding: '52px 20px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', filter: 'blur(30px)' }} />
        <div onClick={onBack} style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 4 }}>‹ All Courses</div>
        <div style={{ color: '#a5b4fc', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{course.category}</div>
        <div style={{ color: '#fff', fontSize: 20, fontWeight: 900, marginBottom: 4 }}>{course.title}</div>
        <div style={{ color: '#64748b', fontSize: 12, marginBottom: 14 }}>{done}/{course.lectures.length} lectures · {progress}%</div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 99, height: 4, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#3B82F6,#A855F7)', height: '100%', borderRadius: 99 }} />
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ flex: 1, padding: '12px 4px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: tab === t.key ? '#fff' : '#64748b', borderBottom: tab === t.key ? '2px solid #6366F1' : '2px solid transparent', transition: 'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* STREAM TAB */}
        {tab === 'stream' && (
          <div>
            <div style={{ background: '#fff', borderRadius: 16, padding: '16px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>W</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>Webxter</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>Course Instructor</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>Welcome to <strong>{course.title}</strong>! Complete all lectures to earn your certificate. Use the Classwork tab to track your progress.</div>
            </div>
            {course.lectures.filter(l => l.done).slice(0, 5).map((l, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '12px 16px', marginBottom: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck size={16} color="#16a34a" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Completed · {l.duration}</div>
                </div>
              </div>
            ))}
            {course.lectures.filter(l => l.done).length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8', fontSize: 13 }}>No activity yet. Start watching lectures!</div>
            )}
          </div>
        )}

        {/* CLASSWORK TAB */}
        {tab === 'classwork' && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>All Lectures</div>
            {course.lectures.map((l, i) => (
              <div key={l.id} onClick={() => { setActive(l); setNoteEdit(l.notes); setSheetTab('video'); }}
                style={{ background: '#fff', borderRadius: 14, padding: '13px 16px', marginBottom: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${l.done ? '#bbf7d0' : '#f1f5f9'}`, background: l.done ? '#f0fdf4' : '#fff' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: l.done ? '#dcfce7' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: l.done ? 14 : 12, color: l.done ? '#16a34a' : '#94a3b8' }}>
                  {l.done ? <IconCheck size={16} color="#16a34a" /> : i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 2 }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <IconClock size={11} color="#94a3b8" /><span>{l.duration}</span>
                    {l.notes && <><IconNote size={11} color="#f59e0b" /><span style={{ color: '#f59e0b' }}>Notes</span></>}
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  {l.done
                    ? <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}>✓ Done</span>
                    : <span style={{ background: '#f1f5f9', color: '#94a3b8', fontSize: 10, padding: '4px 10px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 3 }}><IconLock size={10} color="#94a3b8" /> Watch</span>
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LINKS TAB */}
        {tab === 'links' && (
          <div>
            {courseMeetLinks.length > 0 && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Live Sessions</div>
                {courseMeetLinks.map((link, i) => {
                  const isZoom = link.type === 'zoom';
                  return (
                    <div key={i} onClick={() => window.open(link.url, '_blank')}
                      style={{ background: isZoom ? '#e0f2fe' : '#e8f5e9', borderRadius: 14, padding: '13px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: `1px solid ${isZoom ? '#0284c722' : '#16a34a22'}` }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        {isZoom ? <IconZoom size={24} /> : <IconGoogleMeet size={24} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{link.label}</div>
                        <div style={{ display: 'inline-block', background: isZoom ? '#0284c718' : '#16a34a18', color: isZoom ? '#0284c7' : '#16a34a', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, marginTop: 3 }}>{isZoom ? 'Zoom' : 'Google Meet'}</div>
                      </div>
                      <IconChevronRight size={16} color={isZoom ? '#0284c7' : '#16a34a'} />
                    </div>
                  );
                })}
              </>
            )}
            {courseLinks.length > 0 && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginTop: courseMeetLinks.length > 0 ? 16 : 0 }}>Resources</div>
                {courseLinks.map((link, i) => (
                  <div key={i} onClick={() => window.open(link.url, '_blank')}
                    style={{ background: '#fff', borderRadius: 14, padding: '13px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #f1f5f9', cursor: 'pointer' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: '#6366F115', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconLink size={18} color="#6366F1" /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{link.label}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{link.url}</div>
                    </div>
                    <IconChevronRight size={16} color="#d1d5db" />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Lecture bottom sheet */}
      {active && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }} onClick={() => setActive(null)}>
          <div style={{ background: '#fff', borderRadius: '28px 28px 0 0', width: '100%', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: '#e2e8f0', margin: '12px auto 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 12px' }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: '#6366F115', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconVideo size={20} color="#6366F1" /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{active.title}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}><IconClock size={11} color="#94a3b8" /> {active.duration} · {course.title}</div>
              </div>
              <div onClick={() => setActive(null)} style={{ width: 28, height: 28, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, color: '#64748b' }}>✕</div>
            </div>
            {/* Sheet tabs */}
            <div style={{ display: 'flex', background: '#f8f9fb', margin: '0 20px 16px', borderRadius: 14, padding: 4 }}>
              {[{ key: 'video', Icon: IconVideo, label: 'Video' }, { key: 'notes', Icon: IconNote, label: 'Notes' }].map(t => (
                <button key={t.key} onClick={() => setSheetTab(t.key)}
                  style={{ flex: 1, padding: '9px 4px', borderRadius: 11, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: sheetTab === t.key ? '#fff' : 'transparent', color: sheetTab === t.key ? '#6366F1' : '#94a3b8', boxShadow: sheetTab === t.key ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <t.Icon size={14} color={sheetTab === t.key ? '#6366F1' : '#94a3b8'} /> {t.label}
                </button>
              ))}
            </div>
            <div style={{ padding: '0 20px 32px' }}>
              {sheetTab === 'video' && <VideoPlayer lecture={active} color="#6366F1" onComplete={() => { toggleLecture(course.id, active.id); setActive(null); }} />}
              {sheetTab === 'notes' && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>My Notes</div>
                  <textarea value={noteEdit} onChange={e => setNoteEdit(e.target.value)} placeholder="Write your notes here..."
                    style={{ width: '100%', minHeight: 140, border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '12px 14px', fontSize: 14, resize: 'none', outline: 'none', boxSizing: 'border-box', lineHeight: 1.7, background: '#f8f9fb' }} />
                  <button onClick={() => { saveNote(course.id, active.id, noteEdit); setActive(null); }}
                    style={{ width: '100%', marginTop: 12, padding: '13px', background: 'linear-gradient(135deg,#3B82F6,#A855F7)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                    Save Notes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Lectures Page ──
export default function Lectures({ onBack, directCourseId }) {
  const { enrolled, getProgress, toggleLecture, saveNote, setSelectedCourseId } = useApp();
  const [activeCourse, setActiveCourse] = useState(null);

  // If navigated from Dashboard/Courses with a specific course, open it directly
  useEffect(() => {
    if (directCourseId) {
      const course = enrolled.find(c => c.id === directCourseId);
      if (course) setActiveCourse(course);
    } else {
      setActiveCourse(null); // show all courses
    }
  }, [directCourseId]);

  if (!enrolled.length) return (
    <div style={{ background: '#f8f9fb', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ marginBottom: 16 }}><IconBook size={48} color="#d1d5db" /></div>
      <div style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 8 }}>No courses enrolled</div>
      <div style={{ fontSize: 13, color: '#94a3b8' }}>Enroll in a course to see lectures here</div>
    </div>
  );

  // If a course is selected, show its detail page
  if (activeCourse) {
    const course = enrolled.find(c => c.id === activeCourse.id) || activeCourse;
    return (
      <CourseDetail
        course={course}
        getProgress={getProgress}
        toggleLecture={toggleLecture}
        saveNote={saveNote}
        onBack={() => { setActiveCourse(null); setSelectedCourseId(null); }}
      />
    );
  }

  // Otherwise show all courses grid
  const totalDone = enrolled.reduce((a, c) => a + c.lectures.filter(l => l.done).length, 0);
  const totalAll = enrolled.reduce((a, c) => a + c.lectures.length, 0);

  return (
    <div style={{ background: '#f8f9fb', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(120deg, rgb(81 110 185) 0%, #1c3050 100%)`, padding: '52px 22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(99,102,241,0.12)', filter: 'blur(30px)' }} />
        <div onClick={onBack} style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>‹ Back</div>
        <div style={{ color: '#a5b4fc', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>MY LEARNING</div>
        <div style={{ color: '#fff', fontSize: 22, fontWeight: 900 }}>My Courses</div>
        <div style={{ color: '#fff', fontSize: 13, marginTop: 4 }}>{totalDone}/{totalAll} lectures completed across {enrolled.length} courses</div>
      </div>

      {/* Course grid */}
      <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {enrolled.map(c => (
          <CourseCard
            key={c.id}
            course={c}
            getProgress={getProgress}
            onClick={() => { setSelectedCourseId(c.id); setActiveCourse(c); }}
          />
        ))}
      </div>
    </div>
  );
}
