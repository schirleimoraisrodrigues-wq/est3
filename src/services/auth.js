const AUTH_KEY = 'terminal-engenharia-auth';
const USERS_KEY = 'terminal-engenharia-users';

function users() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function setUsers(nextUsers) {
  localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
}

export function register({ nome, email, senha }) {
  const allUsers = users();
  if (allUsers.some((user) => user.email === email)) throw new Error('E-mail já cadastrado.');
  const user = { id: crypto.randomUUID(), nome, email, senha, studyStreak: 7 };
  setUsers([...allUsers, user]);
  const publicUser = { id: user.id, nome: user.nome, email: user.email, studyStreak: user.studyStreak };
  localStorage.setItem(AUTH_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export function login({ email, senha }) {
  const user = users().find((item) => item.email === email && item.senha === senha);
  if (!user) throw new Error('Credenciais inválidas.');
  const publicUser = { id: user.id, nome: user.nome, email: user.email, studyStreak: user.studyStreak };
  localStorage.setItem(AUTH_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
