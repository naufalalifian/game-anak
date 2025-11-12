// 🐾 Data Hewan
const animals = [
  { name: "Kucing", image: "fotoku/kucing.png", options: ["Kucing", "Anjing", "Gajah"] },
  { name: "Anjing", image: "fotoku/anjing.png", options: ["Sapi", "Anjing", "Kuda"] },
  { name: "Gajah", image: "fotoku/gajah.png", options: ["Kucing", "Gajah", "Sapi"] },
  { name: "Sapi", image: "fotoku/sapi.png", options: ["Kuda", "Gajah", "Sapi"] },
  { name: "Kuda", image: "fotoku/kuda.png", options: ["Anjing", "Kuda", "Kucing"] },
];

let current = 0;
let score = 0;
let answeredCorrect = false;

const img = document.getElementById("animal-img");
const optionsDiv = document.getElementById("options");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");

// Landing Page Start
const startBtn = document.getElementById("start-btn");
const landingPage = document.querySelector(".landing-page");
const gameContainer = document.querySelector(".game-container");
startBtn.onclick = () => {
  landingPage.style.display = "none";
  gameContainer.style.display = "block";
  loadAnimal();
};

// 🌿 Generate rumput
document.addEventListener("DOMContentLoaded", function() {
  const grassContainer = document.querySelector(".grass");
  grassContainer.innerHTML = "";
  for (let i = 0; i < 60; i++) {
    const blade = document.createElement("span");
    blade.style.height = `${80 + Math.random() * 70}px`;
    blade.style.width = `${4 + Math.random() * 2}px`;
    blade.style.left = Math.random() * 100 + "%";
    blade.style.animationDuration = `${1.5 + Math.random()}s`;
    blade.style.animationDelay = `${Math.random() * 2}s`;
    grassContainer.appendChild(blade);
  }
});

function loadAnimal() {
  answeredCorrect = false;
  nextBtn.disabled = true;
  result.textContent = "";
  const animal = animals[current];
  img.src = animal.image;
  optionsDiv.innerHTML = "";
  animal.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => handleOptionClick(btn, opt, animal.name);
    optionsDiv.appendChild(btn);
  });
}

function handleOptionClick(buttonElement, selected, correct) {
  if (answeredCorrect) return;
  if (selected === correct) {
    answeredCorrect = true;
    result.textContent = "✅ Hebat! Jawabanmu benar!";
    result.style.color = "green";
    score++;
    scoreEl.textContent = "Skor: " + score;
    buttonElement.style.backgroundColor = "#8ee78e";
    buttonElement.style.transform = "scale(1.03)";
    nextBtn.disabled = false;
    playSound(correct);
  } else {
    result.textContent = "❌ Yah, coba lagi ya!";
    result.style.color = "red";
    buttonElement.style.animation = "shake 0.3s";
    setTimeout(() => { buttonElement.style.animation = ""; }, 300);
  }
}

function playSound(name) {
  const path = "fotoku/" + name.toLowerCase() + ".mp3";
  const sound = new Audio(path);
  sound.play().catch(() => {});
}

nextBtn.onclick = () => {
  if (!answeredCorrect) return;
  current++;
  if (current >= animals.length) {
    result.textContent = "🎉 Selamat! Kamu sudah menebak semua hewan!";
    result.style.color = "blue";
    current = 0;
    score = 0;
    scoreEl.textContent = "Skor: 0";
    nextBtn.disabled = true;
    return;
  }
  loadAnimal();
};

restartBtn.onclick = () => {
  current = 0;
  score = 0;
  scoreEl.textContent = "Skor: 0";
  result.textContent = "";
  loadAnimal();
};
