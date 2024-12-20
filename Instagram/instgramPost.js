import { createCanvas, registerFont, loadImage } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register custom font
const fontPath = path.join(__dirname, '../Fonts', 'Rokkitt-Regular.ttf');
registerFont(fontPath, { family: 'Rokkitt' });

const emojiPath = path.join(__dirname, '../Fonts', 'NotoColorEmoji-Regular.ttf');
registerFont(emojiPath, { family: 'Noto Color Emoji' });

const likePng = (value) => path.join(__dirname, 'Assets', value ? 'liked.png' : 'like.png');
const savePng = (value) => path.join(__dirname, 'Assets', value ? 'saved.png' : 'save.png');
const commentPng = path.join(__dirname, 'Assets', 'comment.png');
const sharePng = path.join(__dirname, 'Assets', 'share.png');
const verifiedPng = path.join(__dirname, 'Assets', 'verified.png');
  
export default class InstagramPost {

  constructor() {
    this.following = false;
    this.verified = false;
    this.pfp = 'https://avatars.githubusercontent.com/u/121213527?v=4';
    this.username = 'PikaBotz';
    this.watermark = false;
    this.saved = false;
    this.likes = 0;
    this.comments = 0;
    this.shares = 0;
    this.caption = '';
    this.ago = '1 year ago';
    this.liked = false;
    this.dark = true;
    this.imageUrl = 'https://avatars.githubusercontent.com/u/121213527?v=4';
  }

  isFollowing(value) {
    if (typeof value === 'boolean') this.following = value;
    return this;
  }

  isVerified(value) {
    if (typeof value === 'boolean') this.verified = value;
    return this;
  }

  setPfp(url) {
    this.pfp = url;
    return this;
  }

  setUsername(name) {
    this.username = name;
    return this;
  }

  setWatermark(text) {
    this.watermark = text;
    return this;
  }

  isSaved(value) {
    if (typeof value === 'boolean') this.saved = value;
    return this;
  }

  setLikes(count) {
    this.likes = count;
    return this;
  }

  setComments(count) {
    this.comments = count;
    return this;
  }

  setShares(count) {
    this.shares = count;
    return this;
  }

  setCaption(caption) {
    this.caption = caption;
    return this;
  }

  setAgo(time) {
    this.ago = time;
    return this;
  }

  isLiked(value) {
    if (typeof value === 'boolean') this.liked = value;
    return this;
  }

  isDark(value) {
    if (typeof value === 'boolean') this.dark = value;
    return this;
  }

  setImage(value) {
    this.imageUrl = value;
    return this;
  }

  async buildCanvas() {
    const width = 400;
    const height = 540;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Header
    const headerHeight = 60;
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(0, 0, width, headerHeight);

    // Profile Picture with gradient border
    const profilePicSize = 44;
    const profilePicX = 10;
    const profilePicY = 8;
    const gradient = ctx.createLinearGradient(0, 0, profilePicSize, profilePicSize);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.14, 'orange');
    gradient.addColorStop(0.28, 'yellow');
    gradient.addColorStop(0.42, 'green');
    gradient.addColorStop(0.57, 'blue');
    gradient.addColorStop(0.71, 'indigo');
    gradient.addColorStop(0.85, 'violet');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(profilePicX + profilePicSize / 2, profilePicY + profilePicSize / 2, profilePicSize / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1c1c1c';
    ctx.beginPath();
    ctx.arc(profilePicX + profilePicSize / 2, profilePicY + profilePicSize / 2, (profilePicSize - 4) / 2, 0, Math.PI * 2);
    ctx.fill();

    // Load Profile Picture
    const profileImage = await loadImage(this.pfp);
    ctx.save();
    ctx.beginPath();
    ctx.arc(profilePicX + profilePicSize / 2, profilePicY + profilePicSize / 2, (profilePicSize - 8) / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(profileImage, profilePicX + 4, profilePicY + 2, profilePicSize - 8, profilePicSize - 8);
    ctx.restore();

    ctx.font = 'bold 18px Rokkitt'; // Increase font size and make it bold
ctx.fillStyle = '#fff'; // White text color

// Optional: Add a stroke for extra boldness
ctx.strokeStyle = '#000'; // Black outline for contrast
ctx.lineWidth = 2; // Thickness of the outline
ctx.strokeText(this.username, profilePicX + profilePicSize + 10, profilePicY + 19); // Draw the outline

// Fill the text
ctx.fillText(this.username, profilePicX + profilePicSize + 10, profilePicY + 19);
    
    if (this.verified) {
    const verifiedImage = await loadImage(verifiedPng); // Replace with the path to your heart PNG image
const verifiedX = profilePicX + profilePicSize + 72; // X position of the heart image
const verifiedY = profilePicY + 6; // Y position of the heart image
const verifiedSize = 15; // Size of the heart image
    
// Draw the heart image
ctx.drawImage(verifiedImage, verifiedX, verifiedY, verifiedSize, verifiedSize);
    }
    if (this.watermark) {
    ctx.font = '12px Rokkitt';
    ctx.fillStyle = '#888';
    ctx.fillText(this.watermark, profilePicX + profilePicSize + 10, profilePicY + 32);
    }

    // Follow Button
const buttonWidth = 60;
const buttonHeight = 20;
const buttonX = width - 100; // Move square 10px to the left
const buttonY = profilePicY + 9;
const cornerRadius = 5; // Radius for rounded corners

// Draw the rounded rectangle
ctx.beginPath();
ctx.moveTo(buttonX + cornerRadius, buttonY); // Top-left corner
ctx.lineTo(buttonX + buttonWidth - cornerRadius, buttonY); // Top edge
ctx.quadraticCurveTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + cornerRadius); // Top-right corner
ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - cornerRadius); // Right edge
ctx.quadraticCurveTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX + buttonWidth - cornerRadius, buttonY + buttonHeight); // Bottom-right corner
ctx.lineTo(buttonX + cornerRadius, buttonY + buttonHeight); // Bottom edge
ctx.quadraticCurveTo(buttonX, buttonY + buttonHeight, buttonX, buttonY + buttonHeight - cornerRadius); // Bottom-left corner
ctx.lineTo(buttonX, buttonY + cornerRadius); // Left edge
ctx.quadraticCurveTo(buttonX, buttonY, buttonX + cornerRadius, buttonY); // Top-left corner
ctx.closePath();

// Style the button
ctx.strokeStyle = '#fff';
ctx.lineWidth = 1;
ctx.stroke();

// Set the text
const buttonText = this.following ? 'Following' : 'Follow';
ctx.font = '12px Rokkitt';
ctx.fillStyle = '#fff';

// Measure text width for centering
const textWidth = ctx.measureText(buttonText).width;
const textX = buttonX + (buttonWidth - textWidth) / 2; // Center text horizontally
const textY = buttonY + (buttonHeight + 12) / 2 - 2; // Center text vertically (fine-tuned)

// Draw the text
ctx.fillText(buttonText, textX, textY);

// Save the current state of the context
ctx.save();
    
    /*
    // Follow Button
const buttonWidth = 60;
const buttonHeight = 20;
const buttonX = width - 100; // Move square 10px to the left
const buttonY = profilePicY + 9;

// Draw the button rectangle
ctx.fillStyle = '#fff';
ctx.strokeStyle = '#fff';
ctx.lineWidth = 1;
ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);

// Set the text
const buttonText = this.following ? 'Following' : 'Follow';
ctx.font = '12px Rokkitt';
ctx.fillStyle = '#fff';

// Measure text width for centering
const textWidth = ctx.measureText(buttonText).width;
const textX = buttonX + (buttonWidth - textWidth) / 2; // Center text horizontally
const textY = buttonY + ((buttonHeight + 12) / 2) - 2; // Center text vertically (approx.)

// Draw the text
ctx.fillText(buttonText, textX, textY);
    
    // Save the current state of the context
ctx.save();
*/
// Move the canvas origin to the position of the three dots
ctx.translate(width - 25, profilePicY + 13);

// Rotate the canvas by 90 degrees (clockwise)
ctx.rotate(Math.PI / 2);

// Draw the three dots at the new origin (0, 0) because the rotation applies to the origin
ctx.font = '18px Rokkitt';
ctx.fillStyle = '#fff';
ctx.fillText('•••', 0, 0);

// Restore the context to its original state
ctx.restore();

    /*
    // Options Dots
    ctx.font = '18px Rokkitt';
    ctx.fillStyle = '#fff';
    ctx.fillText('•••', width - 25, profilePicY + 25);
*/
    
    // Post Image
    const postImage = await loadImage(this.imageUrl);
    ctx.drawImage(postImage, 0, headerHeight, width, 400);

    // Footer
    const footerY = headerHeight + 400;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, footerY, width, height - footerY);

    // --- LIKE ICON (Heart PNG) ---
// Canvas dimensions and other setup code remains unchanged

// Inside the buildCanvas method...

// --- LIKE ICON (Heart PNG) ---
const heartImage = await loadImage(likePng(this.liked)); // Replace with the path to your heart PNG image
const heartX = 10; // X position of the heart image
const heartY = footerY + 10; // Y position of the heart image
const heartSize = 30; // Size of the heart image

// Draw the heart image
ctx.drawImage(heartImage, heartX, heartY, heartSize, heartSize);

// --- LIKE COUNT (Next to the heart) ---
ctx.font = '20px Rokkitt'; // Font style for like count
ctx.fillStyle = '#fff'; // Text color (white)
const likeCount = this.likes; // Replace with the actual like count
ctx.fillText(likeCount, heartX + heartSize - 3, heartY + 20); // Position the like count to the right of the heart

// Caption and Time...
    
const commentImage = await loadImage(commentPng); // Replace with the path to your heart PNG image
const commentX = 75; // X position of the heart image
const commentY = footerY + 14; // Y position of the heart image
const commentSize = 20; // Size of the heart image

// Draw the heart image
ctx.drawImage(commentImage, commentX, commentY, commentSize, commentSize);

// --- LIKE COUNT (Next to the heart) ---
ctx.font = '20px Rokkitt'; // Font style for like count
ctx.fillStyle = '#fff'; // Text color (white)
const commentCount = this.comments; // Replace with the actual like count
ctx.fillText(commentCount, commentX + commentSize + 3, commentY + 16);


    const shareImage = await loadImage(sharePng); // Replace with the path to your heart PNG image
const shareX = 130; // X position of the heart image
const shareY = footerY + 14; // Y position of the heart image
const shareSize = 18; // Size of the heart image

// Draw the heart image
ctx.drawImage(shareImage, shareX, shareY, shareSize, shareSize);

// --- LIKE COUNT (Next to the heart) ---
ctx.font = '20px Rokkitt'; // Font style for like count
ctx.fillStyle = '#fff'; // Text color (white)
const shareCount = this.shares; // Replace with the actual like count
ctx.fillText(shareCount, shareX + shareSize + 3, shareY + 16);



    const saveImage = await loadImage(savePng(this.saved)); // Replace with the path to your heart PNG image
const saveX = 365; // X position of the heart image
const saveY = footerY + 14; // Y position of the heart image
const saveSize = 20; // Size of the heart image

// Draw the heart image
ctx.drawImage(saveImage, saveX, saveY, saveSize, saveSize);

    // Caption
    ctx.font = 'bold 15px Rokkitt';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.username, 10, footerY + 55);

    ctx.font = '14px "Rokkitt", "Noto Color Emoji"';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.caption, 70, footerY + 55);

    // Time
    ctx.font = '12px Rokkitt';
    ctx.fillStyle = '#888';
    ctx.fillText(this.ago, 10, footerY + 75);

    // Save to file or return buffer
    const buffer = canvas.toBuffer();
    return buffer;
  }
}
