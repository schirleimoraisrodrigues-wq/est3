import { seedContents, seedQuestions, seedSubjects, seedTasks } from '../data/seedData';

const KEY = 'terminal-engenharia-state';

export function loadState() {
  const saved = localStorage.getItem(KEY);
  if (saved) return JSON.parse(saved);
  return { subjects: seedSubjects, contents: seedContents, tasks: seedTasks, questions: seedQuestions };
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
