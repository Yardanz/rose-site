let activeSectionId = 'about';

function loadStorePage() {
    const main = document.querySelector('main');
    if (!main) return;
    main.classList.add('loading');
    fetch('store.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const storeMain = doc.querySelector('main') || doc.querySelector('body');
            main.innerHTML = storeMain.innerHTML;
            main.classList.remove('loading');
            initializeEventListeners();
        })
        .catch(error => {
            console.error('Ошибка загрузки store.html:', error);
            main.classList.remove('loading');
        });
}

function initializeEventListeners() {
    if (document.querySelector('header nav a')) {
        document.querySelectorAll('header nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                activeSectionId = link.getAttribute('href').substring(1);
                document.querySelectorAll('section').forEach(section => {
                    section.classList.add('hidden');
                    section.classList.remove('active');
                });
                const activeSection = document.getElementById(activeSectionId);
                if (activeSection) {
                    activeSection.classList.remove('hidden');
                    const detailSection = document.getElementById('detail-section');
                    if (detailSection) {
                        detailSection.classList.remove('active');
                        detailSection.classList.add('hidden');
                    }

                    const sidebar = document.querySelector('.sidebar');
                    if (sidebar && (activeSectionId === 'showcase' || activeSectionId === 'animation-store')) {
                        sidebar.classList.remove('sidebar-hidden');
                        applyFilters(activeSectionId);
                    } else if (sidebar) {
                        sidebar.classList.add('sidebar-hidden');
                    }
                }
            });
        });
    }

    if (document.querySelectorAll('input[type="checkbox"]').length > 0) {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (activeSectionId === 'showcase' || activeSectionId === 'animation-store') {
                    applyFilters(activeSectionId);
                }
            });
        });
    }

    if (document.querySelectorAll('.card').length > 0) {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.h3-card')?.textContent || 'No Title';
                const price = card.querySelector('.card .content p')?.textContent || 'N/A';
                const videoSrc = card.querySelector('video')?.getAttribute('src') || '';
                showDetail(title, price, videoSrc);
            });
        });
    }
}

document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        activeSectionId = link.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(activeSectionId);
        if (activeSection) {
            activeSection.classList.remove('hidden');
            const detailSection = document.getElementById('detail-section');
            if (detailSection) {
                detailSection.classList.remove('active');
                detailSection.classList.add('hidden');
            }

            const sidebar = document.querySelector('.sidebar');
            if (sidebar && (activeSectionId === 'showcase' || activeSectionId === 'animation-store')) {
                sidebar.classList.remove('sidebar-hidden');
                applyFilters(activeSectionId);
            } else if (sidebar) {
                sidebar.classList.add('sidebar-hidden');
            }
        }
    });
});

function showDetail(title, price, videoSrc) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
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

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (activeSectionId === 'showcase' || activeSectionId === 'animation-store') {
            applyFilters(activeSectionId);
        }
    });
});

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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in-sect').forEach(element => {
        observer.observe(element);
    });

    initializeEventListeners();
});