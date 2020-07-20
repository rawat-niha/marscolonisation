var level_selected;
var mode_selected;
var comp = "X";
var hum = "O";
var winner;
var current_player;

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
});

$("#AI").click(function () {
    $("#mode").hide();
    $("#level").show();
    $("#back1").show();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    mode_selected = "computer";
});

$("#easy, #medium, #hard").click(function () {
    enable_all();
    $("#mode").hide();
    $("#level").hide();
    $("#back1").hide();
    $("#back2").show();
    $("#reset").show();
    $("#status").show();
    setlevel(this.innerHTML);
    computer();
    setheading("Human vs Computer", "Level: " + this.innerHTML);
});

$("#back2").click(function () {
    disable_all();
    $("#mode").hide();
    $("#level").show();
    $("#back1").show();
    $("#back2").hide();
    $("#reset").hide();
    $("#status").hide();
    setheading("", "");
});

$("#reset").click(function () {
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerHTML = "";
        document.getElementById("b" + i).style.cursor = "pointer";
    }

    if (mode_selected == "human") {
        human();
    } else {
        computer();
    }
});

$("#b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9").click(function () {
    if (mode_selected == "human") {
        humanClick();
    } else if (mode_selected == "computer") {
        AIclick();
    }
    this.style.cursor = "no-drop";
})

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

function evaluate() {

    if (equalTriplet(1, 2, 3) || equalTriplet(4, 5, 6) || equalTriplet(7, 8, 9) ||
        equalTriplet(1, 4, 7) || equalTriplet(2, 5, 8) || equalTriplet(3, 6, 9) ||
        equalTriplet(1, 5, 9) || equalTriplet(3, 5, 7)) {
            if(mode_selected == "computer") {
                
            }
        }
}

function equalTriplet(x, y, z) {
    var Xv = document.getElementById("b" + x).innerHTML;
    var Yv = document.getElementById("b" + y).innerHTML;
    var Zv = document.getElementById("b" + z).innerHTML;

    if (Xv == current_player && Yv == current_player && Zv == current_player) return true;
    else return false;
}