import shortid from 'shortid';
import db from '../database/db.connection.js';
import urlSchema from '../validators/url.validate.js';

const generateNewShortUrl = async (req, res) => {
    try {
        const { error } = urlSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const shortId = shortid.generate();
        const redirectUrl = req.body.redirectUrl;
        await db.execute(`INSERT INTO urls (short_id, redirect_url) VALUES (?, ?)`, [shortId, redirectUrl]);
        return res.render('home', { shortId });
    } catch (error) {
        console.error('Error generating short ID:', error);
        res.status(500).json({ message: 'Error generating short ID', error });
    }
}

const getOriginalUrl = async (req, res) => {
    try {
        const { shortId } = req.params;
        const [result] = await db.execute(`SELECT id, redirect_url FROM urls WHERE short_id = ?`, [shortId]);
        console.log(result);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Short URL not found' });
        }
        await db.execute(`INSERT INTO url_visits (url_id) VALUES (?)`, [result[0].id]);
        console.log(result[0].redirect_url);

        return res.status(302).redirect(result[0].redirect_url);
    } catch (error) {
        console.error('Error fetching original URL:', error);
        res.status(500).json({ message: 'Error fetching original URL', error });
    }
}

const getUrlAnalytics = async (req, res) => {
    try {
        const { shortId } = req.params;
        const [result] = await db.execute(`SELECT id, redirect_url FROM urls WHERE short_id = ?`, [shortId]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Short URL not found' });
        }
        const [visits] = await db.execute(`SELECT COUNT(*) as total_visits FROM url_visits WHERE url_id = ?`, [result[0].id]);
        const [latestVisits] = await db.execute(`SELECT visited_at FROM url_visits WHERE url_id = ? ORDER BY visited_at DESC LIMIT 10`, [result[0].id]);
        return res.status(200).render('analytics', {
            stats: {
                totalVisits: visits[0].total_visits || 0,
                latestVisits: latestVisits
            }
        });


        
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Error fetching analytics', error });
    }
}
export { generateNewShortUrl, getOriginalUrl, getUrlAnalytics };