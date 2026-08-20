/**
 * Rithika's Portfolio - Interactive GitHub Contribution Heatmap
 * Generates an interactive 52-week contribution graph with realistic commit patterns,
 * hover tooltips, and dynamic statistics.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGitHubCalendar();
});

function initGitHubCalendar() {
  const container = document.getElementById('github-calendar-grid');
  if (!container) return;

  // Clear existing content
  container.innerHTML = '';

  const totalWeeks = 52;
  const daysPerWeek = 7;
  let totalCommitsCount = 0;

  // Month names for label reference
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  
  // Build 52 columns of 7 days
  for (let w = 0; w < totalWeeks; w++) {
    const col = document.createElement('div');
    col.className = 'gh-col';

    for (let d = 0; d < daysPerWeek; d++) {
      const dayBox = document.createElement('div');
      dayBox.className = 'gh-day';

      // Generate a realistic commit density (higher probability of commits during weekdays)
      const isWeekend = (d === 0 || d === 6);
      const randomSeed = Math.random();
      
      let level = 0;
      let count = 0;

      if (!isWeekend) {
        if (randomSeed > 0.85) {
          level = 4;
          count = Math.floor(Math.random() * 6) + 8; // 8-13 commits
        } else if (randomSeed > 0.60) {
          level = 3;
          count = Math.floor(Math.random() * 4) + 4; // 4-7 commits
        } else if (randomSeed > 0.35) {
          level = 2;
          count = Math.floor(Math.random() * 3) + 2; // 2-4 commits
        } else if (randomSeed > 0.15) {
          level = 1;
          count = 1;
        } else {
          level = 0;
          count = 0;
        }
      } else {
        if (randomSeed > 0.70) {
          level = 2;
          count = Math.floor(Math.random() * 3) + 2;
        } else if (randomSeed > 0.40) {
          level = 1;
          count = 1;
        } else {
          level = 0;
          count = 0;
        }
      }

      totalCommitsCount += count;
      dayBox.classList.add(`lvl-${level}`);

      // Calculate approximate date for tooltip
      const daysAgo = (totalWeeks - 1 - w) * 7 + (6 - d);
      const cellDate = new Date(today);
      cellDate.setDate(today.getDate() - daysAgo);
      const dateString = cellDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const commitLabel = count === 1 ? '1 contribution' : `${count} contributions`;
      dayBox.setAttribute('title', `${commitLabel} on ${dateString}`);

      col.appendChild(dayBox);
    }

    container.appendChild(col);
  }

  // Update total commit stat element if available
  const totalCommitsElem = document.getElementById('gh-total-commits');
  if (totalCommitsElem) {
    totalCommitsElem.textContent = `${totalCommitsCount.toLocaleString()}+`;
  }
}
