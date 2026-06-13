var symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🍍']; // Card symbols (emojis)
        
        var cards = []; // Game variables
        var flippedCards = [];
        var matchedPairs = 0;
        var moves = 0;
        var canFlip = true;

        function startGame() { // Start new game
        
            matchedPairs = 0;  // Reset everything
            moves = 0;
            flippedCards = [];
            canFlip = true;
            
            document.getElementById('moves').textContent = '0'; // Update display
            document.getElementById('matches').textContent = '0';
            document.getElementById('winMessage').style.display = 'none';
            
            // Create cards array (2 of each symbol)
            cards = [];
            for (var i = 0; i < symbols.length; i++) {
                cards.push(symbols[i]);
                cards.push(symbols[i]);
            }
            
            shuffleCards(); // Shuffle cards
            createCards();
        }

        // Shuffle the cards array
        function shuffleCards() {
            for (var i = cards.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = cards[i];
                cards[i] = cards[j];
                cards[j] = temp;
            }
        }

        // Create card elements on the board
        function createCards() {
            var board = document.getElementById('gameBoard');
            board.innerHTML = '';
            
            for (var i = 0; i < cards.length; i++) {
                var card = document.createElement('div');
                card.className = 'card';
                card.dataset.index = i;
                card.dataset.symbol = cards[i];
                card.onclick = function() {
                    flipCard(this);
                };
                board.appendChild(card);
            }
        }

        // Flip a card
        function flipCard(card) {
            // Check if we can flip
            if (!canFlip) return;
            if (card.classList.contains('flipped')) return;
            if (card.classList.contains('matched')) return;
            
            // Flip the card
            card.classList.add('flipped');
            card.textContent = card.dataset.symbol;
            flippedCards.push(card);
            
            // Check if two cards are flipped
            if (flippedCards.length === 2) {
                canFlip = false;
                moves++;
                document.getElementById('moves').textContent = moves;
                
                // Check for match after a short delay
                setTimeout(checkMatch, 1000);
            }
        }

        // Check if two flipped cards match
        function checkMatch() {
            var card1 = flippedCards[0];
            var card2 = flippedCards[1];
            
            if (card1.dataset.symbol === card2.dataset.symbol) {
                // Match found!
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                document.getElementById('matches').textContent = matchedPairs;
                
                // Check if game is won
                if (matchedPairs === symbols.length) {
                    setTimeout(function() {
                        document.getElementById('winMessage').style.display = 'block';
                    }, 500);
                }
            } else {
                // No match - flip back
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
            }
            
            // Reset for next turn
            flippedCards = [];
            canFlip = true;
        }

        // Start game when page loads
        startGame();