import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Shell from './components/Shell';
import ProtectedRoute from './components/ProtectedRoute';
import { AppDataProvider } from './hooks/useAppData';
import { AuthProvider } from './hooks/useAuth';
import AuthPage from './pages/AuthPage';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import Flashcards from './pages/Flashcards';
import Profile from './pages/Profile';
import Questions from './pages/Questions';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';

export default function App() {
  return <AuthProvider><AppDataProvider><BrowserRouter><Routes>
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/cadastro" element={<AuthPage mode="register" />} />
    <Route element={<ProtectedRoute />}><Route element={<Shell />}>
      <Route index element={<Dashboard />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="materias" element={<Subjects />} />
      <Route path="tarefas" element={<Tasks />} />
      <Route path="questoes" element={<Questions />} />
      <Route path="flashcards" element={<Flashcards />} />
      <Route path="perfil" element={<Profile />} />
    </Route></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter></AppDataProvider></AuthProvider>;
}
