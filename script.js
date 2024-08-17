const buttons = document.querySelectorAll("#buttons button");
const playerDisplay = document.querySelector("#player");
const resultDisplay = document.querySelector("#result");

const buttonFontSize = "4rem";
const blank = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

let ticTacToe = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let currentPlayer = "X";
let result = "";

function onReady() {
	updatePlayerDisplay();
	syncButtonText();
	resultDisplay.querySelector("#OK").addEventListener("click", function () {
		reset();
	});

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].setAttribute("id", i);
		buttons[i].addEventListener("click", function () {
			handleInput(this);
		});
	}
}

window.onload = onReady;

function syncButtonText() {
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].innerHTML = ticTacToe[i];
	}
}

function syncResult() {
	resultDisplay.querySelector(".display").innerHTML = result;
	resultDisplay.style.display = "flex";
}

function makeVisible(el) {
	el.style.fontSize = buttonFontSize;
}

function hideText() {
	for (let button of buttons) {
		button.style.fontSize = "0";
	}
}

function flipPlayer() {
	if (currentPlayer == "X") {
		currentPlayer = "O";
		return;
	}
	currentPlayer = "X";
}

function isXO(el) {
	return el == "X" || el == "O";
}

function changeXO(el) {
	elID = Number(el.id);

	if (isXO(ticTacToe[elID])) {
		return;
	}

	ticTacToe[elID] = currentPlayer;

	flipPlayer();
	updatePlayerDisplay();
}

function reset() {
	ticTacToe = [...blank];
	currentPlayer = "X";
	result = "";
	hideText();
	resultDisplay.style.display = "none";

	syncButtonText();
}

function updatePlayerDisplay() {
	playerDisplay.innerHTML = currentPlayer;
}

function isBoardFull() {
	let counter = 0;
	for (let el of ticTacToe) {
		if (isXO(el)) {
			counter++;
		}
	}

	return counter == ticTacToe.length;
}

function checkWin() {
	let counter;
	let first;

	// check for any horizontal wins
	for (let i = 0; i < 3; i++) {
		counter = 0;
		first = ticTacToe[i * 3];
		if (!isXO(first)) {
			continue;
		}

		for (let j = i * 3; j < (i + 1) * 3; j++) {
			if (ticTacToe[j] != first) {
				break;
			}
			counter++;
		}

		if (counter == 3) {
			return true;
		}
	}

	// check for any vertical wins
	for (let i = 0; i < 3; i++) {
		counter = 0;
		first = ticTacToe[i];
		if (!isXO(first)) {
			continue;
		}

		for (let j = i; i < ticTacToe.length; j += 3) {
			if (ticTacToe[j] != first) {
				break;
			}
			counter++;
		}

		if (counter == 3) {
			return true;
		}
	}

	// check for any diagonal wins
	for (let i = 0; i < 3; i += 2) {
		counter = 0;
		first = ticTacToe[i];
		if (!isXO(first)) {
			continue;
		}
		increment = 4 - i;

		for (let j = i; j < ticTacToe.length; j += increment) {
			if (ticTacToe[j] != first) {
				break;
			}
			counter++;
		}

		if (counter == 3) {
			return true;
		}
	}

	return false;
}

function handleInput(el) {
	makeVisible(el);
	changeXO(el);
	syncButtonText();

	if (isBoardFull()) {
		result = "Draw";
	}

	if (checkWin()) {
		flipPlayer();
		result = currentPlayer + " won";
	}

	if (result) {
		syncResult();
	}
}
