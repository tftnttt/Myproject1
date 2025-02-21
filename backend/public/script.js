document.addEventListener("DOMContentLoaded", function () {
    // === Слайдер ===
    let slides = document.querySelector(".slides");
    let totalSlides = document.querySelectorAll(".slide").length;
    let currentIndex = 0;
    const slideInterval = 5000;

    function nextSlide() {
        if (!slides) return;
        currentIndex = (currentIndex + 1) % totalSlides;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.style.transition = "transform 0.5s ease-in-out";
    }

    setInterval(nextSlide, slideInterval);

    // === Меню категорий ===
    let menuIcon = document.querySelector(".menu-icon");
    let categoryMenu = document.getElementById("category-menu");

    if (menuIcon && categoryMenu) {
        menuIcon.addEventListener("click", function (event) {
            event.preventDefault();
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

    // === ГЕОЛОКАЦИЯ ===
    let ubicacionElemento = document.getElementById("ubicacion");
    if (ubicacionElemento && navigator.geolocation) {
        ubicacionElemento.textContent = "Tu ciudad";

        navigator.geolocation.getCurrentPosition(
            async function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=es`);
                    const data = await response.json();
                    let ciudad = data.address?.city || data.address?.town || data.address?.village || "Tu ciudad";
                    ubicacionElemento.textContent = ciudad;
                } catch (error) {
                    ubicacionElemento.textContent = "Error al obtener ubicación";
                }
            },
            function () {
                ubicacionElemento.textContent = "Ubicación no disponible";
            }
        );
    }

    // === ЗАГРУЗКА ТОВАРОВ ===
    fetch("https://myproject1-55yu.onrender.com/api/products")
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("products-container");
            if (!container) return;
            container.innerHTML = "";
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-card");
                productElement.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Precio: $${product.price}</p>
                    <img src="${product.image_url}" alt="${product.name}" width="150">
                    <hr>
                `;
                container.appendChild(productElement);
            });
        })
        .catch(() => console.error("❌ Ошибка загрузки товаров"));

    // === МОДАЛЬНЫЕ ОКНА (ВХОД И РЕГИСТРАЦИЯ) ===
    const openLoginButton = document.getElementById("open-login");
    const modalLogin = document.getElementById("modal-login");
    const modalRegister = document.getElementById("modal-register");
    const closeLogin = modalLogin?.querySelector(".close");
    const closeRegister = modalRegister?.querySelector(".close");
    const openRegisterButton = document.getElementById("open-register");

    function openModal(modal) {
        closeAllModals();
        if (modal) {
            modal.style.display = "flex";
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = "none";
        }
    }

    function closeAllModals() {
        closeModal(modalLogin);
        closeModal(modalRegister);
    }

    // Открытие окна входа
    openLoginButton?.addEventListener("click", function (event) {
        event.preventDefault();
        openModal(modalLogin);
    });

    // Переключение на регистрацию
    openRegisterButton?.addEventListener("click", function () {
        closeModal(modalLogin);
        openModal(modalRegister);
    });

    // Закрытие окон по кнопке "X"
    closeLogin?.addEventListener("click", function () {
        closeModal(modalLogin);
    });

    closeRegister?.addEventListener("click", function () {
        closeModal(modalRegister);
    });

    // Закрытие окон при клике вне их области
    window.addEventListener("click", function (event) {
        if (event.target === modalLogin) {
            closeModal(modalLogin);
        }
        if (event.target === modalRegister) {
            closeModal(modalRegister);
        }
    });
});
