// Authentication & User Session Service (Student 1 Responsibility: Модуль користувачів)
import { DatabaseService } from './db.js';

const SESSION_KEY = 'ciganrent_active_user';

export class AuthService {
  static getCurrentUser() {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  static isLoggedIn() {
    return Boolean(this.getCurrentUser());
  }

  static isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }

  static login(email, password) {
    const user = DatabaseService.getUserByEmail(email);
    if (!user) {
      throw new Error('Користувача з таким Email не знайдено.');
    }
    if (user.password !== password) {
      throw new Error('Невірний пароль.');
    }
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  }

  static register(name, email, password) {
    if (!name || !email || !password) {
      throw new Error('Заповніть всі обовʼязкові поля.');
    }
    const existing = DatabaseService.getUserByEmail(email);
    if (existing) {
      throw new Error('Користувач з таким Email вже існує.');
    }
    const newUser = DatabaseService.createUser({ name, email, password });
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  }

  static logout() {
    localStorage.removeItem(SESSION_KEY);
  }
}
