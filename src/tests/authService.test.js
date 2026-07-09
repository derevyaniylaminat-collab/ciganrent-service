import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../services/authService.js';
import { DatabaseService } from '../services/db.js';

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) { return store[key] || null; },
    setItem(key, value) { store[key] = value.toString(); },
    removeItem(key) { delete store[key]; },
    clear() { store = {}; }
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    DatabaseService.init(); // Initialize mock users
  });

  it('should successfully login an existing user', () => {
    const user = AuthService.login('user@ciganrent.com', 'password');
    expect(user).toBeDefined();
    expect(user.email).toBe('user@ciganrent.com');
    expect(user.role).toBe('user');
    expect(AuthService.isLoggedIn()).toBe(true);
  });

  it('should throw an error for incorrect password', () => {
    expect(() => {
      AuthService.login('user@ciganrent.com', 'wrongpassword');
    }).toThrow('Невірний пароль.');
  });

  it('should throw an error for non-existent email', () => {
    expect(() => {
      AuthService.login('notfound@example.com', 'password');
    }).toThrow('Користувача з таким Email не знайдено.');
  });

  it('should successfully register a new user', () => {
    const newUser = AuthService.register('John Doe', 'john@test.com', '123123');
    expect(newUser).toBeDefined();
    expect(newUser.name).toBe('John Doe');
    expect(newUser.email).toBe('john@test.com');
    expect(AuthService.isLoggedIn()).toBe(true);
  });

  it('should throw an error when registering with an existing email', () => {
    expect(() => {
      AuthService.register('Clone', 'user@ciganrent.com', 'newpass');
    }).toThrow('Користувач з таким Email вже існує.');
  });

  it('should correctly identify admin user', () => {
    AuthService.login('admin@ciganrent.com', 'admin');
    expect(AuthService.isAdmin()).toBe(true);
  });
});
