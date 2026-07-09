import './style.css';
import { DatabaseService } from './services/db.js';
import { AuthService } from './services/authService.js';
import { BookingService } from './services/bookingService.js';
import { AdminService } from './services/adminService.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize DB storage
  DatabaseService.init();

  // App State
  let currentCurrency = 'USD';
  const exchangeRateUAH = 41.5;

  // DOM Elements - Catalog & Filters
  const carListEl = document.getElementById('car-list');
  const carCountEl = document.getElementById('car-count');
  const classFilter = document.getElementById('class-filter');
  const transmissionFilter = document.getElementById('transmission-filter');
  const statusFilter = document.getElementById('status-filter');
  const applyBtn = document.getElementById('apply-filters');
  const currencyToggleBtn = document.getElementById('currency-toggle');
  const scrollToCatalogBtn = document.getElementById('scroll-to-catalog');

  // DOM Elements - Modals & Header
  const openAuthBtn = document.getElementById('open-auth');
  const openCabinetBtn = document.getElementById('open-cabinet');
  const openAdminBtn = document.getElementById('open-admin');
  const authModal = document.getElementById('auth-modal');
  const bookingModal = document.getElementById('booking-modal');
  const cabinetModal = document.getElementById('cabinet-modal');
  const adminModal = document.getElementById('admin-modal');

  // Toast System
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Currency Formatter
  function formatPrice(priceUSD) {
    if (currentCurrency === 'UAH') {
      const priceUAH = Math.round(priceUSD * exchangeRateUAH);
      return `₴${priceUAH.toLocaleString()}`;
    }
    return `$${Number(priceUSD).toLocaleString()}`;
  }

  // --- HEADER & AUTH STATE SYNC ---
  function updateHeaderUI() {
    const user = AuthService.getCurrentUser();
    if (user) {
      openAuthBtn.classList.add('hidden');
      openCabinetBtn.classList.remove('hidden');
      openCabinetBtn.textContent = `👤 ${user.name.split(' ')[0]}`;
      if (user.role === 'admin') {
        openAdminBtn.classList.remove('hidden');
      } else {
        openAdminBtn.classList.add('hidden');
      }
    } else {
      openAuthBtn.classList.remove('hidden');
      openCabinetBtn.classList.add('hidden');
      openAdminBtn.classList.add('hidden');
    }
  }

  updateHeaderUI();

  // --- CATALOG FILTERING & RENDERING ---
  function filterAndRenderCars() {
    const allCars = DatabaseService.getCars();
    const selectedClass = classFilter ? classFilter.value : 'all';
    const selectedTrans = transmissionFilter ? transmissionFilter.value : 'all';
    const selectedStatus = statusFilter ? statusFilter.value : 'all';

    const filtered = allCars.filter(car => {
      const matchClass = selectedClass === 'all' || car.class === selectedClass;
      const matchTrans = selectedTrans === 'all' || car.transmission === selectedTrans;
      const matchStatus = selectedStatus === 'all' || car.status === selectedStatus;
      return matchClass && matchTrans && matchStatus;
    });

    renderCars(filtered);
  }

  function renderCars(carArray) {
    carListEl.innerHTML = '';
    carCountEl.textContent = `Знайдено: ${carArray.length}`;

    if (carArray.length === 0) {
      carListEl.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">Автомобілів за обраними критеріями не знайдено.</p>';
      return;
    }

    carArray.forEach((car, index) => {
      const card = document.createElement('div');
      card.className = 'car-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.animation = `fadeUp 0.5s ease forwards ${index * 0.04}s`;

      const transLabel = car.transmission === 'auto' ? 'Автомат' : 'Механіка';
      const classLabel = {
        'economy': 'Економ',
        'comfort': 'Комфорт',
        'business': 'Бізнес',
        'premium': 'Преміум'
      }[car.class] || car.class;

      const isReserved = car.status === 'reserved';
      const statusBadgeHtml = isReserved
        ? `<span class="car-status-badge car-status-reserved">🔴 Заброньовано</span>`
        : `<span class="car-status-badge car-status-free">🟢 Вільне</span>`;

      card.innerHTML = `
        <div class="car-image" style="background-image: url('${car.image}')">
          ${statusBadgeHtml}
          <div class="car-badge">${classLabel}</div>
        </div>
        <div class="car-info">
          <h3 class="car-title">${car.make} ${car.model}</h3>
          <div class="car-meta">
            <span>⚙️ ${transLabel}</span>
            <span>⛽ ${car.fuel || 'Бензин'}</span>
            <span>⭐ ${car.rating || '5.0'}</span>
          </div>
          <div class="car-price-row">
            <div class="car-price">${formatPrice(car.price)}<small>/ доба</small></div>
            <button class="btn-rent" data-car-id="${car.id}" ${isReserved ? 'disabled' : ''}>
              ${isReserved ? 'Зайнято' : 'Орендувати'}
            </button>
          </div>
        </div>
      `;
      carListEl.appendChild(card);
    });

    // Attach click events to rent buttons
    document.querySelectorAll('.btn-rent').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const carId = Number(e.currentTarget.getAttribute('data-car-id'));
        openBookingModal(carId);
      });
    });
  }

  // Initial render
  filterAndRenderCars();

  if (applyBtn) {
    applyBtn.addEventListener('click', filterAndRenderCars);
  }

  // Currency Toggle
  if (currencyToggleBtn) {
    currencyToggleBtn.addEventListener('click', () => {
      currentCurrency = currentCurrency === 'USD' ? 'UAH' : 'USD';
      currencyToggleBtn.textContent = currentCurrency;
      filterAndRenderCars();
    });
  }

  if (scrollToCatalogBtn) {
    scrollToCatalogBtn.addEventListener('click', () => {
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- BOOKING MODAL & DYNAMIC PRICE CALCULATION ---
  const bookingStartDateEl = document.getElementById('booking-start-date');
  const bookingEndDateEl = document.getElementById('booking-end-date');
  const bookingExtrasContainer = document.getElementById('booking-extras');
  const bookingPriceBreakdownEl = document.getElementById('booking-price-breakdown');
  let currentBookingCar = null;

  function setDefaultDates() {
    const today = new Date();
    const plus3 = new Date();
    plus3.setDate(today.getDate() + 3);

    bookingStartDateEl.value = today.toISOString().split('T')[0];
    bookingEndDateEl.value = plus3.toISOString().split('T')[0];
  }

  function openBookingModal(carId) {
    currentBookingCar = DatabaseService.getCarById(carId);
    if (!currentBookingCar) return;

    document.getElementById('booking-car-id').value = carId;
    setDefaultDates();

    // Reset extras checkboxes
    if (bookingExtrasContainer) {
      bookingExtrasContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
    }

    renderBookingSummaryHeader();
    updateLiveRentalCalculation();

    bookingModal.classList.remove('hidden');
  }

  function renderBookingSummaryHeader() {
    const headerEl = document.getElementById('booking-car-summary');
    headerEl.innerHTML = `
      <div class="booking-car-thumb" style="background-image: url('${currentBookingCar.image}')"></div>
      <div>
        <h4 style="font-size: 1.3rem; color: #fff;">${currentBookingCar.make} ${currentBookingCar.model}</h4>
        <p style="color: var(--accent-1); font-weight: 700;">${formatPrice(currentBookingCar.price)} / доба</p>
      </div>
    `;
  }

  function updateLiveRentalCalculation() {
    if (!currentBookingCar) return;

    const selectedExtras = [];
    bookingExtrasContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      selectedExtras.push(cb.value);
    });

    const breakdown = BookingService.calculateRentalCost({
      carPricePerDay: currentBookingCar.price,
      startDate: bookingStartDateEl.value,
      endDate: bookingEndDateEl.value,
      selectedExtras
    });

    if (!breakdown) return;

    let discountHtml = '';
    if (breakdown.discountPercent > 0) {
      discountHtml = `
        <div class="cost-row">
          <span>Знижка за тривалу оренду (<span class="discount-badge">-${breakdown.discountPercent}%</span>):</span>
          <span style="color: #10b981;">-${formatPrice(breakdown.discountAmount)}</span>
        </div>
      `;
    }

    bookingPriceBreakdownEl.innerHTML = `
      <div class="cost-row">
        <span>Тривалість оренди:</span>
        <span style="color: #fff; font-weight: 600;">${breakdown.days} діб</span>
      </div>
      <div class="cost-row">
        <span>Базова вартість (${formatPrice(currentBookingCar.price)} × ${breakdown.days}):</span>
        <span>${formatPrice(breakdown.baseSubtotal)}</span>
      </div>
      ${discountHtml}
      <div class="cost-row">
        <span>Додаткові послуги та опції:</span>
        <span>${formatPrice(breakdown.extrasCost)}</span>
      </div>
      <div class="cost-row" style="font-size: 0.85rem; border-top: 1px dashed var(--glass-border); padding-top: 0.4rem;">
        <span>Гарантійна застава (повертається):</span>
        <span>${formatPrice(breakdown.deposit)}</span>
      </div>
      <div class="cost-row total-row">
        <span>Разом до сплати:</span>
        <span style="color: var(--accent-2);">${formatPrice(breakdown.totalUSD)}</span>
      </div>
    `;
  }

  if (bookingStartDateEl && bookingEndDateEl) {
    bookingStartDateEl.addEventListener('change', updateLiveRentalCalculation);
    bookingEndDateEl.addEventListener('change', updateLiveRentalCalculation);
  }

  if (bookingExtrasContainer) {
    bookingExtrasContainer.addEventListener('change', updateLiveRentalCalculation);
  }

  // Handle Booking Submit
  const bookingForm = document.getElementById('booking-form');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentBookingCar) return;

    let user = AuthService.getCurrentUser();
    if (!user) {
      // Auto-assign demo user if not logged in
      user = { id: 'user-guest-' + Date.now(), name: 'Гість системи', email: 'guest@ciganrent.com' };
    }

    const selectedExtras = [];
    bookingExtrasContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      selectedExtras.push(cb.value);
    });

    const breakdown = BookingService.calculateRentalCost({
      carPricePerDay: currentBookingCar.price,
      startDate: bookingStartDateEl.value,
      endDate: bookingEndDateEl.value,
      selectedExtras
    });

    BookingService.createReservation({
      user,
      car: currentBookingCar,
      startDate: bookingStartDateEl.value,
      endDate: bookingEndDateEl.value,
      selectedExtras,
      costBreakdown: breakdown
    });

    bookingModal.classList.add('hidden');
    showToast(`Успішно заброньовано ${currentBookingCar.make} ${currentBookingCar.model} на ${breakdown.days} діб!`, 'success');

    filterAndRenderCars();
    renderCabinetBookings();
  });

  // --- AUTHENTICATION MODAL LOGIC ---
  const closeAuthBtn = document.getElementById('close-auth-modal');
  const authTabs = document.querySelectorAll('#auth-modal .auth-tab');
  const authForms = document.querySelectorAll('#auth-modal .auth-form');

  openAuthBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
  closeAuthBtn.addEventListener('click', () => authModal.classList.add('hidden'));

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      authForms.forEach(f => f.classList.add('hidden'));
      document.getElementById(`form-${tab.dataset.tab}`).classList.remove('hidden');
    });
  });

  document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pwd = document.getElementById('login-password').value;
    try {
      const user = AuthService.login(email, pwd);
      authModal.classList.add('hidden');
      updateHeaderUI();
      showToast(`Вітаємо, ${user.name}! Успішний вхід.`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  document.getElementById('form-register').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pwd = document.getElementById('reg-password').value;
    try {
      const user = AuthService.register(name, email, pwd);
      authModal.classList.add('hidden');
      updateHeaderUI();
      showToast(`Вітаємо, ${user.name}! Акаунт зареєстровано.`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // --- PERSONAL CABINET LOGIC ---
  function renderCabinetBookings() {
    const user = AuthService.getCurrentUser();
    const listEl = document.getElementById('cabinet-bookings-list');
    if (!listEl) return;

    if (!user) {
      listEl.innerHTML = '<p>Будь ласка, увійдіть у систему.</p>';
      return;
    }

    document.getElementById('cabinet-user-name').textContent = user.name;
    document.getElementById('cabinet-user-email').textContent = `Email: ${user.email} • Роль: ${user.role === 'admin' ? 'Адміністратор' : 'Клієнт'}`;

    const bookings = DatabaseService.getBookings(user.role === 'admin' ? null : user.id);

    if (bookings.length === 0) {
      listEl.innerHTML = '<p style="color: var(--text-muted);">У вас поки немає оформлених бронювань.</p>';
      return;
    }

    listEl.innerHTML = bookings.map(b => `
      <div class="history-item">
        <div>
          <h4 style="color: #fff; font-size: 1.15rem;">${b.carTitle}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Дати: <b>${b.startDate} — ${b.endDate}</b> (${b.days} діб)
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="text-align: right;">
            <div style="font-weight: 800; color: #fff;">${formatPrice(b.totalCostUSD)}</div>
            <span class="history-item-status status-${b.status}">
              ${b.status === 'active' ? 'Активне' : b.status === 'completed' ? 'Завершено' : 'Скасовано'}
            </span>
          </div>
          ${b.status === 'active' ? `
            <button class="btn-outline btn-cancel-booking" data-id="${b.id}" style="padding: 0.4rem 1rem; border-color: #ef4444; color: #ef4444;">
              Скасувати
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.btn-cancel-booking').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        DatabaseService.updateBookingStatus(id, 'cancelled');
        showToast('Бронювання успішно скасовано. Автомобіль звільнено.', 'info');
        renderCabinetBookings();
        filterAndRenderCars();
      });
    });
  }

  openCabinetBtn.addEventListener('click', () => {
    renderCabinetBookings();
    cabinetModal.classList.remove('hidden');
  });

  document.getElementById('close-cabinet-modal').addEventListener('click', () => {
    cabinetModal.classList.add('hidden');
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    AuthService.logout();
    cabinetModal.classList.add('hidden');
    updateHeaderUI();
    showToast('Ви вийшли з акаунта.', 'info');
  });

  // --- ADMIN PANEL LOGIC ---
  function renderAdminPanel() {
    const stats = AdminService.getStatistics();
    const statsContainer = document.getElementById('admin-stats');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="stat-card">
          <div class="stat-value">${stats.totalCars}</div>
          <div class="stat-label">Всього автомобілів</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: #10b981;">${stats.freeCars}</div>
          <div class="stat-label">Вільних зараз</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: #ef4444;">${stats.reservedCars}</div>
          <div class="stat-label">Заброньовано</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.totalBookings}</div>
          <div class="stat-label">Всього замовлень</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: var(--accent-2);">${formatPrice(stats.totalRevenueUSD)}</div>
          <div class="stat-label">Загальний дохід</div>
        </div>
      `;
    }

    renderAdminCarsList();
    renderAdminBookingsList();
  }

  function renderAdminCarsList() {
    const cars = DatabaseService.getCars();
    const listEl = document.getElementById('admin-cars-list');
    if (!listEl) return;

    listEl.innerHTML = cars.map(car => `
      <div class="history-item">
        <div>
          <h4 style="color: #fff;">${car.make} ${car.model} (${car.class})</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Ціна: ${formatPrice(car.price)}/доба • Статус: <b>${car.status === 'free' ? 'Вільне' : 'Заброньовано'}</b>
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-outline btn-toggle-status" data-id="${car.id}" style="padding: 0.4rem 1rem;">
            ${car.status === 'free' ? 'Забронювати вручну' : 'Звільнити авто'}
          </button>
          <button class="btn-outline btn-delete-car" data-id="${car.id}" style="padding: 0.4rem 1rem; border-color: #ef4444; color: #ef4444;">
            Видалити
          </button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.btn-toggle-status').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const carId = e.currentTarget.getAttribute('data-id');
        const car = DatabaseService.getCarById(carId);
        DatabaseService.updateCarStatus(carId, car.status === 'free' ? 'reserved' : 'free');
        renderAdminPanel();
        filterAndRenderCars();
        showToast('Статус автомобіля змінено.', 'info');
      });
    });

    document.querySelectorAll('.btn-delete-car').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const carId = e.currentTarget.getAttribute('data-id');
        AdminService.removeCar(carId);
        renderAdminPanel();
        filterAndRenderCars();
        showToast('Автомобіль видалено з каталогу.', 'info');
      });
    });
  }

  function renderAdminBookingsList() {
    const bookings = DatabaseService.getBookings();
    const listEl = document.getElementById('admin-bookings-list');
    if (!listEl) return;

    listEl.innerHTML = bookings.map(b => `
      <div class="history-item">
        <div>
          <h4 style="color: #fff;">Замовлення #${b.id} — ${b.carTitle}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Клієнт: <b>${b.userName || b.userEmail}</b> • Дати: ${b.startDate} — ${b.endDate} • Сума: <b>${formatPrice(b.totalCostUSD)}</b>
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="history-item-status status-${b.status}">
            ${b.status}
          </span>
          ${b.status === 'active' ? `
            <button class="btn-outline btn-admin-complete" data-id="${b.id}" style="padding: 0.3rem 0.8rem; border-color: #10b981; color: #10b981;">Завершити</button>
            <button class="btn-outline btn-admin-cancel" data-id="${b.id}" style="padding: 0.3rem 0.8rem; border-color: #ef4444; color: #ef4444;">Скасувати</button>
          ` : ''}
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.btn-admin-complete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        AdminService.changeBookingStatus(id, 'completed');
        renderAdminPanel();
        filterAndRenderCars();
        showToast(`Замовлення #${id} завершено! Автомобіль звільнено.`, 'success');
      });
    });

    document.querySelectorAll('.btn-admin-cancel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        AdminService.changeBookingStatus(id, 'cancelled');
        renderAdminPanel();
        filterAndRenderCars();
        showToast(`Замовлення #${id} скасовано.`, 'info');
      });
    });
  }

  openAdminBtn.addEventListener('click', () => {
    renderAdminPanel();
    adminModal.classList.remove('hidden');
  });

  document.getElementById('close-admin-modal').addEventListener('click', () => {
    adminModal.classList.add('hidden');
  });

  const tabCarsBtn = document.getElementById('tab-admin-cars-btn');
  const tabBookingsBtn = document.getElementById('tab-admin-bookings-btn');
  const sectionCars = document.getElementById('admin-section-cars');
  const sectionBookings = document.getElementById('admin-section-bookings');

  if (tabCarsBtn && tabBookingsBtn) {
    tabCarsBtn.addEventListener('click', () => {
      tabCarsBtn.classList.add('active');
      tabBookingsBtn.classList.remove('active');
      sectionCars.classList.remove('hidden');
      sectionBookings.classList.add('hidden');
    });

    tabBookingsBtn.addEventListener('click', () => {
      tabBookingsBtn.classList.add('active');
      tabCarsBtn.classList.remove('active');
      sectionBookings.classList.remove('hidden');
      sectionCars.classList.add('hidden');
    });
  }

  // Handle Add Car submission
  const addCarForm = document.getElementById('admin-add-car-form');
  if (addCarForm) {
    addCarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        const newCarData = {
          make: document.getElementById('add-make').value,
          model: document.getElementById('add-model').value,
          class: document.getElementById('add-class').value,
          price: document.getElementById('add-price').value,
          transmission: document.getElementById('add-trans').value,
          image: document.getElementById('add-image').value || undefined
        };
        AdminService.addNewCar(newCarData);
        addCarForm.reset();
        renderAdminPanel();
        filterAndRenderCars();
        showToast('Новий автомобіль успішно додано до каталогу!', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // Modal backdrop close handlers
  [authModal, bookingModal, cabinetModal, adminModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
  });

  document.getElementById('close-booking-modal').addEventListener('click', () => {
    bookingModal.classList.add('hidden');
  });

  // Attach smooth scrolling
  document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetEl = document.querySelector(this.getAttribute('href'));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
