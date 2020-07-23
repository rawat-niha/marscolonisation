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

$(document).ready(function () {
    $("#mode").show();
    $("#level").hide();
    $("#back1").hide();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    disable_all();
});

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

$("#AI").click(function () {
    $("#mode").hide();
    $("#level").show();
    $("#back1").show();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    document.getElementById('heading').innerHTML = 'Let\'s Play!!';
});

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

$("#b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9").click(function () {
    if (mode_selected == "human") {
        humanClick(this);
    } else if (mode_selected == "computer") {
        AIclick(this);
    }
    this.style.cursor = "no-drop";
});

function human() {
    if (Math.random() < 0.5) {
        document.getElementById("status").innerHTML = "X starts the game!";
        current_player = "X";
    } else {
        document.getElementById('status').innerHTML = "O starts the game!";
        current_player = "O";
    }

}

function computer() {
    if (Math.random() < 0.5) {
        document.getElementById("status").innerHTML = "Computer starts the game!";
        current_player = comp;

        disable_all();

        setTimeout(function() {
            computer_move()
        }, 400);

    } else {
        document.getElementById('status').innerHTML = "You start the game!";
        current_player = hum;
    }
}

function setlevel(selectedlevel) {
    level_selected = selectedlevel;
}

function setheading(givenheading, givenlevel) {
    document.getElementById("heading").innerHTML = givenheading;
    document.getElementById("LevelHeading").innerHTML = givenlevel;
}

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
                }, 300);
            }
        }
    }
}

function disable_all() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.cursor = "no-drop";
    }
}

function enable_all() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.cursor = "pointer";
    }
}

function toBoard(number) {
    if(mode_selected === 'computer' && level_selected === "UNBEATABLE") {
        board[number] = hum;
    }
}