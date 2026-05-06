import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../services/storage';
import { calculatePerformance } from '../utils/performance';
import { calculateStudyPriority } from '../utils/priority';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => saveState(state), [state]);

  const subjectsWithMetrics = useMemo(() => state.subjects.map((subject) => {
    const desempenhoMedio = calculatePerformance(state.questions, { subjectId: subject.id }) || subject.desempenhoMedio || 0;
    const priority = calculateStudyPriority(subject, state.contents, state.tasks, desempenhoMedio);
    return { ...subject, desempenhoMedio, priority };
  }), [state]);

  const addSubject = (subject) => setState((current) => ({ ...current, subjects: [...current.subjects, { ...subject, id: crypto.randomUUID(), desempenhoMedio: 0 }] }));
  const updateSubject = (id, patch) => setState((current) => ({ ...current, subjects: current.subjects.map((item) => (item.id === id ? { ...item, ...patch } : item)) }));
  const deleteSubject = (id) => setState((current) => ({ ...current, subjects: current.subjects.filter((item) => item.id !== id), contents: current.contents.filter((item) => item.subjectId !== id), tasks: current.tasks.filter((item) => item.subjectId !== id) }));
  const addContent = (content) => setState((current) => ({ ...current, contents: [...current.contents, { ...content, id: crypto.randomUUID() }] }));
  const addTask = (task) => setState((current) => ({ ...current, tasks: [...current.tasks, { ...task, id: crypto.randomUUID() }] }));
  const updateTask = (id, patch) => setState((current) => ({ ...current, tasks: current.tasks.map((task) => (task.id === id ? { ...task, ...patch } : task)) }));
  const addQuestion = (question) => setState((current) => ({ ...current, questions: [...current.questions, { ...question, id: crypto.randomUUID(), respostas: [] }] }));
  const answerQuestion = (id, answer) => setState((current) => ({ ...current, questions: current.questions.map((question) => (question.id === id ? { ...question, respostas: [...(question.respostas || []), answer] } : question)) }));

  const value = { ...state, subjects: subjectsWithMetrics, addSubject, updateSubject, deleteSubject, addContent, addTask, updateTask, addQuestion, answerQuestion };
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export const useAppData = () => useContext(AppDataContext);
