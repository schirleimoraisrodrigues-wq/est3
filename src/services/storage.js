import { seedContents, seedQuestions, seedSubjects, seedTasks } from '../data/seedData.js';

const KEY = 'terminal-engenharia-state';
const initialState = { subjects: seedSubjects, contents: seedContents, tasks: seedTasks, questions: seedQuestions };

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function loadState() {
  return safeParse(localStorage.getItem(KEY), initialState);
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
