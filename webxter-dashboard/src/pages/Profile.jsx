// import React, { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { IconBell, IconShield, IconHelp, IconInfo, IconLogout, IconEdit, IconChevronRight, IconUser, IconCheck } from '../components/Icons';

// function SubPage({ title, onBack, children }) {
//   return (
//     <div style={{ position: 'absolute', inset: 0, background: '#F1F3F4', zIndex: 200, overflowY: 'auto', width: '100%' }}>
//       <div style={{ background: 'linear-gradient(120deg, rgb(81 110 185) 0%, #1c3050 100%)', padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
//         <div onClick={onBack} style={{ color: '#94a3b8', cursor: 'pointer', fontSize: 15, fontWeight: 700, }}>‹ Back</div>
//         <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', flex: 1, textAlign: 'center', marginRight: 40 }}>{title}</div>
//       </div>
//       <div style={{ padding: '20px 16px' }}>{children}</div>
//     </div>
//   );
// }

// function NotificationsPage({ onBack }) {
//   const [s, setS] = useState({ courseUpdates: true, lectureReminders: true, certificates: true, promotions: false, emailDigest: true });
//   const toggle = k => setS(p => ({ ...p, [k]: !p[k] }));
//   const groups = [
//     {
//       title: 'Push Notifications', items: [
//         { key: 'courseUpdates', label: 'Course Updates', desc: 'New lectures added to your courses' },
//         { key: 'lectureReminders', label: 'Study Reminders', desc: 'Daily reminders to keep learning' },
//         { key: 'certificates', label: 'Certificates', desc: 'When you complete a course' },
//       ]
//     },
//     {
//       title: 'Email', items: [
//         { key: 'promotions', label: 'New Courses', desc: 'Discover new courses' },
//         { key: 'emailDigest', label: 'Weekly Digest', desc: 'Your weekly progress summary' },
//       ]
//     },
//   ];
//   return (
//     <SubPage title="Notifications" onBack={onBack}>
//       {groups.map(g => (
//         <div key={g.title} style={{ marginBottom: 24 }}>
//           <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>{g.title}</div>
//           <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
//             {g.items.map((item, i) => (
//               <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < g.items.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
//                 <div>
//                   <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120' }}>{item.label}</div>
//                   <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2 }}>{item.desc}</div>
//                 </div>
//                 <div onClick={() => toggle(item.key)} style={{ width: 50, height: 28, borderRadius: 99, background: s[item.key] ? 'linear-gradient(135deg,#6366F1,#6366F1)' : '#E0E0E0', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, boxShadow: s[item.key] ? '0 2px 8px rgba(99,102,241,0.4)' : 'none' }}>
//                   <div style={{ position: 'absolute', top: 3, left: s[item.key] ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </SubPage>
//   );
// }

// function PrivacyPage({ onBack }) {
//   const [showPw, setShowPw] = useState(false);
//   return (
//     <SubPage title="Privacy & Security" onBack={onBack}>
//       <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
//         {[
//           { label: 'Change Password', desc: 'Update your login password', action: () => setShowPw(p => !p) },
//           { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', action: null },
//           { label: 'Active Sessions', desc: 'View and manage logged-in devices', action: null },
//         ].map((item, i) => (
//           <div key={item.label}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }} onClick={item.action || undefined}>
//               <div>
//                 <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120' }}>{item.label}</div>
//                 <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2 }}>{item.desc}</div>
//               </div>
//               <span style={{ color: '#d1d5db', fontSize: 20 }}>›</span>
//             </div>
//             {item.label === 'Change Password' && showPw && (
//               <div style={{ padding: '14px 16px', background: '#F1F3F4' }}>
//                 {['Current password', 'New password', 'Confirm new password'].map(ph => (
//                   <input key={ph} type="password" placeholder={ph} style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', marginBottom: 10, boxSizing: 'border-box' }} />
//                 ))}
//                 <button style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#6366F1,#6366F1)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Update Password</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', cursor: 'pointer' }}>
//           <div>
//             <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>Delete Account</div>
//             <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2 }}>Permanently remove your account</div>
//           </div>
//           <span style={{ color: '#d1d5db', fontSize: 20 }}>›</span>
//         </div>
//       </div>
//     </SubPage>
//   );
// }

// function FaqItem({ q, a }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div style={{ borderBottom: '1px solid #f3f4f6' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', cursor: 'pointer' }} onClick={() => setOpen(p => !p)}>
//         <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120', flex: 1, paddingRight: 8 }}>{q}</div>
//         <span style={{ color: '#d1d5db', fontSize: 20, display: 'inline-block', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
//       </div>
//       {open && <div style={{ fontSize: 13, color: '#5F6368', padding: '0 16px 14px', lineHeight: 1.7 }}>{a}</div>}
//     </div>
//   );
// }

// function HelpPage({ onBack }) {
//   const faqs = [
//     { q: 'How do I enroll in a course?', a: 'Go to My Courses → Browse tab and tap "Enroll Now" on any course.' },
//     { q: 'How do I earn a certificate?', a: 'Complete all lectures in a course. Your certificate appears automatically in the Certificates tab.' },
//     { q: 'Can I re-watch lectures?', a: 'Yes! All completed lectures are in the History tab, available anytime.' },
//     { q: 'How do I save notes?', a: 'Tap any lecture in the Lectures tab, then write and save notes in the panel that opens.' },
//     { q: 'How do I share my certificate?', a: 'Open the Certificates tab, tap your certificate and use the LinkedIn or Download button.' },
//   ];
//   return (
//     <SubPage title="Help & Support" onBack={onBack}>
//       <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>FAQ</div>
//       <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
//         {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
//       </div>
//       <div style={{ background: 'linear-gradient(135deg,#0B1120,#6366F1)', borderRadius: 20, padding: '22px', textAlign: 'center', boxShadow: '0 6px 20px rgba(79,70,229,0.3)' }}>
//         <div style={{ fontSize: 28, marginBottom: 8 }}>💬</div>
//         <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Still need help?</div>
//         <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 14 }}>Our support team is here for you</div>
//         <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px', color: '#fff', fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}>support@webxter.com</div>
//       </div>
//     </SubPage>
//   );
// }

// function AboutPage({ onBack }) {
//   return (
//     <SubPage title="About Webxter" onBack={onBack}>
//       <div style={{ background: 'linear-gradient(135deg,#0B1120,#6366F1)', borderRadius: 20, padding: '28px 24px', textAlign: 'center', marginBottom: 16, boxShadow: '0 6px 20px rgba(79,70,229,0.3)' }}>
//         <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 12px' }}>🎓</div>
//         <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>Webxter</div>
//         <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Version 1.0.0 · Learning Platform</div>
//       </div>
//       <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
//         {[
//           { label: '📚 Courses Available', value: '6+' },
//           { label: '🎬 Total Lectures', value: '50+' },
//           { label: '👩‍🎓 Active Students', value: '2,000+' },
//           { label: '🏆 Certificates Issued', value: '500+' },
//         ].map((item, i, arr) => (
//           <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
//             <span style={{ fontSize: 14, color: '#5F6368' }}>{item.label}</span>
//             <span style={{ fontSize: 14, fontWeight: 800, color: '#6366F1' }}>{item.value}</span>
//           </div>
//         ))}
//       </div>
//       <div style={{ textAlign: 'center', fontSize: 12, color: '#9AA0A6' }}>© 2026 Webxter. All rights reserved.</div>
//     </SubPage>
//   );
// }

// const menuGroups = [
//   {
//     title: 'Account', items: [
//       { label: 'Notifications', Icon: IconBell, bg: '#ffffff', page: 'notifications' },
//       { label: 'Privacy & Security', Icon: IconShield, bg: '#ffffff', page: 'privacy' },
//     ]
//   },
//   {
//     title: 'Support', items: [
//       { label: 'Help & Support', Icon: IconHelp, bg: '#ffffff', page: 'help' },
//       { label: 'About Webxter', Icon: IconInfo, bg: '#ffffff', page: 'about' },
//     ]
//   },
// ];

// export default function Profile({ onLogout, onBack }) {
//   const { user, updateUser, enrolled, certificates, getProgress } = useApp();
//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState({ ...user });
//   const [page, setPage] = useState(null);

//   const totalDone = enrolled.reduce((a, c) => a + c.lectures.filter(l => l.done).length, 0);
//   const completedCourses = enrolled.filter(c => getProgress(c) === 100).length;
//   const handleSave = () => { updateUser(form); setEditing(false); };

//   return (
//     <div style={{ background: '#F1F3F4', minHeight: '100%' }}>
//       {page === 'notifications' && <NotificationsPage onBack={() => setPage(null)} />}
//       {page === 'privacy' && <PrivacyPage onBack={() => setPage(null)} />}
//       {page === 'help' && <HelpPage onBack={() => setPage(null)} />}
//       {page === 'about' && <AboutPage onBack={() => setPage(null)} />}

//       {/* ── HEADER ── */}
//       <div style={{ background: 'linear-gradient(120deg, rgb(81 110 185) 0%, #1c3050 100%)', padding: '52px 22px 28px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
//         <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(40px)' }} />
//         <div style={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', filter: 'blur(30px)' }} />

//         <div onClick={onBack} style={{ color: '#94a3b8', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 16, textAlign: 'left', position: 'relative' }}>‹ Back</div>

//         {/* Avatar */}
//         <div style={{ position: 'relative', display: 'inline-block', marginBottom: 14 }}>
//           <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#6366F1,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 900, color: '#fff', border: '3px solid rgba(255,255,255,0.25)', margin: '0 auto' }}>
//             {user.name.charAt(0).toUpperCase()}
//           </div>
//           <div style={{ position: 'absolute', bottom: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: '#10b981', border: '2.5px solid #0B1120', boxShadow: '0 0 8px #10b981' }} />
//         </div>

//         <div style={{ color: '#fff', fontSize: 20, fontWeight: 900, letterSpacing: -0.3 }}>{user.name}</div>
//         <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{user.email}</div>
//         {user.bio && <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6, fontStyle: 'italic' }}>{user.bio}</div>}

//         {/* Stats */}
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginTop: 20, background: 'rgba(255,255,255,0.07)', borderRadius: 18, padding: '14px 0', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
//           {[
//             { label: 'Enrolled', value: enrolled.length, color: '#94a3b8' },
//             { label: 'Completed', value: completedCourses, color: '#94a3b8' },
//             { label: 'Lectures', value: totalDone, color: '#94a3b8' },
//             { label: 'Certs', value: certificates.length, color: '#94a3b8' },
//           ].map((st, i, arr) => (
//             <div key={st.label} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
//               <div style={{ color: '#fff', fontSize: 20, fontWeight: 900 }}>{st.value}</div>
//               <div style={{ color: st.color, fontSize: 10, marginTop: 3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{st.label}</div>
//             </div>
//           ))}
//         </div>

//         <button onClick={() => { setForm({ ...user }); setEditing(!editing); }}
//           style={{ marginTop: 16, padding: '10px 24px', background: editing ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: 'pointer', position: 'relative' }}>
//           {editing ? '✕ Cancel' : '✏️ Edit Profile'}
//         </button>
//       </div>

//       <div style={{ padding: '20px 16px 0' }}>

//         {/* Profile Info */}
//         <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>Profile Info</div>
//         <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
//           {editing ? (
//             <div style={{ padding: '16px' }}>
//               {[{ field: 'name', label: 'Full Name' }, { field: 'email', label: 'Email' }, { field: 'bio', label: 'Bio' }].map(f => (
//                 <div key={f.field}>
//                   <div style={{ fontSize: 11, color: '#9AA0A6', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</div>
//                   <input style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
//                     value={form[f.field]} onChange={e => setForm(p => ({ ...p, [f.field]: e.target.value }))} />
//                 </div>
//               ))}
//               <button onClick={handleSave} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,#6366F1,#6366F1)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
//                 Save Changes
//               </button>
//             </div>
//           ) : (
//             [{ label: 'Full Name', value: user.name }, { label: 'Email', value: user.email }, { label: 'Bio', value: user.bio }].map((f, i, arr) => (
//               <div key={f.label} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
//                 <div style={{ fontSize: 11, color: '#9AA0A6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</div>
//                 <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120', marginTop: 3 }}>{f.value}</div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Menu groups */}
//         {menuGroups.map(group => (
//           <div key={group.title} style={{ marginBottom: 24 }}>
//             <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>{group.title}</div>
//             <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
//               {group.items.map((item, i) => (
//                 <div key={item.label} onClick={() => setPage(item.page)}
//                   style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < group.items.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}>
//                   <div style={{ width: 38, height: 38, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                     <item.Icon size={18} color="#0B1120" />
//                   </div>
//                   <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#0B1120' }}>{item.label}</div>
//                   <IconChevronRight size={18} color="#d1d5db" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         {/* Logout */}
//         <div style={{ marginBottom: 32 }}>
//           <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
//             <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer' }}>
//               <div style={{ width: 38, height: 38, borderRadius: 12, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                 <IconLogout size={18} color="black" />
//               </div>
//               <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#ef4444' }}>Logout</div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconBell, IconShield, IconHelp, IconInfo, IconLogout, IconEdit, IconChevronRight, IconUser, IconCheck } from '../components/Icons';

function SubPage({ title, onBack, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F1F3F4', zIndex: 200, overflowY: 'auto', width: '100%' }}>
      <div style={{ background: 'linear-gradient(120deg, rgb(81 110 185) 0%, #1c3050 100%)', padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ color: '#94a3b8', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}>‹ Back</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', flex: 1, textAlign: 'center', marginRight: 40 }}>{title}</div>
      </div>
      <div style={{ padding: '20px 16px' }}>{children}</div>
    </div>
  );
}

function NotificationsPage({ onBack }) {
  const [s, setS] = useState({ courseUpdates: true, lectureReminders: true, certificates: true, promotions: false, emailDigest: true });
  const toggle = k => setS(p => ({ ...p, [k]: !p[k] }));
  const groups = [
    {
      title: 'Push Notifications', items: [
        { key: 'courseUpdates', label: 'Course Updates', desc: 'New lectures added to your courses' },
        { key: 'lectureReminders', label: 'Study Reminders', desc: 'Daily reminders to keep learning' },
        { key: 'certificates', label: 'Certificates', desc: 'When you complete a course' },
      ]
    },
    {
      title: 'Email', items: [
        { key: 'promotions', label: 'New Courses', desc: 'Discover new courses' },
        { key: 'emailDigest', label: 'Weekly Digest', desc: 'Your weekly progress summary' },
      ]
    },
  ];
  return (
    <SubPage title="Notifications" onBack={onBack}>
      {groups.map(g => (
        <div key={g.title} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>{g.title}</div>
          <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            {g.items.map((item, i) => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < g.items.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2 }}>{item.desc}</div>
                </div>
                <div onClick={() => toggle(item.key)} style={{ width: 50, height: 28, borderRadius: 99, background: s[item.key] ? 'linear-gradient(135deg,#6366F1,#6366F1)' : '#E0E0E0', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, boxShadow: s[item.key] ? '0 2px 8px rgba(99,102,241,0.4)' : 'none' }}>
                  <div style={{ position: 'absolute', top: 3, left: s[item.key] ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </SubPage>
  );
}

function PrivacyPage({ onBack }) {
  const [showPw, setShowPw] = useState(false);
  return (
    <SubPage title="Privacy & Security" onBack={onBack}>
      <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {[
          { label: 'Change Password', desc: 'Update your login password', action: () => setShowPw(p => !p) },
          { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', action: null },
          { label: 'Active Sessions', desc: 'View and manage logged-in devices', action: null },
        ].map((item, i) => (
          <div key={item.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }} onClick={item.action || undefined}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2 }}>{item.desc}</div>
              </div>
              <span style={{ color: '#d1d5db', fontSize: 20 }}>›</span>
            </div>
            {item.label === 'Change Password' && showPw && (
              <div style={{ padding: '14px 16px', background: '#F1F3F4' }}>
                {['Current password', 'New password', 'Confirm new password'].map(ph => (
                  <input key={ph} type="password" placeholder={ph} style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', marginBottom: 10, boxSizing: 'border-box' }} />
                ))}
                <button style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#6366F1,#6366F1)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Update Password</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', cursor: 'pointer' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>Delete Account</div>
            <div style={{ fontSize: 12, color: '#9AA0A6', marginTop: 2 }}>Permanently remove your account</div>
          </div>
          <span style={{ color: '#d1d5db', fontSize: 20 }}>›</span>
        </div>
      </div>
    </SubPage>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', cursor: 'pointer' }} onClick={() => setOpen(p => !p)}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120', flex: 1, paddingRight: 8 }}>{q}</div>
        <span style={{ color: '#d1d5db', fontSize: 20, display: 'inline-block', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
      </div>
      {open && <div style={{ fontSize: 13, color: '#5F6368', padding: '0 16px 14px', lineHeight: 1.7 }}>{a}</div>}
    </div>
  );
}

function HelpPage({ onBack }) {
  const faqs = [
    { q: 'How do I enroll in a course?', a: 'Go to My Courses → Browse tab and tap "Enroll Now" on any course.' },
    { q: 'How do I earn a certificate?', a: 'Complete all lectures in a course. Your certificate appears automatically in the Certificates tab.' },
    { q: 'Can I re-watch lectures?', a: 'Yes! All completed lectures are in the History tab, available anytime.' },
    { q: 'How do I save notes?', a: 'Tap any lecture in the Lectures tab, then write and save notes in the panel that opens.' },
    { q: 'How do I share my certificate?', a: 'Open the Certificates tab, tap your certificate and use the LinkedIn or Download button.' },
  ];
  return (
    <SubPage title="Help & Support" onBack={onBack}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>FAQ</div>
      <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
      <div style={{ background: 'linear-gradient(135deg,#0B1120,#6366F1)', borderRadius: 20, padding: '22px', textAlign: 'center', boxShadow: '0 6px 20px rgba(79,70,229,0.3)' }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>💬</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Still need help?</div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 14 }}>Our support team is here for you</div>
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px', color: '#fff', fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}>support@webxter.com</div>
      </div>
    </SubPage>
  );
}

function AboutPage({ onBack }) {
  return (
    <SubPage title="About Webxter" onBack={onBack}>
      <div style={{ background: 'linear-gradient(135deg,#0B1120,#6366F1)', borderRadius: 20, padding: '28px 24px', textAlign: 'center', marginBottom: 16, boxShadow: '0 6px 20px rgba(79,70,229,0.3)' }}>
        <div style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 12px' }}>🎓</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>Webxter</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Version 1.0.0 · Learning Platform</div>
      </div>
      <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {[
          { label: '📚 Courses Available', value: '6+' },
          { label: '🎬 Total Lectures', value: '50+' },
          { label: '👩‍🎓 Active Students', value: '2,000+' },
          { label: '🏆 Certificates Issued', value: '500+' },
        ].map((item, i, arr) => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
            <span style={{ fontSize: 14, color: '#5F6368' }}>{item.label}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#6366F1' }}>{item.value}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: 12, color: '#9AA0A6' }}>© 2026 Webxter. All rights reserved.</div>
    </SubPage>
  );
}

const menuGroups = [
  {
    title: 'Account', items: [
      { label: 'Notifications', Icon: IconBell, bg: '#ffffff', page: 'notifications' },
      { label: 'Privacy & Security', Icon: IconShield, bg: '#ffffff', page: 'privacy' },
    ]
  },
  {
    title: 'Support', items: [
      { label: 'Help & Support', Icon: IconHelp, bg: '#ffffff', page: 'help' },
      { label: 'About Webxter', Icon: IconInfo, bg: '#ffffff', page: 'about' },
    ]
  },
];

export default function Profile({ onLogout, onBack }) {
  const { user, updateUser, enrolled, certificates, getProgress } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [page, setPage] = useState(null);

  const totalDone = enrolled.reduce((a, c) => a + c.lectures.filter(l => l.done).length, 0);
  const completedCourses = enrolled.filter(c => getProgress(c) === 100).length;
  const handleSave = () => { updateUser(form); setEditing(false); };

  return (
    <div style={{ background: '#F1F3F4', minHeight: '100%' }}>
      {page === 'notifications' && <NotificationsPage onBack={() => setPage(null)} />}
      {page === 'privacy' && <PrivacyPage onBack={() => setPage(null)} />}
      {page === 'help' && <HelpPage onBack={() => setPage(null)} />}
      {page === 'about' && <AboutPage onBack={() => setPage(null)} />}

      {/* ── HEADER ── */}
      <div style={{ background: 'linear-gradient(120deg, rgb(81 110 185) 0%, #1c3050 100%)', padding: '52px 22px 28px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', filter: 'blur(30px)' }} />

        <div onClick={onBack} style={{ color: '#94a3b8', fontSize: 14, fontWeight: 700, cursor: 'pointer', textAlign: 'left', position: 'relative' }}>‹ Back</div>

        {/* Avatar with pencil icon */}
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 16, marginBottom: 14 }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 900, color: '#fff', border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 24px rgba(99,102,241,0.4)', margin: '0 auto' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          {/* Pencil icon */}
          <div onClick={() => { setForm({ ...user }); setEditing(!editing); }}
            style={{ position: 'absolute', bottom: 2, right: 2, width: 26, height: 26, borderRadius: '50%', background: editing ? '#ef4444' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.25)', border: '2px solid rgba(255,255,255,0.8)' }}>
            {editing
              ? <span style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>✕</span>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            }
          </div>
        </div>

        <div style={{ color: '#fff', fontSize: 20, fontWeight: 900, letterSpacing: -0.3 }}>{user.name}</div>
        <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{user.email}</div>
        {user.bio && <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6, fontStyle: 'italic' }}>{user.bio}</div>}

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginTop: 20, background: 'rgba(255,255,255,0.07)', borderRadius: 18, padding: '14px 0', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
          {[
            { label: 'Enrolled', value: enrolled.length, color: '#94a3b8' },
            { label: 'Completed', value: completedCourses, color: '#94a3b8' },
            { label: 'Lectures', value: totalDone, color: '#94a3b8' },
            { label: 'Certs', value: certificates.length, color: '#94a3b8' },
          ].map((st, i, arr) => (
            <div key={st.label} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 900 }}>{st.value}</div>
              <div style={{ color: st.color, fontSize: 10, marginTop: 3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>

        {/* Profile Info */}
        <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>Profile Info</div>
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          {editing ? (
            <div style={{ padding: '16px' }}>
              {[{ field: 'name', label: 'Full Name' }, { field: 'email', label: 'Email' }, { field: 'bio', label: 'Bio' }].map(f => (
                <div key={f.field}>
                  <div style={{ fontSize: 11, color: '#9AA0A6', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</div>
                  <input style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
                    value={form[f.field]} onChange={e => setForm(p => ({ ...p, [f.field]: e.target.value }))} />
                </div>
              ))}
              <button onClick={handleSave} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,#6366F1,#6366F1)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
                Save Changes
              </button>
            </div>
          ) : (
            [{ label: 'Full Name', value: user.name }, { label: 'Email', value: user.email }, { label: 'Bio', value: user.bio }].map((f, i, arr) => (
              <div key={f.label} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ fontSize: 11, color: '#9AA0A6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1120', marginTop: 3 }}>{f.value}</div>
              </div>
            ))
          )}
        </div>

        {/* Menu groups */}
        {menuGroups.map(group => (
          <div key={group.title} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>{group.title}</div>
            <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
              {group.items.map((item, i) => (
                <div key={item.label} onClick={() => setPage(item.page)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < group.items.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #E0E0E0' }}>
                    <item.Icon size={18} color="#0B1120" />
                  </div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#0B1120' }}>{item.label}</div>
                  <IconChevronRight size={18} color="#d1d5db" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
            <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer' }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #E0E0E0' }}>
                <IconLogout size={18} color="#ef4444" />
              </div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#ef4444' }}>Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}