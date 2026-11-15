const typeButtons = document.querySelectorAll('.type-btn');
const priceSlider = document.getElementById('price-range');
const priceDisplay = document.getElementById('price-display');
const boundMin = document.getElementById('bound-min');
const boundMax = document.getElementById('bound-max');
const cards = document.querySelectorAll('.card');
const propCount = document.getElementById('prop-count');
const emptyState = document.getElementById('empty-state');
const resetBtn = document.getElementById('reset-btn');
const emptyResetBtn = document.getElementById('empty-reset-btn');
const detailButtons = document.querySelectorAll('.btn-details');
const enquiryForm = document.querySelector('.enquiry-form');

const heroVideo = document.getElementById('hero-video');
const soundToggleBtn = document.getElementById('btn-sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const soundText = document.getElementById('sound-text');
const playToggleBtn = document.getElementById('btn-play-toggle');
const playIcon = document.getElementById('play-icon');
const playText = document.getElementById('play-text');
const quickExploreBtn = document.getElementById('btn-quick-explore');
const quickSearchInput = document.getElementById('quick-search-input');
const quickTypeSelect = document.getElementById('quick-type-select');

let selectedType = 'all';

function formatPrice(num) {
  return '₹' + Number(num).toLocaleString('en-IN');
}

function updateSliderScale(type) {
  if (type === 'rent') {
    priceSlider.min = '15000';
    priceSlider.max = '80000';
    priceSlider.step = '2500';
    priceSlider.value = '80000';
    boundMin.textContent = '₹15,000';
    boundMax.textContent = '₹80,000';
    priceDisplay.textContent = '₹80,000 / mo';
  } else if (type === 'sale') {
    priceSlider.min = '3000000';
    priceSlider.max = '15000000';
    priceSlider.step = '250000';
    priceSlider.value = '15000000';
    boundMin.textContent = '₹30 Lakh';
    boundMax.textContent = '₹1.50 Crore';
    priceDisplay.textContent = '₹1,50,00,000';
  } else {
    priceSlider.min = '20000';
    priceSlider.max = '15000000';
    priceSlider.step = '100000';
    priceSlider.value = '15000000';
    boundMin.textContent = '₹20,000';
    boundMax.textContent = '₹1.50 Crore';
    priceDisplay.textContent = '₹1,50,00,000';
  }
}

function filterProperties() {
  const currentMaxPrice = Number(priceSlider.value);
  const searchKeyword = quickSearchInput ? quickSearchInput.value.toLowerCase().trim() : '';
  let visibleCount = 0;

  cards.forEach(card => {
    const cardType = card.getAttribute('data-type');
    const cardPrice = Number(card.getAttribute('data-price'));
    const cardText = card.textContent.toLowerCase();

    const typeMatch = (selectedType === 'all') || (cardType === selectedType);
    const priceMatch = cardPrice <= currentMaxPrice;
    const searchMatch = (searchKeyword === '') || cardText.includes(searchKeyword);

    if (typeMatch && priceMatch && searchMatch) {
      card.style.display = 'flex';
      visibleCount = visibleCount + 1;
    } else {
      card.style.display = 'none';
    }
  });

  propCount.textContent = visibleCount;

  if (visibleCount === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}

typeButtons.forEach(button => {
  button.addEventListener('click', () => {
    typeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedType = button.getAttribute('data-type');
    updateSliderScale(selectedType);
    filterProperties();
  });
});

priceSlider.addEventListener('input', () => {
  const val = Number(priceSlider.value);
  if (selectedType === 'rent') {
    priceDisplay.textContent = formatPrice(val) + ' / mo';
  } else {
    priceDisplay.textContent = formatPrice(val);
  }
  filterProperties();
});

function resetFilters() {
  selectedType = 'all';
  if (quickSearchInput) {
    quickSearchInput.value = '';
  }
  if (quickTypeSelect) {
    quickTypeSelect.value = 'all';
  }
  typeButtons.forEach(button => {
    if (button.getAttribute('data-type') === 'all') {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  updateSliderScale('all');
  filterProperties();
}

resetBtn.addEventListener('click', resetFilters);

if (emptyResetBtn) {
  emptyResetBtn.addEventListener('click', resetFilters);
}

detailButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const card = button.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const price = card.querySelector('.card-price').textContent;
    alert(title + ' (' + price + ')\n\nThank you for your interest! A Dream Home Real Estate representative will contact you with full property details.');
  });
});

if (soundToggleBtn && heroVideo) {
  soundToggleBtn.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    if (heroVideo.muted) {
      soundIcon.textContent = '🔇';
      soundText.textContent = 'Unmute';
    } else {
      soundIcon.textContent = '🔊';
      soundText.textContent = 'Mute';
    }
  });
}

if (playToggleBtn && heroVideo) {
  playToggleBtn.addEventListener('click', () => {
    if (heroVideo.paused) {
      heroVideo.play();
      playIcon.textContent = '⏸';
      playText.textContent = 'Pause';
    } else {
      heroVideo.pause();
      playIcon.textContent = '▶';
      playText.textContent = 'Play';
    }
  });
}

if (quickExploreBtn) {
  quickExploreBtn.addEventListener('click', () => {
    const chosenType = quickTypeSelect.value;
    selectedType = chosenType;
    typeButtons.forEach(btn => {
      if (btn.getAttribute('data-type') === chosenType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    updateSliderScale(chosenType);
    filterProperties();
    const target = document.getElementById('properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

if (quickSearchInput) {
  quickSearchInput.addEventListener('input', () => {
    filterProperties();
  });
}

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    alert('Thank you, ' + nameInput.value + '! Your enquiry has been received. Our Group 16 team will get back to you shortly.');
    enquiryForm.reset();
  });
}

function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* =====================================================================
   1. TABLE OF PROPERTY COMPARISON IN TILTED 3D ANIMATION
   ===================================================================== */
function init3DComparisonTable() {
  const scene = document.getElementById('table-3d-scene');
  const card = document.getElementById('table-3d-card');
  const glare = document.getElementById('table-3d-glare');
  const coordsDisplay = document.getElementById('tilt-coords-display');
  const filterBtns = document.querySelectorAll('.comp-filter-btn');
  const tableRows = document.querySelectorAll('#comparison-table-body .comp-row');
  const tiltBtns = document.querySelectorAll('.tilt-mode-btn');
  const btnTilt3d = document.getElementById('btn-tilt-3d');
  const btnTiltIso = document.getElementById('btn-tilt-iso');
  const btnTiltFlat = document.getElementById('btn-tilt-flat');
  const btnTiltReset = document.getElementById('btn-tilt-reset');
  const enquireBtns = document.querySelectorAll('.btn-comp-enquire');

  if (!scene || !card) return;

  let currentPitch = 9.0;
  let currentYaw = -5.0;
  let currentRoll = 0.5;
  let targetPitch = 9.0;
  let targetYaw = -5.0;
  let targetRoll = 0.5;
  let isHovered = false;
  let currentMode = 'dynamic';

  function updateTiltTransform() {
    card.style.transform = `perspective(1600px) rotateX(${currentPitch.toFixed(2)}deg) rotateY(${currentYaw.toFixed(2)}deg) rotateZ(${currentRoll.toFixed(2)}deg)`;
    if (coordsDisplay) {
      coordsDisplay.textContent = `Pitch: ${currentPitch.toFixed(1)}° | Yaw: ${currentYaw.toFixed(1)}°`;
    }
  }

  function loop() {
    if (currentMode === 'dynamic') {
      if (!isHovered) {
        const time = Date.now() * 0.0015;
        targetPitch = 8.5 + Math.sin(time) * 2.0;
        targetYaw = -5.0 + Math.cos(time * 0.8) * 1.8;
        targetRoll = 0.5 + Math.sin(time * 0.5) * 0.4;
      }
    }

    currentPitch += (targetPitch - currentPitch) * 0.09;
    currentYaw += (targetYaw - currentYaw) * 0.09;
    currentRoll += (targetRoll - currentRoll) * 0.09;

    updateTiltTransform();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  scene.addEventListener('mouseenter', () => {
    isHovered = true;
    card.classList.add('is-hovered');
  });

  scene.addEventListener('mousemove', (e) => {
    if (currentMode !== 'dynamic') return;
    isHovered = true;

    const rect = scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    targetPitch = normY * -13;
    targetYaw = normX * 13;
    targetRoll = (normX * normY) * 1.5;

    if (glare) {
      const glareX = ((x / rect.width) * 100).toFixed(1);
      const glareY = ((y / rect.height) * 100).toFixed(1);
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, rgba(197, 160, 89, 0.12) 35%, transparent 70%)`;
      glare.style.opacity = '1';
    }
  });

  scene.addEventListener('mouseleave', () => {
    isHovered = false;
    card.classList.remove('is-hovered');
    if (currentMode === 'dynamic') {
      targetPitch = 9.0;
      targetYaw = -5.0;
      targetRoll = 0.5;
    }
    if (glare) {
      glare.style.opacity = '0';
    }
  });

  function setActiveTiltBtn(activeBtn) {
    tiltBtns.forEach(btn => btn.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
  }

  if (btnTilt3d) {
    btnTilt3d.addEventListener('click', () => {
      currentMode = 'dynamic';
      setActiveTiltBtn(btnTilt3d);
      targetPitch = 9.0;
      targetYaw = -5.0;
      targetRoll = 0.5;
    });
  }

  if (btnTiltIso) {
    btnTiltIso.addEventListener('click', () => {
      currentMode = 'isometric';
      setActiveTiltBtn(btnTiltIso);
      targetPitch = 15.0;
      targetYaw = -16.0;
      targetRoll = 3.5;
    });
  }

  if (btnTiltFlat) {
    btnTiltFlat.addEventListener('click', () => {
      currentMode = 'flat';
      setActiveTiltBtn(btnTiltFlat);
      targetPitch = 0.0;
      targetYaw = 0.0;
      targetRoll = 0.0;
    });
  }

  if (btnTiltReset) {
    btnTiltReset.addEventListener('click', () => {
      currentMode = 'dynamic';
      setActiveTiltBtn(btnTilt3d);
      targetPitch = 9.0;
      targetYaw = -5.0;
      targetRoll = 0.5;
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      tableRows.forEach(row => {
        const rowType = row.getAttribute('data-type');
        if (filter === 'all' || rowType === filter) {
          row.style.display = '';
          row.style.opacity = '1';
        } else {
          row.style.display = 'none';
          row.style.opacity = '0';
        }
      });
    });
  });

  enquireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const propName = btn.getAttribute('data-property');
      const propType = btn.getAttribute('data-type');
      const contactSec = document.getElementById('contact');
      const propSelect = document.getElementById('property-type');
      const msgArea = document.getElementById('message');

      if (propSelect && propType) {
        propSelect.value = propType;
      }
      if (msgArea && propName) {
        msgArea.value = `I am interested in scheduling a private site visit and receiving the verified comparison dossier for "${propName}". Please contact me with availability.`;
      }
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* =====================================================================
   2. OUR SERVICES SECTION IN INFINITE CARD SLIDER MODE
   ===================================================================== */
function initInfiniteServicesSlider() {
  const viewport = document.getElementById('services-slider-viewport');
  const track = document.getElementById('services-infinite-track');
  const prevBtn = document.getElementById('btn-service-prev');
  const nextBtn = document.getElementById('btn-service-next');
  const toggleBtn = document.getElementById('btn-service-toggle');
  const toggleIcon = document.getElementById('service-toggle-icon');
  const toggleText = document.getElementById('service-toggle-text');
  const statusText = document.getElementById('slider-status-text');
  const pulseDot = document.getElementById('slider-pulse-dot');
  const serviceEnquireLinks = document.querySelectorAll('.service-enquire-link');

  if (!viewport || !track) return;

  let isAutoSliding = true;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let dragOffset = 0;
  let scrollPos = 0;
  const speed = 0.85;

  function getHalfWidth() {
    return track.scrollWidth / 2;
  }

  function tick() {
    if (isAutoSliding && !isHovered && !isDragging) {
      scrollPos += speed;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0 && scrollPos >= halfWidth) {
        scrollPos = scrollPos - halfWidth;
      }
      track.style.transform = `translateX(-${scrollPos}px)`;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  viewport.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  viewport.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isAutoSliding = !isAutoSliding;
      if (isAutoSliding) {
        if (toggleIcon) toggleIcon.textContent = '⏸';
        if (toggleText) toggleText.textContent = 'Pause';
        if (statusText) statusText.textContent = 'Infinite Auto-Scroll: Active';
        if (pulseDot) pulseDot.classList.remove('paused');
      } else {
        if (toggleIcon) toggleIcon.textContent = '▶';
        if (toggleText) toggleText.textContent = 'Resume';
        if (statusText) statusText.textContent = 'Infinite Auto-Scroll: Paused';
        if (pulseDot) pulseDot.classList.add('paused');
      }
    });
  }

  function shiftSlider(distance) {
    const halfWidth = getHalfWidth();
    scrollPos += distance;
    if (halfWidth > 0) {
      if (scrollPos < 0) {
        scrollPos = halfWidth + scrollPos;
      } else if (scrollPos >= halfWidth) {
        scrollPos = scrollPos - halfWidth;
      }
    }
    track.style.transform = `translateX(-${scrollPos}px)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      shiftSlider(-360);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      shiftSlider(360);
    });
  }

  viewport.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    dragOffset = scrollPos;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    scrollPos = dragOffset + diff;
    const halfWidth = getHalfWidth();
    if (halfWidth > 0) {
      if (scrollPos < 0) scrollPos = halfWidth + scrollPos;
      if (scrollPos >= halfWidth) scrollPos = scrollPos - halfWidth;
    }
    track.style.transform = `translateX(-${scrollPos}px)`;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  serviceEnquireLinks.forEach(link => {
    link.addEventListener('click', () => {
      const serviceName = link.getAttribute('data-service');
      const contactSec = document.getElementById('contact');
      const msgArea = document.getElementById('message');
      if (msgArea && serviceName) {
        msgArea.value = `I am interested in learning more about your "${serviceName}" services. Please connect me with a senior advisor.`;
      }
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* =====================================================================
   3. WHY CHOOSE DREAM HOME SECTION IN 3D POPPING TITLED CARDS
   ===================================================================== */
function init3DPoppingCards() {
  const scenes = document.querySelectorAll('.why-pop-scene');

  scenes.forEach(scene => {
    const card = scene.querySelector('.why-pop-card');
    const glare = scene.querySelector('.why-pop-glare');
    if (!card) return;

    scene.addEventListener('mousemove', (e) => {
      const rect = scene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(28px) translateY(-10px)`;
      card.classList.add('is-popped');

      if (glare) {
        const percentX = ((x / rect.width) * 100).toFixed(1);
        const percentY = ((y / rect.height) * 100).toFixed(1);
        glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(197, 160, 89, 0.22) 0%, rgba(255, 255, 255, 0.1) 25%, transparent 70%)`;
        glare.style.opacity = '1';
      }
    });

    scene.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
      card.classList.remove('is-popped');
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  });
}

/* =====================================================================
   4. KINETIC GRID INTERACTIVE BACKGROUND (LIGHT PALETTE)
   ===================================================================== */
function initKineticGridBackground() {
  const canvas = document.getElementById('kinetic-grid-canvas');
  const section = document.getElementById('properties');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const CELL_SIZE = 55;
  const INFLUENCE_RADIUS = 260;
  const MAX_WARP = 24;
  const DOT_SPACING = 28;
  const LERP_SPEED = 0.08;

  const NODE_BASE_RADIUS = 1.8;
  const NODE_ACTIVE_RADIUS = 3.2;

  // Light luxury theme palette
  const theme = {
    bg: '#F8F6F2',
    lineBase: { r: 197, g: 160, b: 89, a: 0.16 },
    lineActive: { r: 197, g: 160, b: 89, a: 0.85 },
    nodeBase: { r: 197, g: 160, b: 89, a: 0.35 },
    nodeActive: { r: 197, g: 160, b: 89, a: 1.0 },
    glow: '197,160,89',
    ripple: '197,160,89',
    dots: 'rgba(197, 160, 89, 0.14)',
  };

  const mouse = { x: -9999, y: -9999 };
  const targetMouse = { x: -9999, y: -9999 };
  const ripples = [];
  let width = 0;
  let height = 0;
  let dpr = 1;

  function lerpN(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(base, active, t) {
    const r = Math.round(lerpN(base.r, active.r, t));
    const g = Math.round(lerpN(base.g, active.g, t));
    const b = Math.round(lerpN(base.b, active.b, t));
    const a = lerpN(base.a, active.a, t);
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = section.clientWidth;
    height = section.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);

  function getWarpedPoint(gx, gy, col, row, m, rips, cols, rows) {
    const edgeMargin = 1.5;
    const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
    const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
    const pinFactor = colPin * colPin * rowPin * rowPin;

    const dx = gx - m.x;
    const dy = gy - m.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

    let rx = 0;
    let ry = 0;
    for (let i = 0; i < rips.length; i++) {
      const r = rips[i];
      const rdx = gx - r.x;
      const rdy = gy - r.y;
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
      const waveWidth = 55;
      const diff = rdist - r.radius;
      if (Math.abs(diff) < waveWidth) {
        const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
        const angle = Math.atan2(rdy, rdx);
        const sign = diff < 0 ? -1 : 1;
        rx += Math.cos(angle) * strength * sign * -1;
        ry += Math.sin(angle) * strength * sign * -1;
      }
    }

    if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
      const t = dist / INFLUENCE_RADIUS;
      const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
      const warpAmt = eased * MAX_WARP * pinFactor;
      const angle = Math.atan2(dy, dx);
      return {
        pt: {
          x: gx - Math.cos(angle) * warpAmt + rx,
          y: gy - Math.sin(angle) * warpAmt + ry
        },
        proximity
      };
    }

    return { pt: { x: gx + rx, y: gy + ry }, proximity };
  }

  function draw(now) {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = theme.dots;
    for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        ctx.beginPath();
        ctx.arc(x, y, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      const age = (now - r.born) / 1000;
      r.radius = Math.max(0, age * 400);
      r.opacity = Math.max(0, 1 - age * 1.2);
      if (r.opacity <= 0) {
        ripples.splice(i, 1);
      }
    }

    const cols = Math.max(2, Math.ceil(width / CELL_SIZE)) + 1;
    const rows = Math.max(2, Math.ceil(height / CELL_SIZE)) + 1;
    const cellW = width / (cols - 1);
    const cellH = height / (rows - 1);

    const pts = [];
    const prox = [];

    for (let row = 0; row < rows; row++) {
      pts[row] = [];
      prox[row] = [];
      for (let col = 0; col < cols; col++) {
        const { pt, proximity } = getWarpedPoint(
          col * cellW,
          row * cellH,
          col,
          row,
          mouse,
          ripples,
          cols,
          rows
        );
        pts[row][col] = pt;
        prox[row][col] = proximity;
      }
    }

    const drawSeg = (p1, p2, pr1, pr2) => {
      const avg = (pr1 + pr2) / 2;
      const t = avg * avg * (3 - 2 * avg);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = lerpColor(theme.lineBase, theme.lineActive, t);
      ctx.lineWidth = lerpN(0.8, 1.8, t);
      ctx.stroke();
    };

    ctx.lineCap = 'butt';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);
      }
    }

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const p = pts[row][col];
        const pr = prox[row][col];
        const t = pr * pr * (3 - 2 * pr);
        const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

        if (t > 0.3) {
          const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
          const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(${theme.glow},${(t * 0.3).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${theme.glow},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor(theme.nodeBase, theme.nodeActive, t);
        ctx.fill();
      }
    }

    for (let i = 0; i < ripples.length; i++) {
      const r = ripples[i];
      const safeRadius = Math.max(0, r.radius);
      ctx.beginPath();
      ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${theme.ripple},${(r.opacity * 0.35).toFixed(3)})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
  }

  function loop(now) {
    mouse.x = lerpN(mouse.x, targetMouse.x, LERP_SPEED);
    mouse.y = lerpN(mouse.y, targetMouse.y, LERP_SPEED);

    draw(now);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    targetMouse.x = e.clientX - rect.left;
    targetMouse.y = e.clientY - rect.top;
  });

  section.addEventListener('mouseleave', () => {
    targetMouse.x = -9999;
    targetMouse.y = -9999;
  });

  section.addEventListener('click', (e) => {
    if (e.target.closest('button, input, select, a, textarea')) return;
    const rect = section.getBoundingClientRect();
    ripples.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      opacity: 1,
      born: performance.now(),
    });
  });
}

function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.section-header', {
    scrollTrigger: {
      trigger: '.section-header',
      start: 'top 85%'
    },
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
  });

  gsap.from('.card', {
    scrollTrigger: {
      trigger: '.prop-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out'
  });

  gsap.from('.table-3d-scene', {
    scrollTrigger: {
      trigger: '#comparison',
      start: 'top 75%'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out'
  });

  gsap.from('.services-slider-viewport', {
    scrollTrigger: {
      trigger: '#services',
      start: 'top 75%'
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power2.out'
  });

  gsap.from('.why-pop-scene', {
    scrollTrigger: {
      trigger: '#whyus',
      start: 'top 75%'
    },
    opacity: 0,
    y: 45,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  filterProperties();
  initTiltCards();
  initKineticGridBackground();
  init3DComparisonTable();
  initInfiniteServicesSlider();
  init3DPoppingCards();
  initGSAPScrollAnimations();
});
