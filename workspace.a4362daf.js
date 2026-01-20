const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const duckFrames = [
  [
    '0000011111100000',
    '0000111111110000',
    '0001111111111000',
    '0011111111111100',
    '0011110110111100',
    '0011111111111100',
    '0011111111111100',
    '0001111111111000',
    '0001111111111000',
    '0011111111111100',
    '0111111111111110',
    '0111111111111110',
    '0011111001111100',
    '0001110000111000',
    '0000110000110000',
    '0000110000110000'
  ],
  [
    '0000011111100000',
    '0000111111110000',
    '0001111111111000',
    '0111111111111110',
    '1111110110111111',
    '0111111111111110',
    '0011111111111100',
    '0001111111111000',
    '0001111111111000',
    '0011111111111100',
    '0111111111111110',
    '0111111111111110',
    '0011110001111100',
    '0001100000011000',
    '0001100000011000',
    '0000000000000000'
  ],
  [
    '0000001111110000',
    '0000011111111000',
    '0000111111111100',
    '0001111111111100',
    '0001111011011100',
    '0001111111111100',
    '0001111111111100',
    '0000111111111000',
    '0001111111111100',
    '0011111111111110',
    '0111111111111110',
    '0111111111111100',
    '0011111001111000',
    '0001110000110000',
    '0001100001100000',
    '0000000000000000'
  ],
  [
    '0000011111100000',
    '0000111111110000',
    '0001111111111000',
    '0011111111111100',
    '0011110110111100',
    '0011111111111100',
    '0111111111111110',
    '1111111111111111',
    '0111111111111110',
    '0011111111111100',
    '0001111111111000',
    '0001111111111000',
    '0011110001111100',
    '0011000000001100',
    '0110000000000110',
    '0110000000000110'
  ]
];

let currentFrame = 0;
let frameTime = 0;
const frameDelay = 150;
let lastTime = Date.now();

let bgColor = '#FFB6C1';
let speed = 1;

function drawDuck(x, y, frame) {
  const pixelSize = 4;
  const frameData = duckFrames[frame];
  
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const pixel = frameData[row][col];
      
      if (pixel === '1') {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
        
        if ((row === 4 || row === 5) && (col === 5 || col === 6)) {
          ctx.fillStyle = '#FFA500';
          ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
        }
        
        if (row === 4 && col === 9) {
          ctx.fillStyle = '#000';
          ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }
}

function animate() {
  const currentTime = Date.now();
  const deltaTime = currentTime - lastTime;
  
  frameTime += deltaTime * speed;
  
  if (frameTime >= frameDelay) {
    currentFrame = (currentFrame + 1) % duckFrames.length;
    frameTime = 0;
  }
  
  lastTime = currentTime;
  
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const duckX = canvas.width / 2 - 32;
  const duckY = canvas.height / 2 - 32;
  
  drawDuck(duckX, duckY, currentFrame);
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, canvas.height / 2 + 50, 30, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  requestAnimationFrame(animate);
}

function changeBackground() {
  const colors = ['#FFB6C1', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FFE4B5'];
  bgColor = colors[Math.floor(Math.random() * colors.length)];
}

function changeSpeed() {
  const speeds = [0.5, 1, 1.5, 2, 3];
  const currentIndex = speeds.indexOf(speed);
  speed = speeds[(currentIndex + 1) % speeds.length];
}

animate();