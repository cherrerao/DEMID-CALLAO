// Aquí puedes agregar cualquier script JavaScript necesario
document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de imágenes
    const images = [
        'IMAGENES/IMAGEN_1.jpg',
        'IMAGENES/IMAGEN_2.jpg', // Añade más rutas de imágenes aquí
        'IMAGENES/IMAGEN_3.jpg'
    ];
    let currentIndex = 0;
    const carouselImage = document.getElementById('carousel-image');

    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        carouselImage.src = images[currentIndex];
    }

    setInterval(changeImage, 3000); // Cambia la imagen cada 3 segundos

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
});