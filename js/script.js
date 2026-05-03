// ==========================================
// ЛОГІКА ДЛЯ АДАПТИВНОГО МЕНЮ (Лабораторна 8)
// ==========================================
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// ==========================================
// ЛОГІКА ДЛЯ КАРУСЕЛІ / СЛАЙДЕРА (Лабораторна 8)
// ==========================================
let currentSlide = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-slide img');
    const slider = document.getElementById('slider');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    currentSlide = currentSlide + step;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    slider.style.transform = `translateX(${-currentSlide * 100}%)`;
}

setInterval(() => {
    if(document.getElementById('slider')) {
        moveSlide(1);
    }
}, 3000);

// ==========================================
// ЛОГІКА ДЛЯ КАТАЛОГУ (AJAX, Лабораторна 7)
// ==========================================

// 1. Завантаження головного каталогу
function loadCatalog(event) {
    if (event) event.preventDefault();

    // ЗМІНЕНО: тепер просто 'categories.json' замість 'data/categories.json'
    fetch('categories.json')
        .then(response => {
            if (!response.ok) throw new Error("Не вдалося знайти categories.json");
            return response.json();
        })
        .then(categories => {
            let html = `
                <div class="hero-container text-center mb-4">
                    <a href="index.html" class="hero-btn" style="display: inline-block; margin-bottom: 20px;">🏠 Повернутися на головну</a>
                    <h2 style="color: #00c6ff;">Каталог товарів</h2>
                </div>
                <div class="list-group" style="display: flex; flex-direction: column; gap: 10px; max-width: 800px; margin: 0 auto; padding: 0 20px;">`;
            
            categories.forEach(category => {
                html += `
                    <a href="#" style="background: #16213e; padding: 15px; border-radius: 8px; border: 1px solid #00c6ff; display: block;" onclick="loadCategoryItems('${category.shortname}', event)">
                        <h3 style="color: #fff; margin-bottom: 5px;">${category.name}</h3>
                        <p style="color: #aaa;">${category.notes}</p>
                    </a>`;
            });

            html += `</div>`;
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Помилка завантаження каталогу. Перевір консоль (F12).');
        });
}

// 2. Завантаження конкретних товарів категорії
function loadCategoryItems(shortname, event) {
    if (event) event.preventDefault();

    // ЗМІНЕНО: тепер просто '${shortname}.json'
    fetch(`${shortname}.json`)
        .then(response => response.json())
        .then(data => {
            let html = `
                <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 15px;">
                        <h2 style="color: #fff;">Категорія: <span style="color: #00c6ff;">${data.categoryName}</span></h2>
                        <button class="hero-btn" onclick="loadCatalog(event)">⬅ Повернутися до каталогу</button>
                    </div>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
            `;

            data.items.forEach(item => {
                // Якщо картинок у тебе ще немає, вони просто не відобразяться, але текст буде!
                html += `
                    <div style="background: #16213e; border-radius: 10px; padding: 15px; width: 300px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">
                        <img src="images/${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/300x200?text=No+Image'" style="max-width: 100%; height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 15px;">
                        <h3 style="font-size: 18px; margin-bottom: 10px; color: #fff;">${item.name}</h3>
                        <p style="font-size: 14px; color: #aaa; margin-bottom: 15px;">${item.description}</p>
                        <div style="font-size: 20px; font-weight: bold; color: #00c6ff;">${item.price}</div>
                    </div>`;
            });

            html += `</div></div>`;
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error('Помилка завантаження товарів:', error));
}

// 3. Випадкова категорія (Specials)
function loadSpecials(event) {
    if (event) event.preventDefault();

    fetch('categories.json')
        .then(response => response.json())
        .then(categories => {
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex].shortname;
            loadCategoryItems(randomCategory);
        })
        .catch(error => console.error('Помилка завантаження Specials:', error));
}
