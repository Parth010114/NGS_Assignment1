const cardSymbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝'];
let cards = [...cardSymbols, ...cardSymbols]; // Duplicate the symbols to create pairs
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle the cards
function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

// Generate the game board
function generateBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        card.innerHTML = `
            <div class="card-front">${symbol}</div>
            <div class="card-back">?</div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Handle card flip
function flipCard() {
    if (lockBoard) return; // Prevent clicking if board is locked
    if (this === firstCard) return; // Prevent double-clicking the same card

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check if two flipped cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    isMatch ? disableCards() : unflipCards();
}

// If cards match, keep them flipped
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    matchedPairs++;

    if (matchedPairs === cardSymbols.length) {
        alert('Congratulations! You matched all pairs!');
    }
}

// If cards don't match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

// Reset board variables
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart game
function restartGame() {
    matchedPairs = 0;
    shuffleCards();
    generateBoard();
}
 
document.addEventListener('DOMContentLoaded', () => {
    shuffleCards();
    generateBoard();
    document.getElementById('restart-btn').addEventListener('click', restartGame);
});
