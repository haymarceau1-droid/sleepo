import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/useGameStore';
import { AppLayout } from './components/layout/AppLayout';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Stats } from './pages/Stats';
import { Profil } from './pages/Profil';
import { Evening } from './pages/Evening';
import { Morning } from './pages/Morning';
import { SleepCircle } from './pages/SleepCircle';
import { Settings } from './pages/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const onboardingComplete = useGameStore((s) => s.onboardingComplete);
  if (!onboardingComplete) return <Navigate to="/" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function SimpleRoute({ children }: { children: React.ReactNode }) {
  const onboardingComplete = useGameStore((s) => s.onboardingComplete);
  if (!onboardingComplete) return <Navigate to="/" replace />;
  return <div className="min-h-screen bg-aave-bg flex flex-col relative">{children}</div>;
}

function AppRoutes() {
  const onboardingComplete = useGameStore((s) => s.onboardingComplete);

  return (
    <Routes>
      <Route
        path="/"
        element={onboardingComplete ? <Navigate to="/home" replace /> : <Onboarding />}
      />
      <Route
        path="/home"
        element={<ProtectedRoute><Home /></ProtectedRoute>}
      />
      <Route
        path="/stats"
        element={<ProtectedRoute><Stats /></ProtectedRoute>}
      />
      <Route
        path="/profil"
        element={<ProtectedRoute><Profil /></ProtectedRoute>}
      />
      <Route
        path="/evening"
        element={<ProtectedRoute><Evening /></ProtectedRoute>}
      />
      <Route
        path="/morning"
        element={<SimpleRoute><Morning /></SimpleRoute>}
      />
      <Route
        path="/sleepcircle"
        element={<ProtectedRoute><SleepCircle /></ProtectedRoute>}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute><Settings /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
