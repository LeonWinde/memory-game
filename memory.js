const init = () => {
  const memory = document.querySelector("#memory");
  const restartButton = document.querySelector("#restartButton");
  const gameOver = document.querySelector("#game-over");

  let currentTurn = 0;
  let pair = [];
  const scores = [...document.querySelectorAll(".score")];
  const players = [
    {
      id: 0,
      score: 0,
    },
    {
      id: 1,
      score: 0,
    },
  ];
  const cardValues = ["😀", "😂", "😍", "😎", "🤔", "😴", "😡", "🥳", "🤖"];

  // const cardValues = ["😀"];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fisher-Yates Shuffle Algorithmus
  const cards = shuffleArray([...cardValues, ...cardValues]);

  const updateScoreInterface = () => {
    scores.forEach(
      (score, index) =>
        (score.textContent = `Player ${index + 1} Score: ${
          players[index].score
        }`)
    );
  };

  const generateCard = (value) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    const card = document.createElement("div");
    cardContainer.appendChild(card);
    card.classList.add("card");
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    const cardLogo = document.createElement("div");
    cardLogo.classList.add("card-logo-container");
    front.appendChild(cardLogo);
    card.append(front, back);
    card.addEventListener("click", () => {
      if (!card.classList.contains("flip") && pair.length < 2) {
        card.classList.add("flip");
        back.textContent = value;
        pair.push(card);
        if (pair.length >= 2) {
          setTimeout(() => {
            compareCards();
          }, 2000);
        }
      }
    });

    memory.appendChild(cardContainer);
  };
  const isOver = () => memory.querySelectorAll(".card").length === 0;
  const showgameOverScreen = () => {
    gameOver.classList.remove("hidden");
    const winner = players[0].score > players[1].score ? 0 : 1;
    const winnerText = document.querySelector("#winner-text");
    winnerText.textContent = `Player ${winner + 1} wins!`;
  };
  const changeTurn = () => {
    currentTurn = currentTurn === 0 ? 1 : 0;
    scores.forEach((score) => score.classList.remove("active"));
    scores[currentTurn].classList.add("active");
    updateScoreInterface();
  };
  const resetGame = () => {
    players[0].score = 0;
    players[1].score = 0;
    currentTurn = 0;
    updateScoreInterface();
    memory.innerHTML = "";
    gameOver.classList.add("hidden");
    init();
  };
  restartButton.addEventListener("click", resetGame);
  const compareCards = () => {
    if (pair[0].textContent === pair[1].textContent) {
      players[currentTurn].score += 1;
      updateScoreInterface();
      pair.forEach((card) => card.remove());
      if (isOver()) {
        showgameOverScreen();
      }
    } else {
      pair.forEach((card) => card.classList.remove("flip"));
      changeTurn();
    }
    pair = [];
  };

  cards.forEach((card) => generateCard(card));
};

document.addEventListener("DOMContentLoaded", init);
