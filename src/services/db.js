// Database & Persistence Layer (Student 1 Responsibility: Робота з базами даних / Архітектура)
import { cars as initialCars } from '../data/cars.js';

const STORAGE_KEYS = {
  CARS: 'ciganrent_db_cars_v2',
  USERS: 'ciganrent_db_users_v2',
  BOOKINGS: 'ciganrent_db_bookings_v2',
  SESSION: 'ciganrent_current_session_v2'
};

export class DatabaseService {
  static init() {
    // Initialize cars if not present
    if (!localStorage.getItem(STORAGE_KEYS.CARS)) {
      const enrichedCars = initialCars.map(car => ({
        ...car,
        year: car.year || 2024,
        fuel: car.fuel || (car.make === 'Tesla' ? 'Електро' : 'Бензин / Гібрид'),
        deposit: car.price * 5,
        status: car.status || 'free', // 'free' | 'reserved'
        rating: 5.0,
        tripsCount: Math.floor(Math.random() * 25) + 5
      }));
      localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(enrichedCars));
    }

    // Initialize default users if not present
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      const defaultUsers = [
        {
          id: 'user-admin',
          name: 'Артемій Мороз (Team Lead)',
          email: 'admin@ciganrent.com',
          password: 'admin',
          role: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'user-demo',
          name: 'Олександр Рябенко',
          email: 'user@ciganrent.com',
          password: 'password',
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    // Initialize demo bookings if not present
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      const defaultBookings = [
        {
          id: 'ORD-9841',
          userId: 'user-demo',
          carId: 5,
          carTitle: 'Porsche 911 Carrera',
          startDate: '2026-07-01',
          endDate: '2026-07-04',
          days: 3,
          basePrice: 250,
          discountAmount: 37.5,
          extrasCost: 45,
          totalCostUSD: 757.5,
          status: 'completed',
          createdAt: '2026-06-28T10:00:00.000Z'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(defaultBookings));
    }
  }

  // --- CARS CRUD ---
  static getCars() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CARS)) || [];
    } catch (e) {
      return [];
    }
  }

  static getCarById(carId) {
    const cars = this.getCars();
    return cars.find(c => c.id === Number(carId));
  }

  static saveCar(newCar) {
    const cars = this.getCars();
    const id = newCar.id || (cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1);
    const carObj = { ...newCar, id: Number(id), status: newCar.status || 'free' };
    const existingIndex = cars.findIndex(c => c.id === carObj.id);
    if (existingIndex > -1) {
      cars[existingIndex] = carObj;
    } else {
      cars.push(carObj);
    }
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
    return carObj;
  }

  static deleteCar(carId) {
    const cars = this.getCars().filter(c => c.id !== Number(carId));
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
    return true;
  }

  static updateCarStatus(carId, status) {
    const cars = this.getCars();
    const car = cars.find(c => c.id === Number(carId));
    if (car) {
      car.status = status;
      localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
    }
  }

  // --- USERS ---
  static getUsers() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
  }

  static getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  static createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      id: 'user-' + Date.now(),
      role: 'user',
      createdAt: new Date().toISOString(),
      ...userData
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  }

  // --- BOOKINGS ---
  static getBookings(userId = null) {
    this.init();
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    if (userId) {
      return bookings.filter(b => b.userId === userId);
    }
    return bookings;
  }

  static createBooking(bookingData) {
    const bookings = this.getBookings();
    const newBooking = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: 'active',
      ...bookingData
    };
    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Update car status to reserved
    this.updateCarStatus(newBooking.carId, 'reserved');
    return newBooking;
  }

  static updateBookingStatus(bookingId, status) {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

      // If completed or cancelled, free the car
      if (status === 'completed' || status === 'cancelled') {
        this.updateCarStatus(booking.carId, 'free');
      }
    }
    return booking;
  }
}
