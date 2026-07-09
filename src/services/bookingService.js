// Rental Calculation & Booking Business Logic (Student 1 Responsibility: бізнес-логіка розрахунку оренди)
import { DatabaseService } from './db.js';

export const EXTRA_OPTIONS = [
  { id: 'kasko', label: '🛡️ Повне КАСКО (страхування 0% франшиза)', pricePerDay: 15 },
  { id: 'child_seat', label: '👶 Дитяче крісло Isofix преміум', pricePerDay: 5 },
  { id: 'driver', label: '🤵 Особистий професійний водій VIP', pricePerDay: 60 },
  { id: 'wifi', label: '🌐 5G Wi-Fi роутер у салоні', pricePerDay: 4 }
];

export class BookingService {
  /**
   * Calculate rental cost breakdown with tiered discounts
   */
  static calculateRentalCost({ carPricePerDay, startDate, endDate, selectedExtras = [] }) {
    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate difference in days (at least 1 day)
    const diffTime = end.getTime() - start.getTime();
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Tiered Discount logic
    let discountPercent = 0;
    if (days >= 15) {
      discountPercent = 15;
    } else if (days >= 7) {
      discountPercent = 10;
    } else if (days >= 3) {
      discountPercent = 5;
    }

    const baseSubtotal = carPricePerDay * days;
    const discountAmount = Math.round((baseSubtotal * (discountPercent / 100)) * 10) / 10;
    const discountedBase = baseSubtotal - discountAmount;

    // Extras cost calculation
    let extrasCostPerDay = 0;
    const extrasDetails = [];
    selectedExtras.forEach(extraId => {
      const opt = EXTRA_OPTIONS.find(o => o.id === extraId);
      if (opt) {
        extrasCostPerDay += opt.pricePerDay;
        extrasDetails.push({ ...opt, total: opt.pricePerDay * days });
      }
    });

    const totalExtrasCost = extrasCostPerDay * days;
    const totalUSD = Math.round((discountedBase + totalExtrasCost) * 10) / 10;
    const deposit = carPricePerDay * 5;

    return {
      days,
      baseSubtotal,
      discountPercent,
      discountAmount,
      extrasCost: totalExtrasCost,
      extrasDetails,
      deposit,
      totalUSD
    };
  }

  /**
   * Check if car is free for selected dates
   */
  static isCarAvailable(carId, startDate, endDate) {
    const car = DatabaseService.getCarById(carId);
    if (!car) return false;
    if (car.status === 'reserved') {
      return false;
    }
    return true;
  }

  /**
   * Create a new booking
   */
  static createReservation({ user, car, startDate, endDate, selectedExtras, costBreakdown }) {
    const bookingPayload = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      carId: car.id,
      carTitle: `${car.make} ${car.model}`,
      carImage: car.image,
      startDate,
      endDate,
      days: costBreakdown.days,
      basePrice: car.price,
      discountPercent: costBreakdown.discountPercent,
      discountAmount: costBreakdown.discountAmount,
      extras: selectedExtras,
      extrasCost: costBreakdown.extrasCost,
      totalCostUSD: costBreakdown.totalUSD,
      deposit: costBreakdown.deposit
    };

    return DatabaseService.createBooking(bookingPayload);
  }
}
