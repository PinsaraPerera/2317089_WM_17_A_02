// declare variables
let scores, roundScore, activePlayer, gamePlaying;

// start the game
initial_state();

// Adding an event listener to the button that makes the dice roll
document.querySelector(".btn-roll").addEventListener("click", function () {
  // Checking if the game is being played
  if (gamePlaying) {
    // 1. Create a random number for the dice
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "./images/dice-" + dice + ".png";

    // 3. Update the round score
    if (scores[0] === 0 && scores[1] === 0) {
      roundScore = dice;
      document.querySelector("#score-" + activePlayer).textContent = roundScore;
      scores[activePlayer] = dice;
      nextPlayer();
    } else if (scores[activePlayer === 0 ? 1 : 0] > 0) {
      roundScore = dice;
      document.querySelector("#score-" + activePlayer).textContent = roundScore;
      scores[activePlayer] = dice;

      if (scores[0] === scores[1]) {
        document.querySelector("#msg").textContent = "Game is Draw ! ! !";

        // Changing the 'gamePlaying' variable to 'false'
        gamePlaying = false;
      } else {
        winner();
      }
    }
  }
});

// check both players use their turns
function winner() {
  scores[0] > scores[1] ? (activePlayer = 0) : (activePlayer = 1);

  // display the winner name
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document.querySelector("#msg").textContent = `Player ${
    activePlayer + 1
  } wins ! ! !`;

  // Hidding the dice
  document.querySelector(".dice").style.display = "none";

  // Adding the 'winner' class to the player
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");

  // Removing the active player status from the winner
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");

  // Changing the 'gamePlaying' variable to 'false'
  gamePlaying = false;
}

// Function that initializes the game
function initial_state() {
  // Setting the 'gamePlaying' variable to 'true'
  gamePlaying = true;

  // Setting both scores back to 0
  scores = [0, 0];

  // Setting the activePlayer back to being 'Player 1'
  activePlayer = 0;

  // Setting the roundScore back to 0
  roundScore = 0;

  // Hiding the dice right from the beggining of the game
  document.querySelector(".dice").style.display = "none";

  // Setting the scores to 0 by default (using the 'getElementById' method)
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  // Removing the 'winner status' from the winning player
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  // Removing the 'active status' from the winning player
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  // Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector("#msg").textContent = "";
}

// Restarting the game after clicking the 'New Game' button
document.querySelector(".btn-new").addEventListener("click", initial_state);

// Function to giving the turn to the next player
function nextPlayer() {
  // It's the next player's turn if the dice number is 1 (using the ternary operator)
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Setting the roundScore back to 0
  roundScore = 0;

  // Adding the active class to the player who has the turn now
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

// Change the switch
document.querySelector(".btn-switch").addEventListener("click", function () {
  if (gamePlaying) {
    // Adding the active class to the player who has the turn now
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
  }
});
