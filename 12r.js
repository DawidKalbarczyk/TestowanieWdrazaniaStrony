let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};
updateScoreElement();
/*
if (score === null) {
    score = {
        wins: 0,
        loses: 0,
        ties: 0
    };
}

 */
function pickPlayerMove() {
    let playerMove;
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < (1 / 3)) {
        playerMove = 'rock';
    } else if (randomNumber >= (1 / 3) && randomNumber < (2 / 3)) {
        playerMove = 'paper';
    } else {
        playerMove = 'scissors';
    }
    return playerMove;
}
function pickComputerMove() {
    let computerMove;
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < (1 / 3)) {
        computerMove = 'rock';
    } else if (randomNumber >= (1 / 3) && randomNumber < (2 / 3)) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}
let intervalID = null;
let isAutoPlaying;

function autoPlay() {
    let autoPlayButton = document.querySelector('.js-autoPlay');
    if  (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const playerMove = pickPlayerMove();
            playGame(playerMove);
        }, 1);
        isAutoPlaying = true;
        autoPlayButton.innerHTML = 'Stop Play';
    } else {
        clearInterval(intervalID);
        autoPlayButton.innerHTML = 'Auto Play';
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        score.wins=0;
        score.loses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScoreElement();
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

document.querySelector('.js-autoPlay')
    .addEventListener('click', () => {
        autoPlay();
    });
function playGame (playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }


    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        score.wins++;
    } else if (result === 'Tie.') {
        score.ties++;
    } else if (result === 'You lose.') {
        score.loses++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    updateResultElement();
    updateMovesElement();

    function updateResultElement() {
        document.querySelector('.js-result')
            .innerHTML = result;
    }
    function updateMovesElement() {
        document.querySelector('.js-moves')
            .innerHTML = `You
                <img src="icons/${playerMove}-emoji.png" class="pick-image">
                <img src="icons/${computerMove}-emoji.png" class="pick-image">
                Computer`;
    }

}
function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

