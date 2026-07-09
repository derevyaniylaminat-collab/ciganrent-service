import './style.css'
import { cars } from './data/cars.js'

document.addEventListener('DOMContentLoaded', () => {
  const carListEl = document.getElementById('car-list');
  const carCountEl = document.getElementById('car-count');
  
  const classFilter = document.getElementById('class-filter');
  const transmissionFilter = document.getElementById('transmission-filter');
  const applyBtn = document.getElementById('apply-filters');
  const scrollToCatalogBtn = document.getElementById('scroll-to-catalog');
  const currencyToggleBtn = document.getElementById('currency-toggle');

  let currentCurrency = 'USD';
  const exchangeRateUAH = 41.5;

  // Initial render with stagger animation
  renderCars(cars);

  // Apply filters on button click
  applyBtn.addEventListener('click', () => {
    const selectedClass = classFilter.value;
    const selectedTransmission = transmissionFilter.value;

    const filteredCars = cars.filter(car => {
      const matchClass = selectedClass === 'all' || car.class === selectedClass;
      const matchTrans = selectedTransmission === 'all' || car.transmission === selectedTransmission;
      return matchClass && matchTrans;
    });

    renderCars(filteredCars);
  });

  // Currency Toggle Logic
  currencyToggleBtn.addEventListener('click', () => {
    if (currentCurrency === 'USD') {
      currentCurrency = 'UAH';
      currencyToggleBtn.textContent = 'UAH';
    } else {
      currentCurrency = 'USD';
      currencyToggleBtn.textContent = 'USD';
    }
    // Re-render cars with current filter
    applyBtn.click();
  });

  // Auth Modal Logic
  const authModal = document.getElementById('auth-modal');
  const openAuthBtn = document.getElementById('open-auth');
  const closeModalBtn = document.getElementById('close-modal');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');

  openAuthBtn.addEventListener('click', () => {
    authModal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    authModal.classList.add('hidden');
  });

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.add('hidden');
    }
  });

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      authTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all forms
      authForms.forEach(form => form.classList.add('hidden'));
      // Show selected form
      const targetFormId = `form-${tab.dataset.tab}`;
      document.getElementById(targetFormId).classList.remove('hidden');
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Smooth scroll for catalog button
  scrollToCatalogBtn.addEventListener('click', () => {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
  });

  // Format Price Function
  function formatPrice(priceUSD) {
    if (currentCurrency === 'UAH') {
      const priceUAH = Math.round(priceUSD * exchangeRateUAH);
      return `₴${priceUAH}`;
    }
    return `$${priceUSD}`;
  }

  // Render function
  function renderCars(carArray) {
    carListEl.innerHTML = '';
    carCountEl.textContent = `Знайдено: ${carArray.length}`;

    if (carArray.length === 0) {
      carListEl.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Автомобілів за обраними критеріями не знайдено.</p>';
      return;
    }

    carArray.forEach((car, index) => {
      const card = document.createElement('div');
      card.className = 'car-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.animation = `fadeUp 0.6s ease forwards ${index * 0.05}s`;
      
      const transLabel = car.transmission === 'auto' ? 'Автомат' : 'Механіка';
      const classLabel = {
        'economy': 'Економ',
        'comfort': 'Комфорт',
        'business': 'Бізнес',
        'premium': 'Преміум'
      }[car.class] || car.class;

      card.innerHTML = `
        <div class="car-image" style="background-image: url('${car.image}')">
          <div class="car-badge">${classLabel}</div>
        </div>
        <div class="car-info">
          <h3 class="car-title">${car.make} ${car.model}</h3>
          <div class="car-meta">
            <span>⚙️ ${transLabel}</span>
            <span>⭐ 5.0</span>
          </div>
          <div class="car-price-row">
            <div class="car-price">${formatPrice(car.price)}<small>/ доба</small></div>
            <button class="btn-rent">Орендувати</button>
          </div>
        </div>
      `;
      carListEl.appendChild(card);
    });
  }
});
