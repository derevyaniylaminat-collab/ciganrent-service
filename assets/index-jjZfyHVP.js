(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:1,make:`Toyota`,model:`Camry`,class:`comfort`,transmission:`auto`,price:45,image:`https://images.unsplash.com/photo-1657872737697-737a2d123ef2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:2,make:`Mercedes-Benz`,model:`S-Class`,class:`premium`,transmission:`auto`,price:150,image:`https://images.unsplash.com/photo-1680446983373-853872fb667a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:3,make:`Skoda`,model:`Fabia`,class:`economy`,transmission:`manual`,price:25,image:`https://images.unsplash.com/photo-1740571214523-4951671d8229?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:4,make:`BMW`,model:`5 Series`,class:`business`,transmission:`auto`,price:90,image:`https://images.unsplash.com/photo-1729966085578-c7b281cf11da?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:5,make:`Porsche`,model:`911 Carrera`,class:`premium`,transmission:`auto`,price:250,image:`https://images.unsplash.com/photo-1695328478607-bcd371587e7b?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:6,make:`Audi`,model:`A6`,class:`business`,transmission:`auto`,price:85,image:`https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:7,make:`Tesla`,model:`Model 3`,class:`comfort`,transmission:`auto`,price:70,image:`https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80`},{id:8,make:`Ford`,model:`Mustang`,class:`premium`,transmission:`auto`,price:110,image:`https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:9,make:`Volkswagen`,model:`Golf`,class:`economy`,transmission:`manual`,price:30,image:`https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80`},{id:10,make:`Range Rover`,model:`Vogue`,class:`premium`,transmission:`auto`,price:200,image:`https://images.unsplash.com/photo-1637859460045-ac3ae9ced99d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:11,make:`Hyundai`,model:`Accent`,class:`economy`,transmission:`auto`,price:35,image:`https://images.unsplash.com/photo-1646119253693-0b80f2906791?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:12,make:`Mazda`,model:`6`,class:`comfort`,transmission:`auto`,price:55,image:`https://images.unsplash.com/photo-1658662160331-62f7e52e63de?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`},{id:13,make:`Lexus`,model:`RX`,class:`business`,transmission:`auto`,price:120,image:`https://images.unsplash.com/photo-1664427356346-c31b46248e71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}],t={CARS:`ciganrent_db_cars_v3`,USERS:`ciganrent_db_users_v2`,BOOKINGS:`ciganrent_db_bookings_v2`,SESSION:`ciganrent_current_session_v2`},n=class{static init(){let n=[];try{n=JSON.parse(localStorage.getItem(t.CARS))||[]}catch{}let r=e.map(e=>{let t=n.find(t=>t.id===e.id);return{...e,year:e.year||t?.year||2024,fuel:e.fuel||t?.fuel||(e.make===`Tesla`?`Електро`:`Бензин / Гібрид`),deposit:e.price*5,status:t?.status||e.status||`free`,rating:t?.rating||5,tripsCount:t?.tripsCount||Math.floor(Math.random()*25)+5}}),i=n.filter(t=>!e.some(e=>e.id===t.id));if(localStorage.setItem(t.CARS,JSON.stringify([...r,...i])),!localStorage.getItem(t.USERS)){let e=[{id:`user-admin`,name:`Артемій Мороз (Team Lead)`,email:`admin@ciganrent.com`,password:`admin`,role:`admin`,createdAt:new Date().toISOString()},{id:`user-demo`,name:`Олександр Рябенко`,email:`user@ciganrent.com`,password:`password`,role:`user`,createdAt:new Date().toISOString()}];localStorage.setItem(t.USERS,JSON.stringify(e))}localStorage.getItem(t.BOOKINGS)||localStorage.setItem(t.BOOKINGS,JSON.stringify([{id:`ORD-9841`,userId:`user-demo`,carId:5,carTitle:`Porsche 911 Carrera`,startDate:`2026-07-01`,endDate:`2026-07-04`,days:3,basePrice:250,discountAmount:37.5,extrasCost:45,totalCostUSD:757.5,status:`completed`,createdAt:`2026-06-28T10:00:00.000Z`}]))}static getCars(){this.init();try{return JSON.parse(localStorage.getItem(t.CARS))||[]}catch{return[]}}static getCarById(e){return this.getCars().find(t=>t.id===Number(e))}static saveCar(e){let n=this.getCars(),r=e.id||(n.length>0?Math.max(...n.map(e=>e.id))+1:1),i={...e,id:Number(r),status:e.status||`free`},a=n.findIndex(e=>e.id===i.id);return a>-1?n[a]=i:n.push(i),localStorage.setItem(t.CARS,JSON.stringify(n)),i}static deleteCar(e){let n=this.getCars().filter(t=>t.id!==Number(e));return localStorage.setItem(t.CARS,JSON.stringify(n)),!0}static updateCarStatus(e,n){let r=this.getCars(),i=r.find(t=>t.id===Number(e));i&&(i.status=n,localStorage.setItem(t.CARS,JSON.stringify(r)))}static getUsers(){return this.init(),JSON.parse(localStorage.getItem(t.USERS))||[]}static getUserByEmail(e){return this.getUsers().find(t=>t.email.toLowerCase()===e.toLowerCase())}static createUser(e){let n=this.getUsers(),r={id:`user-`+Date.now(),role:`user`,createdAt:new Date().toISOString(),...e};return n.push(r),localStorage.setItem(t.USERS,JSON.stringify(n)),r}static getBookings(e=null){this.init();let n=JSON.parse(localStorage.getItem(t.BOOKINGS))||[];return e?n.filter(t=>t.userId===e):n}static createBooking(e){let n=this.getBookings(),r={id:`ORD-`+Math.floor(1e3+Math.random()*9e3),createdAt:new Date().toISOString(),status:`active`,...e};return n.unshift(r),localStorage.setItem(t.BOOKINGS,JSON.stringify(n)),this.updateCarStatus(r.carId,`reserved`),r}static updateBookingStatus(e,n){let r=this.getBookings(),i=r.find(t=>t.id===e);return i&&(i.status=n,localStorage.setItem(t.BOOKINGS,JSON.stringify(r)),(n===`completed`||n===`cancelled`)&&this.updateCarStatus(i.carId,`free`)),i}},r=`ciganrent_active_user`,i=class{static getCurrentUser(){try{let e=localStorage.getItem(r);return e?JSON.parse(e):null}catch{return null}}static isLoggedIn(){return!!this.getCurrentUser()}static isAdmin(){let e=this.getCurrentUser();return e&&e.role===`admin`}static login(e,t){let i=n.getUserByEmail(e);if(!i)throw Error(`Користувача з таким Email не знайдено.`);if(i.password!==t)throw Error(`Невірний пароль.`);let a={id:i.id,name:i.name,email:i.email,role:i.role};return localStorage.setItem(r,JSON.stringify(a)),a}static register(e,t,i){if(!e||!t||!i)throw Error(`Заповніть всі обовʼязкові поля.`);if(n.getUserByEmail(t))throw Error(`Користувач з таким Email вже існує.`);let a=n.createUser({name:e,email:t,password:i}),o={id:a.id,name:a.name,email:a.email,role:a.role};return localStorage.setItem(r,JSON.stringify(o)),o}static logout(){localStorage.removeItem(r)}},a=[{id:`kasko`,label:`🛡️ Повне КАСКО (страхування 0% франшиза)`,pricePerDay:15},{id:`child_seat`,label:`👶 Дитяче крісло Isofix преміум`,pricePerDay:5},{id:`driver`,label:`🤵 Особистий професійний водій VIP`,pricePerDay:60},{id:`wifi`,label:`🌐 5G Wi-Fi роутер у салоні`,pricePerDay:4}],o=class{static calculateRentalCost({carPricePerDay:e,startDate:t,endDate:n,selectedExtras:r=[]}){if(!t||!n)return null;let i=new Date(t),o=new Date(n).getTime()-i.getTime(),s=Math.max(1,Math.ceil(o/(1e3*60*60*24))),c=0;s>=15?c=15:s>=7?c=10:s>=3&&(c=5);let l=e*s,u=Math.round(c/100*l*10)/10,d=l-u,f=0,p=[];r.forEach(e=>{let t=a.find(t=>t.id===e);t&&(f+=t.pricePerDay,p.push({...t,total:t.pricePerDay*s}))});let m=f*s,h=Math.round((d+m)*10)/10,g=e*5;return{days:s,baseSubtotal:l,discountPercent:c,discountAmount:u,extrasCost:m,extrasDetails:p,deposit:g,totalUSD:h}}static isCarAvailable(e,t,r){let i=n.getCarById(e);return!(!i||i.status===`reserved`)}static createReservation({user:e,car:t,startDate:r,endDate:i,selectedExtras:a,costBreakdown:o}){let s={userId:e.id,userName:e.name,userEmail:e.email,carId:t.id,carTitle:`${t.make} ${t.model}`,carImage:t.image,startDate:r,endDate:i,days:o.days,basePrice:t.price,discountPercent:o.discountPercent,discountAmount:o.discountAmount,extras:a,extrasCost:o.extrasCost,totalCostUSD:o.totalUSD,deposit:o.deposit};return n.createBooking(s)}},s=class{static getStatistics(){let e=n.getCars(),t=n.getBookings(),r=n.getUsers(),i=t.filter(e=>e.status===`active`),a=t.filter(e=>e.status===`completed`),o=t.filter(e=>e.status!==`cancelled`).reduce((e,t)=>e+(t.totalCostUSD||0),0);return{totalCars:e.length,freeCars:e.filter(e=>e.status===`free`).length,reservedCars:e.filter(e=>e.status===`reserved`).length,totalUsers:r.length,totalBookings:t.length,activeBookingsCount:i.length,completedBookingsCount:a.length,totalRevenueUSD:Math.round(o)}}static addNewCar(e){if(!e.make||!e.model||!e.price)throw Error(`Обовʼязкові поля авто не заповнені.`);let t={make:e.make,model:e.model,class:e.class||`comfort`,transmission:e.transmission||`auto`,fuel:e.fuel||`Бензин`,year:Number(e.year)||2024,price:Number(e.price),deposit:Number(e.price)*5,image:e.image||`https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80`,status:`free`,rating:5};return n.saveCar(t)}static removeCar(e){return n.deleteCar(e)}static changeBookingStatus(e,t){return n.updateBookingStatus(e,t)}};document.addEventListener(`DOMContentLoaded`,()=>{n.init();let e=`USD`,t=document.getElementById(`car-list`),r=document.getElementById(`car-count`),a=document.getElementById(`class-filter`),c=document.getElementById(`transmission-filter`),l=document.getElementById(`status-filter`),u=document.getElementById(`apply-filters`),d=document.getElementById(`currency-toggle`),f=document.getElementById(`scroll-to-catalog`),p=document.getElementById(`open-auth`),m=document.getElementById(`open-cabinet`),h=document.getElementById(`open-admin`),g=document.getElementById(`auth-modal`),_=document.getElementById(`booking-modal`),v=document.getElementById(`cabinet-modal`),y=document.getElementById(`admin-modal`);function b(e,t=`info`){let n=document.getElementById(`toast-container`),r=document.createElement(`div`);r.className=`toast-msg toast-${t}`,r.innerHTML=`<span>${t===`success`?`✅`:t===`error`?`⚠️`:`ℹ️`}</span> <span>${e}</span>`,n.appendChild(r),setTimeout(()=>{r.style.opacity=`0`,r.style.transform=`translateX(50px)`,r.style.transition=`all 0.3s`,setTimeout(()=>r.remove(),300)},4e3)}function x(t){return e===`UAH`?`₴${Math.round(t*41.5).toLocaleString()}`:`$${Number(t).toLocaleString()}`}function S(){let e=i.getCurrentUser();e?(p.classList.add(`hidden`),m.classList.remove(`hidden`),m.textContent=`👤 ${e.name.split(` `)[0]}`,e.role===`admin`?h.classList.remove(`hidden`):h.classList.add(`hidden`)):(p.classList.remove(`hidden`),m.classList.add(`hidden`),h.classList.add(`hidden`))}S();function C(){let e=n.getCars(),t=a?a.value:`all`,r=c?c.value:`all`,i=l?l.value:`all`;w(e.filter(e=>{let n=t===`all`||e.class===t,a=r===`all`||e.transmission===r,o=i===`all`||e.status===i;return n&&a&&o}))}function w(e){if(t.innerHTML=``,r.textContent=`Знайдено: ${e.length}`,e.length===0){t.innerHTML=`<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">Автомобілів за обраними критеріями не знайдено.</p>`;return}e.forEach((e,n)=>{let r=document.createElement(`div`);r.className=`car-card`,r.style.opacity=`0`,r.style.transform=`translateY(20px)`,r.style.animation=`fadeUp 0.5s ease forwards ${n*.04}s`;let i=e.transmission===`auto`?`Автомат`:`Механіка`,a={economy:`Економ`,comfort:`Комфорт`,business:`Бізнес`,premium:`Преміум`}[e.class]||e.class,o=e.status===`reserved`,s=o?`<span class="car-status-badge car-status-reserved">🔴 Заброньовано</span>`:`<span class="car-status-badge car-status-free">🟢 Вільне</span>`;r.innerHTML=`
        <div class="car-image" style="background-image: url('${e.image}')">
          ${s}
          <div class="car-badge">${a}</div>
        </div>
        <div class="car-info">
          <h3 class="car-title">${e.make} ${e.model}</h3>
          <div class="car-meta">
            <span>⚙️ ${i}</span>
            <span>⛽ ${e.fuel||`Бензин`}</span>
            <span>⭐ ${e.rating||`5.0`}</span>
          </div>
          <div class="car-price-row">
            <div class="car-price">${x(e.price)}<small>/ доба</small></div>
            <button class="btn-rent" data-car-id="${e.id}" ${o?`disabled`:``}>
              ${o?`Зайнято`:`Орендувати`}
            </button>
          </div>
        </div>
      `,t.appendChild(r)}),document.querySelectorAll(`.btn-rent`).forEach(e=>{e.addEventListener(`click`,e=>{j(Number(e.currentTarget.getAttribute(`data-car-id`)))})})}C(),u&&u.addEventListener(`click`,C),d&&d.addEventListener(`click`,()=>{e=e===`USD`?`UAH`:`USD`,d.textContent=e,C()}),f&&f.addEventListener(`click`,()=>{document.getElementById(`catalog`).scrollIntoView({behavior:`smooth`})});let T=document.getElementById(`booking-start-date`),E=document.getElementById(`booking-end-date`),D=document.getElementById(`booking-extras`),O=document.getElementById(`booking-price-breakdown`),k=null;function A(){let e=new Date,t=new Date;t.setDate(e.getDate()+3),T.value=e.toISOString().split(`T`)[0],E.value=t.toISOString().split(`T`)[0]}function j(e){k=n.getCarById(e),k&&(document.getElementById(`booking-car-id`).value=e,A(),D&&D.querySelectorAll(`input[type="checkbox"]`).forEach(e=>{e.checked=!1}),M(),N(),_.classList.remove(`hidden`))}function M(){let e=document.getElementById(`booking-car-summary`);e.innerHTML=`
      <div class="booking-car-thumb" style="background-image: url('${k.image}')"></div>
      <div>
        <h4 style="font-size: 1.3rem; color: #fff;">${k.make} ${k.model}</h4>
        <p style="color: var(--accent-1); font-weight: 700;">${x(k.price)} / доба</p>
      </div>
    `}function N(){if(!k)return;let e=[];D.querySelectorAll(`input[type="checkbox"]:checked`).forEach(t=>{e.push(t.value)});let t=o.calculateRentalCost({carPricePerDay:k.price,startDate:T.value,endDate:E.value,selectedExtras:e});if(!t)return;let n=``;t.discountPercent>0&&(n=`
        <div class="cost-row">
          <span>Знижка за тривалу оренду (<span class="discount-badge">-${t.discountPercent}%</span>):</span>
          <span style="color: #10b981;">-${x(t.discountAmount)}</span>
        </div>
      `),O.innerHTML=`
      <div class="cost-row">
        <span>Тривалість оренди:</span>
        <span style="color: #fff; font-weight: 600;">${t.days} діб</span>
      </div>
      <div class="cost-row">
        <span>Базова вартість (${x(k.price)} × ${t.days}):</span>
        <span>${x(t.baseSubtotal)}</span>
      </div>
      ${n}
      <div class="cost-row">
        <span>Додаткові послуги та опції:</span>
        <span>${x(t.extrasCost)}</span>
      </div>
      <div class="cost-row" style="font-size: 0.85rem; border-top: 1px dashed var(--glass-border); padding-top: 0.4rem;">
        <span>Гарантійна застава (повертається):</span>
        <span>${x(t.deposit)}</span>
      </div>
      <div class="cost-row total-row">
        <span>Разом до сплати:</span>
        <span style="color: var(--accent-2);">${x(t.totalUSD)}</span>
      </div>
    `}T&&E&&(T.addEventListener(`change`,N),E.addEventListener(`change`,N)),D&&D.addEventListener(`change`,N),document.getElementById(`booking-form`).addEventListener(`submit`,e=>{if(e.preventDefault(),!k)return;let t=i.getCurrentUser();t||={id:`user-guest-`+Date.now(),name:`Гість системи`,email:`guest@ciganrent.com`};let n=[];D.querySelectorAll(`input[type="checkbox"]:checked`).forEach(e=>{n.push(e.value)});let r=o.calculateRentalCost({carPricePerDay:k.price,startDate:T.value,endDate:E.value,selectedExtras:n});o.createReservation({user:t,car:k,startDate:T.value,endDate:E.value,selectedExtras:n,costBreakdown:r}),_.classList.add(`hidden`),b(`Успішно заброньовано ${k.make} ${k.model} на ${r.days} діб!`,`success`),C(),L()});let P=document.getElementById(`close-auth-modal`),F=document.querySelectorAll(`#auth-modal .auth-tab`),I=document.querySelectorAll(`#auth-modal .auth-form`);p.addEventListener(`click`,()=>g.classList.remove(`hidden`)),P.addEventListener(`click`,()=>g.classList.add(`hidden`)),F.forEach(e=>{e.addEventListener(`click`,()=>{F.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),I.forEach(e=>e.classList.add(`hidden`)),document.getElementById(`form-${e.dataset.tab}`).classList.remove(`hidden`)})}),document.getElementById(`form-login`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`login-email`).value,n=document.getElementById(`login-password`).value;try{let e=i.login(t,n);g.classList.add(`hidden`),S(),b(`Вітаємо, ${e.name}! Успішний вхід.`,`success`)}catch(e){b(e.message,`error`)}}),document.getElementById(`form-register`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`reg-name`).value,n=document.getElementById(`reg-email`).value,r=document.getElementById(`reg-password`).value;try{let e=i.register(t,n,r);g.classList.add(`hidden`),S(),b(`Вітаємо, ${e.name}! Акаунт зареєстровано.`,`success`)}catch(e){b(e.message,`error`)}});function L(){let e=i.getCurrentUser(),t=document.getElementById(`cabinet-bookings-list`);if(!t)return;if(!e){t.innerHTML=`<p>Будь ласка, увійдіть у систему.</p>`;return}document.getElementById(`cabinet-user-name`).textContent=e.name,document.getElementById(`cabinet-user-email`).textContent=`Email: ${e.email} • Роль: ${e.role===`admin`?`Адміністратор`:`Клієнт`}`;let r=n.getBookings(e.role===`admin`?null:e.id);if(r.length===0){t.innerHTML=`<p style="color: var(--text-muted);">У вас поки немає оформлених бронювань.</p>`;return}t.innerHTML=r.map(e=>`
      <div class="history-item">
        <div>
          <h4 style="color: #fff; font-size: 1.15rem;">${e.carTitle}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Дати: <b>${e.startDate} — ${e.endDate}</b> (${e.days} діб)
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="text-align: right;">
            <div style="font-weight: 800; color: #fff;">${x(e.totalCostUSD)}</div>
            <span class="history-item-status status-${e.status}">
              ${e.status===`active`?`Активне`:e.status===`completed`?`Завершено`:`Скасовано`}
            </span>
          </div>
          ${e.status===`active`?`
            <button class="btn-outline btn-cancel-booking" data-id="${e.id}" style="padding: 0.4rem 1rem; border-color: #ef4444; color: #ef4444;">
              Скасувати
            </button>
          `:``}
        </div>
      </div>
    `).join(``),document.querySelectorAll(`.btn-cancel-booking`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);n.updateBookingStatus(t,`cancelled`),b(`Бронювання успішно скасовано. Автомобіль звільнено.`,`info`),L(),C()})})}m.addEventListener(`click`,()=>{L(),v.classList.remove(`hidden`)}),document.getElementById(`close-cabinet-modal`).addEventListener(`click`,()=>{v.classList.add(`hidden`)}),document.getElementById(`btn-logout`).addEventListener(`click`,()=>{i.logout(),v.classList.add(`hidden`),S(),b(`Ви вийшли з акаунта.`,`info`)});function R(){let e=s.getStatistics(),t=document.getElementById(`admin-stats`);t&&(t.innerHTML=`
        <div class="stat-card">
          <div class="stat-value">${e.totalCars}</div>
          <div class="stat-label">Всього автомобілів</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: #10b981;">${e.freeCars}</div>
          <div class="stat-label">Вільних зараз</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: #ef4444;">${e.reservedCars}</div>
          <div class="stat-label">Заброньовано</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${e.totalBookings}</div>
          <div class="stat-label">Всього замовлень</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: var(--accent-2);">${x(e.totalRevenueUSD)}</div>
          <div class="stat-label">Загальний дохід</div>
        </div>
      `),z(),B()}function z(){let e=n.getCars(),t=document.getElementById(`admin-cars-list`);t&&(t.innerHTML=e.map(e=>`
      <div class="history-item">
        <div>
          <h4 style="color: #fff;">${e.make} ${e.model} (${e.class})</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Ціна: ${x(e.price)}/доба • Статус: <b>${e.status===`free`?`Вільне`:`Заброньовано`}</b>
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-outline btn-toggle-status" data-id="${e.id}" style="padding: 0.4rem 1rem;">
            ${e.status===`free`?`Забронювати вручну`:`Звільнити авто`}
          </button>
          <button class="btn-outline btn-delete-car" data-id="${e.id}" style="padding: 0.4rem 1rem; border-color: #ef4444; color: #ef4444;">
            Видалити
          </button>
        </div>
      </div>
    `).join(``),document.querySelectorAll(`.btn-toggle-status`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`),r=n.getCarById(t);n.updateCarStatus(t,r.status===`free`?`reserved`:`free`),R(),C(),b(`Статус автомобіля змінено.`,`info`)})}),document.querySelectorAll(`.btn-delete-car`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);s.removeCar(t),R(),C(),b(`Автомобіль видалено з каталогу.`,`info`)})}))}function B(){let e=n.getBookings(),t=document.getElementById(`admin-bookings-list`);t&&(t.innerHTML=e.map(e=>`
      <div class="history-item">
        <div>
          <h4 style="color: #fff;">Замовлення #${e.id} — ${e.carTitle}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Клієнт: <b>${e.userName||e.userEmail}</b> • Дати: ${e.startDate} — ${e.endDate} • Сума: <b>${x(e.totalCostUSD)}</b>
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="history-item-status status-${e.status}">
            ${e.status}
          </span>
          ${e.status===`active`?`
            <button class="btn-outline btn-admin-complete" data-id="${e.id}" style="padding: 0.3rem 0.8rem; border-color: #10b981; color: #10b981;">Завершити</button>
            <button class="btn-outline btn-admin-cancel" data-id="${e.id}" style="padding: 0.3rem 0.8rem; border-color: #ef4444; color: #ef4444;">Скасувати</button>
          `:``}
        </div>
      </div>
    `).join(``),document.querySelectorAll(`.btn-admin-complete`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);s.changeBookingStatus(t,`completed`),R(),C(),b(`Замовлення #${t} завершено! Автомобіль звільнено.`,`success`)})}),document.querySelectorAll(`.btn-admin-cancel`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-id`);s.changeBookingStatus(t,`cancelled`),R(),C(),b(`Замовлення #${t} скасовано.`,`info`)})}))}h.addEventListener(`click`,()=>{R(),y.classList.remove(`hidden`)}),document.getElementById(`close-admin-modal`).addEventListener(`click`,()=>{y.classList.add(`hidden`)});let V=document.getElementById(`tab-admin-cars-btn`),H=document.getElementById(`tab-admin-bookings-btn`),U=document.getElementById(`admin-section-cars`),W=document.getElementById(`admin-section-bookings`);V&&H&&(V.addEventListener(`click`,()=>{V.classList.add(`active`),H.classList.remove(`active`),U.classList.remove(`hidden`),W.classList.add(`hidden`)}),H.addEventListener(`click`,()=>{H.classList.add(`active`),V.classList.remove(`active`),W.classList.remove(`hidden`),U.classList.add(`hidden`)}));let G=document.getElementById(`admin-add-car-form`);G&&G.addEventListener(`submit`,e=>{e.preventDefault();try{let e={make:document.getElementById(`add-make`).value,model:document.getElementById(`add-model`).value,class:document.getElementById(`add-class`).value,price:document.getElementById(`add-price`).value,transmission:document.getElementById(`add-trans`).value,image:document.getElementById(`add-image`).value||void 0};s.addNewCar(e),G.reset(),R(),C(),b(`Новий автомобіль успішно додано до каталогу!`,`success`)}catch(e){b(e.message,`error`)}}),[g,_,v,y].forEach(e=>{e&&e.addEventListener(`click`,t=>{t.target===e&&e.classList.add(`hidden`)})}),document.getElementById(`close-booking-modal`).addEventListener(`click`,()=>{_.classList.add(`hidden`)}),document.querySelectorAll(`.smooth-scroll`).forEach(e=>{e.addEventListener(`click`,function(e){e.preventDefault();let t=document.querySelector(this.getAttribute(`href`));t&&t.scrollIntoView({behavior:`smooth`})})})});