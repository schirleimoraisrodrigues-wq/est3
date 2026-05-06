import { Flame, Mail, Target, User } from 'lucide-react';
import { Card } from '../components/Forms';
import { useAppData } from '../hooks/useAppData';
import { useAuth } from '../hooks/useAuth';
import { globalStats } from '../utils/performance';

export default function Profile() {
  const { user } = useAuth();
  const { tasks, questions } = useAppData();
  const stats = globalStats(tasks, questions);
  return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-xs font-black uppercase tracking-[.3em] text-teal-300">Perfil</p><h1 className="text-3xl font-black">Dados do estudante</h1></div><Card className="grid gap-6 md:grid-cols-[220px_1fr]"><div className="grid place-items-center rounded-3xl bg-teal-400/10 p-8"><div className="grid h-28 w-28 place-items-center rounded-full bg-teal-400 text-slate-950"><User size={48}/></div></div><div><h2 className="text-3xl font-black">{user?.nome || 'Estudante'}</h2><p className="mt-2 flex items-center gap-2 text-slate-400"><Mail size={16}/>{user?.email}</p><div className="mt-8 grid gap-3 sm:grid-cols-2"><Metric icon={Flame} label="Sequência de estudos" value={`${user?.studyStreak || 0} dias`}/><Metric icon={Target} label="Tarefas concluídas" value={stats.tarefasConcluidas}/><Metric icon={Target} label="Questões respondidas" value={stats.questoesRespondidas}/><Metric icon={Target} label="Taxa geral de acertos" value={`${stats.taxaAcertos}%`}/></div></div></Card></div>;
}
function Metric({ icon: Icon, label, value }) { return <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><Icon className="text-teal-200"/><p className="mt-3 text-2xl font-black">{value}</p><p className="text-sm text-slate-400">{label}</p></div>; }
