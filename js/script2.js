/**
 * Makes the move for AI in beginner level.
 */
function beginner() {
    myBox = getrandompos();
    while(myBox.innerHTML != "") {
        myBox = getrandompos();
    }

    myBox.innerHTML = comp;
}

/**
 * Makes the move for AI in intermediate mode.
 */
function intermediate() {
    if(checkCombo()) {
        return;
    }
    current_player = hum;
    if(checkCombo()) {
        return;
    } else {
        beginner();
        current_player = comp;
    }
}

/**
 * Makes the move for AI in hard mode.
 */
function hard() {
    if(checkCombo()) {
        return;
    }
    current_player = hum;
    if(checkCombo()) {
        return;
    } else {
        current_player = comp;
        if(try_for_win()) {
            return;
        } else {
            beginner();
        }
    }
}

/**
 * Evaluates if there is any winner in the current board state.
 * @returns {boolean}
 * true if a winner is found, false otherwise.
 */
function evaluate() {

    if (equalTriplet(1, 2, 3) || equalTriplet(4, 5, 6) || equalTriplet(7, 8, 9) ||
        equalTriplet(1, 4, 7) || equalTriplet(2, 5, 8) || equalTriplet(3, 6, 9) ||
        equalTriplet(1, 5, 9) || equalTriplet(3, 5, 7)) {
            if(mode_selected == "computer") {

                if(current_player == hum) {

                    document.getElementById('status').innerHTML = "Congratulations! You won.";
                } else {
                    document.getElementById('status').innerHTML = "Sorry, you lose!";
                }
            } else {
                document.getElementById('status').innerHTML = "Congratulations! " + current_player + " won.";
            }
            return true;
        }
        return false;
}

/**
 * Checks for a situtation of tie.
 * @returns {boolean}
 * returns true if it is a tie else false.
 */
function draw() {
    for(var i = 1; i < 10; i++) {
        if(document.getElementById("b" + i).innerHTML == ""){
            break;
        }
    }
    if(i == 10) {
        document.getElementById('status').innerHTML = "Match DRAW!!";
        return true;
    }
    return false;
}

/**
 * Takes three integer values and checks if the values inside the 
 * respective grid cells are equal and also equal to the current player. 
 * @param {integer} x 
 * @param {integer} y 
 * @param {integer} z 
 * 
 * @returns {boolean} true if all three are equal, else false.
 */
function equalTriplet(x, y, z) {
    let Xv = document.getElementById("b" + x).innerHTML;
    let Yv = document.getElementById("b" + y).innerHTML;
    let Zv = document.getElementById("b" + z).innerHTML;

    if (Xv == current_player && Yv == current_player && Zv == current_player) {
        return true;
    } else {
        return false;
    }
}

/**
 * Initiates the move by the AI agent according to the level selected.
 */
function computer_move() {
    
    if (level_selected == 'BEGINNER') {
        beginner();
    } else if (level_selected == 'INTERMEDIATE') {
        intermediate();
    } else if (level_selected == 'PRO') {
        hard();
    } else if (level_selected == 'UNBEATABLE') {
        best_move();
    }

    if (!evaluate() && !draw()) {
        document.getElementById('status').innerHTML = "Your turn!";
        current_player = hum;
    }
    for(var i = 1; i < 10; i++) {
        if (document.getElementById('b' + i).innerHTML == "") {
            document.getElementById('b' + i).style.cursor = "pointer";
        }
    }

}

/* Gets a random position on the grid. */
function getrandompos() {
    var num = Math.floor((Math.random() * 9) + 1);
    return document.getElementById('b' + num);
}

/**
 * Checks for vertical, horizontal and diagonal directions if a triplet
 * combination can be formed resulting in win.
 */
function checkCombo() {
    for (var j = 1; j <= 3; j++) {
        if (tripletcheck(j, j + 3, j + 3, j + 6, j)) {
            return true;
        } else if (tripletcheck(j + 3, j + 3, j + 6, j, j + 3)) {
            return true;
        } else if (tripletcheck(j, j, j + 6, j + 3, j + 6)) {
            return true;
        }
    }

    for (var j = 1; j <= 9; j += 3) {
        if (tripletcheck(j, j + 1, j + 1, j + 2, j)) {
            return true;
        } else if (tripletcheck(j + 1, j + 1, j + 2, j, j + 1)) {
            return true;
        } else if (tripletcheck(j, j, j + 2, j + 1, j + 2)) {
            return true;
        }
    }

    if (tripletcheck(1, 5, 5, 9, 1)) return true;
    if (tripletcheck(5, 5, 9, 1, 5)) return true;
    if (tripletcheck(1, 1, 9, 5, 9)) return true;

    if (tripletcheck(3, 5, 5, 7, 3)) return true;
    if (tripletcheck(5, 5, 7, 3, 5)) return true;
    if (tripletcheck(3, 3, 7, 5, 7)) return true;

    return false;
}

/**
 * Passes three different positions which can result in a win and checks if it is possible.
 * @param {integer} a 
 * @param {integer} b 
 * @param {integer} c 
 * @param {integer} tofill (position which is to be filled)
 * @param {integer} isblank (position to be checked for blank.)
 */
function tripletcheck(a, b, c, tofill, isblank) {
    if(equalTriplet(a,b,c) && (document.getElementById('b'+tofill).innerHTML == "") && (document.getElementById('b'+isblank) != "")) {
        current_player = comp;
        document.getElementById('b'+tofill).innerHTML = current_player;
        return true;
    }
    return false;
}

/**
 * Checks for horizontal, vertical and diagonal triplet by depth two if win is possible.
 */
function try_for_win() {
    if(winTriplet(9,5,1)) return true;
    if(winTriplet(7,5,3)) return true;
    if(winTriplet(9,1,5)) return true;

    if(winTriplet(7,3,5)) return true;
    if(winTriplet(5,1,9)) return true;
    if(winTriplet(5,3,7)) return true;

    for (var j = 1; j <= 9; j += 3) {
        if (winTriplet(j + 2, j + 1, j)) {
            return true;
        } else if (winTriplet(j + 2, j, j + 1)) {
            return true;
        } else if (winTriplet(j + 1, j, j + 2)) {
            return true;
        }
    }

    for (var j = 1; j <= 3; j++) {
        if (winTriplet(j + 6, j + 3, j)) {
            return true;
        } else if (winTriplet(j + 6, j, j + 3)) {
            return true;
        } else if (winTriplet(j + 3, j, j + 6)) {
            return true;
        }
    }

    return false;

}

/**
 * Takes up three different positions on the grid which cam result in a win. Fills the empty places.
 * @param {integer} a 
 * @param {integer} b 
 * @param {integer} c 
 * 
 * @returns {boolean} true if the position can be filled. False otherwise.
 */
function winTriplet(a, b, c) {
    let p = document.getElementById('b'+a);
    let q = document.getElementById('b'+b);
    let r = document.getElementById('b'+c);

    if(p.innerHTML == "" && q.innerHTML == "" && r.innerHTML == current_player) {
        if(Math.random() < 0.5) {
            p.innerHTML = current_player;
        } else {
            q.innerHTML = current_player;
        }
        return true;
    } else { 
        return false;
    }
}

/**
 * Makes the move for AI in unbeatable mode. Initiates MiniMax algorithm.
 */
function best_move() {

    if (first_move()) {
        let arr = [0, 2, 4, 6, 8];
        let spNum = Math.floor(Math.random() * arr.length);
        board[arr[spNum]] = comp;
        spNum = arr[spNum] + 1;
        document.getElementById('b' + spNum).innerHTML = comp;
        return;
    } else if (compute(board) == null) {

        let bestScore = -Infinity;
        let move = 0;

        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = comp;
                let score = minimax(board, 0, false);
                board[i] = "";

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        board[move] = comp;
        move++;
        document.getElementById('b' + move).innerHTML = comp;
    }

}

/* Checks if AI agent is making the first move in unbeatable mode. */
function first_move() {
    let check;
    for (let i = 0; i < 9; i++) {
        if (board[i] == "") check = true;
        else {check = false; break;}
    }
    return check;
}

/**
 * Implements the MiniMax algorithm to find the best move in optimal play.
 * @param {array} newBoard 
 * @param {integer} depth 
 * @param {boolean} isAI 
 * 
 * @returns {integer} theScores[...]
 */
function minimax(newBoard, depth, isAI) {
    let result = compute(newBoard);
    if (result != null) {
        return theScores[result];
    }

    if (isAI) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] == "") {
                newBoard[i] = comp;
                let score = minimax(newBoard, depth + 1, false) - depth;
                newBoard[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] == "") {
                newBoard[i] = hum;
                let score = minimax(newBoard, depth + 1, true) + depth;
                newBoard[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

/**
 * Takes up the board state and returns if there is a winner or a tie or none.
 * @param {array} board 
 */
function compute(board) {
    let winner = null;

    if (board[0] == board[1] && board[1] == board[2] && board[0] != "") winner = board[0];
    else if (board[3] == board[4] && board[4] == board[5] && board[3] != "") winner = board[3];
    else if (board[6] == board[7] && board[7] == board[8] && board[6] != "") winner = board[6];

    else if (board[0] == board[3] && board[3] == board[6] && board[0] != "") winner = board[0];
    else if (board[1] == board[4] && board[4] == board[7] && board[1] != "") winner = board[1];
    else if (board[2] == board[5] && board[5] == board[8] && board[2] != "") winner = board[2];

    else if (board[0] == board[4] && board[4] == board[8] && board[0] != "") winner = board[0];
    else if (board[2] == board[4] && board[4] == board[6] && board[2] != "") winner = board[2];

    let openSpots = 0;
    for (let i = 0; i < 9; i++) {
        if (board[i] == "") {
            openSpots++;
        }
    }

    if (winner == null && openSpots == 0) {
        return "tie";
    } else {
        return winner;
    }
}