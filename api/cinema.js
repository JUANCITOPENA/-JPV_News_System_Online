export default async function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = 'https://api.themoviedb.org/3';

    // Parámetros del frontend
    const { endpoint, language, page, query } = req.query;

    // Mapeo simple de idioma (es -> es-ES)
    const langMap = { es: 'es-ES', en: 'en-US', pt: 'pt-BR', fr: 'fr-FR' };
    const tmdbLang = langMap[language] || 'es-ES';

    let url = '';

    // Si es búsqueda
    if (endpoint === 'search') {
        url = `${baseUrl}/search/movie?api_key=${apiKey}&language=${tmdbLang}&page=${page}&query=${encodeURIComponent(query)}`;
    } else {
        // Si es filtro (popular, now_playing...)
        url = `${baseUrl}/movie/${endpoint}?api_key=${apiKey}&language=${tmdbLang}&page=${page}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movies' });
    }
}