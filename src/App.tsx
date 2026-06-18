import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/useGameStore';
import { AppLayout } from './components/layout/AppLayout';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Morning } from './pages/Morning';
import { Evening } from './pages/Evening';
import { SleepCircle } from './pages/SleepCircle';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const onboardingComplete = useGameStore((s) => s.onboardingComplete);
  if (!onboardingComplete) return <Navigate to="/" replace />;
  return <AppLayout>{children}</AppLayout>;
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
        path="/morning"
        element={<ProtectedRoute><Morning /></ProtectedRoute>}
      />
      <Route
        path="/evening"
        element={<ProtectedRoute><Evening /></ProtectedRoute>}
      />
      <Route
        path="/sleepcircle"
        element={<ProtectedRoute><SleepCircle /></ProtectedRoute>}
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
