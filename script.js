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

// Saludo dinámico según la hora
(function() {
    const saludo = document.getElementById('saludo-ici');
    const hora = new Date().getHours();
    let texto = "¡Buenos días!";
    if (hora >= 12 && hora < 18) texto = "¡Buenas tardes!";
    else if (hora >= 18 || hora < 6) texto = "¡Buenas noches!";
    saludo.textContent = texto;
})();

// --- VISUALIZAR EXCEL "CAPACIDAD INSTALADA - FINAL.xlsx" EN TABLA ---
 function cargarExcel() {
            fetch('CAPACIDAD_INSTALADAFINAL.xlsx')
                .then(response => response.arrayBuffer())
                .then(data => {
                    let workbook = XLSX.read(data, { type: 'array' });
                    let sheet = workbook.Sheets[workbook.SheetNames[0]];
                    let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

                    let tableHeader = document.getElementById("table-header");
                    let tableBody = document.getElementById("table-body");

                    tableHeader.innerHTML = "";
                    tableBody.innerHTML = "";

                    // Encuentra la fila que contiene los encabezados reales
                    let headerIndex = jsonData.findIndex(row => row.includes("RED"));
                    if (headerIndex === -1) {
                        console.error("No se encontró la fila de encabezados en el archivo Excel.");
                        return;
                    }

                    // Usa la fila de encabezados reales
                    let headers = jsonData[headerIndex];
                    headers.forEach(header => {
                        let th = document.createElement("th");
                        th.textContent = header;
                        th.classList.add("center"); // Centra todas las cabeceras
                        tableHeader.appendChild(th);
                    });

                    // Procesa las filas de datos (después de los encabezados)
                    jsonData.slice(headerIndex + 1).forEach(row => {
                        let tr = document.createElement("tr");
                        row.forEach((cell, index) => {
                            let td = document.createElement("td");
                            td.textContent = cell;

                            // Aplica la clase 'left' solo al contenido de la columna "DESCRIPCION"
                            if (headers[index].toLowerCase() === "ESTABLECIMIENTO") {
                                td.classList.add("left");
                            } else {
                                td.classList.add("center");
                            }

                            tr.appendChild(td);
                        });
                        tableBody.appendChild(tr);
                    });
                })
                .catch(error => console.error("Error al cargar el archivo Excel:", error));
        }
document.addEventListener('DOMContentLoaded', function() {
    cargarExcelCapacidad();
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

