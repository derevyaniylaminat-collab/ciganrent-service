import { describe, it, expect, beforeEach } from 'vitest';
import { BookingService } from '../services/bookingService.js';
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

describe('BookingService', () => {
  beforeEach(() => {
    localStorage.clear();
    DatabaseService.init(); // Initialize mock cars
  });

  it('should correctly calculate basic rental cost for 2 days (no discount)', () => {
    const breakdown = BookingService.calculateRentalCost({
      carPricePerDay: 50,
      startDate: '2026-08-01',
      endDate: '2026-08-03',
      selectedExtras: []
    });
    expect(breakdown.days).toBe(2);
    expect(breakdown.discountPercent).toBe(0);
    expect(breakdown.baseSubtotal).toBe(100);
    expect(breakdown.totalUSD).toBe(100);
    expect(breakdown.deposit).toBe(250); // 50 * 5
  });

  it('should apply 5% discount for 3 to 6 days', () => {
    const breakdown = BookingService.calculateRentalCost({
      carPricePerDay: 100,
      startDate: '2026-08-01',
      endDate: '2026-08-05', // 4 days
      selectedExtras: []
    });
    expect(breakdown.days).toBe(4);
    expect(breakdown.discountPercent).toBe(5);
    expect(breakdown.baseSubtotal).toBe(400);
    expect(breakdown.discountAmount).toBe(20);
    expect(breakdown.totalUSD).toBe(380);
  });

  it('should apply 10% discount for 7 to 14 days', () => {
    const breakdown = BookingService.calculateRentalCost({
      carPricePerDay: 100,
      startDate: '2026-08-01',
      endDate: '2026-08-11', // 10 days
      selectedExtras: []
    });
    expect(breakdown.days).toBe(10);
    expect(breakdown.discountPercent).toBe(10);
    expect(breakdown.totalUSD).toBe(900);
  });

  it('should calculate extras cost correctly', () => {
    // kasko = 15, child_seat = 5 -> total 20/day
    const breakdown = BookingService.calculateRentalCost({
      carPricePerDay: 50,
      startDate: '2026-08-01',
      endDate: '2026-08-03', // 2 days
      selectedExtras: ['kasko', 'child_seat']
    });
    expect(breakdown.days).toBe(2);
    expect(breakdown.extrasCost).toBe(40); // 20 * 2
    expect(breakdown.totalUSD).toBe(140); // 100 + 40
  });

  it('should handle invalid dates gracefully', () => {
    const breakdown = BookingService.calculateRentalCost({
      carPricePerDay: 50,
      startDate: null,
      endDate: '2026-08-03',
      selectedExtras: []
    });
    expect(breakdown).toBeNull();
  });
});
