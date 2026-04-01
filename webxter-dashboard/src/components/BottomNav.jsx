import React from 'react';
import { IconHome, IconCourses, IconVideo, IconCertificate, IconUser } from './Icons';

const tabs = [
  { id: 'home',         label: 'Home',     Icon: IconHome },
  { id: 'courses',      label: 'Courses',  Icon: IconCourses },
  { id: 'lectures',     label: 'Lectures', Icon: IconVideo },
  { id: 'certificates', label: 'Certs',    Icon: IconCertificate },
  { id: 'profile',      label: 'Profile',  Icon: IconUser },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav style={{ background: '#fff', borderTop: '1px solid #E0E0E0', display: 'flex', padding: '6px 0 16px', boxShadow: '0 -1px 4px rgba(0,0,0,0.08)' }}>
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <div key={id} onClick={() => onChange(id)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '6px 0', position: 'relative' }}>
            {isActive && (
              <div style={{ position: 'absolute', top: 0, width: 32, height: 3, borderRadius: '0 0 4px 4px', background: 'linear-gradient(90deg,#3B82F6,#A855F7)' }} />
            )}
            <Icon size={22} color={isActive ? '#1A73E8' : '#9AA0A6'} />
            <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? '#1A73E8' : '#9AA0A6', transition: 'color 0.2s' }}>
              {label}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
