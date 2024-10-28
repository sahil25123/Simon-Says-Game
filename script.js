let gameSeq = [];
let userSeq = [];

const sounds = {
    red: new Audio('sounds/red.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    green: new Audio('sounds/green.mp3'),
    gameOver: new Audio('sounds/game-over.mp3')
};

let btns = ["red", "yellow", "green", "blue"];
let h2 = document.querySelector("h2");
let instructions = document.getElementById("instructions");
let highScoreElement = document.getElementById("high-score");

let started = false;
let level = 0;
let highScore = 0;  // Variable to store the highest score

let start_btn = document.querySelector(".start");
start_btn.addEventListener("click", function () {
    if (!started) {
        console.log("Game Started");
        started = true;

        // Update instructions when the game starts
        instructions.innerHTML = `<p>Game Started! Follow the sequence of button flashes.</p>`;

        levelUp();
    }
});

// Play sound for the button color or game over
function playSound(color) {
    if (sounds[color]) {
        sounds[color].play();
    }
}

function gameFlash(randBtn) {
    // Play the corresponding sound for the button flash
    playSound(randBtn.id);

    randBtn.classList.add("flash");
    setTimeout(function () {
        randBtn.classList.remove("flash");
    }, 400);
}

function userFlash(randBtn) {
    // Play the corresponding sound for user input
    playSound(randBtn.id);

    randBtn.classList.add("userflash");
    setTimeout(function () {
        randBtn.classList.remove("userflash");
    }, 400);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);  // Include all 4 colors
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);

    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press start to play again.`;

        // Check if the current score is higher than the previous highest score
        if (level > highScore) {
            highScore = level;  // Update the high score
            highScoreElement.innerText = `Highest Score: ${highScore}`;  // Display the updated high score
        }

        // Play the game over sound
        playSound('gameOver');

        // Update the instructions on game over
        instructions.innerHTML = `
            <h3>Game Over!</h3>
            <p>Your score was ${level}. Press Start to try again!</p>
        `;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        }, 250);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);  // Play sound when user clicks
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAnswer(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    // Reset instructions when the game resets
    instructions.innerHTML = `
        <h3>How to Play:</h3>
        <ul>
            <li>• Press the start button to begin the game.</li>
            <li>• Watch the sequence of button flashes.</li>
            <li>• Click the buttons in the same order as the sequence.</li>
            <li>• With each correct sequence, the game adds one more flash!</li>
            <li>• If you make a mistake, the game will end. Try to beat your high score!</li>
        </ul>
    `;
}
