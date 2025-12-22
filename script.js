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
        // Reset all images to default state
        img.style.opacity = '0.2';
        img.style.filter = 'blur(4px) grayscale(90%)';
        img.style.transform = 'scale(1)';
        img.style.zIndex = '1';
      });
      
      const total = sliderImgs.length;
      if (total === 0) return;
      
      // Center image - 3D effect with floating animation
      const center = sliderIndex;
      sliderImgs[center].classList.add('slider-img-center');
      sliderImgs[center].style.opacity = '1';
      sliderImgs[center].style.filter = 'none';
      sliderImgs[center].style.transform = 'rotateY(0deg) translateZ(100px) scale(1.1)';
      sliderImgs[center].style.zIndex = '3';
      
      // Left and right images - 3D side effects
      if (total > 1) {
        const left = (sliderIndex - 1 + total) % total;
        const right = (sliderIndex + 1) % total;
        
        sliderImgs[left].classList.add('slider-img-left');
        sliderImgs[left].style.opacity = '0.4';
        sliderImgs[left].style.filter = 'blur(1px) grayscale(60%)';
        sliderImgs[left].style.transform = 'rotateY(25deg) translateZ(20px) scale(0.8)';
        sliderImgs[left].style.zIndex = '2';
        
        sliderImgs[right].classList.add('slider-img-right');
        sliderImgs[right].style.opacity = '0.4';
        sliderImgs[right].style.filter = 'blur(1px) grayscale(60%)';
        sliderImgs[right].style.transform = 'rotateY(-25deg) translateZ(20px) scale(0.8)';
        sliderImgs[right].style.zIndex = '2';
      }
      
      // Hide other images if there are more than 3
      sliderImgs.forEach((img, i) => {
        if (i !== center && i !== (sliderIndex - 1 + total) % total && i !== (sliderIndex + 1) % total) {
          img.style.opacity = '0.1';
          img.style.filter = 'blur(5px) grayscale(95%)';
          img.style.transform = 'scale(0.7)';
          img.style.zIndex = '0';
        }
      });
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
        const revealElements = document.querySelectorAll('.servicios-section, .about-section, .quicklinks-section, .contact-section, .footer-main');
        const windowHeight = window.innerHeight;
        revealElements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.style.animation = `slideInFromLeft 0.8s ease-out ${index * 0.2}s both`;
                el.style.opacity = '1';
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- EFECTOS DE PARALLAX ---
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-blur, .servicios-section::before');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    window.addEventListener('scroll', parallaxScroll);

    // --- MICRO-INTERACCIONES ---
    function addMicroInteractions() {
        // Efecto magnetic en botones
        const buttons = document.querySelectorAll('.btn-hero-main, .quicklink-btn, .btn-ir-cronograma');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0) scale(1)';
            });
        });

        // Efecto ripple en clics
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-hero-main, .quicklink-btn, .btn-ir-cronograma')) {
                const ripple = document.createElement('span');
                const rect = e.target.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                e.target.style.position = 'relative';
                e.target.style.overflow = 'hidden';
                e.target.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }
    addMicroInteractions();

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

async function cargarExcel() {
      try {
        const response = await fetch("CAPACIDAD.xlsx");
        const data = await response.arrayBuffer();

        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Buscar encabezados (RED, ESTABLECIMIENTO, etc.)
        let headerIndex = jsonData.findIndex(row =>
          row.some(cell =>
            ["REDES", "ESTABLECIMIENTO"].includes(cell?.toString().trim().toUpperCase())
          )
        );

        if (headerIndex === -1) {
          alert("No se encontraron encabezados (RED o ESTABLECIMIENTO)");
          return;
        }

        const headers = jsonData[headerIndex].map(h => h?.toString().trim() || "");
        const rows = jsonData.slice(headerIndex + 1);

        let thead = document.getElementById("table-header");
        let tbody = document.getElementById("table-body");
        thead.innerHTML = "";
        tbody.innerHTML = "";

        headers.forEach(headerText => {
          let th = document.createElement("th");
          th.textContent = headerText;
          thead.appendChild(th);
        });

        rows.forEach(row => {
          let tr = document.createElement("tr");
          headers.forEach((_, i) => {
            let td = document.createElement("td");
            td.textContent = row[i] !== undefined ? row[i] : "";
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
      } catch (error) {
        console.error("Error cargando Excel:", error);
      }
    }

    document.addEventListener("DOMContentLoaded", cargarExcel);

document.addEventListener('DOMContentLoaded', function() {
    cargarExcel();
});




function filtrarTabla() {
    const input = document.getElementById("search-input");
    const filter = input.value.toLowerCase();
    const tableBody = document.getElementById("table-body");
    const rows = tableBody.getElementsByTagName("tr");

    for (let row of rows) {
        let cells = row.getElementsByTagName("td");
        let match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filter));
        row.style.display = match ? "" : "none";
    }
}

// Mostrar video de transferencia
function mostrarVideoTransferencia(videoFile) {
    const modal = document.getElementById('modal-video-transferencia');
    const video = document.getElementById('modal-video');
    const source = document.getElementById('modal-video-source');
    const title = document.getElementById('modal-video-title');

    // Título dinámico según el video
    if (videoFile === 'transferencia_centros.mp4') {
        title.textContent = 'Ejemplo: Transferencia entre Centros';
    } else {
        title.textContent = 'Ejemplo: Cierre y Envío de ICI Mensual';
    }

    source.src = 'IMAGENES/' + videoFile;
    video.load();
    modal.style.display = 'flex';
}

// Ocultar barra flotante después de 12 segundos
setTimeout(function() {
    const barra = document.querySelector('.mensaje-flotante-transferencia');
    if (barra) barra.classList.add('oculto');
}, 12000);

// Mostrar notas flotantes
function mostrarNotasFlotantes() {
    document.getElementById('nota-transferencia').style.display = 'flex';
    document.getElementById('nota-ici').style.display = 'flex';
    document.getElementById('aviso-nuevo').style.display = 'none';
}

// Oculta los avisos flotantes después de 20 segundos
setTimeout(function() {
    const aviso1 = document.getElementById('nota-transferencia');
    const aviso2 = document.getElementById('nota-ici');
    if (aviso1) aviso1.style.display = 'none';
    if (aviso2) aviso2.style.display = 'none';
}, 20000); // 20000 ms = 20 segundos


/* --- Script navideño: generar copos de nieve decorativos --- */
(function() {
    function createSnowflakes(count) {
        const container = document.getElementById('snow-container') || createSnowContainer();
        for (let i = 0; i < count; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.textContent = '❄';

            const size = Math.floor(Math.random() * 14) + 8; // 8px - 22px
            const left = Math.random() * 100; // vw
            const duration = (Math.random() * 10) + 8; // 8s - 18s
            const delay = -(Math.random() * 10); // negative so some already falling on load
            const opacity = 0.6 + Math.random() * 0.4;

            flake.style.fontSize = size + 'px';
            flake.style.left = left + 'vw';
            flake.style.opacity = opacity;
            flake.style.animationName = 'snow-fall';
            flake.style.animationDuration = duration + 's';
            flake.style.animationDelay = delay + 's';
            flake.style.willChange = 'transform, top, opacity';

            // small variation classes
            if (duration > 13) flake.classList.add('slow'); else flake.classList.add('fast');

            container.appendChild(flake);
        }
    }

    function createSnowContainer() {
        const c = document.createElement('div');
        c.id = 'snow-container';
        c.setAttribute('aria-hidden', 'true');
        document.body.appendChild(c);
        return c;
    }

    function initChristmas() {
        // menos copos en móviles
        const count = window.matchMedia('(max-width: 480px)').matches ? 30 : 70;
        createSnowflakes(count);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initChristmas, 300);
    } else {
        window.addEventListener('DOMContentLoaded', function() { setTimeout(initChristmas, 300); });
    }
})();

