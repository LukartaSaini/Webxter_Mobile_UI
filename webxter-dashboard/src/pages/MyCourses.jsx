import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export default function MyCourses({ onTabChange }) {
  const { enrolled, catalog, getProgress, enrollCourse, setSelectedCourseId } = useApp();
  const [tab, setTab] = useState('enrolled');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const allCourses = tab === 'enrolled' ? enrolled : catalog;

  // Unique categories from current list
  const categories = ['All', ...Array.from(new Set(allCourses.map(c => c.category)))];

  const shown = useMemo(() => {
    return allCourses.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || c.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [allCourses, search, activeCategory]);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0B1120,#6366F1)', padding: '52px 22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>MY LEARNING</div>
        <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>Courses</div>
        <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{enrolled.length} enrolled · {catalog.length} available</div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: 4, marginTop: 18 }}>
          {[{ key: 'enrolled', label: `My Courses (${enrolled.length})` }, { key: 'browse', label: `Explore (${catalog.length})` }].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setSearch(''); setActiveCategory('All'); }}
              style={{ flex: 1, padding: '9px', borderRadius: 11, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, transition: 'all 0.2s', background: tab === t.key ? '#fff' : 'transparent', color: tab === t.key ? '#6366F1' : 'rgba(255,255,255,0.7)' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div style={{ marginTop: 14, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 15, opacity: 0.5 }}>🔍</div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search courses..."
            style={{ width: '100%', padding: '11px 14px 11px 36px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Category filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ flexShrink: 0, padding: '7px 16px', borderRadius: 99, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', background: activeCategory === cat ? '#6366F1' : '#fff', color: activeCategory === cat ? '#fff' : '#5F6368', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              {cat}
            </button>
          ))}
        </div>

        {(search || activeCategory !== 'All') && (
          <div style={{ fontSize: 12, color: '#9AA0A6', marginBottom: 12 }}>
            {shown.length} result{shown.length !== 1 ? 's' : ''} found
            {search && <span> for "<strong style={{ color: '#6366F1' }}>{search}</strong>"</span>}
          </div>
        )}

        {shown.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#9AA0A6' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#5F6368', marginBottom: 6 }}>No courses found</div>
            <div style={{ fontSize: 13 }}>Try a different search or category</div>
          </div>
        )}

        {shown.map(c => {
          const progress = getProgress(c);
          const done = c.lectures.filter(l => l.done).length;
          return (
            <div key={c.id} style={{ background: '#fff', borderRadius: 20, marginBottom: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              {/* Color bar top */}
              <div style={{ height: 4, background: `linear-gradient(90deg,${c.color},${c.color}66)` }} />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>📖</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-block', background: c.color + '18', color: c.color, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{c.category}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0B1120', lineHeight: 1.3 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 3 }}>{c.lectures.length} lectures</div>
                  </div>
                </div>

                {c.enrolled ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ fontSize: 12, color: '#5F6368' }}>{done}/{c.lectures.length} completed</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{progress}%</div>
                    </div>
                    <div style={{ background: '#F1F3F4', borderRadius: 99, height: 6, overflow: 'hidden', marginBottom: 14 }}>
                      <div style={{ width: `${progress}%`, background: `linear-gradient(90deg,${c.color},${c.color}99)`, height: '100%', borderRadius: 99, transition: 'width 0.5s ease' }} />
                    </div>
                    <button onClick={() => { setSelectedCourseId(c.id); onTabChange('lectures', c.id); }}
                      style={{ width: '100%', padding: '12px', background: progress === 100 ? '#f0fdf4' : c.color, color: progress === 100 ? '#16a34a' : '#fff', border: progress === 100 ? '1.5px solid #bbf7d0' : 'none', borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                      {progress === 100 ? '✓ Completed — Review' : 'Continue Learning →'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => enrollCourse(c.id)}
                    style={{ width: '100%', padding: '12px', background: c.color, color: '#fff', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                    + Enroll Free
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}





