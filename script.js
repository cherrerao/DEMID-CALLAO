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
});