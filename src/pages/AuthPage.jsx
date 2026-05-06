import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Field, inputClass } from '../components/Forms';

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [error, setError] = useState('');
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  if (user) return <Navigate to="/" replace />;

  const submit = (event) => {
    event.preventDefault();
    setError('');
    try { isRegister ? register(form) : login(form); navigate('/'); } catch (err) { setError(err.message); }
  };

  return <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#164e63,#07111f_55%)] p-4 text-white">
    <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur">
      <div className="mb-8 flex items-center gap-3"><div className="rounded-2xl bg-teal-400 p-3 text-slate-950"><GraduationCap /></div><div><p className="text-xs font-bold uppercase tracking-[.3em] text-slate-400">Terminal</p><h1 className="text-2xl font-black">Engenharia</h1></div></div>
      <h2 className="text-3xl font-black">{isRegister ? 'Criar conta' : 'Entrar na conta'}</h2>
      <p className="mt-2 text-slate-400">Organize estudos, provas, tarefas e desempenho em modo offline com LocalStorage.</p>
      <div className="mt-8 grid gap-4">
        {isRegister && <Field label="Nome"><input required className={inputClass} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} /></Field>}
        <Field label="E-mail"><input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Senha"><input required type="password" minLength={4} className={inputClass} value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} /></Field>
      </div>
      {error && <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
      <button className="mt-6 w-full rounded-2xl bg-teal-400 py-3 font-black text-slate-950 hover:bg-teal-300">{isRegister ? 'Cadastrar' : 'Login'}</button>
      <button type="button" onClick={() => navigate(isRegister ? '/login' : '/cadastro')} className="mt-4 w-full text-sm font-semibold text-teal-200">{isRegister ? 'Já tenho conta' : 'Criar nova conta'}</button>
    </form>
  </main>;
}
