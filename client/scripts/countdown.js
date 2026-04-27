const timerEl = document.getElementById("timer");

const lunarCycle = 29.53 * 24 * 60 * 60 * 1000;

const knownFullMoon = new Date("2026-04-01T00:00:00").getTime();

function getNextFullMoon() {
  const now = new Date().getTime();

  let cycles = Math.ceil((now - knownFullMoon) / lunarCycle);
  let nextMoon = knownFullMoon + cycles * lunarCycle;

  return nextMoon;
}

let targetDate = getNextFullMoon();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    targetDate = getNextFullMoon();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();