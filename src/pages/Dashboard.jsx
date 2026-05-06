import { AlertTriangle, CalendarDays, ClipboardList, ListChecks, UserRound, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopActions } from '../components/Shell';
import { useAppData } from '../hooks/useAppData';
import { useAuth } from '../hooks/useAuth';

const topics = [
  ['Deformação de Vigas', 'Resistência dos Materiais'], ['Equação de Bernoulli', 'Hidráulica'], ['Métodos Numéricos', 'Python'], ['Mecânica dos Fluidos', 'Física'],
];

export default function Dashboard() {
  const { contents, tasks } = useAppData();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const pending = contents.filter((content) => content.status !== 'dominado').length;
  const overdue = tasks.filter((task) => task.status !== 'concluído' && new Date(task.dataEntrega) < new Date('2026-05-06')).length;
  const exit = () => { logout(); navigate('/login'); };

  return <div className="mx-auto max-w-7xl space-y-8">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div><p className="text-xs font-black uppercase tracking-[.35em] text-slate-500">OLÁ, ESTUDANTE</p><h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">Terminal Engenharia</h1></div>
      <TopActions onLogout={exit} />
    </header>

    <section className="rounded-[2rem] bg-gradient-to-br from-teal-800 to-teal-950 p-5 shadow-2xl shadow-teal-950/40 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[.35em] text-teal-100/70">OLÁ, ESTUDANTE</p>
      <h2 className="mt-2 text-4xl font-black">Terminal Engenharia</h2>
      <p className="text-xl font-bold text-teal-100">Painel Geral</p>
      <p className="mt-5 max-w-3xl text-teal-50/80">Modo offline. Hoje vale focar nos temas da prova mais próxima e nas listas de exercícios pendentes.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[[CalendarDays,'Cálculo amanhã','Próxima prova'],[Users,'37','Tópicos pendentes'],[ClipboardList,overdue,'Listas atrasadas'],[AlertTriangle,0,'Urgente']].map(([Icon, title, sub]) => <div key={sub} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/15 p-4"><Icon className="text-teal-100"/><div><p className="font-black">{title}</p><p className="text-sm text-teal-100/70">{sub}</p></div></div>)}
      </div>
    </section>

    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.3em] text-slate-500">AGENDA RÁPIDA</p><h2 className="text-2xl font-black">Provas próximas</h2></div><button className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold">Ver plano</button></div>
      <div className="flex items-center justify-between rounded-3xl border border-red-400/50 bg-slate-900/80 p-5"><div className="flex items-center gap-3"><CalendarDays className="text-red-200"/><strong>Cálculo</strong></div><span className="font-black text-red-300">amanhã</span></div>
    </section>

    <section className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[.3em] text-slate-500">FILA DE ESTUDOS</p><h2 className="text-2xl font-black">Tópicos Pendentes</h2><p className="text-slate-400">Cálculo está puxando a fila porque a prova está próxima.</p></div><button onClick={() => navigate('/materias')} className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold">Ir para Central de Disciplinas</button></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{topics.map(([title, subject]) => <article key={title} className="rounded-3xl border border-white/10 bg-[#102033] p-5">
        <div className="flex gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-300/25 text-violet-100"><UserRound /></div><div><h3 className="font-black">{title}</h3><p className="text-sm text-slate-400">{subject}</p></div></div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm"><span className="text-slate-300">Prova: amanhã</span><span className="inline-flex items-center gap-1 rounded-full border border-white/40 px-3 py-1 text-xs font-bold"><ListChecks size={14}/> Não testado</span></div>
        <div className="mt-6 grid grid-cols-2 gap-3"><button onClick={() => navigate('/questoes')} className="rounded-2xl bg-teal-500 px-3 py-3 text-sm font-black">Fazer teste</button><button onClick={() => navigate('/flashcards')} className="rounded-2xl border border-slate-500/60 bg-black/10 px-3 py-3 text-sm font-black">Ver teoria</button></div>
      </article>)}</div>
    </section>
  </div>;
}
