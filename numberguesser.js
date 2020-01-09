/*
GAME FUNCTION:
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
- Notify player if the guessed number is too low or too high.
*/

// Game Values
let min = 1, 
    max = 10, 
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      lowGuessNumbers = document.querySelector('.low-guess-numbers'),
      highGuessNumbers = document.querySelector('.high-guess-numbers');

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;


document.getElementById('guess-tracking').style.display = 'none';

// play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        //check if won
        if(guess === winningNum){
            gameOver(true, `${winningNum} is correct, YOU WIN!`)
        } else {

            // add number to list of guesses
            addGuess(guess);

            // wrong number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
            
                // game over, lost
                gameOver(false, `Game over, you lost, the correct number was ${winningNum}`)
            } else {
                // game continues, answer wrong

                // change border color
                guessInput.style.borderColor = 'red';

                // clear the input
                guessInput.value = '';

                // tell user it's the wrong number
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
                showTracking(guess);
            }
        }
    }
});

// game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disabled = true;
    // set border color
    guessInput.style.borderColor = color;

    // set text color
    message.style.color = color;
    // set message
    setMessage(msg);
    

    // play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum(min, max){
     return (Math.floor(Math.random()*(max-min+1)+min));
};

// set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

function showTracking(guess){
    document.getElementById('guess-tracking').style.display = 'block';
}


// addGuess
function addGuess(guess) {
    // create li element
    const li = document.createElement('li');

    // create text node and append to li
    li.appendChild(document.createTextNode(guess));

    // append li to ul
    if (guess > winningNum){
        highGuessNumbers.appendChild(li);
    } else if (guess < winningNum) {
        lowGuessNumbers.appendChild(li);
    }
};