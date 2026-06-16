const catchArena = document.getElementById('catch-arena');
const catchScore = document.getElementById('catch-score');
const catchLevel = document.getElementById('catch-level');
const catchLeft = document.getElementById('catch-left');
const catchRight = document.getElementById('catch-right');
const catchRestart = document.getElementById('catch-restart');

const sorterItems = document.getElementById('sorter-items');
const sorterCount = document.getElementById('sorter-count');
const sorterReset = document.getElementById('sorter-reset');

const memoryGrid = document.getElementById('memory-grid');
const memoryMatches = document.getElementById('memory-matches');
const memoryReset = document.getElementById('memory-reset');

let catchState = {
  playerX: 50,
  score: 0,
  level: 1,
  speed: 1.5,
  objects: [],
  running: false,
};

function createCatchObjects() {
  catchState.objects = [];
  const count = 4;
  for (let i = 0; i < count; i += 1) {
    catchState.objects.push({ x: 10 + i * 20, y: -40 * i, speed: 1 + i * 0.5 });
  }
}

function renderCatchGame() {
  catchArena.innerHTML = '';
  catchState.objects.forEach((obj, index) => {
    const bottle = document.createElement('div');
    bottle.className = 'catch-object';
    bottle.style.left = `${obj.x}%`;
    bottle.style.top = `${obj.y}px`;
    bottle.textContent = '🍾';
    bottle.setAttribute('aria-hidden', 'true');
    catchArena.appendChild(bottle);
    if (index === 0) {
      const player = document.createElement('div');
      player.className = 'catch-player';
      player.style.left = `${catchState.playerX}%`;
      player.textContent = '🥷';
      player.setAttribute('aria-hidden', 'true');
      catchArena.appendChild(player);
    }
  });
}

function updateCatchGame() {
  if (!catchState.running) return;
  const arenaHeight = catchArena.clientHeight;
  catchState.objects.forEach((obj) => {
    obj.y += obj.speed * catchState.speed;
    if (obj.y > arenaHeight - 60) {
      const caught = Math.abs(obj.x - catchState.playerX) < 12;
      if (caught) {
        catchState.score += 10;
        if (catchState.score % 50 === 0) {
          catchState.level += 1;
          catchState.speed += 0.3;
        }
      }
      obj.y = -40;
      obj.x = Math.random() * 84 + 8;
      obj.speed = 1 + Math.random() * 1.4;
    }
  });
  catchScore.textContent = catchState.score;
  catchLevel.textContent = catchState.level;
  renderCatchGame();
  requestAnimationFrame(updateCatchGame);
}

function startCatchGame() {
  if (catchState.running) return;
  catchState.running = true;
  renderCatchGame();
  requestAnimationFrame(updateCatchGame);
}

function resetCatchGame() {
  catchState = {
    playerX: 50,
    score: 0,
    level: 1,
    speed: 1.5,
    objects: [],
    running: true,
  };
  createCatchObjects();
  catchScore.textContent = '0';
  catchLevel.textContent = '1';
  renderCatchGame();
}

function movePlayer(direction) {
  catchState.playerX = Math.min(92, Math.max(8, catchState.playerX + direction));
  renderCatchGame();
}

catchLeft.addEventListener('click', () => movePlayer(-10));
catchRight.addEventListener('click', () => movePlayer(10));
catchRestart.addEventListener('click', resetCatchGame);
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') movePlayer(-10);
  if (event.key === 'ArrowRight') movePlayer(10);
});

function buildSorterBoard() {
  sorterItems.innerHTML = '';
  const items = [
    { id: 'plastic', label: 'Plastic Bottle', emoji: '🥤', bin: 'plastic' },
    { id: 'glass', label: 'Glass Bottle', emoji: '🍾', bin: 'glass' },
    { id: 'metal', label: 'Soda Can', emoji: '🥫', bin: 'metal' },
    { id: 'paper', label: 'Paper Cup', emoji: '🥛', bin: 'paper' },
  ];

  items.forEach((item) => {
    const card = document.createElement('button');
    card.className = 'sort-item';
    card.type = 'button';
    card.textContent = `${item.emoji} ${item.label}`;
    card.draggable = true;
    card.dataset.bin = item.bin;
    card.id = `sort-item-${item.id}`;
    card.setAttribute('aria-grabbed', 'false');
    sorterItems.appendChild(card);

    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', item.id);
      event.dataTransfer.effectAllowed = 'move';
      card.setAttribute('aria-grabbed', 'true');
    });

    card.addEventListener('dragend', () => {
      card.setAttribute('aria-grabbed', 'false');
    });
  });
}

function setSorterBins() {
  document.querySelectorAll('.sort-bin').forEach((bin) => {
    bin.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    });

    bin.addEventListener('drop', (event) => {
      event.preventDefault();
      const itemId = event.dataTransfer.getData('text/plain');
      const item = document.getElementById(itemId);
      const target = event.currentTarget.dataset.bin;
      if (!item) return;
      const expected = item.dataset.bin;
      if (expected === target) {
        item.remove();
        const count = parseInt(sorterCount.textContent, 10) + 1;
        sorterCount.textContent = String(count);
      }
    });
  });
}

function resetSorterGame() {
  sorterCount.textContent = '0';
  buildSorterBoard();
  setSorterBins();
}

sorterReset.addEventListener('click', resetSorterGame);

const memoryCards = [
  '🍾', '🍾',
  '🥤', '🥤',
  '🥫', '🥫',
];
let memoryState = {
  first: null,
  lock: false,
  matches: 0,
};

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildMemoryBoard() {
  memoryGrid.innerHTML = '';
  const cards = shuffle(memoryCards);
  cards.forEach((symbol, index) => {
    const button = document.createElement('button');
    button.className = 'memory-card';
    button.type = 'button';
    button.dataset.symbol = symbol;
    button.dataset.index = String(index);
    button.textContent = '';
    button.addEventListener('click', () => revealMemoryCard(button));
    memoryGrid.appendChild(button);
  });
}

function revealMemoryCard(card) {
  if (memoryState.lock || card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }
  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;

  if (!memoryState.first) {
    memoryState.first = card;
    return;
  }

  const second = card;
  if (memoryState.first.dataset.symbol === second.dataset.symbol) {
    memoryState.first.classList.add('matched');
    second.classList.add('matched');
    memoryState.matches += 1;
    memoryMatches.textContent = String(memoryState.matches);
    memoryState.first = null;
    return;
  }

  memoryState.lock = true;
  setTimeout(() => {
    memoryState.first.classList.remove('flipped');
    memoryState.first.textContent = '';
    second.classList.remove('flipped');
    second.textContent = '';
    memoryState.first = null;
    memoryState.lock = false;
  }, 800);
}

function resetMemoryGame() {
  memoryState = { first: null, lock: false, matches: 0 };
  memoryMatches.textContent = '0';
  buildMemoryBoard();
}

memoryReset.addEventListener('click', resetMemoryGame);

resetCatchGame();
resetSorterGame();
resetMemoryGame();
startCatchGame();
