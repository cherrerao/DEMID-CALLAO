document.addEventListener('DOMContentLoaded', function() {
    // Mensaje de bienvenida
    alert('Bienvenido a los Enlaces Útiles para el Sector Salud - Power BI');

    // Efecto de hover en las imágenes
    const images = document.querySelectorAll('.float-image');
    images.forEach(image => {
        image.addEventListener('mouseover', function() {
            image.style.transform = 'scale(1.1)';
            image.style.transition = 'transform 0.3s';
        });
        image.addEventListener('mouseout', function() {
            image.style.transform = 'scale(1)';
        });
    });

    // Animación simple al cargar la página
    const header = document.querySelector('header');
    header.style.opacity = 0;
    header.style.transition = 'opacity 2s';
    setTimeout(() => {
        header.style.opacity = 1;
    }, 500);

    // Efecto de parpadeo en el texto del encabezado
    const headerText = document.querySelector('header h1');
    setInterval(() => {
        headerText.style.opacity = (headerText.style.opacity == 1 ? 0.5 : 1);
    }, 1000);

    // Mensaje emergente al hacer clic en los enlaces
    const links = document.querySelectorAll('.link-item a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            alert('Estás a punto de salir del sitio para ver el reporte en Power BI');
        });
    });

    // Botón de "Volver al inicio"
    const backToTopButton = document.getElementById('back-to-top');
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Botón de "Cambiar Tema"
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Efecto de desvanecimiento en las secciones al desplazarse
    const container = document.querySelector('.container');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                container.classList.add('visible');
            }
        });
    });
    observer.observe(container);

    // Contador de visitas
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    alert(`Esta es tu visita número ${visitCount}`);
});