import { CreditCard } from 'lucide-react';
import { Card } from '../components/Forms';
import { useAppData } from '../hooks/useAppData';

export default function Flashcards() {
  const { contents } = useAppData();
  return <div className="mx-auto max-w-7xl space-y-6"><div><p className="text-xs font-black uppercase tracking-[.3em] text-teal-300">Flashcards</p><h1 className="text-3xl font-black">Cards de conteúdo teórico</h1></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{contents.map((content) => <Card key={content.id} className="min-h-56"><CreditCard className="text-teal-200"/><h2 className="mt-4 text-2xl font-black">{content.titulo}</h2><p className="mt-3 text-slate-400">{content.descricao}</p><div className="mt-6 flex gap-2 text-xs font-bold"><span className="rounded-full bg-white/10 px-3 py-1">{content.dificuldade}</span><span className="rounded-full bg-white/10 px-3 py-1">{content.status}</span></div></Card>)}</div></div>;
}
