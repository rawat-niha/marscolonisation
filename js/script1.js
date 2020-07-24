let level_selected;
let mode_selected;
let comp = "X";
let hum = "O";
let winner;
let current_player;

let board = ["", "", "", "", "", "", "", "", ""];

let theScores = {
    X: 10,
    O: -10,
    tie: 0
};

/* Shows the options for mode selection when page is loaded. */
$(document).ready(function () {
    $("#mode").show();
    $("#level").hide();
    $("#back1").hide();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    disable_all();
});

/* Shows gaming mode for human vs human. */
$("#personplayer").click(function () {
    enable_all();
    $("#mode").hide();
    $("#back1").show();
    $("#reset").show();
    $("#status").show();
    human();
    setheading("Human vs Human", "");
    mode_selected = "human";
});

/* Button to go back to mode selection. */
$("#back1").click(function () {
    disable_all();
    $("#mode").show();
    $("#level").hide();
    $("#back1").hide();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    setheading("", "");
    mode_selected = "";
    
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerHTML = "";
        document.getElementById("b" + i).style.cursor = "no-drop";
    }
});

/* Shows the level selection window for human vs AI agent. */
$("#AI").click(function () {
    $("#mode").hide();
    $("#level").show();
    $("#back1").show();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    document.getElementById('heading').innerHTML = 'Let\'s Play!!';
});

/* Defines the after-effects of pressing level selection buttons. */
$("#easy, #medium, #hard, #minimax").click(function () {
    enable_all();
    $("#mode").hide();
    $("#level").hide();
    $("#back1").hide();
    $("#back2").show();
    $("#reset").show();
    $("#status").show();
    mode_selected = "computer";
    setlevel(this.innerHTML);
    computer();
    setheading("Human vs Computer", "Level: " + this.innerHTML);
});

/* Button to go back to level selection. */
$("#back2").click(function () {
    if(level_selected == 'UNBEATABLE') {
        for(let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }
    disable_all();
    $("#mode").hide();
    $("#level").show();
    $("#back1").show();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    setheading("Let's play!!", "");
    level_selected = "";
    mode_selected = "";
    
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerHTML = "";
        document.getElementById("b" + i).style.cursor = "no-drop";
    }
});

/**
 * Resets the grid and the board array. Restarts the game of same level and mode.
 * @param {void} no parameter
 * @return {void} nothing
 */
function reset() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerHTML = "";
        document.getElementById("b" + i).style.cursor = "pointer";
    }

    if(level_selected == 'UNBEATABLE') {
        for(let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    if (mode_selected == "human") {
        human();
    } else {
        computer();
    }
}

/* Defines the after-effects of clicking a grid cell */
$("#b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9").click(function () {
    if (mode_selected == "human") {
        humanClick(this);
    } else if (mode_selected == "computer") {
        AIclick(this);
    }
    this.style.cursor = "no-drop";
});

/**
 * Randomly selects who starts in human vs human mode and sets it as current_player.
 * @param {void}
 * @returns {void}
 */
function human() {
    if (Math.random() < 0.5) {
        document.getElementById("status").innerHTML = "X starts the game!";
        current_player = "X";
    } else {
        document.getElementById('status').innerHTML = "O starts the game!";
        current_player = "O";
    }

}

/**
 * Randomly selects who starts in human vs computer mode and sets it as current_player.
 * @param {void}
 * @returns {void}
 */
function computer() {
    if (Math.random() < 0.5) {
        document.getElementById("status").innerHTML = "Computer starts the game!";
        current_player = comp;

        disable_all();

        setTimeout(function() {
            computer_move()
        }, 700);

    } else {
        document.getElementById('status').innerHTML = "You start the game!";
        current_player = hum;
    }
}

/* Sets the selected level for easy navigation. */
function setlevel(selectedlevel) {
    level_selected = selectedlevel;
}

/* Sets the heading and subheading according to what has to be displayed baove the grid. */
function setheading(givenheading, givenlevel) {
    document.getElementById("heading").innerHTML = givenheading;
    document.getElementById("LevelHeading").innerHTML = givenlevel;
}

/**
 * Takes the id of the clicked grid cell in human vs human mode and displays accordingly.
 * @param {id} clicked 
 * @returns {void}
 */
function humanClick(clicked) {

    if(!evaluate() && !draw()) {
        if(clicked.innerHTML != "") {
            document.getElementById('status').innerHTML = "Already filled!";
        } else {
            clicked.innerHTML = current_player;
            if(current_player == 'X' && !evaluate() && !draw()) {
                current_player = 'O';
                document.getElementById('status').innerHTML = current_player + "'s turn.";
            } else if(current_player == 'O' && !evaluate() && !draw()) {
                current_player = 'X';
                document.getElementById('status').innerHTML = current_player + "'s turn.";
            }
        }
    }
}

/**
 * Takes id of the clicked grid cell in human vs computer mode and displays/evaluates accordingly.
 * @param {id} clicked 
 * @returns {void}
 */
function AIclick(clicked) {
    if(!evaluate() && !draw()) {
        if (clicked.innerHTML != "") {
            document.getElementById('status').innerHTML = "Already filled!";
        } else {
            clicked.innerHTML = current_player;
            if (current_player == hum && !evaluate() && !draw()) {
                current_player = comp;
                document.getElementById('status').innerHTML = "Computer's turn.";
                disable_all();
                setTimeout(function() {
                    computer_move();
                }, 500);
            }
        }
    }
}

/* Disables all the grid cells */
function disable_all() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.cursor = "no-drop";
    }
}

/* Enables all the grid cells. */
function enable_all() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.cursor = "pointer";
    }
}

/**
 * Takes up a number according to the grid cell clicked and updates the value in the board array if the level is unbeatable.
 * @param {integer} number 
 * @returns {void}
 */
function toBoard(number) {
    if(mode_selected === 'computer' && level_selected === "UNBEATABLE") {
        if(board[number] == "") {
            board[number] = hum;
        } else return;
    }
}