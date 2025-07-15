// Aquí puedes agregar cualquier script JavaScript necesario

document.addEventListener('DOMContentLoaded', function() {
    // --- Carrusel hero slider moderno ---
    const sliderImgs = document.querySelectorAll('.hero-slider-carrusel .slider-img');
    const leftBtn = document.querySelector('.slider-arrow-left');
    const rightBtn = document.querySelector('.slider-arrow-right');
    let sliderIndex = 1; // la imagen central

    function updateSlider() {
      sliderImgs.forEach((img, i) => {
        img.classList.remove('slider-img-left', 'slider-img-center', 'slider-img-right');
      });
      const total = sliderImgs.length;
      const left = (sliderIndex - 1 + total) % total;
      const center = sliderIndex;
      const right = (sliderIndex + 1) % total;
      sliderImgs[left].classList.add('slider-img-left');
      sliderImgs[center].classList.add('slider-img-center');
      sliderImgs[right].classList.add('slider-img-right');
    }

    leftBtn.addEventListener('click', () => {
      sliderIndex = (sliderIndex - 1 + sliderImgs.length) % sliderImgs.length;
      updateSlider();
    });
    rightBtn.addEventListener('click', () => {
      sliderIndex = (sliderIndex + 1) % sliderImgs.length;
      updateSlider();
    });

    setInterval(() => {
      sliderIndex = (sliderIndex + 1) % sliderImgs.length;
      updateSlider();
    }, 4000);

    updateSlider();

    // Botón de "Volver al inicio"
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.textContent = 'Volver al inicio';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mostrar el botón de "Volver al inicio" al desplazarse hacia abajo
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Inicialmente ocultar el botón de "Volver al inicio"
    backToTopButton.style.display = 'none';

    // Función para cargar noticias dinámicamente desde un API
    async function loadNews() {
        const newsList = document.getElementById('news-list');
        try {
            const response = await fetch('https://api.saludcallao.gob.pe/noticias');
            const noticias = await response.json();

            // Limpiar la lista antes de agregar nuevas noticias
            newsList.innerHTML = '';

            // Generar elementos de la lista con los datos obtenidos
            noticias.forEach(noticia => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = noticia.enlace;
                a.target = '_blank';
                a.textContent = noticia.titulo;
                li.appendChild(a);
                newsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error al cargar las noticias:', error);
            newsList.innerHTML = '<li>No se pudieron cargar las noticias en este momento.</li>';
        }
    }

    // Cargar noticias al cargar la página
    loadNews();

    // Obtener el modal
    var modal = document.getElementById("nosotros-modal");

    // Obtener el enlace que abre el modal
    var link = document.getElementById("nosotros-link");

    // Obtener el elemento <span> que cierra el modal
    var span = document.getElementsByClassName("close")[0];

    // Cuando el usuario haga clic en el enlace, abre el modal
    link.onclick = function() {
        modal.style.display = "block";
    }

    // Cuando el usuario haga clic en <span> (x), cierra el modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Cuando el usuario haga clic en cualquier lugar fuera del modal, cierra el modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Código JavaScript para manejar eventos o interacciones
    const newsList = document.getElementById('news-list');

    // Simulación de carga de noticias
    const newsItems = [
        'Noticia 1: Actualización sobre la distribución de medicamentos.',
        'Noticia 2: Nuevas normativas para establecimientos farmacéuticos.',
        'Noticia 3: Capacitación para el personal de salud.'
    ];

    newsItems.forEach(news => {
        const li = document.createElement('li');
        li.textContent = news;
        newsList.appendChild(li);
    });

    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Redirigir al enlace de Google Drive al hacer clic en "Manuales SISMED"
    document.getElementById('manuales-sismed-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://drive.google.com/drive/u/0/folders/1JrpQUfleNj7cBqK4qwfgTtBDn5F8z8ic';
    });

    // Revisar cada 30 segundos
    setInterval(verificarActualizacion, 30000);

    // Llamar a la función al cargar la página
    verificarActualizacion();

    // --- ANIMACIÓN DE ENTRADA DE SECCIONES AL HACER SCROLL ---
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.hero-modern, .card-section, .icon-section, .logos-section, .main-footer');
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- ANIMACIÓN DE TÍTULO (ESCRITURA) ---
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.classList.add('animated-title');
    }

    // --- BOTÓN FLOTANTE MEJORADO ---
    const backToTopButton2 = document.getElementById('back-to-top');
    if (backToTopButton2) {
        backToTopButton2.innerHTML = '↑';
    }
});

async function cargarEstado() {
    try {
        // Ruta relativa al archivo JSON
        const response = await fetch('https://drive.google.com/uc?export=download&id=1CmjYPtAr3at1e31TxdnQ-6EfjA9-sKxe');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo estado.json');
        }

        // Leer el contenido del archivo JSON
        const data = await response.json();

        // Actualizar el contenido en el mensaje flotante
        const mensajeFlotante = document.getElementById('mensaje-flotante');
        if (mensajeFlotante) {
            const mensaje = data.mensaje || 'Mensaje no disponible';
            const fecha = data.ultima_actualizacion || 'Fecha no disponible';

            // Crear contenido del mensaje flotante
            mensajeFlotante.innerHTML = `
                <span>${mensaje} (Última actualización: ${fecha})</span>
                <button class="close-btn" onclick="document.getElementById('mensaje-flotante').classList.add('hidden')">×</button>
            `;
            mensajeFlotante.classList.remove('hidden'); // Mostrar el mensaje
        }
    } catch (error) {
        console.error('Error al cargar el estado:', error);
    }
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarEstado);

