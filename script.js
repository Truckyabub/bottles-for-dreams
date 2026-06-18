const cleanupMessages = [
  'One bottle can start a bigger story.',
  'The cleanup is making the park dream feel closer.',
  'Great work — the community is collecting kindness bottle by bottle.',
  'The final celebration is near: brighter, cleaner, and more hopeful.',
];

const buildMessages = [
  'Each piece makes the park feel more alive.',
  'The Ninja Park design is filling with playful energy.',
  'Kids are climbing higher in imagination and confidence.',
  'A joyful park is taking shape — the miracle is growing.',
];

let cleanupCount = 0;
let buildCount = 0;
let meterValue = 0;

function updateMeter(amount) {
  meterValue = Math.min(100, meterValue + amount);
  const meterFill = document.getElementById('meter-fill');
  const meterLabel = document.getElementById('meter-label');
  if (meterFill) {
    meterFill.style.width = `${meterValue}%`;
  }
  if (meterLabel) {
    if (meterValue >= 100) {
      meterLabel.textContent = 'The miracle is growing — one bottle, one family, one community at a time.';
    } else if (meterValue >= 75) {
      meterLabel.textContent = 'Hope is rising. The Ninja Park wonderland feels closer.';
    } else if (meterValue >= 40) {
      meterLabel.textContent = 'The path is shining brighter with every act of support.';
    } else {
      meterLabel.textContent = 'The miracle is growing — one bottle, one family, one community at a time.';
    }
  }
}

function handleCleanupClick(event) {
  const button = event.currentTarget;
  if (button.classList.contains('collected')) {
    return;
  }
  cleanupCount += 1;
  button.classList.add('collected');
  const message = document.getElementById('cleanup-message');
  if (message) {
    message.textContent = cleanupMessages[Math.min(cleanupMessages.length - 1, cleanupCount)];
  }
  updateMeter(10);
  if (cleanupCount === 6 && message) {
    message.textContent = 'Community cleanup celebration! The park dream is becoming a shared story.';
  }
}

function handleBuildPiece() {
  const piece = document.querySelector(`#piece-${buildCount + 1}`);
  if (!piece) {
    return;
  }
  piece.classList.remove('unbuilt');
  buildCount += 1;
  const message = document.getElementById('build-message');
  if (message) {
    message.textContent = buildMessages[Math.min(buildMessages.length - 1, buildCount)];
  }
  updateMeter(15);
  if (buildCount === 4 && message) {
    message.textContent = 'Kids are climbing higher now — the Ninja Park celebration is almost here.';
  }
}

function setExternalLinkSecurity() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.rel = 'noopener noreferrer';
    link.target = '_blank';
  });
}

function setupMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (!navToggle || !header) {
    return;
  }

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    header.classList.toggle('nav-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bottle-card').forEach((button) => {
    button.addEventListener('click', handleCleanupClick);
  });

  const buildButton = document.getElementById('build-piece');
  if (buildButton) {
    buildButton.addEventListener('click', handleBuildPiece);
  }

  document.querySelectorAll('.park-piece').forEach((piece) => {
    piece.classList.add('unbuilt');
  });

  updateMeter(0);
  setupMobileNav();
  setExternalLinkSecurity();
});
