const progressData = {
  goal: '$[insert goal]',
  raised: '$[insert amount]',
  milestone: '$[insert milestone]'
};

function updateProgressLabels() {
  const goal = document.getElementById('progress-goal');
  const raised = document.getElementById('progress-raised');
  const milestone = document.getElementById('progress-milestone');

  if (goal) goal.textContent = progressData.goal;
  if (raised) raised.textContent = progressData.raised;
  if (milestone) milestone.textContent = progressData.milestone;
}

function setExternalLinkSecurity() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.rel = 'noopener noreferrer';
    link.target = '_blank';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  updateProgressLabels();
  setExternalLinkSecurity();
});
