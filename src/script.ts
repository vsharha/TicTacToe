const buttons = document.querySelectorAll(
	"#buttons button"
) as NodeListOf<HTMLElement>;
const playerDisplay = document.querySelector("#player") as HTMLElement;
const resultContainer = document.querySelector(
	"#result-container"
) as HTMLElement;
const resultDisplay = document.querySelector("#result") as HTMLElement;
const style = getComputedStyle(document.body);

let buttonFontSize: string;
const blank = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

let ticTacToe = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let currentPlayer = "X";
let result = "";
let winPositions: Array<number>;
winPositions = [];

let allowInput = true;

function getCSSvar(varName: string) {
	return getComputedStyle(document.body).getPropertyValue("--" + varName);
}

function onReady() {
	updatePlayerDisplay();
	buttonFontSize = getCSSvar("button-font-size");
	syncButtonText();
	resultDisplay.querySelector("#OK").addEventListener("click", function () {
		reset();
	});

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].setAttribute("id", i.toString());
		buttons[i].addEventListener("click", function () {
			handleInput(this);
		});
	}
}

window.onload = onReady;

function handleInput(el: HTMLElement) {
	if (!allowInput) {
		return;
	}

	makeVisible(el);
	changeXO(el);

	if (isBoardFull()) {
		result = "Draw";
	}

	winPositions = checkWin();

	if (winPositions.length > 0) {
		flipPlayer();
		updatePlayerDisplay();

		result = currentPlayer + " won";

		allowInput = false;
	}

	syncButtonText();

	if (result) {
		syncResult();
	}
}

function reset() {
	ticTacToe = [...blank];
	currentPlayer = "X";
	result = "";
	resultContainer.style.display = "none";
	allowInput = true;
	winPositions = [];

	updatePlayerDisplay();
	syncButtonText();
}

function getCCScolor(varName) {
	return style.getPropertyValue("--" + varName + "-color");
}

// syncing text

function syncButtonText() {
	let text: string;
	let color: string;

	for (let i = 0; i < buttons.length; i++) {
		text = ticTacToe[i];
		buttons[i].innerHTML = text;

		if (winPositions.includes(i)) {
			color = getCCScolor("win");
		} else if (text == "X") {
			color = getCCScolor("X");
		} else if (text == "O") {
			color = getCCScolor("O");
		} else {
			buttons[i].style.fontSize = "0";
			color = getCCScolor("def");
		}

		buttons[i].style.background = color;
	}
}

function syncResult() {
	resultDisplay.querySelector(".display").innerHTML = result;
	resultContainer.style.display = "flex";
}

function updatePlayerDisplay() {
	let display = playerDisplay.querySelector(".display") as HTMLElement;
	display.innerHTML = currentPlayer;
	display.style.background = getCCScolor(currentPlayer);
}

function makeVisible(el) {
	el.style.fontSize = buttonFontSize;
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
	let elID = Number(el.id);

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
		let increment = 4 - i;

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

	positions = [];
	return positions;
}
