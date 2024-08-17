const buttons = document.querySelectorAll("#buttons button");
const playerDisplay = document.querySelector("#player");
const resultDisplay = document.querySelector("#result");

let buttonFontSize;
const blank = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

let ticTacToe = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let currentPlayer = "X";
let result = "";

let allowInput = true;

function onReady() {
	updatePlayerDisplay();
	buttonFontSize = buttons[0].style.fontSize;
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

function handleInput(el) {
	if (!allowInput) {
		return;
	}

	makeVisible(el);
	changeXO(el);
	syncButtonText();

	if (isBoardFull()) {
		result = "Draw";
	}

	positions = checkWin();

	if (positions) {
		updatePlayerDisplay();
		flipPlayer();

		result = currentPlayer + " won";
		highlightWin(positions);

		allowInput = false;
	}

	if (result) {
		syncResult();
	}
}

function reset() {
	ticTacToe = [...blank];
	currentPlayer = "X";
	result = "";
	resultDisplay.style.display = "none";
	allowInput = true;

	syncButtonText();
}

// syncing text

function syncButtonText() {
	let text;
	let color;

	for (let i = 0; i < buttons.length; i++) {
		text = ticTacToe[i];
		buttons[i].innerHTML = text;

		if (text == "X") {
			color = "rgb(239, 110, 110)";
		} else if (text == "O") {
			color = "rgb(113, 113, 198)";
		} else {
			buttons[i].style.fontSize = "0";
			color = "gainsboro";
		}

		buttons[i].style.background = color;
	}
}

function syncResult() {
	resultDisplay.querySelector(".display").innerHTML = result;
	resultDisplay.style.display = "flex";
}

function updatePlayerDisplay() {
	playerDisplay.querySelector(".display").innerHTML = currentPlayer;
}

function makeVisible(el) {
	el.style.fontSize = buttonFontSize;
}

function highlightWin(positions) {
	for (let pos of positions) {
		buttons[pos].style.background = "rgb(231, 219, 48)";
	}
}

// game

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
	let positions = [];

	// check for any horizontal wins
	for (let i = 0; i < 3; i++) {
		counter = 0;
		first = ticTacToe[i * 3];
		if (!isXO(first)) {
			continue;
		}

		positions = [];
		for (let pos = i * 3; pos < (i + 1) * 3; pos++) {
			if (ticTacToe[pos] != first) {
				break;
			}

			positions.push(pos);
			counter++;
		}

		if (counter == 3) {
			return positions;
		}
	}

	// check for any vertical wins
	for (let i = 0; i < 3; i++) {
		counter = 0;
		first = ticTacToe[i];
		if (!isXO(first)) {
			continue;
		}

		positions = [];
		for (let pos = i; i < ticTacToe.length; pos += 3) {
			if (ticTacToe[pos] != first) {
				break;
			}

			positions.push(pos);
			counter++;
		}

		if (counter == 3) {
			return positions;
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

		positions = [];
		for (let pos = i; pos < ticTacToe.length; pos += increment) {
			if (i == 3 && pos == 8) {
				continue;
			}

			if (ticTacToe[pos] != first) {
				break;
			}

			positions.push(pos);
			counter++;
		}

		if (counter == 3) {
			return positions;
		}
	}

	return false;
}
