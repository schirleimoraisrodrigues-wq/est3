export const seedSubjects = [
  { id: 'calculo', nome: 'Cálculo', cor: '#14b8a6', descricao: 'Limites, derivadas, integrais e aplicações.', priority: 'urgente', desempenhoMedio: 42 },
  { id: 'resistencia', nome: 'Resistência dos Materiais', cor: '#8b5cf6', descricao: 'Tensões, deformações e análise de vigas.', priority: 'alta', desempenhoMedio: 58 },
  { id: 'hidraulica', nome: 'Hidráulica', cor: '#38bdf8', descricao: 'Escoamento, Bernoulli e perdas de carga.', priority: 'média', desempenhoMedio: 66 },
  { id: 'fisica', nome: 'Física', cor: '#f97316', descricao: 'Dinâmica, energia e fluidos.', priority: 'média', desempenhoMedio: 73 },
];

export const seedContents = [
  { id: 'vigas', subjectId: 'resistencia', titulo: 'Deformação de Vigas', descricao: 'Linha elástica, flechas e rotação.', dificuldade: 'alta', status: 'estudando', ultimaRevisao: '2026-04-20' },
  { id: 'bernoulli', subjectId: 'hidraulica', titulo: 'Equação de Bernoulli', descricao: 'Energia em escoamentos incompressíveis.', dificuldade: 'média', status: 'não iniciado', ultimaRevisao: '2026-04-18' },
  { id: 'numericos', subjectId: 'calculo', titulo: 'Métodos Numéricos', descricao: 'Raízes, interpolação e integração numérica.', dificuldade: 'alta', status: 'não iniciado', ultimaRevisao: '2026-03-28' },
  { id: 'fluidos', subjectId: 'fisica', titulo: 'Mecânica dos Fluidos', descricao: 'Pressão, empuxo e continuidade.', dificuldade: 'média', status: 'revisado', ultimaRevisao: '2026-04-26' },
  { id: 'integrais', subjectId: 'calculo', titulo: 'Integrais Triplas', descricao: 'Mudança de variáveis e regiões sólidas.', dificuldade: 'alta', status: 'estudando', ultimaRevisao: '2026-04-10' },
];

export const seedTasks = [
  { id: 'prova-calculo', titulo: 'Cálculo', descricao: 'Prova P2: integrais múltiplas.', subjectId: 'calculo', dataEntrega: '2026-05-07', tipo: 'prova', prioridade: 'alta', status: 'pendente' },
  { id: 'lista-hidraulica', titulo: 'Lista de Bernoulli', descricao: 'Resolver exercícios 1 a 12.', subjectId: 'hidraulica', dataEntrega: '2026-05-10', tipo: 'tarefa', prioridade: 'média', status: 'em andamento' },
  { id: 'rev-vigas', titulo: 'Revisão de Vigas', descricao: 'Revisar fórmulas de flecha.', subjectId: 'resistencia', dataEntrega: '2026-05-12', tipo: 'revisão', prioridade: 'alta', status: 'pendente' },
];

export const seedQuestions = [
  { id: 'q1', subjectId: 'calculo', contentId: 'numericos', tipo: 'múltipla escolha', enunciado: 'Qual método usa tangentes para aproximar raízes?', alternativas: ['Bisseção', 'Newton-Raphson', 'Euler', 'Trapézios'], correta: 'Newton-Raphson', respostas: [{ correta: true }] },
  { id: 'q2', subjectId: 'hidraulica', contentId: 'bernoulli', tipo: 'verdadeiro ou falso', enunciado: 'Bernoulli conserva energia ao longo de uma linha de corrente ideal.', alternativas: ['Verdadeiro', 'Falso'], correta: 'Verdadeiro', respostas: [] },
  { id: 'q3', subjectId: 'resistencia', contentId: 'vigas', tipo: 'cards', enunciado: 'Explique o significado de flecha máxima em uma viga.', alternativas: [], correta: 'Maior deslocamento transversal da viga.', respostas: [] },
];
