// KATH Patient Self-Assessment Tool Main JavaScript File

const KATH_DIRECTORATES = {
  anaesthesia: '💉 Anaesthesia & Intensive Care',
  childHealth: '👶 Child Health',
  laboratory: '🧬 Laboratory Services',
  radiology: '🩻 Radiology',
  emergencyMedicine: '🏥 Emergency Medicine',
  eent: '👁️ Eye, Ear, Nose & Throat (EENT)',
  familyMedicine: '👨‍👩‍👧 Family Medicine',
  internalMedicine: '🩺 Internal Medicine',
  obstetricsGynaecology: '🤱 Obstetrics & Gynaecology',
  oncology: '🔬 Oncology',
  oralHealth: '🦷 Oral Health',
  surgery: '🦴 Surgery',
  traumatologyOrthopaedics: '🦿 Traumatology & Orthopaedics'
};

function initAboutDirectorates() {
  const directorateGrid = document.getElementById('directorate-list');
  if (!directorateGrid) return;

  directorateGrid.replaceChildren();
  Object.values(KATH_DIRECTORATES).forEach(function (directorate) {
    const chip = document.createElement('div');
    chip.className = 'service-chip';
    chip.textContent = directorate;
    directorateGrid.appendChild(chip);
  });
}

initAboutDirectorates();


// SECTION A INTERACTIVE MEDICAL TOOLS ANIMATED BACKGROUND

(function initMedicalBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let mouseActive = false;

  // Track mouse coordinates for interactive parallax & deflection
  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
  });

  window.addEventListener('mouseleave', function () {
    mouseActive = false;
  });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Available Medical Tool Shapes
  const MEDICAL_TOOLS = [
    'stethoscope',
    'syringe',
    'microscope',
    'capsule',
    'bandage',
    'thermometer',
    'cross',
    'pulse'
  ];

  const PARTICLE_COUNT = 28;

  function createParticle(atBottom) {
    return {
      x: Math.random() * window.innerWidth,
      y: atBottom ? window.innerHeight + 50 : Math.random() * window.innerHeight,
      size: Math.random() * 20 + 34,
      speed: Math.random() * 0.45 + 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,// Subtle rotation
      baseOpacity: Math.random() * 0.15 + 0.15,
      opacity: 0.22,
      tool: MEDICAL_TOOLS[Math.floor(Math.random() * MEDICAL_TOOLS.length)],
      floatOffset: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.6 + 0.4
    };
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, function () {
    return createParticle(false);
  });

  // Medical Tool Drawing Functions

  // 1. 🩺 Stethoscope
  function drawStethoscope(size, color) {
    const s = size * 0.5;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.075);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Binaural tubes (U shape top)
    ctx.beginPath();
    ctx.arc(-s * 0.35, -s * 0.45, s * 0.2, Math.PI, 0, false);
    ctx.arc(s * 0.35, -s * 0.45, s * 0.2, Math.PI, 0, false);
    ctx.stroke();

    // Earpieces
    ctx.beginPath();
    ctx.arc(-s * 0.55, -s * 0.45, s * 0.09, 0, Math.PI * 2);
    ctx.arc(s * 0.55, -s * 0.45, s * 0.09, 0, Math.PI * 2);
    ctx.fill();

    // Flexible rubber tube loop
    ctx.beginPath();
    ctx.moveTo(-s * 0.15, -s * 0.45);
    ctx.bezierCurveTo(-s * 0.1, -s * 0.05, -s * 0.55, s * 0.35, -s * 0.1, s * 0.65);
    ctx.bezierCurveTo(s * 0.35, s * 0.85, s * 0.55, s * 0.35, s * 0.2, s * 0.1);
    ctx.lineTo(s * 0.15, -s * 0.45);
    ctx.stroke();

    // Chest piece / Bell & Diaphragm
    ctx.beginPath();
    ctx.arc(-s * 0.1, s * 0.65, s * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-s * 0.1, s * 0.65, s * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  // 2. 💉 Syringe & Needle
  function drawSyringe(size, color) {
    const s = size * 0.5;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.075);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Barrel
    const w = s * 0.42;
    const h = s * 1.15;
    ctx.strokeRect(-w / 2, -h / 2, w, h);

    // Graduation measurement markings
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-w / 2, (h * i) / 8);
      ctx.lineTo(-w / 2 + (i % 2 === 0 ? w * 0.55 : w * 0.35), (h * i) / 8);
      ctx.stroke();
    }

    // Plunger shaft & thumb flange
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(0, -h / 2 - s * 0.45);
    ctx.moveTo(-w * 0.75, -h / 2 - s * 0.45);
    ctx.lineTo(w * 0.75, -h / 2 - s * 0.45);
    ctx.stroke();

    // Needle nozzle & thin bevel needle
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(0, h / 2 + s * 0.18);
    ctx.stroke();

    ctx.lineWidth = Math.max(1.5, size * 0.045);
    ctx.beginPath();
    ctx.moveTo(0, h / 2 + s * 0.18);
    ctx.lineTo(0, h / 2 + s * 0.7);
    ctx.stroke();
  }

  // 3. 🔬 Microscope
  function drawMicroscope(size, color) {
    const s = size * 0.5;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.075);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Eyepiece / Ocular tube (angled)
    ctx.beginPath();
    ctx.moveTo(-s * 0.28, -s * 0.8);
    ctx.lineTo(-s * 0.06, -s * 0.35);
    ctx.stroke();

    // Eyepiece cup
    ctx.beginPath();
    ctx.arc(-s * 0.3, -s * 0.85, s * 0.14, 0, Math.PI * 2);
    ctx.fill();

    // Body tube & revolving nosepiece
    ctx.strokeRect(-s * 0.18, -s * 0.35, s * 0.36, s * 0.42);

    // Objective lens pointing to stage
    ctx.beginPath();
    ctx.moveTo(0, 0.07 * s);
    ctx.lineTo(0, 0.28 * s);
    ctx.stroke();

    // Stage platform
    ctx.beginPath();
    ctx.moveTo(-s * 0.45, 0.28 * s);
    ctx.lineTo(s * 0.35, 0.28 * s);
    ctx.stroke();

    // Curved Arm
    ctx.beginPath();
    ctx.arc(s * 0.28, 0.22 * s, s * 0.48, -Math.PI * 0.5, Math.PI * 0.5, false);
    ctx.stroke();

    // Base stand
    ctx.beginPath();
    ctx.moveTo(-s * 0.55, 0.78 * s);
    ctx.lineTo(s * 0.55, 0.78 * s);
    ctx.stroke();
  }

  // 4. 💊 Medicine Capsule Pill
  function drawCapsule(size, color) {
    const s = size * 0.48;
    const r = s * 0.42;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.075);

    // Rounded capsule outline
    ctx.beginPath();
    ctx.arc(0, -s * 0.45, r, Math.PI, 0, false);
    ctx.lineTo(r, s * 0.45);
    ctx.arc(0, s * 0.45, r, 0, Math.PI, false);
    ctx.closePath();
    ctx.stroke();

    // Fill top half
    ctx.beginPath();
    ctx.arc(0, -s * 0.45, r, Math.PI, 0, false);
    ctx.lineTo(r, 0);
    ctx.lineTo(-r, 0);
    ctx.closePath();
    ctx.fill();

    // Middle division line
    ctx.beginPath();
    ctx.moveTo(-r, 0);
    ctx.lineTo(r, 0);
    ctx.stroke();
  }

  // 5. 🩹 Bandage / Plaster
  function drawBandage(size, color) {
    const s = size * 0.5;
    const w = s * 1.25;
    const h = s * 0.6;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.075);

    // Rounded strip (with fallback for older canvas engines)
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(-w / 2, -h / 2, w, h, [h / 2]);
    } else {
      const r = h / 2;
      const x = -w / 2;
      const y = -h / 2;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
    }
    ctx.stroke();

    // Centre sterile pad
    const padW = s * 0.48;
    ctx.strokeRect(-padW / 2, -h / 2, padW, h);

    // Ventilation dots
    const dotR = Math.max(1.2, size * 0.035);
    ctx.beginPath();
    ctx.arc(-w * 0.32, 0, dotR, 0, Math.PI * 2);
    ctx.arc(w * 0.32, 0, dotR, 0, Math.PI * 2);
    ctx.fill();
  }

  // 6. 🌡️ Thermometer
  function drawThermometer(size, color) {
    const s = size * 0.5;
    const stemW = s * 0.24;
    const stemH = s * 1.15;
    const bulbR = s * 0.28;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(2, size * 0.075);

    // Stem tube & top round dome
    ctx.beginPath();
    ctx.moveTo(-stemW / 2, s * 0.3);
    ctx.lineTo(-stemW / 2, -stemH / 2);
    ctx.arc(0, -stemH / 2, stemW / 2, Math.PI, 0, false);
    ctx.lineTo(stemW / 2, s * 0.3);
    ctx.stroke();

    // Round bottom mercury reservoir bulb
    ctx.beginPath();
    ctx.arc(0, s * 0.48, bulbR, 0, Math.PI * 2);
    ctx.fill();

    // Mercury column line inside stem
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.lineTo(0, -s * 0.15);
    ctx.lineWidth = Math.max(2.5, size * 0.095);
    ctx.stroke();

    // Tick marks on side
    ctx.lineWidth = Math.max(1.2, size * 0.045);
    for (let i = -2; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(stemW / 2, (s * i) / 3.5);
      ctx.lineTo(stemW / 2 + s * 0.14, (s * i) / 3.5);
      ctx.stroke();
    }
  }

  // 7. ➕ Hospital Medical Cross
  function drawCross(size, color) {
    const arm = size * 0.48;
    const thick = size * 0.18;
    ctx.fillStyle = color;
    ctx.fillRect(-thick / 2, -arm, thick, arm * 2);
    ctx.fillRect(-arm, -thick / 2, arm * 2, thick);
  }

  // 8. 💓 Heartbeat / ECG Waveform
  function drawPulse(size, color) {
    const s = size * 0.65;
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2.5, size * 0.09);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.lineTo(-s * 0.45, 0);
    ctx.lineTo(-s * 0.25, -s * 0.75);
    ctx.lineTo(0, s * 0.65);
    ctx.lineTo(s * 0.2, -s * 0.28);
    ctx.lineTo(s * 0.35, 0);
    ctx.lineTo(s, 0);
    ctx.stroke();
  }

  // Main Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseColor = '#d5101a';

    // Optional subtle connecting lines between nearby floating tools
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = baseColor;
          ctx.globalAlpha = (1 - dist / 130) * 0.08;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach(function (p) {
      let drawX = p.x;
      let drawY = p.y;
      p.opacity = p.baseOpacity;

      // Mouse interaction: repulsion and illumination
      if (mouseActive) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        const maxDist = 220;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 35 * p.depth;
          drawX += (dx / dist) * force;
          drawY += (dy / dist) * force;

          // Subtle brightness/opacity increase near cursor (refined for less distraction)
          p.opacity = Math.min(0.50, p.baseOpacity + (1 - dist / maxDist) * 0.28);
        }

        // Parallax offset relative to mouse (refined for subtlety)
        const parallaxX = ((mouseX - window.innerWidth / 2) / window.innerWidth) * 18 * p.depth;
        const parallaxY = ((mouseY - window.innerHeight / 2) / window.innerHeight) * 12 * p.depth;
        drawX += parallaxX;
        drawY += parallaxY;
      }

      // Continuous subtle floating wave
      p.floatOffset += 0.018;
      drawX += Math.sin(p.floatOffset) * 0.5;

      // Save canvas state for transformation
      ctx.save();
      ctx.translate(drawX, drawY);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Draw corresponding medical tool
      switch (p.tool) {
        case 'stethoscope':
          drawStethoscope(p.size, baseColor);
          break;
        case 'syringe':
          drawSyringe(p.size, baseColor);
          break;
        case 'microscope':
          drawMicroscope(p.size, baseColor);
          break;
        case 'capsule':
          drawCapsule(p.size, baseColor);
          break;
        case 'bandage':
          drawBandage(p.size, baseColor);
          break;
        case 'thermometer':
          drawThermometer(p.size, baseColor);
          break;
        case 'pulse':
          drawPulse(p.size, baseColor);
          break;
        case 'cross':
        default:
          drawCross(p.size, baseColor);
          break;
      }

      ctx.restore();

      // Move particle upward
      p.y -= p.speed;
      p.rotation += p.rotSpeed;

      // If a particle drifts off the top of the screen, recycle it
      if (p.y < -60) {
        Object.assign(p, createParticle(true));
      }
    });

    // Request the next animation frame (runs ~60 times per second)
    requestAnimationFrame(animate);
  }

  // Kick off the animation
  animate();
})();


// SECTION A5 DATE/TIME/WEATHER & WELCOME MODAL (All Pages)

(function initDateTimeWeatherAndModal() {
  // Date & Time Display
  function updateDateTime() {
    const now = new Date();
    
    // Format time (12-hour clock)
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() < 12 ? 'AM' : 'PM';
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
      timeDisplay.textContent = `${hours}:${minutes} ${period}`;
    }

    // Format date (Day, Month Date, Year)
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
      dateDisplay.textContent = dateStr;
    }
  }

  // Update immediately and then every minute
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Weather Display
  function fetchWeather() {
    // Try to get user's location, fall back to Ghana if denied
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        },
        function () {
          // Default to Kumasi, Ghana (KATH location): 6.627, -1.616
          getWeatherData(6.627, -1.616);
        },
        { timeout: 5000 }
      );
    } else {
      // Fallback to Kumasi, Ghana
      getWeatherData(6.627, -1.616);
    }
  }

  function getWeatherData(latitude, longitude) {
    // Using Open-Meteo API (free, no auth, CORS-enabled)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&timezone=auto`;

    fetch(weatherUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (!data.current) throw new Error('No weather data in response');
        
        const current = data.current;
        const temp = Math.round(current.temperature_2m);
        const weatherCode = current.weather_code;
        const isDay = current.is_day === 1;

        // Weather icon mapping based on WMO weather codes
        const weatherIcon = getWeatherIcon(weatherCode, isDay);
        const weatherDesc = getWeatherDescription(weatherCode);

        // Update weather display
        const weatherDisplay = document.getElementById('weather-display');
        if (weatherDisplay) {
          weatherDisplay.innerHTML = `
            <span class="weather-temp">${temp}°C</span>
            <span class="weather-icon">${weatherIcon}</span>
            <span class="weather-desc">${weatherDesc}</span>
          `;
        }
      })
      .catch(error => {
        console.warn('Weather API failed:', error);
        // Show fallback with weather info text
        const weatherDisplay = document.getElementById('weather-display');
        if (weatherDisplay) {
          weatherDisplay.innerHTML = `
            <span class="weather-temp">--°C</span>
            <span class="weather-icon">🌍</span>
            <span class="weather-desc">Weather unavailable</span>
          `;
        }
      });
  }

  function getWeatherIcon(code, isDay) {
    // WMO Weather interpretation codes
    if (code === 0) return isDay ? '☀️' : '🌙';
    if (code === 1 || code === 2) return isDay ? '🌤️' : '🌥️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 86) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 85 && code <= 86) return '❄️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '🌤️';
  }

  function getWeatherDescription(code) {
    // WMO Weather interpretation codes
    const descriptions = {
      0: 'Clear', 1: 'Cloudy', 2: 'Cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Foggy', 51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
      61: 'Rainy', 63: 'Rainy', 65: 'Rainy', 71: 'Snowy', 73: 'Snowy', 75: 'Snowy',
      77: 'Snow', 80: 'Showers', 81: 'Showers', 82: 'Showers', 85: 'Snow', 
      86: 'Snow', 95: 'Stormy', 96: 'Stormy', 99: 'Stormy'
    };
    return descriptions[code] || 'Check weather';
  }

  // Fetch weather immediately and retry every 30 minutes
  fetchWeather();
  setInterval(fetchWeather, 1800000);

  // Welcome Modal Logic
  const welcomeModal = document.getElementById('welcome-modal');
  if (welcomeModal) {
    // Check if modal has been shown this session
    const hasSeenModal = sessionStorage.getItem('kath-welcome-shown');

    if (!hasSeenModal) {
      // Show modal after 800ms delay for better UX
      setTimeout(function () {
        welcomeModal.classList.add('show');
      }, 800);

      // Mark modal as shown
      sessionStorage.setItem('kath-welcome-shown', 'true');
    }

    // Close button handlers
    const closeButtons = welcomeModal.querySelectorAll('.modal-close-btn, .modal-close-btn-footer');
    closeButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        welcomeModal.classList.remove('show');
      });
    });

    // Close when clicking outside the modal
    welcomeModal.addEventListener('click', function (e) {
      if (e.target === welcomeModal) {
        welcomeModal.classList.remove('show');
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && welcomeModal.classList.contains('show')) {
        welcomeModal.classList.remove('show');
      }
    });
  }
})();




(function initNavAndDropdown() {
  // Get the filename of the current page (e.g. "bmi.html")
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Highlight the matching item in the dropdown menu
  document.querySelectorAll('.nav-dropdown-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Main navigation dropdown toggle button
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownBtn = document.querySelector('.nav-dropdown-btn');

  if (dropdown && dropdownBtn) {
    dropdownBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close menu when clicking any item
    dropdown.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        dropdown.classList.remove('show');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }
})();


// SECTION C BMI PAGE (bmihtml)

// Only run this code if we are actually on bmi.html
if (document.getElementById('bmi-form')) {

  const bmiForm = document.getElementById('bmi-form');
  const titleSelect = document.getElementById('title');
  const customTitleInput = document.getElementById('custom-title');
  const customTitleWrap = document.getElementById('custom-title-wrap');
  const nameInput = document.getElementById('name');

  if (nameInput) {
    nameInput.addEventListener('input', function () {
      const cursorPosition = this.selectionStart;
      const formattedName = this.value.replace(/(^|\s)(\S)/g, function (match, boundary, firstLetter) {
        return boundary + firstLetter.toUpperCase();
      });

      if (this.value !== formattedName) {
        this.value = formattedName;
        this.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }

  function toggleCustomTitle() {
    if (!titleSelect || !customTitleWrap || !customTitleInput) return;

    const isOther = titleSelect.value === 'Other';
    customTitleWrap.style.display = isOther ? 'block' : 'none';
    customTitleInput.required = isOther;

    if (!isOther) {
      customTitleInput.value = '';
      customTitleInput.classList.remove('invalid');
      const err = customTitleInput.parentElement.querySelector('.err-msg');
      if (err) err.textContent = '';
    }
  }

  function syncGenderFromTitle() {
    const genderSelect = document.getElementById('gender');
    if (!titleSelect || !genderSelect) return;

    const selectedTitle = titleSelect.value;

    if (selectedTitle === 'Mr.') {
      genderSelect.value = 'Male';
    } else if (['Mrs.', 'Miss', 'Ms.'].includes(selectedTitle)) {
      genderSelect.value = 'Female';
    }
  }

  if (titleSelect) {
    titleSelect.addEventListener('change', function () {
      toggleCustomTitle();
      syncGenderFromTitle();
    });
    toggleCustomTitle();
    syncGenderFromTitle();
  }

  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const bmiResult = document.getElementById('bmi-result');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCategory = document.getElementById('bmi-category');
  const calculateBmiButton = document.getElementById('calculate-bmi-btn');

  function getBmiReading() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || height < 50 || height > 250 || !weight || weight < 2 || weight > 500) {
      return null;
    }

    const heightMetres = height / 100;
    const bmi = weight / (heightMetres * heightMetres);
    let category = 'Obese';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal';
    } else if (bmi < 30) {
      category = 'Overweight';
    }

    return { bmi, category };
  }

  function updateBmiResult() {
    const reading = getBmiReading();
    if (!reading) {
      bmiResult.hidden = true;
      return;
    }

    const displayCategory = reading.category === 'Normal' ? 'Normal Weight' : reading.category;
    const categoryStyles = {
      Underweight: { background: '#e3f2fd', color: '#0277bd' },
      Normal: { background: '#e8f5e9', color: '#2e7d32' },
      Overweight: { background: '#fff3e0', color: '#f57c00' },
      Obese: { background: '#ffebee', color: '#d5101a' },
    };
    const style = categoryStyles[reading.category];

    bmiValue.textContent = `Body Mass Index (BMI): ${reading.bmi.toFixed(1)} kg/m²`;
    bmiCategory.textContent = displayCategory;
    bmiResult.style.backgroundColor = style.background;
    bmiResult.style.borderColor = style.color;
    bmiValue.style.color = style.color;
    bmiCategory.style.color = style.color;
    bmiResult.hidden = false;
  }

  calculateBmiButton.addEventListener('click', updateBmiResult);

  bmiForm.addEventListener('submit', function (event) {
    // Prevent the default form submission (which would reload the page)
    event.preventDefault();

    // Read form values
    const titleValue = titleSelect ? titleSelect.value : '';
    const customTitle = customTitleInput ? customTitleInput.value.trim() : '';
    const title = titleValue === 'Other' ? customTitle : titleValue;
    const name   = document.getElementById('name').value.trim();
    const age    = parseInt(document.getElementById('age').value, 10);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Basic validation
    let valid = true;

    if (!titleValue) {
      markInvalid('title', 'Please select your title.');
      valid = false;
    } else {
      markValid('title');
    }

    if (titleValue === 'Other' && !customTitle) {
      if (customTitleInput) {
        customTitleInput.classList.add('invalid');
      }
      const customWrap = customTitleInput ? customTitleInput.parentElement : null;
      if (customWrap) {
        let err = customWrap.querySelector('.err-msg');
        if (!err) {
          err = document.createElement('span');
          err.className = 'err-msg hint';
          err.style.color = '#c62828';
          customWrap.appendChild(err);
        }
        err.textContent = 'Please enter your title.';
      }
      valid = false;
    } else if (customTitleInput) {
      customTitleInput.classList.remove('invalid');
      const customErr = customTitleInput.parentElement.querySelector('.err-msg');
      if (customErr) customErr.textContent = '';
    }

    if (!name) {
      markInvalid('name', 'Please enter your full name.');
      valid = false;
    } else {
      markValid('name');
    }

    if (!age || age < 1 || age > 120) {
      markInvalid('age', 'Please enter a valid age (1–120).');
      valid = false;
    } else {
      markValid('age');
    }

    if (!gender) {
      markInvalid('gender', 'Please select your gender.');
      valid = false;
    } else {
      markValid('gender');
    }

    if (!height || height < 50 || height > 250) {
      markInvalid('height', 'Please enter a valid height (50–250 cm).');
      valid = false;
    } else {
      markValid('height');
    }

    if (!weight || weight < 2 || weight > 500) {
      markInvalid('weight', 'Please enter a valid weight (2–500 kg).');
      valid = false;
    } else {
      markValid('weight');
    }

    // If any field is invalid, stop here
    if (!valid) return;

    // BMI Calculation
    // Formula: BMI = weight(kg) / (height(m))^2
    // We convert height from centimetres to metres first.
    const heightMetres = height / 100;
    const bmi = weight / (heightMetres * heightMetres);
    const bmiRounded = bmi.toFixed(1);

    // Determine BMI Category
    // These thresholds are set by the World Health Organisation (WHO).
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    // Save data to sessionStorage
    // sessionStorage holds data only for the current browser tab/session.
    // It is cleared automatically when the tab is closed.
    // We store everything as a JSON string.
    const patientData = {
      title:   title,
      name:    name,
      age:     age,
      gender:  gender,
      height:  height,
      weight:  weight,
      bmi:     bmiRounded,
      category: category,
    };

    // JSON.stringify() converts the object to a text string for storage
    sessionStorage.setItem('patientData', JSON.stringify(patientData));

    // Navigate to the next page
    window.location.href = 'symptoms.html';
  });

  // Helper: mark a field as invalid and show a message
  function markInvalid(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('invalid');
    // Look for an existing error span below the field, or create one
    let errSpan = field.parentElement.querySelector('.err-msg');
    if (!errSpan) {
      errSpan = document.createElement('span');
      errSpan.className = 'err-msg hint';
      errSpan.style.color = '#c62828';
      field.parentElement.appendChild(errSpan);
    }
    errSpan.textContent = message;
  }

  // Helper: clear the invalid state from a field
  function markValid(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('invalid');
    const errSpan = field.parentElement.querySelector('.err-msg');
    if (errSpan) errSpan.textContent = '';
  }
}


// SECTION D SYMPTOMS PAGE (symptomshtml)

function initSymptomsPage() {
  if (!document.getElementById('symptoms-form')) {
    return;
  }

  const stored = sessionStorage.getItem('patientData');
  const patient = stored ? JSON.parse(stored) : {
    age: null,
    gender: '',
  };

  const pregnancyRow = document.getElementById('pregnancy-row');
  if (pregnancyRow) {
    if (patient.gender === 'Female') {
      pregnancyRow.classList.remove('d-none');
    } else {
      pregnancyRow.classList.add('d-none');
    }
  }

  const customSymptomList = document.getElementById('custom-symptom-list');
  const addCustomSymptomBtn = document.getElementById('add-custom-symptom-btn');

  function buildCustomSymptomInput(initialValue) {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-symptom-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type another symptom...';
    input.value = initialValue || '';
    input.className = 'custom-symptom-input';
    input.setAttribute('aria-label', 'Custom symptom');

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-secondary custom-remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () {
      wrapper.remove();
    });

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    return wrapper;
  }

  if (addCustomSymptomBtn && customSymptomList) {
    addCustomSymptomBtn.addEventListener('click', function () {
      customSymptomList.appendChild(buildCustomSymptomInput(''));
    });
  }

  document.querySelectorAll('.symptom-item').forEach(function (item) {
    const cb = item.querySelector('input[type="checkbox"]');
    if (!cb) return;

    cb.addEventListener('change', function () {
      if (cb.checked) {
        item.classList.add('checked');
      } else {
        item.classList.remove('checked');
      }
    });

    item.addEventListener('click', function (e) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    });
  });

  const symptomsForm = document.getElementById('symptoms-form');
  if (!symptomsForm) {
    console.error('ERROR: symptoms-form not found!');
  }

  symptomsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedSymptoms = [];
    const seenSymptoms = new Set();

    function addSymptom(value) {
      const normalized = String(value || '').trim();
      if (!normalized) return;
      const key = normalized.toLowerCase();
      if (seenSymptoms.has(key)) return;
      seenSymptoms.add(key);
      selectedSymptoms.push(normalized);
    }

    document.querySelectorAll('.symptom-item input[type="checkbox"]:checked').forEach(function (cb) {
      addSymptom(cb.value);
    });

    const customValues = document.querySelectorAll('.custom-symptom-input');
    customValues.forEach(function (input) {
      const rawValue = input.value.trim();
      if (!rawValue) return;
      addSymptom(rawValue);
    });

    const directorateSet = new Set();

    selectedSymptoms.forEach(function (symptom) {
      const normalizedSymptom = symptom.toLowerCase();
      switch (normalizedSymptom) {
        case 'chest':
          directorateSet.add(KATH_DIRECTORATES.emergencyMedicine);
          break;
        case 'fever':
          if (patient.age < 18) {
            directorateSet.add(KATH_DIRECTORATES.childHealth);
          } else {
            directorateSet.add(KATH_DIRECTORATES.internalMedicine);
          }
          break;
        case 'pregnancy':
          directorateSet.add(KATH_DIRECTORATES.obstetricsGynaecology);
          break;
        case 'lump':
          directorateSet.add(KATH_DIRECTORATES.oncology);
          break;
        case 'injury':
          directorateSet.add(KATH_DIRECTORATES.traumatologyOrthopaedics);
          break;
        case 'mental':
          directorateSet.add(KATH_DIRECTORATES.familyMedicine);
          break;
        case 'skin':
          directorateSet.add(KATH_DIRECTORATES.familyMedicine);
          break;
        case 'dental':
          directorateSet.add(KATH_DIRECTORATES.oralHealth);
          break;
        case 'eye':
          directorateSet.add(KATH_DIRECTORATES.eent);
          break;
        default:
          break;
      }
    });

    const customSymptoms = selectedSymptoms.filter(function (symptom) {
      const lower = symptom.toLowerCase();
      return !['chest', 'fever', 'pregnancy', 'lump', 'injury', 'mental', 'skin', 'dental', 'eye'].includes(lower);
    });

    let directorates;
    if (directorateSet.size === 0) {
      directorates = ['🏨 General OPD Consultation'];
    } else {
      directorates = Array.from(directorateSet);
    }

    sessionStorage.setItem('selectedSymptoms', JSON.stringify(selectedSymptoms));
    sessionStorage.setItem('customSymptoms', JSON.stringify(customSymptoms));
    sessionStorage.setItem('directorates', JSON.stringify(directorates));

    window.location.href = 'results.html';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSymptomsPage);
} else {
  initSymptomsPage();
}

// SECTION E RESULTS PAGE (resultshtml)

function initResultsPage() {
  if (!document.getElementById('results-container')) {
    return;
  }

  // Load stored data
  const patientRaw   = sessionStorage.getItem('patientData');
  const symptomsRaw  = sessionStorage.getItem('selectedSymptoms');
  const directoratesRaw = sessionStorage.getItem('directorates');

  // Guard: symptom results are still required to show the results page
  if (!symptomsRaw || !directoratesRaw) {
    window.location.href = 'index.html';
    return;
  }

  const patient     = patientRaw ? JSON.parse(patientRaw) : {
    title: '',
    name: 'Patient',
    age: 'Not provided',
    gender: 'Not provided',
    height: 'Not provided',
    weight: 'Not provided',
    bmi: null,
    category: null,
  };
  const symptoms    = JSON.parse(symptomsRaw);
  const directorates = JSON.parse(directoratesRaw);
  const patientTitle = patient.title || '';

  // Friendly symptom labels
  // Map the short value strings back to human-readable text
  const symptomLabels = {
    chest:     '💔 Chest pain / Shortness of breath',
    fever:     '🌡️ High fever / Body aches',
    pregnancy: '🤰 Pregnancy-related / Abdominal pain',
    lump:      '🔍 Unusual lump / Unexplained weight loss',
    injury:    '🩹 Injury / Fracture / Open wound',
    mental:    '😔 Persistent sadness / Anxiety / Sleep problems',
    skin:      '🌿 Skin rash / Allergic reaction',
    dental:    '🦷 Toothache / Dental pain',
    eye:       '👁️ Eye problems / Blurred vision',
  };

  // BMI category → note and CSS class
  // Each category gets an explanatory one-liner and a colour class
  const bmiInfo = {
    Underweight: {
      note:  'Your Body Mass Index (BMI) suggests you may be underweight. A nutritional assessment may be helpful.',
      cls:   'bmi-underweight',
    },
    Normal: {
      note:  'Great! Your Body Mass Index (BMI) is within the healthy range. Keep maintaining a balanced lifestyle.',
      cls:   'bmi-normal',
    },
    Overweight: {
      note:  'Your Body Mass Index (BMI) is slightly above the healthy range. Diet and regular exercise can help.',
      cls:   'bmi-overweight',
    },
    Obese: {
      note:  'Your Body Mass Index (BMI) indicates obesity. Please consult a healthcare professional for guidance.',
      cls:   'bmi-obese',
    },
  };

  const bmiMeta = patient.category ? bmiInfo[patient.category] : null;

  // Build the results HTML
  // Build the results HTML.
  const container = document.getElementById('results-container');

  // Patient summary strip
  const summaryHTML = `
    <div class="patient-summary">
      <div class="summary-item">
        <div class="val">👤 ${patientTitle ? patientTitle + ' ' : ''}${patient.name.split(' ')[0]}</div>
        <div class="lbl">Name</div>
      </div>
      <div class="summary-item">
        <div class="val">${patient.age}</div>
        <div class="lbl">Age (years)</div>
      </div>
      <div class="summary-item">
        <div class="val">${patient.gender === 'Male' ? '♂️' : '♀️'} ${patient.gender}</div>
        <div class="lbl">Gender</div>
      </div>
      <div class="summary-item">
        <div class="val">${patient.height} cm</div>
        <div class="lbl">Height</div>
      </div>
      <div class="summary-item">
        <div class="val">${patient.weight} kg</div>
        <div class="lbl">Weight</div>
      </div>
    </div>`;

  // BMI result block
  const bmiHTML = patient.bmi ? `
    <div class="result-label">📊 Body Mass Index (BMI) Result</div>
    <div class="result-value">
      ${patient.bmi} kg/m²
      <span class="bmi-badge ${bmiMeta.cls}">${patient.category}</span>
    </div>
    <p class="bmi-note">💡 ${bmiMeta.note}</p>` : `
    <div class="result-label">📊 Body Mass Index (BMI) Result</div>
    <p style="color:var(--text-muted);font-size:.9rem;">BMI was skipped. You can calculate it from the BMI page at any time.</p>`;

  // Symptoms list (or "None selected")
  let symptomsHTML = '<div class="result-label">🩺 Reported Symptoms</div>';
  if (symptoms.length === 0) {
    symptomsHTML += '<p style="color:var(--text-muted);font-size:.9rem;">No symptoms selected.</p>';
  } else {
    symptomsHTML += '<div style="margin-top:.4rem;">';
    symptoms.forEach(function (s) {
      const label = symptomLabels[s] || s;
      symptomsHTML += `<span class="symptom-tag">${label}</span>`;
    });
    symptomsHTML += '</div>';
  }

  // Directorates
  let dirHTML = '<div class="result-label">🏥 Suggested Directorate(s) to Visit</div>';
  dirHTML += '<div class="directorate-list">';
  directorates.forEach(function (d) {
    dirHTML += `<div class="directorate-tag">${d}</div>`;
  });
  dirHTML += '</div>';

  // Show the results.
  container.innerHTML = `
    <div class="card">
      <div class="card-title">👤 Patient Information Summary</div>
      ${summaryHTML}
    </div>
    <div class="grid-2col">
      <div class="card">
        <div class="card-title">⚖️ Body Mass Index (BMI) Assessment</div>
        ${bmiHTML}
      </div>
      <div class="card">
        <div class="card-title">🩻 Clinical Routing &amp; Directorate(s)</div>
        ${symptomsHTML}
        <hr class="divider">
        ${dirHTML}
      </div>
    </div>`;

  // "Start New Assessment" button
  // Start a new assessment.
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  }
}

// Initialize results page when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResultsPage);
} else {
  initResultsPage();
}


// SECTION F FEEDBACK PAGE (feedbackhtml)

if (document.getElementById('feedback-form')) {

  // Star Rating Widget
  let selectedRating = 0;
  const stars = document.querySelectorAll('.star');

  stars.forEach(function (star) {
    // When the user clicks a star, set the rating
    star.addEventListener('click', function () {
      selectedRating = parseInt(star.dataset.value, 10);
      updateStars(selectedRating);
    });

    // Hover: light up stars up to the hovered one
    star.addEventListener('mouseover', function () {
      updateStars(parseInt(star.dataset.value, 10));
    });

    // Mouse out: revert to the selected rating
    star.addEventListener('mouseout', function () {
      updateStars(selectedRating);
    });
  });

  // Update visual state of all stars
  function updateStars(rating) {
    stars.forEach(function (s) {
      if (parseInt(s.dataset.value, 10) <= rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }

  // Feedback Form Submission
  const feedbackForm = document.getElementById('feedback-form');
  const patientNameInput = document.getElementById('patient-name');

  feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const patientName = patientNameInput ? patientNameInput.value.trim() : '';
    const visitorType = document.getElementById('visitor-type')
      ? document.getElementById('visitor-type').value || 'Not specified'
      : 'Not specified';
    const liked = document.getElementById('liked') ? document.getElementById('liked').value.trim() : '';
    const suggestions = document.getElementById('suggestions') ? document.getElementById('suggestions').value.trim() : '';
    const comments = document.getElementById('comments') ? document.getElementById('comments').value.trim() : '';
    const recommendInput = document.querySelector('input[name="recommend"]:checked');
    const recommend = recommendInput ? recommendInput.value : 'Not answered';

    if (!patientName) {
      alert('Please enter your name before submitting.');
      return;
    }

    // Validate rating was selected
    if (selectedRating === 0) {
      alert('Please select a star rating before submitting.');
      return;
    }

    const submittedAt = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const emailBody = [
      'Patient Name: ' + patientName,
      'Visitor Type: ' + visitorType,
      'Rating: ' + selectedRating + '/5',
      '',
      'What did you like about this tool?',
      liked || 'No response',
      '',
      'Any suggestions for improvement?',
      suggestions || 'No response',
      '',
      'Comments about KATH services?',
      comments || 'No response',
      '',
      'Would you recommend this tool to others?',
      recommend,
      '',
      'Submission Date/Time: ' + submittedAt
    ].join('\n');

    const mailtoLink = 'mailto:boatengdennis30@gmail.com' +
      '?subject=' + encodeURIComponent('New Patient Feedback – KATH Self-Assessment.') +
      '&body=' + encodeURIComponent(emailBody);

    window.location.href = mailtoLink;

    feedbackForm.style.display = 'none';
    const successBox = document.getElementById('feedback-success');
    if (successBox) successBox.style.display = 'block';

    if (successBox) successBox.scrollIntoView({ behavior: 'smooth' });
  });
}
