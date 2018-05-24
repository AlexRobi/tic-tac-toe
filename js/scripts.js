const Game = (() => {
  let playerOne = "";
  let playerTwo = "";
  let turn = "";
  let gameNumber = 1;
  let tieScore = 0;
  let gameMode = 0;
  let gameIsOver = false;

  function addEventToMenu() {
    btnMenu = document.querySelectorAll(".nav-link");
    btnMenu.forEach(function (btn) {
      btn.addEventListener("click", clickedMenu);
    });
    inputPlayerOneNameMode1.addEventListener("input", inputValidation);
    inputPlayerOneName.addEventListener("input", inputValidation);
    inputPlayerTwoName.addEventListener("input", inputValidation);
  };

  function clickedMenu() {
    if (this == mode1) {
      mode1.classList.add("active");
      mode2.classList.remove("active");
      mode1SelectedContainer.style.display = "block";
      mode2SelectedContainer.style.display = "none";
    } else {
      mode2.classList.add("active");
      mode1.classList.remove("active");
      mode2SelectedContainer.style.display = "block";
      mode1SelectedContainer.style.display = "none";
    };
  };

  function inputValidation() {
    if (this == inputPlayerOneNameMode1) {
      var inputError = inputPlayerOneErrorMode1;
    } else if (this == inputPlayerOneName) {
      var inputError = inputPlayerOneError;
    } else if (this == inputPlayerTwoName) {
      var inputError = inputPlayerTwoError;
    };
    if ((this.value.length <= 12) && (this.value.length >= 1)) {
      inputError.textContent = "";
      this.classList.remove("has-error");
      this.classList.add("is-valid");
    } else {
      inputError.textContent = "Player name must be beetween 1 and 12 characters.";
      this.classList.remove("is-valid");
      this.classList.add("has-error");
    };
  };

  const validateFormMode1 = () => {
    let inputValid = false;
    if ((inputPlayerOneNameMode1.value.length <= 12) && (inputPlayerOneNameMode1.value.length >= 1)) {
      inputValid = true;
      inputPlayerOneErrorMode1.textContent = "";
      inputPlayerOneNameMode1.classList.remove("has-error");
    } else {
      inputPlayerOneErrorMode1.textContent = "Player name must be beetween 1 and 12 characters.";
      inputPlayerOneNameMode1.classList.add("has-error");
    };
    if (inputValid) {
      $('#mainMenuModal')
        .modal('toggle');
      gameMode = 1;
      newGame();
    };
  };


  const validateFormMode2 = () => {
    let inputValid = 0;
    for (var i = 1; i <= 2; i++) {
      if (i == 1) {
        input = inputPlayerOneName;
        inputError = inputPlayerOneError;
      } else {
        input = inputPlayerTwoName;
        inputError = inputPlayerTwoError;
      };
      if ((input.value.length <= 12) && (input.value.length >= 1)) {
        inputValid++;
        inputError.textContent = "";
        input.classList.remove("has-error");
      } else {
        inputError.textContent = "Player name must be beetween 1 and 12 characters.";
        input.classList.add("has-error");
      };
      if (inputValid == 2) {
        $('#mainMenuModal')
          .modal('toggle');
        gameMode = 2;
        newGame();
      };
    };
  };

  function newGame() {
    gameIsOver = false;
    gameNumber = 1;
    tieScore = 0;
    arrowTip.classList.add("hidden");
    buttonGroup.className = "";
    btnStartGame.textContent = "Restart";
    // Creates Players from the inputs form.
    playerOne = Player(document.querySelector("#inputPlayerOneName")
      .value);
    if (gameMode == 1) {
      playerOne = Player(document.querySelector("#inputPlayerOneNameMode1")
        .value);
      playerTwo = Player("AI");
    } else if (gameMode == 2) {
      playerOne = Player(document.querySelector("#inputPlayerOneName")
        .value);
      playerTwo = Player(document.querySelector("#inputPlayerTwoName")
        .value);
    };
    scorePlayerOneScore.textContent = "-";
    scorePlayerTwoScore.textContent = "-";
    Gameboard.createGrid();
    turn = 0;
    scorePlayerOneName.textContent = playerOne.name
    scorePlayerTwoName.textContent = playerTwo.name
    scorePlayerOne.classList.add("player-one-score-active");
    Gameboard.addEventToSquares();
  };

  const Player = (name) => {
    let score = 0;
    return {
      name,
      score,
    };
  };

  const Gameboard = (() => {
    let grid = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];
    let squares = "";

    const createGrid = () => {
      deleteGrid();
      grid = ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"];
      // Creates square from each Grid array element.
      grid.forEach(function (element, index) {
        let square = document.createElement("div");
        square.classList.add(
          "square-" + (index + 1),
          "col-4",
          "embed-responsive",
          "embed-responsive-1by1"
        );
        // Used for populate the Grid array.
        square.setAttribute('data-index', index);
        // Used to check if it's already been clicked on.
        square.setAttribute('data-empty', true);
        // Used for Font awesome tag for "X" or "O" which appear on the grid.
        let squareContent = document.createElement("i");
        square.appendChild(squareContent);
        gameboard.appendChild(square);
      });
      squares = document.querySelectorAll('div[class^="square-"]');
    };

    const deleteGrid = () => {
      while (gameboard.firstChild) {
        gameboard.removeChild(gameboard.firstChild);
      };
    };

    const addEventToSquares = () => {
      squares.forEach(function (square) {
        square.classList.add("active-square");
        square.addEventListener("mouseover", enterHoverSquare);
        square.addEventListener("mouseleave", exitHoverSquare);
        square.addEventListener("click", playerClickSquare);
      });
    };

    function enterHoverSquare() {
      // Get attribute from the hovered square.
      thisIndex = this.getAttribute('data-index');
      thisEmpty = this.getAttribute('data-empty');
      // Player One turn is turn % 2 = 0.
      if (turn % 2 == 0) {
        // Check if the square is empty.
        if (thisEmpty == "true") {
          this.firstChild.classList.add("fas", "fa-times", "player-one-color");
        } else {
          // The square is already used, do nothing.
        };
      } else {
        if (thisEmpty == "true") {
          this.firstChild.classList.add("far", "fa-circle", "player-two-color");
        } else {
          // The square is already used, do nothing.
        };
      };
    };

    function exitHoverSquare() {
      // Get attribute from the hovered square.
      thisIndex = this.getAttribute('data-index');
      thisEmpty = this.getAttribute('data-empty');
      // Player One turn is turn % 2 = 0.
      if (turn % 2 == 0) {
        // Check if the square is empty.
        if (thisEmpty == "true") {
          this.firstChild.classList.remove("fas", "fa-times", "player-one-color");
        } else {
          // The square is already used, do nothing.
        };
      } else {
        if (thisEmpty == "true") {
          this.firstChild.classList.remove("far", "fa-circle", "player-two-color");
        } else {
          // The square is already used, do nothing.
        };
      };
    };

    function playerClickSquare() {
      // Get attribute from the clicked square.
      thisIndex = this.getAttribute('data-index')
      thisEmpty = this.getAttribute('data-empty')
      if (gameMode == 1) {
        if (turn % 2 == 0) {
          scorePlayerOne.classList.remove("player-one-score-active");
          scorePlayerTwo.classList.add("player-two-score-active");
          // Check if the square is empty.
          if (thisEmpty == "true") {
            // Turn is played.
            this.firstChild.classList.add("fas", "fa-times", "player-one-color");
            grid[thisIndex] = "x";
            this.setAttribute('data-empty', false);
            turn++;
            checkWinningCondition();
            aiTurn();
          } else {

          };
        } else {}
      } else if (gameMode == 2) {
        if (turn % 2 == 0) {
          scorePlayerOne.classList.remove("player-one-score-active");
          scorePlayerTwo.classList.add("player-two-score-active");
          // Check if the square is empty.
          if (thisEmpty == "true") {
            // Turn is played.
            this.firstChild.classList.add("fas", "fa-times", "player-one-color");
            grid[thisIndex] = "x";
            this.setAttribute('data-empty', false);
            turn++;
          } else {
            // Turn isn't played, the square is already used.
          };
        } else {
          // Add active class to player two score.
          scorePlayerTwo.classList.remove("player-two-score-active");
          scorePlayerOne.classList.add("player-one-score-active");
          // Check if the square is empty.
          if (thisEmpty == "true") {
            // Turn is played.
            this.firstChild.classList.add("far", "fa-circle", "player-two-color");
            grid[thisIndex] = "o";
            this.setAttribute('data-empty', false);
            turn++;

          } else {
            // Turn isn't played, the square is already used.
          };
        };
        checkWinningCondition();
      }
    };

    function aiTurn() {
      if (!gameIsOver) {
        // Add active class to player one score.
        scorePlayerTwo.classList.remove("player-two-score-active");
        scorePlayerOne.classList.add("player-one-score-active");
        let validChoice = false;
        while (!validChoice) {
          let rand = Math.round(Math.random() * 8);
          if (!grid.includes("empty")) {
            validChoice = true;
            break;
          };
          if (grid[rand] == "empty") {
            grid[rand] = "o";
            square = document.querySelector(`.square-${rand + 1}`);
            square.firstChild.classList.add("far", "fa-circle", "player-two-color");
            square.setAttribute('data-empty', false);
            turn++;
            validChoice = true;
          };
        };
        checkWinningCondition();
      };
    };

    const checkWinningCondition = () => {
      // Loop to check winning condition on all horizontals rows.
      for (let i = 0; i <= 3; i++) {
        if (i == 0) {
          var index = 0;
        } else if (i == 2) {
          var index = 3;
        } else if (i == 3) {
          var index = 6;
        };
        if ((grid[index] != "empty") && (!gameIsOver)) {
          if ((grid[index] == grid[index + 1]) && (grid[index]) == grid[index + 2]) {
            gameIsOver = true;
            gameOver(grid[index]);
          };
        };
      };
      // Loop to check winning condition on all verticals rows.
      for (let i = 0; i <= 3; i++) {
        if (i == 0) {
          var index = 0;
        } else if (i == 2) {
          var index = 1;
        } else if (i == 3) {
          var index = 2;
        };
        if ((grid[index] != "empty") && (!gameIsOver)) {
          if ((grid[index] == grid[index + 3]) && (grid[index]) == grid[index + 6]) {
            gameIsOver = true;
            gameOver(grid[index]);
          };
        };
      };
      // Checks winning condition on all diagonals.
      if ((grid[4] != "empty") && (!gameIsOver)) {
        if ((grid[0] == grid[4]) && (grid[0]) == grid[8]) {
          gameIsOver = true;
          gameOver(grid[4]);
        } else if ((grid[2] == grid[4]) && (grid[2]) == grid[6]) {
          gameIsOver = true;
          gameOver(grid[4]);
        };
      };
      // Declares tie if all square are used.
      if ((!grid.includes("empty")) && (!gameIsOver)) {
        gameOver(grid[4], true);
      }
    };

    const removeEventToSquares = () => {
      squares.forEach(function (square) {
        square.classList.remove("active-square");
        square.removeEventListener("click", playerClickSquare);
        square.removeEventListener("mouseover", enterHoverSquare);
        square.removeEventListener("mouseleave", exitHoverSquare);
      });
    };

    return {
      createGrid,
      deleteGrid,
      addEventToSquares,
      removeEventToSquares,
    };
  })();

  const gameOver = (letter, tie) => {
    gameIsOver = true;
    Gameboard.removeEventToSquares();
    scorePlayerOne.classList.remove("player-one-score-active");
    scorePlayerTwo.classList.remove("player-two-score-active");
    winLogo.className = "";
    winLogo.classList.add("fas", "fa-trophy");
    if (tie) {
      var winner = "tie";
      modalResult.textContent = "This is a tie!";
      tieScore++;
      winLogo.className = "";
      winLogo.classList.add("far", "fa-meh");
      showEndGameMenu();
    } else if (letter == "x") {
      modalResult.textContent = playerOne.name + " wins the game!";
      playerOne.score++;
      showEndGameMenu();
    } else {
      modalResult.textContent = playerTwo.name + " wins the game!";
      playerTwo.score++;
      showEndGameMenu();
    };
    btnStartGame.textContent = "New Game";
    endGameModalTitle.textContent = "Game " + gameNumber;
    modalPlayerOneScore.textContent = `${playerOne.name} - ${playerOne.score}`;
    modalTieScore.textContent = `Tie - ${tieScore}`;
    modalPlayerTwoScore.textContent = `${playerTwo.name} - ${playerTwo.score}`;
  };

  function showEndGameMenu() {
    setTimeout(function () {
      $('#endGameModal')
        .modal('show');
    }, 500);
  };

  const continueGame = () => {
    gameIsOver = false;
    gameNumber++
    turn = 0;
    score.classList.remove("d-none");
    scorePlayerOne.classList.add("player-one-score-active");
    scorePlayerOneScore.textContent = (playerOne.score == 0) ? "-" : playerOne.score;
    scorePlayerTwoScore.textContent = (playerTwo.score == 0) ? "-" : playerTwo.score;
    Gameboard.createGrid();
    Gameboard.addEventToSquares();
  };

  return {
    addEventToMenu,
    validateFormMode1,
    validateFormMode2,
    continueGame,
    Gameboard,
  };

})();

Game.Gameboard.createGrid();
