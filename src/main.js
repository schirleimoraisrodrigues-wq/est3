import { loadState, saveState } from './services/storage.js';
import { getCurrentUser, login, logout, register } from './services/auth.js';
import { calculatePerformance, globalStats } from './utils/performance.js';
import { calculateStudyPriority } from './utils/priority.js';

let user = getCurrentUser();
let data = loadState();
let page = 'dashboard';
const root = document.querySelector('#root');
const today = new Date('2026-05-06T12:00:00');

const icons = { dashboard: '▦', calendario: '📅', materias: '📚', tarefas: '📋', questoes: '⚡', flashcards: '▣', perfil: '👤' };
const nav = [['dashboard', 'Dashboard'], ['calendario', 'Calendário'], ['materias', 'Matérias'], ['tarefas', 'Tarefas'], ['questoes', 'Questões'], ['flashcards', 'Flashcards'], ['perfil', 'Perfil']];
const eventTypes = ['tarefa', 'prova', 'trabalho', 'revisão', 'apresentação', 'evento'];

function persist(next = data) { data = next; saveState(data); render(); }
function byId(list, id) { return list.find((item) => item.id === id); }
function uid() { return crypto.randomUUID(); }
function subjectName(id) { return byId(data.subjects, id)?.nome || 'Sem matéria'; }
function contentName(id) { return byId(data.contents, id)?.titulo || 'Sem conteúdo'; }
function metricsSubject(subject) {
  const desempenhoMedio = calculatePerformance(data.questions, { subjectId: subject.id }) || subject.desempenhoMedio || 0;
  return { ...subject, desempenhoMedio, priority: calculateStudyPriority(subject, data.contents, data.tasks, desempenhoMedio, today) };
}
function subjects() { return data.subjects.map(metricsSubject); }
function esc(value = '') { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); }

function render() { user ? renderApp() : renderAuth('login'); }

function renderAuth(mode = 'login') {
  const isRegister = mode === 'cadastro';
  root.innerHTML = `<main class="auth"><form class="auth-card" id="authForm">
    <div class="brand"><div class="brand-icon">🎓</div><div><p class="eyebrow">Terminal</p><h2>Engenharia</h2></div></div>
    <h1>${isRegister ? 'Criar conta' : 'Entrar na conta'}</h1><p class="muted">Organize estudos, provas, tarefas e desempenho em modo offline com LocalStorage.</p>
    ${isRegister ? '<label class="field">Nome<input class="input" name="nome" required></label>' : ''}
    <label class="field">E-mail<input class="input" type="email" name="email" required></label>
    <label class="field">Senha<input class="input" type="password" minlength="4" name="senha" required></label>
    <p class="error hidden" id="authError"></p><div class="auth-actions"><button class="btn btn-primary">${isRegister ? 'Cadastrar' : 'Login'}</button><button type="button" class="btn btn-outline" id="swapAuth">${isRegister ? 'Já tenho conta' : 'Criar nova conta'}</button></div>
  </form></main>`;
  document.querySelector('#swapAuth').onclick = () => renderAuth(isRegister ? 'login' : 'cadastro');
  document.querySelector('#authForm').onsubmit = (event) => {
    event.preventDefault();
    try {
      const form = Object.fromEntries(new FormData(event.currentTarget));
      user = isRegister ? register(form) : login(form);
      renderApp();
    } catch (error) {
      const target = document.querySelector('#authError');
      target.textContent = error.message;
      target.classList.remove('hidden');
    }
  };
}

function renderApp() {
  root.innerHTML = `<button class="btn btn-outline mobile-menu" id="openMenu">☰</button><div class="app"><aside class="sidebar" id="sidebar">
    <div class="brand"><div class="brand-icon">TE</div><div><p class="eyebrow">Terminal</p><h2>Engenharia</h2></div></div>
    <nav class="nav">${nav.map(([id, label]) => `<button data-page="${id}" class="${page === id ? 'active' : ''}">${icons[id]} ${label}</button>`).join('')}</nav>
    <button class="btn btn-outline logout" id="logout">🚪 Sair</button></aside><main class="main">${route()}</main></div>`;
  document.querySelector('#logout').onclick = () => { logout(); user = null; renderAuth('login'); };
  document.querySelector('#openMenu').onclick = () => document.querySelector('#sidebar').classList.add('open');
  document.querySelectorAll('[data-page]').forEach((button) => button.onclick = () => { page = button.dataset.page; renderApp(); });
  bindPageEvents();
}

function route() {
  return { dashboard, calendario, materias, tarefas, questoes, flashcards, perfil }[page]();
}

function dashboard() {
  const pending = data.contents.filter((content) => content.status !== 'dominado').length;
  const overdue = data.tasks.filter((task) => task.status !== 'concluído' && new Date(task.dataEntrega) < today).length;
  const topics = [['Deformação de Vigas', 'Resistência dos Materiais'], ['Equação de Bernoulli', 'Hidráulica'], ['Métodos Numéricos', 'Python'], ['Mecânica dos Fluidos', 'Física']];
  return `<header class="top"><div><p class="eyebrow">OLÁ, ESTUDANTE</p><h1 class="page-title">Terminal Engenharia</h1></div><div class="top-actions"><button class="btn btn-outline">Modo offline</button><button class="btn btn-outline">☀️</button><button class="btn btn-red" id="topLogout">🚪</button></div></header>
  <section class="hero"><p class="eyebrow">OLÁ, ESTUDANTE</p><h2>Terminal Engenharia</h2><p class="hero-sub">Painel Geral</p><p>Modo offline. Hoje vale focar nos temas da prova mais próxima e nas listas de exercícios pendentes.</p><div class="hero-grid">
  ${mini('📅', 'Cálculo amanhã', 'Próxima prova')}${mini('👥', pending, 'Tópicos pendentes')}${mini('📋', overdue, 'Listas atrasadas')}${mini('⚠️', subjects().filter((s) => s.priority === 'urgente').length, 'Urgente')}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">AGENDA RÁPIDA</p><h2>Provas próximas</h2></div><button class="btn btn-outline">Ver plano</button></div><div class="agenda"><span>📅 <strong>Cálculo</strong></span><strong class="red">amanhã</strong></div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">FILA DE ESTUDOS</p><h2>Tópicos Pendentes</h2><p class="muted">Cálculo está puxando a fila porque a prova está próxima.</p></div><button class="btn btn-outline" data-jump="materias">Ir para Central de Disciplinas</button></div><div class="grid4">${topics.map(([title, subject]) => `<article class="study-card"><div class="row"><div class="avatar">🎓</div><div><h3>${title}</h3><p class="muted">${subject}</p></div></div><p>Prova: amanhã <span class="badge">☑ Não testado</span></p><div class="actions2"><button class="btn btn-primary" data-jump="questoes">Fazer teste</button><button class="btn btn-outline" data-jump="flashcards">Ver teoria</button></div></article>`).join('')}</div></section>`;
}
function mini(icon, title, sub) { return `<div class="mini"><span>${icon}</span><div><strong>${title}</strong><p class="muted">${sub}</p></div></div>`; }

function materias() {
  const list = subjects();
  return `<div class="layout2"><section><p class="eyebrow">Matérias</p><h1 class="page-title">Central de Disciplinas</h1><div class="cards">${list.map((s) => `<article class="card"><div class="section-head"><div class="row"><span style="background:${s.cor};width:15px;height:15px;border-radius:999px"></span><h3>${esc(s.nome)}</h3></div><span class="pill">${s.priority}</span></div><p class="muted">${esc(s.descricao)}</p><div class="statgrid"><div class="stat"><strong>${s.desempenhoMedio}%</strong><br><small>desempenho</small></div><div class="stat"><strong>${data.contents.filter((c) => c.subjectId === s.id).length}</strong><br><small>conteúdos</small></div><div class="stat"><strong>${data.tasks.filter((t) => t.subjectId === s.id).length}</strong><br><small>tarefas</small></div></div><div class="card-tools"><button class="btn btn-outline" data-edit-subject="${s.id}">Editar</button><button class="btn btn-red" data-delete-subject="${s.id}">Excluir</button></div></article>`).join('')}</div></section><aside class="list">${subjectForm()}${contentForm()}</aside></div>`;
}
function subjectForm(subject = {}) { return `<form class="card" id="subjectForm"><h3>${subject.id ? 'Editar matéria' : 'Adicionar matéria'}</h3><input type="hidden" name="id" value="${subject.id || ''}"><label class="field">Nome<input class="input" name="nome" value="${esc(subject.nome)}" required></label><label class="field">Cor<input class="input" type="color" name="cor" value="${subject.cor || '#14b8a6'}"></label><label class="field">Descrição<textarea class="input" name="descricao">${esc(subject.descricao)}</textarea></label><button class="btn btn-primary">Salvar matéria</button></form>`; }
function contentForm() { return `<form class="card" id="contentForm"><h3>Adicionar conteúdo</h3><label class="field">Matéria<select class="input" name="subjectId">${data.subjects.map((s) => `<option value="${s.id}">${esc(s.nome)}</option>`)}</select></label><label class="field">Título<input class="input" name="titulo" required></label><label class="field">Resumo<textarea class="input" name="descricao"></textarea></label><label class="field">Dificuldade<select class="input" name="dificuldade"><option>baixa</option><option>média</option><option>alta</option></select></label><label class="field">Status<select class="input" name="status"><option>não iniciado</option><option>estudando</option><option>revisado</option><option>dominado</option></select></label><button class="btn btn-outline">Salvar conteúdo</button></form>`; }

function tarefas() { return `<div class="layout2"><aside>${taskForm()}</aside><section><h1 class="page-title">Tarefas e atividades</h1><div class="list">${data.tasks.map((t) => `<article class="card"><div class="section-head"><div><span class="pill">${t.tipo}</span> <span class="pill">${t.prioridade}</span><h3>${esc(t.titulo)}</h3><p class="muted">${esc(t.descricao)}</p><small>${subjectName(t.subjectId)}</small></div><div><strong>${t.dataEntrega}</strong><br><button class="btn btn-outline" data-complete-task="${t.id}">Concluir</button></div></div></article>`).join('')}</div></section></div>`; }
function taskForm(id = 'taskForm') { return `<form class="card" id="${id}"><h3>Nova atividade</h3><label class="field">Título<input class="input" name="titulo" required></label><label class="field">Descrição<textarea class="input" name="descricao"></textarea></label><label class="field">Matéria<select class="input" name="subjectId">${data.subjects.map((s) => `<option value="${s.id}">${esc(s.nome)}</option>`)}</select></label><label class="field">Entrega<input class="input" type="date" name="dataEntrega" value="2026-05-15"></label><label class="field">Tipo<select class="input" name="tipo">${eventTypes.map((type) => `<option>${type}</option>`)}</select></label><label class="field">Prioridade<select class="input" name="prioridade"><option>baixa</option><option>média</option><option>alta</option></select></label><label class="field">Status<select class="input" name="status"><option>pendente</option><option>em andamento</option><option>concluído</option></select></label><button class="btn btn-primary">Salvar tarefa</button></form>`; }

function calendario() { return `<p class="eyebrow">Calendário</p><h1 class="page-title">Maio 2026</h1><div class="card">${taskForm('calendarTaskForm')}</div><section class="section calendar">${Array.from({ length: 30 }, (_, i) => i + 1).map((day) => `<div class="day"><strong>📅 ${day}</strong>${data.tasks.filter((task) => Number(task.dataEntrega.slice(-2)) === day).map((task) => `<div class="event ${task.tipo}">${esc(task.titulo)}</div>`).join('')}</div>`).join('')}</section>`; }

function questoes() { return `<div class="layout2"><aside>${questionForm()}</aside><section><h1 class="page-title">Banco de questões</h1><p class="muted" id="feedback"></p><div class="list">${data.questions.map((q) => `<article class="card"><p class="eyebrow">${q.tipo} · ${subjectName(q.subjectId)} · ${contentName(q.contentId)}</p><h3>${esc(q.enunciado)}</h3><div class="question-actions">${(q.alternativas || []).map((alt) => `<button class="btn btn-outline" data-answer="${q.id}" data-value="${esc(alt)}">${esc(alt)}</button>`).join('')}</div><div class="row" style="margin-top:12px"><input class="input" id="answer-${q.id}" placeholder="Responder ou virar card"><button class="btn btn-primary" data-free-answer="${q.id}">Enviar</button></div><p class="muted">${(q.respostas || []).filter((r) => r.correta).length}/${(q.respostas || []).length} acertos salvos</p></article>`).join('')}</div></section></div>`; }
function questionForm() { return `<form class="card" id="questionForm"><h3>Cadastrar questão</h3><label class="field">Matéria<select class="input" name="subjectId">${data.subjects.map((s) => `<option value="${s.id}">${esc(s.nome)}</option>`)}</select></label><label class="field">Conteúdo<select class="input" name="contentId">${data.contents.map((c) => `<option value="${c.id}">${esc(c.titulo)}</option>`)}</select></label><label class="field">Tipo<select class="input" name="tipo"><option>múltipla escolha</option><option>verdadeiro ou falso</option><option>cards</option></select></label><label class="field">Enunciado<textarea class="input" name="enunciado" required></textarea></label><label class="field">Alternativas, uma por linha<textarea class="input" name="alternativas">A\nB\nC\nD</textarea></label><label class="field">Resposta correta<input class="input" name="correta" required></label><button class="btn btn-primary">Salvar questão</button></form>`; }

function flashcards() { return `<p class="eyebrow">Flashcards</p><h1 class="page-title">Cards de conteúdo teórico</h1><div class="cards">${data.contents.map((c) => `<article class="card"><p style="font-size:34px">▣</p><h3>${esc(c.titulo)}</h3><p class="muted">${esc(c.descricao)}</p><span class="pill">${c.dificuldade}</span> <span class="pill">${c.status}</span></article>`).join('')}</div>`; }
function perfil() { const stats = globalStats(data.tasks, data.questions); return `<p class="eyebrow">Perfil</p><h1 class="page-title">Dados do estudante</h1><section class="card profile"><div class="profile-icon">👤</div><div><h2>${esc(user?.nome || 'Estudante')}</h2><p class="muted">✉ ${esc(user?.email)}</p><div class="metrics"><div class="stat"><strong>${user?.studyStreak || 0} dias</strong><br>Sequência</div><div class="stat"><strong>${stats.tarefasConcluidas}</strong><br>Tarefas concluídas</div><div class="stat"><strong>${stats.questoesRespondidas}</strong><br>Questões respondidas</div><div class="stat"><strong>${stats.taxaAcertos}%</strong><br>Taxa de acertos</div></div></div></section>`; }

function bindPageEvents() {
  const topLogout = document.querySelector('#topLogout');
  if (topLogout) topLogout.onclick = () => { logout(); user = null; renderAuth('login'); };
  document.querySelectorAll('[data-jump]').forEach((el) => el.onclick = () => { page = el.dataset.jump; renderApp(); });
  const subjectFormEl = document.querySelector('#subjectForm');
  if (subjectFormEl) subjectFormEl.onsubmit = (event) => { event.preventDefault(); const form = Object.fromEntries(new FormData(event.currentTarget)); form.id ? persist({ ...data, subjects: data.subjects.map((s) => s.id === form.id ? { ...s, ...form } : s) }) : persist({ ...data, subjects: [...data.subjects, { ...form, id: uid(), desempenhoMedio: 0 }] }); };
  document.querySelectorAll('[data-edit-subject]').forEach((el) => el.onclick = () => { document.querySelector('#subjectForm').outerHTML = subjectForm(byId(data.subjects, el.dataset.editSubject)); bindPageEvents(); });
  document.querySelectorAll('[data-delete-subject]').forEach((el) => el.onclick = () => persist({ ...data, subjects: data.subjects.filter((s) => s.id !== el.dataset.deleteSubject), contents: data.contents.filter((c) => c.subjectId !== el.dataset.deleteSubject), tasks: data.tasks.filter((t) => t.subjectId !== el.dataset.deleteSubject) }));
  const contentFormEl = document.querySelector('#contentForm');
  if (contentFormEl) contentFormEl.onsubmit = (event) => { event.preventDefault(); const form = Object.fromEntries(new FormData(event.currentTarget)); persist({ ...data, contents: [...data.contents, { ...form, id: uid(), ultimaRevisao: '2026-05-06' }] }); };
  ['#taskForm', '#calendarTaskForm'].forEach((selector) => { const formEl = document.querySelector(selector); if (formEl) formEl.onsubmit = (event) => { event.preventDefault(); const form = Object.fromEntries(new FormData(event.currentTarget)); persist({ ...data, tasks: [...data.tasks, { ...form, id: uid() }] }); }; });
  document.querySelectorAll('[data-complete-task]').forEach((el) => el.onclick = () => persist({ ...data, tasks: data.tasks.map((t) => t.id === el.dataset.completeTask ? { ...t, status: 'concluído' } : t) }));
  const qForm = document.querySelector('#questionForm');
  if (qForm) qForm.onsubmit = (event) => { event.preventDefault(); const form = Object.fromEntries(new FormData(event.currentTarget)); persist({ ...data, questions: [...data.questions, { ...form, id: uid(), alternativas: form.tipo === 'cards' ? [] : form.alternativas.split('\n').filter(Boolean), respostas: [] }] }); };
  const answer = (id, resposta) => { const q = byId(data.questions, id); const ok = resposta.trim().toLowerCase() === q.correta.trim().toLowerCase(); data = { ...data, questions: data.questions.map((item) => item.id === id ? { ...item, respostas: [...(item.respostas || []), { resposta, correta: ok, data: new Date().toISOString() }] } : item) }; saveState(data); document.querySelector('#feedback').textContent = ok ? 'Acertou! XP de estudo registrado.' : `Errou. Resposta correta: ${q.correta}`; setTimeout(renderApp, 700); };
  document.querySelectorAll('[data-answer]').forEach((el) => el.onclick = () => answer(el.dataset.answer, el.dataset.value));
  document.querySelectorAll('[data-free-answer]').forEach((el) => el.onclick = () => answer(el.dataset.freeAnswer, document.querySelector(`#answer-${el.dataset.freeAnswer}`).value));
}

render();
