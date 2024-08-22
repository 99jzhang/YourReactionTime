import "./ReactionArea.css";

function ReactionArea() {
    return <div id="reaction-area">
                <div id="rxn-area-msg">Click here to start</div>
            </div>;
}

export default ReactionArea;

const reactionArea = document.getElementById("reaction-area");
const message = document.getElementById("rxn-area-msg");


let timer;
let startTime;
let waitingForStart = true;
let waitingForGreen = false;
let greenDisplayed = false;

function setGreenColor() {
    waitingForGreen = false;
    greenDisplayed = true;
    reactionArea.style.backgroundColor = "#32cd32";
    message.innerHTML = "Click Now!";
    message.style.color = "#111";
    startTime = Date.now();
}


function startGame() {
    waitingForStart = false;
    waitingForGreen = true;
    reactionArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for the Green Color.";
    message.style.color = "white";
    let randomNumber = Math.floor(Math.random() * 5000 + 2000);
    timer = setTimeout(setGreenColor, randomNumber);
}

function displayTooSoon() {
    waitingForGreen = false;
    waitingForStart = true;
    reactionArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "Too Soon. Click to replay."
    message.style.color = "#111";
    clearTimeout(timer);
}

function displayReactionTime(reactionTime) {
    greenDisplayed = false;
    waitingForStart = true;
    reactionArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "${reactionTime} ms. Click to play again."
}


reactionArea.addEventListener("click", () => {
    if (waitingForStart) {
        startGame();
    }
    else if (waitingForGreen) {
        displayTooSoon();
    }
    else if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - startTime;
        displayReactionTime(reactionTime);
    }
})