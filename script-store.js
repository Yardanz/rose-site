let activeSectionId = 'showcase'; // Изменяем начальное значение на существующую секцию

document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    // Пропускаем внешние ссылки (например, index.html)
    if (href.startsWith('#') || href === '') {
      e.preventDefault();
      activeSectionId = href.substring(1) || 'showcase'; // Устанавливаем значение по умолчанию
      document.querySelectorAll('section').forEach(section => {
        if (section) {
          section.classList.add('hidden');
          section.classList.remove('active');
        }
      });
      const activeSection = document.getElementById(activeSectionId);
      if (activeSection) {
        activeSection.classList.remove('hidden');
      }
      const detailSection = document.getElementById('detail-section');
      if (detailSection) {
        detailSection.classList.remove('active');
        detailSection.classList.add('hidden');
      }

      // Управление видимостью сайдбара
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && (activeSectionId === 'showcase' || activeSectionId === 'animation-store')) {
        sidebar.classList.remove('sidebar-hidden');
        applyFilters(activeSectionId);
      } else if (sidebar) {
        sidebar.classList.add('sidebar-hidden');
      }
    } else {
      // Для внешних ссылок (например, index.html) просто позволяем переход
      return;
    }
  });
});

function showDetail(title, price, videoSrc) {
  document.querySelectorAll('section').forEach(section => {
    if (section) {
      section.classList.add('hidden');
      section.classList.remove('active');
    }
  });
  const detailSection = document.getElementById('detail-section');
  if (detailSection) {
    detailSection.classList.add('active');
    detailSection.classList.remove('hidden');
    document.getElementById('detail-title').textContent = title;
    document.getElementById('detail-price').textContent = price;
    document.getElementById('detail-video').src = videoSrc;
  }
}

function hideDetail() {
  const detailSection = document.getElementById('detail-section');
  if (detailSection) {
    detailSection.classList.remove('active');
    detailSection.classList.add('hidden');
  }
  const activeSection = document.getElementById(activeSectionId);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    applyFilters(activeSectionId);
  }
}

// Функция фильтрации для конкретной секции
function applyFilters(sectionId) {
  const drawingFilters = Array.from(document.querySelectorAll('input[name="drawing"]:checked')).map(cb => cb.value);
  const colorFilters = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value);
  const typeFilters = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

  const cards = document.querySelectorAll(`#${sectionId} .card`);
  cards.forEach(card => {
    const cardTags = card.getAttribute('data-tags')?.split(' ') || [];
    const matchesDrawing = drawingFilters.length === 0 || drawingFilters.some(filter => cardTags.includes(filter));
    const matchesColor = colorFilters.length === 0 || colorFilters.some(filter => cardTags.includes(filter));
    const matchesType = typeFilters.length === 0 || typeFilters.some(filter => cardTags.includes(filter));

    if (matchesDrawing && matchesColor && matchesType) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Обработчик изменения чекбоксов
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (activeSectionId === 'showcase' || activeSectionId === 'animation-store') {
      applyFilters(activeSectionId);
    }
  });
});

// Show Showcase by default
document.addEventListener("DOMContentLoaded", () => {
  const cloudCount = 30;
  const directions = ['right', 'left', 'up', 'down', 'diagonal1', 'diagonal2'];

  for (let i = 0; i < cloudCount; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");

    const size = Math.random() * 400 + 300;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.6}px`;
    cloud.style.top = `${Math.random() * 100}%`;
    cloud.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 40 + 60;
    cloud.style.animationDuration = `${duration}s`;
    cloud.style.animationDelay = `${Math.random() * -duration}s`;

    const direction = directions[Math.floor(Math.random() * directions.length)];
    cloud.classList.add(`move-${direction}`);

    const cloudsContainer = document.getElementById("clouds");
    if (cloudsContainer) {
      cloudsContainer.appendChild(cloud);
    }
  }

  // Устанавливаем начальную секцию
  const initialSection = document.getElementById(activeSectionId);
  if (initialSection) {
    initialSection.classList.remove('hidden');
  }
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && (activeSectionId === 'showcase' || activeSectionId === 'animation-store')) {
    sidebar.classList.remove('sidebar-hidden');
    applyFilters(activeSectionId);
  }
});