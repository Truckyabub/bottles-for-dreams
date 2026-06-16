const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", targetId);
  });
});

const cleanupState = {
  score: 0,
  goal: 10,
  spawnTimer: null,
  playfield: document.querySelector("[data-cleanup-playfield]"),
  scoreNode: document.querySelector("[data-cleanup-score]"),
  messageNode: document.querySelector("[data-cleanup-message]"),
  resetButton: document.querySelector('[data-action="reset-cleanup"]'),
  activeBottles: new Set(),
};

const buildState = {
  added: new Set(),
  stage: document.querySelector("[data-build-stage]"),
  messageNode: document.querySelector("[data-build-message]"),
  resetButton: document.querySelector('[data-action="reset-build"]'),
  pieceButtons: Array.from(document.querySelectorAll("[data-piece]")),
};

const meterState = {
  count: 0,
  max: 25,
  trackNode: document.querySelector(".meter-track"),
  fillNode: document.querySelector("[data-meter-fill]"),
  countNode: document.querySelector("[data-meter-count]"),
  messageNode: document.querySelector("[data-meter-message]"),
  resetButton: document.querySelector('[data-action="reset-meter"]'),
  addButton: document.querySelector('[data-action="add-bottle"]'),
  milestoneIndex: 0,
};

const cleanupVictoryMessage = "Great job! You helped clean the community and moved the Ninja Park dream forward.";
const buildVictoryMessage = "The Ninja Park is coming to life - one community effort at a time!";
const meterMessages = [
  "A cleaner path begins.",
  "A playground dream is growing.",
  "The trees are greener.",
  "The kids are climbing higher.",
  "The miracle is almost here.",
];

function setText(node, text) {
  if (node) node.textContent = text;
}

function clearChildren(node) {
  if (!node) return;
  node.replaceChildren();
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createCleanupBottle() {
  if (!cleanupState.playfield) return null;

  const bottle = document.createElement("button");
  bottle.type = "button";
  bottle.className = "cleanup-bottle";
  bottle.setAttribute("aria-label", "Collect this bottle");

  const fieldRect = cleanupState.playfield.getBoundingClientRect();
  const bottleWidth = 30;
  const bottleHeight = 78;
  const maxLeft = Math.max(20, fieldRect.width - bottleWidth - 20);
  const maxTop = Math.max(20, fieldRect.height - bottleHeight - 32);

  bottle.style.left = `${randomBetween(12, maxLeft)}px`;
  bottle.style.top = `${randomBetween(16, maxTop)}px`;
  bottle.style.transform = `rotate(${randomBetween(-18, 18)}deg)`;

  bottle.addEventListener("click", () => collectBottle(bottle));

  cleanupState.activeBottles.add(bottle);
  cleanupState.playfield.appendChild(bottle);
  return bottle;
}

function collectBottle(bottle) {
  if (!bottle || bottle.classList.contains("is-collected")) return;

  bottle.classList.add("is-collected");
  cleanupState.score += 1;
  cleanupState.activeBottles.delete(bottle);
  setText(cleanupState.scoreNode, String(cleanupState.score));

  window.setTimeout(() => bottle.remove(), 220);

  if (cleanupState.score >= cleanupState.goal) {
    setText(cleanupState.messageNode, cleanupVictoryMessage);
    stopCleanupSpawning();
  }
}

function startCleanupSpawning() {
  stopCleanupSpawning();
  if (!cleanupState.playfield) return;

  cleanupState.spawnTimer = window.setInterval(() => {
    if (cleanupState.score >= cleanupState.goal) {
      stopCleanupSpawning();
      return;
    }

    if (cleanupState.activeBottles.size < 7) {
      createCleanupBottle();
    }
  }, 850);
}

function stopCleanupSpawning() {
  if (cleanupState.spawnTimer) {
    window.clearInterval(cleanupState.spawnTimer);
    cleanupState.spawnTimer = null;
  }
}

function resetCleanupGame() {
  cleanupState.score = 0;
  setText(cleanupState.scoreNode, "0");
  setText(cleanupState.messageNode, "");

  cleanupState.activeBottles.forEach((bottle) => bottle.remove());
  cleanupState.activeBottles.clear();

  clearChildren(cleanupState.playfield);

  for (let i = 0; i < 6; i += 1) {
    createCleanupBottle();
  }

  startCleanupSpawning();
}

function pieceClass(pieceName) {
  return `piece-${pieceName}`;
}

function renderBuildPiece(pieceName) {
  if (!buildState.stage || buildState.added.has(pieceName)) return;

  const piece = document.createElement("div");
  piece.className = `build-piece ${pieceClass(pieceName)}`;
  piece.setAttribute("aria-hidden", "true");
  piece.dataset.piece = pieceName;

  const labels = {
    "balance-beam": "Balance Beam",
    "rope-climb": "Rope Climb",
    "monkey-bars": "Monkey Bars",
    "ninja-steps": "Ninja Steps",
    "treehouse-lookout": "Treehouse Lookout",
  };

  piece.textContent = labels[pieceName] || pieceName;
  buildState.stage.appendChild(piece);
  buildState.added.add(pieceName);

  if (buildState.added.size === buildState.pieceButtons.length) {
    setText(buildState.messageNode, buildVictoryMessage);
  }
}

function resetBuildGame() {
  buildState.added.clear();
  setText(buildState.messageNode, "");
  clearChildren(buildState.stage);
  buildState.pieceButtons.forEach((button) => {
    button.disabled = false;
  });

  const note = document.createElement("p");
  note.className = "ghost-note";
  note.textContent = "Choose pieces to build the park.";
  buildState.stage.appendChild(note);
}

function renderMeter() {
  const percentage = Math.min(100, Math.round((meterState.count / meterState.max) * 100));
  if (meterState.fillNode) meterState.fillNode.style.width = `${percentage}%`;
  if (meterState.countNode) meterState.countNode.textContent = String(meterState.count);
  if (meterState.trackNode) meterState.trackNode.setAttribute("aria-valuenow", String(percentage));

  if (meterState.count > 0) {
    const milestone = Math.min(meterMessages.length - 1, Math.floor((meterState.count - 1) / 5));
    if (milestone >= meterState.milestoneIndex) {
      meterState.milestoneIndex = milestone + 1;
      setText(meterState.messageNode, meterMessages[milestone]);
    }
  }

  if (meterState.count >= meterState.max) {
    setText(meterState.messageNode, meterMessages[meterMessages.length - 1]);
    if (meterState.addButton) meterState.addButton.disabled = true;
  } else if (meterState.count === 0) {
    setText(meterState.messageNode, "");
  } else if (meterState.milestoneIndex === 0) {
    setText(meterState.messageNode, meterMessages[0]);
  }
}

function addBottleToMeter() {
  if (meterState.count >= meterState.max) return;

  meterState.count += 1;
  renderMeter();
}

function resetMeterGame() {
  meterState.count = 0;
  meterState.milestoneIndex = 0;
  setText(meterState.messageNode, "");
  if (meterState.addButton) meterState.addButton.disabled = false;
  renderMeter();
}

if (cleanupState.resetButton) {
  cleanupState.resetButton.addEventListener("click", resetCleanupGame);
}

if (buildState.resetButton) {
  buildState.resetButton.addEventListener("click", resetBuildGame);
}

buildState.pieceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pieceName = button.dataset.piece;
    renderBuildPiece(pieceName);
    button.disabled = true;
  });
});

if (meterState.addButton) {
  meterState.addButton.addEventListener("click", addBottleToMeter);
}

if (meterState.resetButton) {
  meterState.resetButton.addEventListener("click", resetMeterGame);
}

window.addEventListener("resize", () => {
  if (!cleanupState.playfield || cleanupState.score >= cleanupState.goal) return;

  cleanupState.activeBottles.forEach((bottle) => bottle.remove());
  cleanupState.activeBottles.clear();
  clearChildren(cleanupState.playfield);
  for (let i = 0; i < 4; i += 1) {
    createCleanupBottle();
  }
});

resetBuildGame();
resetMeterGame();
resetCleanupGame();
