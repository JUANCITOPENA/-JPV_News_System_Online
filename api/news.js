export default async function handler(req, res) {
    const apiKey = process.env.NEWS_API_KEY;
    const baseUrl = 'https://newsdata.io/api/1/news';

    // Obtener parámetros que envía el frontend (idioma, pagina, categoria, busqueda)
    const { language, category, q, page } = req.query;

    let url = `${baseUrl}?apikey=${apiKey}&language=${language || 'es'}`;
    
    if (q) url += `&q=${encodeURIComponent(q)}`;
    else if (category) url += `&category=${category}`;
    
    if (page) url += `&page=${page}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching news' });
    }
}