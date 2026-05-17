import express from 'express';
import { generateNewShortUrl, getUrlAnalytics } from '../controllers/url.controller.js';
const router = express.Router();


router.post('/generate-short-url', generateNewShortUrl);
router.get('/analytics/:shortId', getUrlAnalytics);

export default router;