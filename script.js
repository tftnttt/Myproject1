document.addEventListener("DOMContentLoaded", function () {
    // === Слайдер ===
    let slides = document.querySelector(".slides");
    let totalSlides = document.querySelectorAll(".slide").length;
    let currentIndex = 0;
    const slideInterval = 5000; // 5 секунд

    function nextSlide() {
        if (!slides) return;
        currentIndex = (currentIndex + 1) % totalSlides;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.style.transition = "transform 0.5s ease-in-out";
    }

    setInterval(nextSlide, slideInterval);

    // === Анимация для иконок категорий ===
    let categoryIcons = document.querySelectorAll(".category-icons img");
    categoryIcons.forEach(icon => {
        icon.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "transform 0.3s ease";
        });
        icon.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });

    // === Меню категорий (фикс скролла вверх) ===
    let menuIcon = document.querySelector(".menu-icon");
    let categoryMenu = document.getElementById("category-menu");

    if (menuIcon && categoryMenu) {
        menuIcon.addEventListener("click", function (event) {
            event.preventDefault(); 
            event.stopPropagation(); 
            categoryMenu.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (!menuIcon.contains(event.target) && !categoryMenu.contains(event.target)) {
                categoryMenu.classList.remove("active");
            }
        });
    }

    // === Стрелка раскрытия иконок категорий ===
    const toggleArrow = document.getElementById("toggle-arrow");
    const categoryIconsContainer = document.getElementById("category-icons");

    if (toggleArrow && categoryIconsContainer) {
        toggleArrow.addEventListener("click", function (event) {
            event.preventDefault(); 
            categoryIconsContainer.classList.toggle("active");
            toggleArrow.classList.toggle("active");
        });
    }

    // === ГЕОЛОКАЦИЯ ЧЕРЕЗ БРАУЗЕР (Geolocation API) ===
    let ubicacionElemento = document.getElementById("ubicacion");
    if (!ubicacionElemento) return;

    if (!navigator.geolocation) {
        console.log(" Geolocalización no soportada por el navegador");
        ubicacionElemento.textContent = "Geolocalización no soportada";
        return;
    }

    ubicacionElemento.textContent = "Tu ciudad";

    navigator.geolocation.getCurrentPosition(
        async function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            console.log(" Coordenadas obtenidas:", lat, lon);

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=es`);
                const data = await response.json();
                console.log(" Datos recibidos:", data);

                let ciudad = data.address.city || data.address.town || data.address.village || "Tu ciudad";
                ubicacionElemento.textContent = ciudad;
            } catch (error) {
                console.error(" Error al obtener la ciudad:", error);
                ubicacionElemento.textContent = "Error al obtener ubicación";
            }
        },
        function (error) {
            console.error(" Error de geolocalización:", error);
            let mensaje = "Ubicación no disponible";
            if (error.code === 1) mensaje = "Tu ciudad";
            if (error.code === 2) mensaje = "Tu ciudad";
            if (error.code === 3) mensaje = "Tu ciudad";
            ubicacionElemento.textContent = mensaje;
        }
    );

    // === ЗАГРУЗКА ТОВАРОВ ===
    fetch("http://localhost:5000/api/products") //  ЗАПРОС НА СЕРВЕР
        .then(response => {
            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
            return response.json();
        })
        .then(products => {
            console.log(" Datos recibidos:", products);
            const container = document.getElementById("products-container");
            if (!container) return;

            container.innerHTML = ""; // Очистка перед загрузкой

            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-card");

                productElement.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Цена: $${product.price}</p>
                    <img src="${product.image_url}" alt="${product.name}" width="150">
                    <hr>
                `;

                container.appendChild(productElement);
            });
        })
        .catch(error => console.error(" Ошибка загрузки товаров:", error));
});
