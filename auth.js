
// Authentication functionality

// Check for existing users
function checkForExistingUsers() {
  const users = localStorage.getItem('pawfectPairsUsers');
  return users ? JSON.parse(users) : [];
}

// Get current user
function getCurrentUser() {
  return localStorage.getItem('pawfectPairsCurrentUser') || null;
}

// Sign up functionality
function signUp(username, password) {
  // Get existing users
  const users = checkForExistingUsers();
  
  // Check if username already exists
  if (users.some(user => user.username === username)) {
    return {
      success: false,
      message: 'Username already exists!'
    };
  }
  
  // Create new user
  const newUser = {
    username,
    password, // In a real app, we would hash this password
    personalBest: {
      easy: 0,
      medium: 0,
      hard: 0
    }
  };
  
  // Add user to local storage
  users.push(newUser);
  localStorage.setItem('pawfectPairsUsers', JSON.stringify(users));
  
  // Set as current user
  localStorage.setItem('pawfectPairsCurrentUser', username);
  
  return {
    success: true,
    message: 'Sign up successful!'
  };
}

// Login functionality
function login(username, password) {
  const users = checkForExistingUsers();
  
  // Find user
  const user = users.find(user => user.username === username);
  
  // Check if user exists and password matches
  if (!user) {
    return {
      success: false,
      message: 'User not found!'
    };
  }
  
  if (user.password !== password) {
    return {
      success: false,
      message: 'Incorrect password!'
    };
  }
  
  // Login successful
  localStorage.setItem('pawfectPairsCurrentUser', username);
  
  return {
    success: true,
    message: 'Login successful!'
  };
}

// Logout functionality
function logout() {
  localStorage.removeItem('pawfectPairsCurrentUser');
}

// Update user score
function updateUserScore(score, difficulty) {
  const username = getCurrentUser();
  if (!username) return false;
  
  const users = checkForExistingUsers();
  const userIndex = users.findIndex(user => user.username === username);
  
  if (userIndex === -1) return false;
  
  if (score > users[userIndex].personalBest[difficulty]) {
    users[userIndex].personalBest[difficulty] = score;
    localStorage.setItem('pawfectPairsUsers', JSON.stringify(users));
  }
  
  return true;
}

// Get user's personal best
function getPersonalBest(difficulty) {
  const username = getCurrentUser();
  if (!username) return 0;
  
  const users = checkForExistingUsers();
  const user = users.find(user => user.username === username);
  
  return user ? user.personalBest[difficulty] : 0;
}

// Get leaderboard
function getLeaderboard(difficulty) {
  const users = checkForExistingUsers();
  
  // Sort users by their personal best for the given difficulty
  return users
    .map(user => ({
      username: user.username,
      score: user.personalBest[difficulty]
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Top 10
}
