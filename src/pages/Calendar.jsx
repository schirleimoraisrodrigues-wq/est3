import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Card, Field, inputClass } from '../components/Forms';
import { useAppData } from '../hooks/useAppData';

const colors = { prova: 'bg-red-500/20 text-red-100 border-red-300/30', trabalho: 'bg-purple-500/20 text-purple-100 border-purple-300/30', revisão: 'bg-amber-500/20 text-amber-100 border-amber-300/30', apresentação: 'bg-sky-500/20 text-sky-100 border-sky-300/30', tarefa: 'bg-teal-500/20 text-teal-100 border-teal-300/30', evento: 'bg-slate-500/20 text-slate-100 border-slate-300/30' };

export default function Calendar() {
  const { tasks, subjects, addTask } = useAppData();
  const [quick, setQuick] = useState({ titulo: '', subjectId: subjects[0]?.id || '', dataEntrega: '2026-05-20', tipo: 'evento', prioridade: 'média', status: 'pendente', descricao: 'Criado pelo calendário' });
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const submit = (e) => { e.preventDefault(); addTask(quick); setQuick({ ...quick, titulo: '' }); };
  return <div className="mx-auto max-w-7xl space-y-6"><div><p className="text-xs font-black uppercase tracking-[.3em] text-teal-300">Calendário</p><h1 className="text-3xl font-black">Maio 2026</h1></div><Card><form onSubmit={submit} className="grid gap-3 lg:grid-cols-[1fr_180px_180px_160px]"><Field label="Nova atividade"><input required className={inputClass} value={quick.titulo} onChange={(e) => setQuick({ ...quick, titulo: e.target.value })}/></Field><Field label="Data"><input type="date" className={inputClass} value={quick.dataEntrega} onChange={(e) => setQuick({ ...quick, dataEntrega: e.target.value })}/></Field><Field label="Tipo"><select className={inputClass} value={quick.tipo} onChange={(e) => setQuick({ ...quick, tipo: e.target.value })}>{Object.keys(colors).map((type) => <option key={type}>{type}</option>)}</select></Field><button className="self-end rounded-2xl bg-teal-400 py-3 font-black text-slate-950">Adicionar</button></form></Card><div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-7">{days.map((day) => <div key={day} className="min-h-32 rounded-3xl border border-white/10 bg-slate-900/70 p-3"><p className="mb-2 flex items-center gap-1 font-black"><CalendarDays size={15}/>{day}</p>{tasks.filter((task) => Number(task.dataEntrega.slice(-2)) === day).map((task) => <div key={task.id} className={`mb-2 rounded-2xl border p-2 text-xs font-bold ${colors[task.tipo]}`}>{task.titulo}</div>)}</div>)}</div></div>;
}
