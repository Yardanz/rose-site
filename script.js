let activeSectionId = 'about';

document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    activeSectionId = link.getAttribute('href').substring(1);
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('hidden');
      section.classList.remove('active');
    });
    const activeSection = document.getElementById(activeSectionId);
    activeSection.classList.remove('hidden');
    document.getElementById('detail-section').classList.remove('active');
    document.getElementById('detail-section').classList.add('hidden');

    // Управление видимостью сайдбара
    const sidebar = document.querySelector('.sidebar');
    if (activeSectionId === 'showcase' || activeSectionId === 'animation-store') {
      sidebar.classList.remove('sidebar-hidden');
      applyFilters(activeSectionId); // Применяем фильтры для активной секции
    } else {
      sidebar.classList.add('sidebar-hidden');
    }
  });
});

function showDetail(title, price, videoSrc) {
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    section.classList.remove('active');
  });
  const detailSection = document.getElementById('detail-section');
  detailSection.classList.add('active');
  detailSection.classList.remove('hidden');
  document.getElementById('detail-title').textContent = title;
  document.getElementById('detail-price').textContent = price;
  document.getElementById('detail-video').src = videoSrc;
}

function hideDetail() {
  const detailSection = document.getElementById('detail-section');
  detailSection.classList.remove('active');
  detailSection.classList.add('hidden');
  document.getElementById(activeSectionId).classList.remove('hidden');
  applyFilters(activeSectionId); // Применяем фильтры после возврата
}

// Функция фильтрации для конкретной секции
function applyFilters(sectionId) {
  const drawingFilters = Array.from(document.querySelectorAll('input[name="drawing"]:checked')).map(cb => cb.value);
  const colorFilters = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value);
  const typeFilters = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

  const cards = document.querySelectorAll(`#${sectionId} .card`);
  cards.forEach(card => {
    const cardTags = card.getAttribute('data-tags').split(' ');
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
      applyFilters(activeSectionId); // Применяем фильтры для текущей активной секции
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

    const size = Math.random() * 400 + 300; // 300–700px
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.6}px`;
    cloud.style.top = `${Math.random() * 100}%`;
    cloud.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 40 + 60; // 60–100 сек
    cloud.style.animationDuration = `${duration}s`;
    cloud.style.animationDelay = `${Math.random() * -duration}s`;

    const direction = directions[Math.floor(Math.random() * directions.length)];
    cloud.classList.add(`move-${direction}`);

    document.getElementById("clouds").appendChild(cloud);
  }
  const fadeText = document.querySelector('.fade-text');
  if (fadeText) {
    setTimeout(() => {
      fadeText.classList.add('fade-in');
    }, 300);
  }
  const buttonSect = document.querySelector('.buttons-sect');
  if (buttonSect) {
    setTimeout(() => {
      buttonSect.classList.add('buttons-sect-in');
    }, 900);
  }
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Опционально: прекращаем наблюдение после анимации
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Анимация запускается, когда 10% элемента видно
  });

  // Наблюдаем за всеми элементами с классом fade-in
  document.querySelectorAll('.fade-in-sect').forEach(element => {
    observer.observe(element);
  });

  const toggle = document.getElementById('themeToggle');
    const imageContainers = {
        'steam-off': [
            { src: 'img/contact/Steam Add.webp', alt: 'Default Image 2' },
            { src: 'img/contact/off/steam-off.jpg', alt: 'Alternative Image 2' }
        ],
        'discord-off': [
            { src: 'img/contact/Discord ID.webp', alt: 'Default Image 2' },
            { src: 'img/contact/off/discord-off.jpg', alt: 'Alternative Image 2' }
        ],
        'store-off': [
            { src: 'img/third-sect/Store.webp', alt: 'Default Image 2' },
            { src: 'img/third-sect/Store-off.jpg', alt: 'Alternative Image 2' }
        ]
    };

    toggle.addEventListener('change', () => {
        Object.keys(imageContainers).forEach(containerId => {
            const container = document.getElementById(containerId);
            const img = container.querySelector('img');
            const currentIndex = toggle.checked ? 1 : 0; // 0 - default, 1 - alternative
            img.src = imageContainers[containerId][currentIndex].src;
            img.alt = imageContainers[containerId][currentIndex].alt;
        });
    });

});