var isNewGame;
// Тоглогчийн ээлжийг хадгалах хувьсагч, эхний тоглогч - 0, хоёрдох тоглогч - 1.
var activePlayer = 0;

// Тоглогчдын оноог цуглуулах.
var scores = [0, 0];

// Цуглуулж байгаа хувьсагч.
var roundScore = 0;

// Шооны тоог хадгалах.
var diceNumber = Math.floor(Math.random() * 6) + 1;

var diceDom = document.querySelector(".dice");

initGame();

function initGame() {
    isNewGame = true;
  
    activePlayer = 0;
  
    scores = [0, 0];
  
    roundScore = 0;
  
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
  
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
  
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
  
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
  
    document.querySelector(".player-0-panel").classList.add("active");
  
    diceDom.style.display = "none";
}
// Шоог шидэх эвэнт листенер.
document.querySelector('.btn-roll').addEventListener("click", function() {
    if (isNewGame) {
        // 1 - 6 хооронд random тоо.
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        // Шооны зургийг web дээр харуулах.
        diceDom.style.display = 'block';

        // 1 - 6 хооронд буусан шооны зурагийг харуулах.
        diceDom.src = 'dice-' + diceNumber + '.png';

        // diceNumber !== 1 байвал current оноо дээр нэмэх, ялгаатай бол current оноо 0 болно.
        if (diceNumber !== 1) {
            roundScore += diceNumber
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            switchToNextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener("click", function() {
    if (isNewGame) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 10) {
            isNewGame = false;
            document.getElementById('name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        } else {
            switchToNextPlayer();
        }
    }
});

function switchToNextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDom.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initGame);
