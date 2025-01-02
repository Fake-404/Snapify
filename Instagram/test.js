import { createCanvas, registerFont } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register custom font
const fontPath = path.join(__dirname, 'Digital Regular.ttf');
registerFont(fontPath, { family: 'Digital Regular' });

/**
 * Generate an image buffer for the "System Uptime" design.
 * @param {Object} uptime - The uptime data.
 * @param {number} uptime.days - Number of days.
 * @param {number} uptime.hours - Number of hours.
 * @param {number} uptime.minutes - Number of minutes.
 * @param {number} uptime.seconds - Number of seconds.
 * @returns {Buffer} - The generated image buffer.
 */
export async function generateUptimeImage(uptime) {
  const { days, hours, minutes, seconds } = uptime;

  // Canvas setup
  const width = 1200;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  // Title text
  ctx.fillStyle = '#00ffff';
  ctx.font = '40px "Courier New"';
  ctx.textAlign = 'center';
  ctx.fillText('SYSTEM UPTIME...', width / 2, 80);

  // Time format: 12 34 56 78
  const formattedTime = `${String(days).padStart(2, '0')} ${String(hours).padStart(2, '0')} ${String(minutes).padStart(2, '0')} ${String(seconds).padStart(2, '0')}`;

  // Set font and measure text
  ctx.font = '220px "Digital Regular"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle'; // Align text vertically

  // Center the text in the middle of the canvas
  ctx.fillText(formattedTime, width / 2, height / 2);

  // Lower labels: DAYS, HOURS, MINUTES, SECONDS
  const labels = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
  const timeSegments = [days, hours, minutes, seconds];
  const offsetX = -400; // Adjust this value to shift all labels to the left
  const segmentPadding = 150; // Spacing between each number and label
  ctx.font = '30px "Courier New"';
  ctx.textAlign = 'center';

  timeSegments.forEach((_, index) => {
    const segmentX = width / 2 + offsetX + index * (150 + segmentPadding);
    ctx.fillText(labels[index], segmentX, height / 2 + 120); // Place labels below the numbers
  });

  // Return the image buffer
  return canvas.toBuffer();
}
