
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const againBtn = document.getElementById("again-btn");
const video = document.getElementById("love-video");
const placeholder = document.getElementById("video-placeholder");
const hint = document.getElementById("hint");

yesBtn.addEventListener("click", function () {
  questionScreen.classList.remove("active");
  resultScreen.classList.add("active");

  video.style.display = "block";
  placeholder.style.display = "flex";
  video.load();
});

video.addEventListener("error", function () {
  video.style.display = "none";
  placeholder.style.display = "flex";
});

video.addEventListener("loadeddata", function () {
  placeholder.style.display = "none";
  video.style.display = "block";
  video.play().catch(() => {});
});

noBtn.addEventListener("click", function () {
  hint.textContent = "Hehe! Are you sure? Try YES! 💗";
  noBtn.style.position = "relative";
  noBtn.style.transform =
    `translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px)`;
});

againBtn.addEventListener("click", function () {
  resultScreen.classList.remove("active");
  questionScreen.classList.add("active");
  video.pause();
  video.currentTime = 0;
  noBtn.style.transform = "";
  noBtn.style.position = "";
  hint.textContent = "Choose wisely 😉";
});

function createHeart() {
  const holder = document.querySelector(".floating-hearts");
  if (!holder) return;

  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = "♥";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 14 + Math.random() * 22 + "px";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  holder.appendChild(heart);

  setTimeout(() => heart.remove(), 11000);
}

setInterval(createHeart, 700);

