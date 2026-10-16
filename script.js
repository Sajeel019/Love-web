const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const buttonArea = document.getElementById('button-area');
const hint = document.getElementById('hint');
const video = document.getElementById('love-video');
const videoPlaceholder = document.getElementById('video-placeholder');
const againBtn = document.getElementById('again-btn');

const playfulMessages = [
  'Oops, you missed! Try again 😜',
  'That button is a little shy 🙈',
  'Are you sure? Think one more time 💗',
  'Hehe… the answer might be YES! 🥹',
  'You can run, but love will find you 💞'
];
let noAttempts = 0;

function moveNoButton() {
  const area = buttonArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  // Keep the button within the visible viewport and near the question.
  const maxX = Math.max(0, Math.min(window.innerWidth - btn.width - 24, area.left + area.width - btn.width));
  const minX = Math.max(12, Math.min(area.left, maxX));
  const maxY = Math.max(12, Math.min(window.innerHeight - btn.height - 12, area.bottom + 90));
  const minY = Math.max(12, Math.min(area.top - 15, maxY));
  noBtn.style.position = 'fixed';
  noBtn.style.left = `${minX + Math.random() * Math.max(0, maxX - minX)}px`;
  noBtn.style.top = `${minY + Math.random() * Math.max(0, maxY - minY)}px`;
  hint.textContent = playfulMessages[noAttempts % playfulMessages.length];
  noAttempts++;
}

noBtn.addEventListener('pointerenter', moveNoButton);
noBtn.addEventListener('click', (event) => {
  event.preventDefault();
  moveNoButton();
});
noBtn.addEventListener('touchstart', (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

yesBtn.addEventListener('click', () => {
  questionScreen.classList.remove('active');
  resultScreen.classList.add('active');
  noBtn.style.position = '';
  launchConfettiHearts();
  // Show the placeholder only when the optional video file is missing.
  video.addEventListener('error', () => {
    video.style.display = 'none';
    videoPlaceholder.style.display = 'flex';
  }, { once: true });
  video.addEventListener('loadeddata', () => {
    videoPlaceholder.style.display = 'none';
    video.style.display = 'block';
    video.play().catch(() => {});
  }, { once: true });
  video.load();
});

againBtn.addEventListener('click', () => {
  resultScreen.classList.remove('active');
  questionScreen.classList.add('active');
  hint.textContent = 'Choose wisely 😉';
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
  video.pause();
  video.currentTime = 0;
});

function makeFloatingHeart() {
  const holder = document.querySelector('.floating-hearts');
  const heart = document.createElement('span');
  heart.className = 'float-heart';
  heart.textContent = ['♥', '♡', '💗', '💕'][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 22}px`;
  const duration = 5 + Math.random() * 6;
  heart.style.animationDuration = `${duration}s`;
  holder.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(makeFloatingHeart, 650);

function launchConfettiHearts() {
  for (let i = 0; i < 24; i++) {
    setTimeout(makeFloatingHeart, i * 65);
  }
}
