const DAY = 1000 * 60 * 60 * 24;

export function daysUntil(date, today = new Date()) {
  const target = new Date(`${date}T12:00:00`);
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  return Math.ceil((target - base) / DAY);
}

export function calculateStudyPriority(subject, contents = [], tasks = [], performance = 0, today = new Date()) {
  const subjectContents = contents.filter((content) => content.subjectId === subject.id);
  const subjectTasks = tasks.filter((task) => task.subjectId === subject.id && task.status !== 'concluído');
  let score = 0;

  if (performance < 50) score += 35;
  if (performance >= 50 && performance < 70) score += 18;
  if (subjectTasks.some((task) => task.tipo === 'prova' && daysUntil(task.dataEntrega, today) <= 7 && daysUntil(task.dataEntrega, today) >= 0)) score += 30;
  if (subjectTasks.some((task) => daysUntil(task.dataEntrega, today) < 0)) score += 30;
  score += subjectContents.filter((content) => content.dificuldade === 'alta').length * 8;
  score += subjectContents.filter((content) => daysUntil(content.ultimaRevisao, today) < -14).length * 7;

  if (score >= 70) return 'urgente';
  if (score >= 45) return 'alta';
  if (score >= 20) return 'média';
  return 'baixa';
}
