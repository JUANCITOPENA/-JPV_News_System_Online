<div align="center">

  <img src="https://img.shields.io/badge/JPV-NEWS-00f3ff?style=for-the-badge&logo=rss&logoColor=black" alt="JPV News Logo" />
  
  <h1>⚡ JPV News & Cinema | Cyberpunk Edition</h1>
  
  <p>
    <strong>Una Single Page Application (SPA) moderna, construida con Vanilla JavaScript puro.</strong><br>
    Sin Frameworks. Sin dependencias pesadas. Solo rendimiento y diseño.
  </p>

  <p>
    <a href="https://vercel.com">
      <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel" alt="Vercel">
    </a>
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square" alt="Version">
  </p>

  <p>
    <a href="#-descripción">Descripción</a> •
    <a href="#-tecnologías">Tecnologías</a> •
    <a href="#-instalación">Instalación</a> •
    <a href="#-arquitectura">Arquitectura</a> •
    <a href="#-roadmap">Roadmap</a>
  </p>
</div>

---

## 📖 Descripción

**JPV News & Cinema** es un agregador de contenido en tiempo real que fusiona la actualidad global con el mundo del entretenimiento. 

Diseñado bajo una estética **Cyberpunk / Futurista**, este proyecto desafía la norma actual de "usar React para todo", demostrando cómo construir una arquitectura robusta, escalable y modular utilizando únicamente **JavaScript ES6+ nativo**.

### 🌟 Características Principales

*   **⚡ Arquitectura SPA (Single Page Application):** Navegación fluida sin recargas de página, gestionada por un Router artesanal en JS.
*   **🔌 Integración Doble API:** Consolida datos de **NewsData.io** (Noticias) y **TMDB** (Cine) en una interfaz unificada.
*   **🌐 Internacionalización (i18n):** Soporte completo para 4 idiomas (Español, Inglés, Portugués, Francés) con recarga dinámica de contenido.
*   **🎨 UI Cyberpunk & Responsiva:** Diseño fluido (95% width), bordes animados con gradientes cónicos, modo oscuro nativo y Bootstrap 5 personalizado.
*   **🛡️ Seguridad Serverless:** Implementación de arquitectura híbrida. Usa claves locales en desarrollo y **Vercel Serverless Functions** en producción para proteger las API Keys.
*   **🧠 Algoritmos Inteligentes:** Sistema de deduplicación de noticias y normalización de datos heterogéneos (Noticias vs Películas).

---

## 🛠 Tecnologías

Este proyecto demuestra dominio sobre los fundamentos de la web moderna:

| Área | Tecnologías |
| :--- | :--- |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white) |
| **Backend** | ![Nodejs](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) (Vercel Serverless Functions) |
| **APIs** | ![NewsAPI](https://img.shields.io/badge/NewsData.io-FC4C02?style=flat-square) ![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white) |
| **Tools** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white) |

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para desplegar el proyecto en tu máquina local.

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/jpv-news.git
cd jpv-news
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (este archivo es ignorado por Git por seguridad):
```ini
# .env
NEWS_API_KEY=tu_clave_de_newsdata_io
TMDB_API_KEY=tu_clave_de_tmdb
```

**Nota:** El archivo `script.js` contiene una lógica híbrida. Si estás en localhost, usará claves de respaldo internas. Si despliegas en Vercel, usará las variables de entorno del servidor.

### 3. Ejecutar en Local

Debido a las políticas de CORS y Módulos, no puedes abrir el `index.html` directamente.

- **Opción A (VS Code):** Instala la extensión "Live Server", haz clic derecho en `index.html` y elige "Open with Live Server".
- **Opción B (Python):** `python -m http.server 8000`

---

## 📂 Arquitectura del Proyecto
```
/jpv-news
│
├── api/                  # Backend (Serverless Functions)
│   ├── news.js           # Proxy seguro para noticias
│   └── cinema.js         # Proxy seguro para TMDB
│
├── index.html            # Estructura Semántica (SEO Friendly)
├── style.css             # Estilos Cyberpunk & Animaciones
├── script.js             # Lógica: Router, Fetching, State Management
├── .env                  # Secretos (No subir a repo)
└── README.md             # Documentación
```

---

## 🧠 ¿Qué se aprende con este proyecto?

Este desarrollo va más allá de un simple "Hola Mundo". Aborda conceptos de ingeniería de software:

- **Patrón Adapter:** Normalización de datos provenientes de dos fuentes distintas (Noticias y Cine) para que encajen en una misma interfaz de UI (`render()`).
- **State Management Artesanal:** Gestión de un estado global (`state` object) sin usar Redux o Context API.
- **Seguridad en Frontend:** Cómo ocultar API Keys utilizando Proxies Serverless en Vercel para evitar robos de credenciales.
- **Optimización de Rendimiento:** Uso de lazy-loading, paginación basada en tokens y manejo de errores (fallback images).
- **UX/UI Avanzado:** Feedback visual al usuario (Loaders, Spinners, Animaciones CSS).

---

## 🔮 Roadmap y Mejoras Futuras

Estamos comprometidos con la mejora continua. Aquí algunas ideas para la versión 2.0:

- **PWA (Progressive Web App):** Hacerla instalable en móviles y con soporte offline.
- **IA Summaries:** Integrar OpenAI para generar resúmenes de noticias en 3 puntos clave.
- **Favoritos:** Usar `localStorage` para guardar noticias para leer después.
- **Social Share:** API nativa del navegador para compartir contenido en redes.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes una idea para mejorar el diseño Cyberpunk o añadir una nueva API:

1. Haz un Fork del proyecto.
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`).
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

<div align="center">

<p>Desarrollado con 💻 y ☕ por <strong>Juancito Peña</strong></p>

<p>
  <a href="https://github.com/tu-usuario" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://linkedin.com/in/tu-usuario" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

</div>
