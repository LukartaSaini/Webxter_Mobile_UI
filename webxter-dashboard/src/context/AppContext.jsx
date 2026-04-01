import React, { createContext, useContext, useState } from 'react';

const initialCourses = [
  {
    id: 1, title: 'React Fundamentals', category: 'Frontend', color: '#4f46e5',
    enrolled: true, totalLectures: 6,
    lectures: [
      { id: 1, title: 'Introduction & Setup', duration: '12 min', done: true, notes: 'Install Node, VSCode, create-react-app basics.' },
      { id: 2, title: 'JSX & Components', duration: '18 min', done: true, notes: 'JSX is syntactic sugar for React.createElement().' },
      { id: 3, title: 'Props & State', duration: '22 min', done: true, notes: 'Props are read-only. State triggers re-render.' },
      { id: 4, title: 'useEffect Hook', duration: '20 min', done: false, notes: '' },
      { id: 5, title: 'React Router', duration: '25 min', done: false, notes: '' },
      { id: 6, title: 'Context API', duration: '19 min', done: false, notes: '' },
    ],
  },
  {
    id: 2, title: 'UI/UX Design', category: 'Design', color: '#7c3aed',
    enrolled: true, totalLectures: 5,
    lectures: [
      { id: 1, title: 'Design Principles', duration: '15 min', done: true, notes: 'Balance, contrast, alignment, repetition.' },
      { id: 2, title: 'Color Theory', duration: '18 min', done: true, notes: 'Use 60-30-10 rule for color balance.' },
      { id: 3, title: 'Typography Basics', duration: '14 min', done: false, notes: '' },
      { id: 4, title: 'Wireframing', duration: '20 min', done: false, notes: '' },
      { id: 5, title: 'Prototyping in Figma', duration: '30 min', done: false, notes: '' },
    ],
  },
  {
    id: 3, title: 'Node.js Backend', category: 'Backend', color: '#0ea5e9',
    enrolled: true, totalLectures: 5,
    lectures: [
      { id: 1, title: 'Node & NPM Setup', duration: '10 min', done: true, notes: 'nvm recommended for version management.' },
      { id: 2, title: 'Express Basics', duration: '22 min', done: false, notes: '' },
      { id: 3, title: 'REST API Design', duration: '25 min', done: false, notes: '' },
      { id: 4, title: 'MongoDB Integration', duration: '28 min', done: false, notes: '' },
      { id: 5, title: 'Auth with JWT', duration: '30 min', done: false, notes: '' },
    ],
  },
  {
    id: 4, title: 'Python for Data Science', category: 'Data', color: '#10b981',
    enrolled: false, totalLectures: 6,
    lectures: [
      { id: 1, title: 'Python Basics', duration: '20 min', done: false, notes: '' },
      { id: 2, title: 'NumPy & Pandas', duration: '25 min', done: false, notes: '' },
      { id: 3, title: 'Data Visualization', duration: '22 min', done: false, notes: '' },
      { id: 4, title: 'Machine Learning Intro', duration: '30 min', done: false, notes: '' },
      { id: 5, title: 'Scikit-learn', duration: '28 min', done: false, notes: '' },
      { id: 6, title: 'Final Project', duration: '40 min', done: false, notes: '' },
    ],
  },
  {
    id: 5, title: 'AWS Cloud Basics', category: 'Cloud', color: '#f59e0b',
    enrolled: false, totalLectures: 5,
    lectures: [
      { id: 1, title: 'Cloud Concepts', duration: '15 min', done: false, notes: '' },
      { id: 2, title: 'EC2 & S3', duration: '25 min', done: false, notes: '' },
      { id: 3, title: 'IAM & Security', duration: '20 min', done: false, notes: '' },
      { id: 4, title: 'Lambda Functions', duration: '22 min', done: false, notes: '' },
      { id: 5, title: 'Deploying Apps', duration: '30 min', done: false, notes: '' },
    ],
  },
  {
    id: 6, title: 'Flutter Mobile Dev', category: 'Mobile', color: '#ef4444',
    enrolled: false, totalLectures: 5,
    lectures: [
      { id: 1, title: 'Dart Language Basics', duration: '18 min', done: false, notes: '' },
      { id: 2, title: 'Flutter Widgets', duration: '22 min', done: false, notes: '' },
      { id: 3, title: 'State Management', duration: '25 min', done: false, notes: '' },
      { id: 4, title: 'Navigation & Routing', duration: '20 min', done: false, notes: '' },
      { id: 5, title: 'Publishing App', duration: '15 min', done: false, notes: '' },
    ],
  },
];

const AppContext = createContext();

export function AppProvider({ children }) {
  const savedUser = (() => { try { return JSON.parse(localStorage.getItem('webxter_user')); } catch { return null; } })();
  const [user, setUser] = useState(
    savedUser
      ? { name: savedUser.name, email: savedUser.email, bio: savedUser.bio || 'Passionate learner.' }
      : { name: 'Alex Johnson', email: 'alex@email.com', bio: 'Passionate learner. Frontend developer.' }
  );
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Derived
  const enrolled = courses.filter(c => c.enrolled);
  const catalog = courses.filter(c => !c.enrolled);

  const getProgress = (course) => {
    const done = course.lectures.filter(l => l.done).length;
    return Math.round((done / course.lectures.length) * 100);
  };

  const certificates = enrolled.filter(c => getProgress(c) === 100);

  const history = enrolled.flatMap(c =>
    c.lectures
      .filter(l => l.done)
      .map(l => ({ courseId: c.id, courseTitle: c.title, courseColor: c.color, lecture: l }))
  ).sort((a, b) => a.lecture.id - b.lecture.id).reverse();

  const totalHours = enrolled.reduce((acc, c) =>
    acc + c.lectures.filter(l => l.done).reduce((s, l) => s + parseInt(l.duration), 0), 0
  );

  // Actions
  const enrollCourse = (id) =>
    setCourses(prev => prev.map(c => c.id === id ? { ...c, enrolled: true } : c));

  const toggleLecture = (courseId, lectureId) =>
    setCourses(prev => prev.map(c =>
      c.id === courseId
        ? { ...c, lectures: c.lectures.map(l => l.id === lectureId ? { ...l, done: !l.done } : l) }
        : c
    ));

  const saveNote = (courseId, lectureId, note) =>
    setCourses(prev => prev.map(c =>
      c.id === courseId
        ? { ...c, lectures: c.lectures.map(l => l.id === lectureId ? { ...l, notes: note } : l) }
        : c
    ));

  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }));

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || enrolled[0];

  return (
    <AppContext.Provider value={{
      user, updateUser,
      courses, enrolled, catalog,
      selectedCourse, setSelectedCourseId,
      getProgress, certificates, history,
      totalHours: Math.round(totalHours / 60),
      enrollCourse, toggleLecture, saveNote,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
