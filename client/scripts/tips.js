const openBtn = document.getElementById("openPopup");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closePopup");
const textElement = document.getElementById("randomText");

const messages = [
  "Water plants early in the morning 🌅",
  "Use compost to improve soil 🌿",
  "Give plants enough sunlight ☀️",
  "Don’t overwater your plants 💧",
  "Mulch helps retain moisture 🍂",
  "Rotate crops each season 🌱",
  "Healthy soil = healthy plants 🌼"
  ];

  // Function to get random message
  function getRandomMessage() {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
  }

  // Open popup + set random text
  openBtn.addEventListener("click", () => {
    textElement.textContent = getRandomMessage();
    overlay.style.display = "block";
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });