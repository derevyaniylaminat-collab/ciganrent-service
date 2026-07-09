// Administration Service (Student 1 Responsibility: Адмін-панель / Управління каталогом і замовленнями)
import { DatabaseService } from './db.js';

export class AdminService {
  static getStatistics() {
    const cars = DatabaseService.getCars();
    const bookings = DatabaseService.getBookings();
    const users = DatabaseService.getUsers();

    const activeBookings = bookings.filter(b => b.status === 'active');
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const totalRevenueUSD = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (b.totalCostUSD || 0), 0);

    return {
      totalCars: cars.length,
      freeCars: cars.filter(c => c.status === 'free').length,
      reservedCars: cars.filter(c => c.status === 'reserved').length,
      totalUsers: users.length,
      totalBookings: bookings.length,
      activeBookingsCount: activeBookings.length,
      completedBookingsCount: completedBookings.length,
      totalRevenueUSD: Math.round(totalRevenueUSD)
    };
  }

  static addNewCar(carData) {
    if (!carData.make || !carData.model || !carData.price) {
      throw new Error('Обовʼязкові поля авто не заповнені.');
    }
    const payload = {
      make: carData.make,
      model: carData.model,
      class: carData.class || 'comfort',
      transmission: carData.transmission || 'auto',
      fuel: carData.fuel || 'Бензин',
      year: Number(carData.year) || 2024,
      price: Number(carData.price),
      deposit: Number(carData.price) * 5,
      image: carData.image || 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80',
      status: 'free',
      rating: 5.0
    };
    return DatabaseService.saveCar(payload);
  }

  static removeCar(carId) {
    return DatabaseService.deleteCar(carId);
  }

  static changeBookingStatus(bookingId, status) {
    return DatabaseService.updateBookingStatus(bookingId, status);
  }
}
