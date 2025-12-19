// --- DETECCIÓN DE ENTORNO ---
// Si estamos en localhost o 127.0.0.1, usamos las claves directas.
// Si estamos en Vercel (producción), usamos el proxy seguro /api/
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// --- CLAVES LOCALES (Solo se usan en tu PC) ---
const LOCAL_NEWS_KEY = 'pub_fca7b9fbbd6e4a4786e3640c3bcfb934';
const LOCAL_TMDB_KEY = '4db6a1af7622fc599f807c5f3f105b33';

// --- CONFIGURACIÓN ---
const NEWS_BASE_URL = 'https://newsdata.io/api/1/news';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p/w500';

// Imágenes de respaldo
const FALLBACK_IMGS = [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800'
];

// --- TRADUCCIONES ---
const TRANSLATIONS = {
    es: {
        nav: { technology: '💻 Tecnología', movies: '🎬 Cine', business: '📈 Negocios', sports: '⚽ Deportes', health: '🏥 Salud', science: '🚀 Ciencia', entertainment: '📺 Farándula' },
        searchPlaceholder: 'Buscar noticia o película...',
        readMore: 'Leer más',
        viewDetails: 'Ver ficha',
        loadMore: 'CARGAR MÁS DATOS',
        back: 'Volver al listado',
        error: 'No se encontraron resultados.',
        sourceMsg: 'Acceder a fuente original'
    },
    en: {
        nav: { technology: '💻 Technology', movies: '🎬 Movies', business: '📈 Business', sports: '⚽ Sports', health: '🏥 Health', science: '🚀 Science', entertainment: '📺 Entertainment' },
        searchPlaceholder: 'Search news or movies...',
        readMore: 'Read more',
        viewDetails: 'View details',
        loadMore: 'LOAD MORE DATA',
        back: 'Back to list',
        error: 'No results found.',
        sourceMsg: 'Access original source'
    },
    pt: {
        nav: { technology: '💻 Tecnologia', movies: '🎬 Cinema', business: '📈 Negócios', sports: '⚽ Esportes', health: '🏥 Saúde', science: '🚀 Ciência', entertainment: '📺 Entretenimento' },
        searchPlaceholder: 'Buscar notícias ou filmes...',
        readMore: 'Ler mais',
        viewDetails: 'Ver detalhes',
        loadMore: 'CARREGAR MAIS DADOS',
        back: 'Voltar',
        error: 'Nenhum resultado encontrado.',
        sourceMsg: 'Ver na fonte original'
    },
    fr: {
        nav: { technology: '💻 Technologie', movies: '🎬 Cinéma', business: '📈 Affaires', sports: '⚽ Sports', health: '🏥 Santé', science: '🚀 Science', entertainment: '📺 Divertissement' },
        searchPlaceholder: 'Rechercher...',
        readMore: 'Lire la suite',
        viewDetails: 'Voir détails',
        loadMore: 'CHARGER PLUS',
        back: 'Retour',
        error: 'Aucun résultat trouvé.',
        sourceMsg: 'Voir la source originale'
    }
};

let state = {
    mode: 'news', 
    articles: [], 
    seenTitles: new Set(),
    seenMovieIds: new Set(),
    newsPageToken: null, 
    tmdbPage: 1, 
    currentCategory: 'technology',
    movieFilter: 'now_playing',
    currentQuery: null,
    lang: 'es'
};

window.app = {
    init: function() {
        console.log(`Modo: ${IS_LOCAL ? '🏠 LOCAL (Claves Directas)' : '🚀 PRODUCCIÓN (Secure API)'}`);
        
        document.getElementById('themeToggle').addEventListener('click', () => {
            const html = document.documentElement;
            html.setAttribute('data-bs-theme', html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
        });
        this.setLanguage('es');
    },

    setLanguage: function(lang) {
        state.lang = lang;
        document.getElementById('current-lang-label').textContent = lang.toUpperCase();
        
        const t = TRANSLATIONS[lang];
        document.getElementById('search-input').placeholder = t.searchPlaceholder;
        
        const menu = document.getElementById('category-menu');
        menu.innerHTML = '';
        Object.keys(t.nav).forEach(cat => {
            const isActive = (state.mode === 'news' && state.currentCategory === cat) || (state.mode === 'movies' && cat === 'movies') ? 'active' : '';
            menu.innerHTML += `<li class="nav-item"><a class="nav-link ${isActive}" href="#" onclick="window.app.route('${cat}')">${t.nav[cat]}</a></li>`;
        });

        if (state.mode === 'movies') this.fetchMovies();
        else this.fetchNews();
    },

    route: function(category) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.getElementById('news-container').innerHTML = `<div class="d-flex justify-content-center py-5"><div class="spinner-border text-info"></div></div>`;
        document.getElementById('pagination-wrapper').classList.add('d-none');
        
        state.currentQuery = null;
        state.articles = [];
        state.seenTitles.clear();
        state.seenMovieIds.clear();

        if (category === 'movies') {
            state.mode = 'movies';
            state.tmdbPage = 1;
            document.getElementById('movie-filters-container').classList.remove('d-none'); 
            this.fetchMovies();
        } else {
            state.mode = 'news';
            state.currentCategory = category;
            state.newsPageToken = null;
            document.getElementById('movie-filters-container').classList.add('d-none'); 
            this.fetchNews();
        }
    },

    filterMovies: function(filter) {
        state.movieFilter = filter;
        state.tmdbPage = 1;
        state.articles = [];
        state.seenMovieIds.clear();
        document.getElementById('news-container').innerHTML = `<div class="d-flex justify-content-center py-5"><div class="spinner-border text-info"></div></div>`;
        this.fetchMovies();
    },

    search: function(q) {
        if(!q) return;
        state.currentQuery = q;
        state.articles = [];
        state.seenTitles.clear();
        state.seenMovieIds.clear();
        state.tmdbPage = 1;
        state.newsPageToken = null;
        document.getElementById('news-container').innerHTML = `<div class="text-center py-5">Scanning Database...</div>`;
        document.getElementById('pagination-wrapper').classList.add('d-none');

        if (state.mode === 'movies') this.fetchMovies();
        else this.fetchNews();
    },

    nextPage: function() {
        const btn = document.getElementById('btn-load-more');
        btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        btn.disabled = true;

        if (state.mode === 'movies') {
            state.tmdbPage++;
            this.fetchMovies(true);
        } else {
            this.fetchNews(true);
        }
    },

    // --- FETCH NOTICIAS (Híbrido) ---
    fetchNews: async function(append = false) {
        let url;

        if (IS_LOCAL) {
            // MODO LOCAL: Usamos URL directa de NewsData
            url = `${NEWS_BASE_URL}?apikey=${LOCAL_NEWS_KEY}&language=${state.lang}`;
            if (state.currentQuery) url += `&q=${encodeURIComponent(state.currentQuery)}`;
            else url += `&category=${state.currentCategory}`;
            if (state.newsPageToken) url += `&page=${state.newsPageToken}`;
        } else {
            // MODO PRODUCCIÓN: Usamos nuestro proxy /api/news
            url = `/api/news?language=${state.lang}`;
            if (state.currentQuery) url += `&q=${encodeURIComponent(state.currentQuery)}`;
            else url += `&category=${state.currentCategory}`;
            if (state.newsPageToken) url += `&page=${state.newsPageToken}`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            
            if (data.status !== 'success' && !data.results) throw new Error("API Error");

            state.newsPageToken = data.nextPage;
            const startIndex = state.articles.length;
            const newItems = [];
            
            data.results.forEach(art => {
                const cleanTitle = art.title.trim().toLowerCase();
                if (state.seenTitles.has(cleanTitle)) return;
                state.seenTitles.add(cleanTitle);
                
                newItems.push({
                    title: art.title,
                    desc: art.description,
                    img: art.image_url,
                    source: art.source_id,
                    date: art.pubDate,
                    link: art.link,
                    content: art.content,
                    rating: null 
                });
            });

            state.articles = [...state.articles, ...newItems];
            this.render(newItems, startIndex, append, 'news');

        } catch (e) {
            console.error(e);
            if(!append) document.getElementById('news-container').innerHTML = `<h3 class="text-center mt-5">${TRANSLATIONS[state.lang].error}</h3>`;
        } finally { this.resetBtn(); }
    },

    // --- FETCH CINE (Híbrido) ---
    fetchMovies: async function(append = false) {
        const langMap = { es: 'es-ES', en: 'en-US', pt: 'pt-BR', fr: 'fr-FR' };
        const tmdbLang = langMap[state.lang] || 'es-ES';
        let url;

        if (IS_LOCAL) {
            // MODO LOCAL: Usamos URL directa de TMDB
            let endpoint = state.currentQuery ? 'search/movie' : `movie/${state.movieFilter}`;
            url = `${TMDB_BASE_URL}/${endpoint}?api_key=${LOCAL_TMDB_KEY}&language=${tmdbLang}&page=${state.tmdbPage}`;
            if(state.currentQuery) url += `&query=${encodeURIComponent(state.currentQuery)}`;
        } else {
            // MODO PRODUCCIÓN: Usamos nuestro proxy /api/cinema
            let endpoint = state.currentQuery ? 'search' : state.movieFilter;
            url = `/api/cinema?endpoint=${endpoint}&language=${state.lang}&page=${state.tmdbPage}`;
            if(state.currentQuery) url += `&query=${encodeURIComponent(state.currentQuery)}`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            const startIndex = state.articles.length;
            const newItems = [];

            if (data.results) {
                data.results.forEach(movie => {
                    if (state.seenMovieIds.has(movie.id)) return;
                    state.seenMovieIds.add(movie.id);

                    newItems.push({
                        id: movie.id,
                        title: movie.title,
                        desc: movie.overview,
                        img: movie.poster_path ? `${TMDB_IMG_BASE}${movie.poster_path}` : null,
                        source: 'TMDB',
                        date: movie.release_date,
                        link: `https://www.themoviedb.org/movie/${movie.id}`,
                        content: movie.overview,
                        rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
                    });
                });
            }

            state.articles = [...state.articles, ...newItems];
            this.render(newItems, startIndex, append, 'movies');

        } catch (e) {
            console.error(e);
            if(!append) document.getElementById('news-container').innerHTML = `<h3 class="text-center mt-5">${TRANSLATIONS[state.lang].error}</h3>`;
        } finally { this.resetBtn(); }
    },

    render: function(items, startIndex, append, type) {
        const container = document.getElementById('news-container');
        const pagination = document.getElementById('pagination-wrapper');
        const t = TRANSLATIONS[state.lang];
        const fallback = () => FALLBACK_IMGS[Math.floor(Math.random() * FALLBACK_IMGS.length)];

        if (items.length === 0) {
            if(!append) container.innerHTML = `<h3 class="text-center mt-5">${t.error}</h3>`;
            return;
        }

        pagination.classList.remove('d-none');

        let html = '';
        if (!append) {
            const title = state.currentQuery ? `SEARCH: "${state.currentQuery}"` : (type === 'movies' ? t.nav.movies : t.nav[state.currentCategory]);
            html += `<h2 class="mb-4 text-uppercase border-start border-4 border-info ps-3">${title}</h2><div class="row g-4" id="content-grid">`;
        }

        const cards = items.map((item, i) => {
            const globalIndex = state.articles.indexOf(item); 
            const imgUrl = item.img || fallback();
            const date = item.date ? new Date(item.date).toLocaleDateString() : '';
            const btnText = type === 'movies' ? t.viewDetails : t.readMore;
            const badge = item.rating ? `<div class="movie-rating"><i class="fas fa-star"></i> ${item.rating}</div>` : '';

            return `
            <div class="col-md-6 col-lg-3 news-col">
                <article class="news-card" onclick="window.app.openDetail(${globalIndex})">
                    <div class="img-wrapper">
                        <img src="${imgUrl}" alt="Img" loading="lazy" onerror="this.onerror=null;this.src='${fallback()}'">
                        ${badge}
                    </div>
                    <div class="card-body">
                        <div class="news-meta d-flex justify-content-between">
                            <span>${item.source}</span>
                            <span class="fw-normal text-muted small">${date}</span>
                        </div>
                        <h3 class="news-title">${item.title}</h3>
                        <p class="news-desc">${item.desc || ''}</p>
                        <button class="btn action-btn">${btnText}</button>
                    </div>
                </article>
            </div>`;
        }).join('');

        if (append) document.getElementById('content-grid').insertAdjacentHTML('beforeend', cards);
        else {
            html += cards + `</div>`;
            container.innerHTML = html;
        }
    },

    openDetail: function(index) {
        const item = state.articles[index];
        const container = document.getElementById('news-container');
        document.getElementById('pagination-wrapper').classList.add('d-none');
        const t = TRANSLATIONS[state.lang];
        const fallback = () => FALLBACK_IMGS[Math.floor(Math.random() * FALLBACK_IMGS.length)];

        container.innerHTML = `
            <div class="fade-in">
                <button class="btn btn-outline-secondary mb-4" onclick="window.app.goBack()">
                    <i class="fas fa-arrow-left me-2"></i> ${t.back}
                </button>
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <span class="badge bg-info text-dark mb-2">${state.mode === 'movies' ? 'CINE' : 'NEWS'}</span>
                        <h1 class="display-5 fw-bold mb-3">${item.title}</h1>
                        <div class="text-muted border-bottom pb-3 mb-4">
                            <i class="fas fa-calendar"></i> ${item.date || ''} &nbsp;|&nbsp; 
                            <i class="fas fa-link"></i> ${item.source}
                            ${item.rating ? `&nbsp;|&nbsp; <i class="fas fa-star text-warning"></i> <strong>${item.rating}</strong>/10` : ''}
                        </div>
                        <img src="${item.img || fallback()}" class="img-fluid rounded-3 w-100 mb-4 shadow" 
                             style="max-height:600px; object-fit:cover; object-position: top center;"
                             onerror="this.onerror=null;this.src='${fallback()}'">
                        <div class="detail-content bg-body-tertiary p-4 rounded-3 border border-dark-subtle">
                            <p class="lead fw-bold text-info">${item.desc || ''}</p>
                            <hr>
                            <p>${item.content || item.desc}</p>
                        </div>
                        <div class="d-grid gap-2 mt-4">
                            <a href="${item.link}" target="_blank" class="btn btn-lg btn-cyber">
                                ${t.sourceMsg} <i class="fas fa-external-link-alt ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
        window.scrollTo(0,0);
    },

    goBack: function() {
        if(state.mode === 'movies') this.route('movies');
        else this.route(state.currentCategory);
    },

    resetBtn: function() {
        const btn = document.getElementById('btn-load-more');
        if(btn) {
            btn.innerHTML = `${TRANSLATIONS[state.lang].loadMore} <i class="fas fa-arrow-down ms-2"></i>`;
            btn.disabled = false;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => window.app.init());