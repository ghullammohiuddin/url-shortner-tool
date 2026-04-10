import express from 'express';
import { generateNewShortUrl, getOriginalUrl, getUrlAnalytics } from '../controllers/url.controller.js';
const router = express.Router();


router.post('/generate-short-url', generateNewShortUrl);
router.get('/:shortId', getOriginalUrl);
router.get('/analytics/:shortId', getUrlAnalytics);
export default router;