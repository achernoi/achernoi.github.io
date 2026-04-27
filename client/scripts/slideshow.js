let images = [
  { url: "images/garden.png" },
  { url: "images/strawberry.png" },
  { url: "images/beets.png" },
  { url: "images/cucumbers.png" },
  { url: "images/lettuce.png" },
  { url: "images/peppers.png" },
  { url: "images/tomatos.png" }
];

let currentIndex = 0;
let intervalId = null;
let isPlaying = false;

const imgEl = document.getElementById("plantImage");
const counterEl = document.getElementById("counter");
const loadingEl = document.getElementById("loading");

function updateUI() {
  if (!images.length) return;

  imgEl.src = images[currentIndex].url;
  counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
}

window.addEventListener("DOMContentLoaded", () => {
  loadingEl.style.display = "none";
  imgEl.style.display = "block";

  updateUI();
});

function nextImage() {
  currentIndex = Math.min(currentIndex + 1, images.length - 1);
  updateUI();
}

function prevImage() {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateUI();
}

function firstImage() {
  currentIndex = 0;
  updateUI();
}

function lastImage() {
  currentIndex = images.length - 1;
  updateUI();
}

function stopSlideshow() {
  isPlaying = false;
  clearInterval(intervalId);
}

function playSlideshow() {
  if (isPlaying) return;
  isPlaying = true;

  intervalId = setInterval(() => {
    if (currentIndex >= images.length - 1) {
      stopSlideshow();
      return;
    }
    nextImage();
  }, 5000);
}
