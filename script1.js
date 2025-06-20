document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('animationToggle');
    const animations = document.querySelectorAll('video');

    // Функция для безопасного управления воспроизведением
    const togglePlayback = (shouldPlay) => {
        animations.forEach(video => {
            if (shouldPlay) {
                video.play().catch(error => {
                    console.error('Play failed:', error); // Логируем ошибку для диагностики
                });
            } else {
                video.pause();
            }
        });
    };

    // Инициализация состояния при загрузке
    if (toggle) {
        togglePlayback(toggle.checked);
    }

    // Обработчик переключателя
    toggle.addEventListener('change', () => {
        togglePlayback(toggle.checked);
    });
});