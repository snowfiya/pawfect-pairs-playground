
// Game logic for the Pawfect Pairs game

class MemoryGame {
  constructor(difficulty = 'easy') {
    this.difficulty = difficulty;
    this.settings = difficultySettings[difficulty];
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.score = 0;
    this.timeLeft = this.settings.timeLimit;
    this.timer = null;
    this.isPaused = false;
    this.isGameOver = false;
  }

  // Initialize the game
  initGame() {
    // Reset game state
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.score = 0;
    this.timeLeft = this.settings.timeLimit;
    this.isPaused = false;
    this.isGameOver = false;

    // Get random dog pairs based on difficulty
    const dogPairs = this.createCardPairs();
    this.cards = this.shuffleCards(dogPairs);

    // Clear the game board
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Set grid columns based on difficulty
    switch (this.difficulty) {
      case 'easy':
        gameBoard.style.gridTemplateColumns = 'repeat(2, 1fr)';
        break;
      case 'medium':
        gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
        break;
      case 'hard':
        gameBoard.style.gridTemplateColumns = 'repeat(5, 1fr)';
        break;
      default:
        gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }

    // Create card elements
    this.cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.dataset.id = index;

      // Create front face (paw print)
      const frontFace = document.createElement('div');
      frontFace.className = 'card-face card-front';
      
      const pawPrint = document.createElement('div');
      pawPrint.className = 'paw-print';
      frontFace.appendChild(pawPrint);

      // Create back face (dog image)
      const backFace = document.createElement('div');
      backFace.className = 'card-face card-back';
      
      const img = document.createElement('img');
      img.className = 'card-img';
      img.src = card.image;
      img.alt = card.breed;
      backFace.appendChild(img);

      // Add faces to card
      cardElement.appendChild(frontFace);
      cardElement.appendChild(backFace);

      // Add click event
      cardElement.addEventListener('click', () => this.flipCard(index));

      // Add card to game board
      gameBoard.appendChild(cardElement);
    });

    // Update difficulty indicator
    document.getElementById('current-difficulty').textContent = this.difficulty.toUpperCase();
    document.getElementById('current-difficulty').className = `difficulty-indicator ${this.difficulty}`;

    // Update score display
    this.updateScore();

    // Start timer
    this.startTimer();
  }

  // Create card pairs based on difficulty
  createCardPairs() {
    const numPairs = this.settings.cardCount / 2;
    const selectedDogs = getRandomDogs(this.settings.cardCount);
    
    // Create pairs
    const dogPairs = [];
    selectedDogs.forEach(dog => {
      // Add two of each dog for matching
      dogPairs.push({...dog});
      dogPairs.push({...dog});
    });
    
    return dogPairs;
  }

  // Shuffle cards using Fisher-Yates algorithm
  shuffleCards(cards) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Flip card
  flipCard(index) {
    // Prevent flipping if game is over or paused
    if (this.isGameOver || this.isPaused) return;
    
    // Get card element
    const cardElement = document.querySelector(`.card[data-id="${index}"]`);
    
    // Prevent flipping if card is already flipped or matched
    if (
      this.flippedCards.length >= 2 ||
      cardElement.classList.contains('card-flipped') ||
      cardElement.classList.contains('card-matched')
    ) {
      return;
    }
    
    // Flip card
    cardElement.classList.add('card-flipped');
    this.flippedCards.push({index, element: cardElement});
    
    // Check for match
    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  // Check if flipped cards match
  checkForMatch() {
    const [firstCard, secondCard] = this.flippedCards;
    const firstCardData = this.cards[firstCard.index];
    const secondCardData = this.cards[secondCard.index];
    
    if (firstCardData.breed === secondCardData.breed) {
      // Match!
      setTimeout(() => {
        firstCard.element.classList.add('card-matched');
        secondCard.element.classList.add('card-matched');
        this.flippedCards = [];
        this.matchedPairs++;
        
        // Add points
        this.score += this.settings.pointsPerMatch;
        this.updateScore();
        
        // Check if all pairs are matched
        if (this.matchedPairs === this.settings.cardCount / 2) {
          this.endGame(true);
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        firstCard.element.classList.remove('card-flipped');
        secondCard.element.classList.remove('card-flipped');
        this.flippedCards = [];
      }, 1000);
    }
  }

  // Update score display
  updateScore() {
    document.getElementById('score').textContent = this.score;
  }

  // Start the game timer
  startTimer() {
    // Clear any existing timer
    if (this.timer) clearInterval(this.timer);
    
    // Update timer display
    this.updateTimerDisplay();
    
    // Start countdown
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.timeLeft--;
        this.updateTimerDisplay();
        
        // Check if time is up
        if (this.timeLeft <= 0) {
          this.endGame(false);
        }
      }
    }, 1000);
  }

  // Update timer display
  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Pause game
  pauseGame() {
    this.isPaused = true;
    showScreen('pause-screen');
  }

  // Resume game
  resumeGame() {
    this.isPaused = false;
    showScreen('game-screen');
  }

  // End game
  endGame(isWin) {
    // Stop timer
    if (this.timer) clearInterval(this.timer);
    
    // Mark game as over
    this.isGameOver = true;
    
    // Update user's score
    updateUserScore(this.score, this.difficulty);
    
    // Show appropriate end screen
    if (isWin) {
      document.getElementById('final-score-win').textContent = this.score;
      showScreen('completed-screen');
    } else {
      document.getElementById('final-score-loss').textContent = this.score;
      showScreen('time-ended-screen');
    }
  }

  // Restart game
  restartGame() {
    this.initGame();
    showScreen('game-screen');
  }
}

// Global game instance
let game;
