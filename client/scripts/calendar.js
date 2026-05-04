// 🌿 Gardening data by month
const gardenCalendar = {
  January: "Plan your garden and order seeds 🌱",
  February: "Start seeds indoors 🌿",
  March: "Plant cool-season crops (lettuce, kale) 🌱",
  April: "Start planting vegetables outside 🌼",
  May: "Great time for tomatoes and peppers 🍅",
  June: "Water regularly and maintain plants 💧",
  July: "Harvest early crops 🌾",
  August: "Plant fall vegetables 🌿",
  September: "Harvest and prepare soil 🍂",
  October: "Plant garlic and cover crops 🧄",
  November: "Clean garden beds 🧹",
  December: "Rest and plan for next year ❄️"
};

// 🌱 Get current month
const months = Object.keys(gardenCalendar);
const currentMonthIndex = new Date().getMonth();

const monthEl = document.getElementById("month");
const tipEl = document.getElementById("tip");

let index = currentMonthIndex;

// 🌿 Update display
function updateCalendar() {
  const month = months[index];
  monthEl.textContent = month;
  tipEl.textContent = gardenCalendar[month];
}

// 🌼 Navigation
function nextMonth() {
  index = (index + 1) % 12;
  updateCalendar();
}

function prevMonth() {
  index = (index - 1 + 12) % 12;
  updateCalendar();
}

// 🌱 Init
window.addEventListener("DOMContentLoaded", () => {
  updateCalendar();

  document.getElementById("nextBtn").addEventListener("click", nextMonth);
  document.getElementById("prevBtn").addEventListener("click", prevMonth);
});