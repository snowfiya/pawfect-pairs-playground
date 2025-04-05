
// Main application functionality

// Helper function to show a specific screen
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show the requested screen
  document.getElementById(screenId).classList.add('active');
}

// Show the leaderboard
function showLeaderboard(difficulty = 'easy') {
  const leaderboardContent = document.getElementById('leaderboard-content');
  leaderboardContent.innerHTML = '';
  
  // Get leaderboard data
  const leaderboard = getLeaderboard(difficulty);
  
  // Create leaderboard entries
  if (leaderboard.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.textContent = 'No scores yet!';
    emptyMessage.className = 'text-center py-4';
    leaderboardContent.appendChild(emptyMessage);
  } else {
    leaderboard.forEach(entry => {
      const entryElement = document.createElement('div');
      entryElement.className = 'leaderboard-entry';
      
      const usernameElement = document.createElement('span');
      usernameElement.textContent = entry.username;
      
      const scoreElement = document.createElement('span');
      scoreElement.textContent = entry.score;
      
      entryElement.appendChild(usernameElement);
      entryElement.appendChild(scoreElement);
      leaderboardContent.appendChild(entryElement);
    });
  }
  
  // Update personal best
  const personalBest = getPersonalBest(difficulty);
  document.getElementById('personal-best-score').textContent = personalBest;
  
  // Show leaderboard screen
  showScreen('leaderboard-screen');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    showScreen('main-menu-screen');
  } else {
    showScreen('splash-screen');
  }
  
  // SPLASH SCREEN BUTTONS
  document.getElementById('signup-btn').addEventListener('click', () => {
    showScreen('signup-screen');
  });
  
  document.getElementById('login-btn').addEventListener('click', () => {
    showScreen('login-screen');
  });
  
  // SIGNUP FORM
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    const result = signUp(username, password);
    
    if (result.success) {
      showScreen('main-menu-screen');
    } else {
      alert(result.message);
    }
  });
  
  // SIGNUP BACK BUTTON
  document.getElementById('signup-back-btn').addEventListener('click', () => {
    showScreen('splash-screen');
  });
  
  // LOGIN FORM
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    const result = login(username, password);
    
    if (result.success) {
      showScreen('main-menu-screen');
    } else {
      alert(result.message);
    }
  });
  
  // LOGIN BACK BUTTON
  document.getElementById('login-back-btn').addEventListener('click', () => {
    showScreen('splash-screen');
  });
  
  // MAIN MENU BUTTONS
  document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('difficulty-screen');
  });
  
  document.getElementById('leaderboard-menu-btn').addEventListener('click', () => {
    showLeaderboard('easy');
    
    // Activate the Easy tab
    document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector('.tab-btn.easy').classList.add('active');
  });
  
  document.getElementById('exit-btn').addEventListener('click', () => {
    logout();
    showScreen('splash-screen');
  });
  
  // DIFFICULTY SCREEN
  // Select difficulty
  let selectedDifficulty = 'easy';
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.difficulty-btn').forEach(b => {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      selectedDifficulty = btn.dataset.difficulty;
    });
  });
  
  // Difficulty screen back button
  document.getElementById('difficulty-back-btn').addEventListener('click', () => {
    showScreen('main-menu-screen');
  });
  
  // Play button
  document.getElementById('play-btn').addEventListener('click', () => {
    game = new MemoryGame(selectedDifficulty);
    game.initGame();
    showScreen('game-screen');
  });
  
  // GAME SCREEN
  document.getElementById('game-back-btn').addEventListener('click', () => {
    if (game) {
      game.pauseGame();
    }
  });
  
  document.getElementById('pause-btn').addEventListener('click', () => {
    if (game) {
      game.pauseGame();
    }
  });
  
  // PAUSE SCREEN
  document.getElementById('back-to-home-btn').addEventListener('click', () => {
    showScreen('main-menu-screen');
  });
  
  document.getElementById('restart-game-btn').addEventListener('click', () => {
    if (game) {
      game.restartGame();
    }
  });
  
  document.getElementById('back-to-game-btn').addEventListener('click', () => {
    if (game) {
      game.resumeGame();
    }
  });
  
  // GAME END SCREENS
  // Time ended
  document.getElementById('play-again-loss-btn').addEventListener('click', () => {
    if (game) {
      game.restartGame();
    }
  });
  
  document.getElementById('back-home-loss-btn').addEventListener('click', () => {
    showScreen('main-menu-screen');
  });
  
  // Game completed
  document.getElementById('play-again-win-btn').addEventListener('click', () => {
    if (game) {
      game.restartGame();
    }
  });
  
  document.getElementById('view-leaderboard-btn').addEventListener('click', () => {
    showLeaderboard(game.difficulty);
    
    // Activate the corresponding tab
    document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`.tab-btn.${game.difficulty}`).classList.add('active');
  });
  
  document.getElementById('back-home-win-btn').addEventListener('click', () => {
    showScreen('main-menu-screen');
  });
  
  // LEADERBOARD SCREEN
  document.getElementById('leaderboard-back-btn').addEventListener('click', () => {
    showScreen('main-menu-screen');
  });
  
  document.getElementById('leaderboard-home-btn').addEventListener('click', () => {
    showScreen('main-menu-screen');
  });
  
  // Leaderboard tabs
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      const difficulty = tab.dataset.tab;
      
      // Update active tab
      document.querySelectorAll('.tab-btn').forEach(t => {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      
      // Update leaderboard
      showLeaderboard(difficulty);
    });
  });
  
  // Pre-select the first difficulty option
  document.querySelector('.difficulty-btn.easy').classList.add('selected');
});
