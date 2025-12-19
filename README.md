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
