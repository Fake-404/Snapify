import express from 'express';
import { generateUptimeImage } from '../Instagram/test.js';

const router = express.Router();

router.use('/', async (req, res) => {
  try {
    // Example uptime data
    const uptimeData = { days: 2, hours: 30, minutes: 56, seconds: 0 };

    // Generate the image buffer
    const imageBuffer = await generateUptimeImage(uptimeData);

    // Set headers and send the image
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error generating uptime image:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
