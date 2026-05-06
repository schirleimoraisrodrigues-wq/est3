import { BookOpen, CalendarDays, ClipboardList, CreditCard, LayoutDashboard, LogOut, Menu, Sun, User, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const links = [
  ['Dashboard', '/', LayoutDashboard], ['Calendário', '/calendario', CalendarDays], ['Matérias', '/materias', BookOpen],
  ['Tarefas', '/tarefas', ClipboardList], ['Questões', '/questoes', Zap], ['Flashcards', '/flashcards', CreditCard], ['Perfil', '/perfil', User],
];

export default function Shell() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const exit = () => { logout(); navigate('/login'); };

  return <div className="min-h-screen bg-[#07111f] text-white">
    <button className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-slate-900/90 p-2 lg:hidden" onClick={() => setOpen(true)}><Menu size={20} /></button>
    <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#091525] p-5 transition lg:translate-x-0`}>
      <div className="mb-8 flex items-center justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[.28em] text-teal-300">Terminal</p><h1 className="text-xl font-black">Engenharia</h1></div>
        <button className="lg:hidden" onClick={() => setOpen(false)}><X /></button>
      </div>
      <nav className="space-y-2">{links.map(([label, to, Icon]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-teal-500 text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
      <button onClick={exit} className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-slate-300 hover:bg-white/10"><LogOut size={18}/> Sair</button>
    </aside>
    <main className="min-h-screen p-4 pt-16 lg:ml-72 lg:p-8"><Outlet /></main>
  </div>;
}

export function TopActions({ onLogout }) {
  return <div className="flex items-center gap-2 sm:gap-3">
    <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200">Modo offline</button>
    <button className="rounded-full border border-white/15 p-2.5 text-amber-200"><Sun size={18} /></button>
    <button onClick={onLogout} className="rounded-full border border-white/15 p-2.5 text-red-200"><LogOut size={18} /></button>
  </div>;
}
