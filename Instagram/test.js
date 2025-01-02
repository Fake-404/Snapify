import { createCanvas } from 'canvas';

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

  // Time sections
  const labels = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
  const values = [days, hours, minutes, seconds];
  const sectionWidth = width / values.length;

  values.forEach((value, index) => {
    const x = sectionWidth * index + sectionWidth / 2;

    // Number text
    ctx.font = '120px "Courier New"';
    ctx.fillText(String(value).padStart(2, '0'), x, 200);

    // Label text
    ctx.font = '30px "Courier New"';
    ctx.fillText(labels[index], x, 300);
  });

  // Return the image buffer
  return canvas.toBuffer();
}
