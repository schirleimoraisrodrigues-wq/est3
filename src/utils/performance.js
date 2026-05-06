export function calculatePerformance(questions = [], filter = {}) {
  const filtered = questions.filter((question) => {
    const bySubject = filter.subjectId ? question.subjectId === filter.subjectId : true;
    const byContent = filter.contentId ? question.contentId === filter.contentId : true;
    return bySubject && byContent;
  });
  const answers = filtered.flatMap((question) => question.respostas || []);
  if (!answers.length) return 0;
  const hits = answers.filter((answer) => answer.correta).length;
  return Math.round((hits / answers.length) * 100);
}

export function globalStats(tasks = [], questions = []) {
  const answers = questions.flatMap((question) => question.respostas || []);
  const hits = answers.filter((answer) => answer.correta).length;
  return {
    tarefasConcluidas: tasks.filter((task) => task.status === 'concluído').length,
    questoesRespondidas: answers.length,
    taxaAcertos: answers.length ? Math.round((hits / answers.length) * 100) : 0,
  };
}
