import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import Splash from './pages/Splash';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import Lectures from './pages/Lectures';
import History from './pages/History';
import Certificates from './pages/Certificates';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

function AppInner() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('home');
  const [directCourseId, setDirectCourseId] = useState(null);

  const handleTabChange = (newTab, courseId = null) => {
    setDirectCourseId(courseId);
    setTab(newTab);
  };

  const pages = {
    home: <Dashboard onTabChange={handleTabChange} />,
    courses: <MyCourses onTabChange={handleTabChange} />,
    lectures: <Lectures onBack={() => handleTabChange('home')} directCourseId={directCourseId} />,
    history: <History onBack={() => handleTabChange('home')} />,
    certificates: <Certificates onBack={() => handleTabChange('home')} />,
    profile: <Profile onLogout={logout} onBack={() => handleTabChange('home')} />,
  };

  return (
    <AppProvider>
      <AppInnerContent pages={pages} tab={tab} onTabChange={handleTabChange} logout={logout} />
    </AppProvider>
  );
}

function AppInnerContent({ pages, tab, onTabChange }) {
  const { setSelectedCourseId } = useApp();

  const handleNav = (t) => {
    if (t === 'lectures') setSelectedCourseId(null);
    onTabChange(t);
  };

  return (
    <>
      <div className="page">{pages[tab] || pages.home}</div>
      <BottomNav active={tab} onChange={handleNav} />
    </>
  );
}

function AuthGate() {
  const { isAuthenticated } = useAuth();
  const [screen, setScreen] = useState('landing');

  if (isAuthenticated) return <AppInner />;

  if (screen === 'login')  return <Login  onBack={() => setScreen('landing')} onSignup={() => setScreen('signup')} />;
  if (screen === 'signup') return <Signup onLogin={() => setScreen('login')} onBack={() => setScreen('landing')} />;
  return <Landing />;
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <AuthProvider>
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      {splashDone && <AuthGate />}
    </AuthProvider>
  );
}
