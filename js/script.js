// --- ЛОГІКА ДЛЯ АДАПТИВНОГО МЕНЮ ---
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    // Додає або забирає клас 'active' при кліку на гамбургер
    menu.classList.toggle('active');
}

// --- ЛОГІКА ДЛЯ КАРУСЕЛІ (СЛАЙДЕРА) ---
let currentSlide = 0; // Поточний слайд

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-slide img');
    const slider = document.getElementById('slider');
    const totalSlides = slides.length;

    // Оновлюємо індекс слайда
    currentSlide = currentSlide + step;

    // Якщо дійшли до кінця - повертаємось на початок
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    // Зсуваємо контейнер з картинками вліво (ефект ковзання)
    slider.style.transform = `translateX(${-currentSlide * 100}%)`;
}

// Автоматична зміна слайдів кожні 3 секунди
setInterval(() => {
    moveSlide(1);
}, 3000);

// ... ТУТ МАЄ БУТИ ТВІЙ СТАРИЙ КОД З 7-Ї ЛАБИ (loadCatalog, loadCategoryItems тощо) ...
