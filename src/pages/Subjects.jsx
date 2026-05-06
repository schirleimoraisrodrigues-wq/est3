import { useState } from 'react';
import { BookOpen, Edit3, Plus, Trash2 } from 'lucide-react';
import { Badge, Card, Field, inputClass } from '../components/Forms';
import { useAppData } from '../hooks/useAppData';

export default function Subjects() {
  const { subjects, contents, tasks, questions, addSubject, updateSubject, deleteSubject, addContent } = useAppData();
  const [form, setForm] = useState({ nome: '', cor: '#14b8a6', descricao: '', priority: 'média' });
  const [selected, setSelected] = useState(subjects[0]?.id);
  const [editing, setEditing] = useState(null);
  const subject = subjects.find((item) => item.id === selected) || subjects[0];
  const submit = (event) => { event.preventDefault(); editing ? updateSubject(editing, form) : addSubject(form); setEditing(null); setForm({ nome: '', cor: '#14b8a6', descricao: '', priority: 'média' }); };

  return <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1fr_380px]">
    <section className="space-y-4"><div><p className="text-xs font-black uppercase tracking-[.3em] text-teal-300">Matérias</p><h1 className="text-3xl font-black">Central de Disciplinas</h1></div>
      <div className="grid gap-4 md:grid-cols-2">{subjects.map((item) => <Card key={item.id} className={`cursor-pointer ${selected === item.id ? 'ring-2 ring-teal-400' : ''}`}><div onClick={() => setSelected(item.id)}>
        <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="h-4 w-4 rounded-full" style={{ background: item.cor }} /><h2 className="text-xl font-black">{item.nome}</h2></div><Badge tone={item.priority === 'urgente' ? 'red' : 'teal'}>{item.priority}</Badge></div>
        <p className="mt-3 text-sm text-slate-400">{item.descricao}</p><div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm"><span className="rounded-2xl bg-white/5 p-2">{item.desempenhoMedio}%<br/><small>desempenho</small></span><span className="rounded-2xl bg-white/5 p-2">{contents.filter((c) => c.subjectId === item.id).length}<br/><small>conteúdos</small></span><span className="rounded-2xl bg-white/5 p-2">{tasks.filter((t) => t.subjectId === item.id).length}<br/><small>tarefas</small></span></div>
      </div><div className="mt-4 flex gap-2"><button onClick={() => { setEditing(item.id); setForm({ nome: item.nome, cor: item.cor, descricao: item.descricao, priority: item.priority }); }} className="rounded-xl border border-white/10 p-2"><Edit3 size={16}/></button><button onClick={() => deleteSubject(item.id)} className="rounded-xl border border-red-400/30 p-2 text-red-200"><Trash2 size={16}/></button></div></Card>)}</div>
    </section>
    <aside className="space-y-4"><Card><h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Plus/> {editing ? 'Editar matéria' : 'Adicionar matéria'}</h2><form onSubmit={submit} className="grid gap-4"><Field label="Nome"><input required className={inputClass} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}/></Field><Field label="Cor"><input type="color" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950" value={form.cor} onChange={(e) => setForm({ ...form, cor: e.target.value })}/></Field><Field label="Descrição"><textarea className={inputClass} value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })}/></Field><button className="rounded-2xl bg-teal-400 py-3 font-black text-slate-950">Salvar matéria</button></form></Card>
      {subject && <Card><h2 className="flex items-center gap-2 text-xl font-black"><BookOpen/> Detalhes</h2><p className="mt-2 text-slate-400">{subject.nome}</p><p className="mt-4 text-sm">Questões relacionadas: {questions.filter((q) => q.subjectId === subject.id).length}</p><div className="mt-4 space-y-2">{contents.filter((c) => c.subjectId === subject.id).map((c) => <p key={c.id} className="rounded-2xl bg-white/5 p-3 text-sm">{c.titulo} · {c.dificuldade} · {c.status}</p>)}</div><button onClick={() => addContent({ subjectId: subject.id, titulo: 'Novo conteúdo', descricao: 'Resumo teórico', dificuldade: 'média', status: 'não iniciado', ultimaRevisao: '2026-05-06' })} className="mt-4 w-full rounded-2xl border border-white/10 py-3 font-bold">Adicionar conteúdo</button></Card>}
    </aside>
  </div>;
}
