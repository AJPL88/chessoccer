'use strict';
const board = document.getElementById('checker-board');
var whitePieces = [];
var blackPieces = [];
const squareWidth = 50;
const boardDim = [11, 15];

function pointToTLPxl(file, rank) {
    return [squareWidth * file, squareWidth * rank];
}

function pointTToTLPxl(pos) {
    return [squareWidth * pos[0], squareWidth * pos[1]];
}

function TLPxlToPoint(x, y) {
    return [Math.floor(x / squareWidth), 14 - Math.floor(y / squareWidth)];
}



// _ _ _ _ p p p _ _ _ _
// _ p p p N Q N p p p _
// p R _ B B K B B _ R p

class Piece {
    // File: |
    // Rank: -
    constructor(name, file, rank, color) {
        this.name = name;
        this.file = file;
        this.rank = rank;
        this.color = color;
    }

    getMoves() {
        let moves = [];
        for (let f = 0; f < boardDim[0]; f++) {
            for (let r = 0; r < boardDim[1]; r++) {
                // console.log(f, r)
                if (this.canMove(f, r)) {
                    moves.push([f, r]);
                }
            }
        }

        return moves;
    }
}


class Ball {
    // File: |
    // Rank: -
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
    }
}

class Pawn extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-pawn-" + number, file, rank, color);
    }

    canMove(file, rank) {
        let capturable = getPiece(file, rank);
        let capturableColor = capturable ? capturable.color : false;

        if (capturableColor == this.color) { return false; }

        //console.log((this.color == "white" ? "black" : "white"));
        if ((capturableColor == ((this.color == "white") ? "black" : "white"))
            && Math.abs(file - this.file) == 1
            && Math.abs(rank - this.rank) == 1) { return true; }

        if (!getPiece(file, rank)
            && (file == this.file)
            && (rank == this.rank + 1 || rank == this.rank - 1)) { return true; }

        return false;
    }
}

class Knight extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-knight-" + number, file, rank, color)
    }
    canMove(file, rank) {
        let capturable = getPiece(file, rank);
        let capturableColor = capturable ? capturable.color : false;

        if (capturableColor == this.color) { return false; }

        if (Math.abs(file - this.file) == 1
            && Math.abs(rank - this.rank) == 2) { return true; }

        if (Math.abs(file - this.file) == 2
            && Math.abs(rank - this.rank) == 1) { return true; }

        return false;
    }
}

class Bishop extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-bishop-" + number, file, rank, color)
    }
    canMove(file, rank) {
        if (Math.abs(file - this.file) != Math.abs(rank - this.rank)) { return false; }

        let capturable = getPiece(file, rank);
        let capturableColor = capturable ? capturable.color : false;
        if (capturableColor == this.color) { return false; }

        let dir = [Math.sign(file - this.file), Math.sign(rank - this.rank)];

        for (let i = 1; (((this.file + dir[0] * i) * dir[0]) < (file * dir[0])) &&
            (((this.rank + dir[1] * i) * dir[1]) < (rank * dir[1])); i++) {

            if (getPiece(this.file + dir[0] * i, this.rank + dir[1] * i)) {
                return false;
            }
        }
        return true;
    }
}

class Rook extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-rook-" + number, file, rank, color)
    }
    canMove(file, rank) {
        if (!((file - this.file == 0) ^ (rank - this.rank == 0))) { return false; }

        let capturable = getPiece(file, rank);
        let capturableColor = capturable ? capturable.color : false;
        if (capturableColor == this.color) { return false; }

        let f = Math.sign(file - this.file);
        let r = Math.sign(rank - this.rank);

        if (r != 0) {
            for (let i = 1; r * (this.rank + i * r) < (rank * r); i++) {
                if (getPiece(this.file, this.rank + r * i)) {
                    return false;
                }
            }
        }

        if (f != 0) {
            for (let i = 1; f * (this.file + i * f) < (file * f); i++) {
                if (getPiece(this.file + f * i, this.rank)) {
                    return false;
                }
            }
        }

        return true;
    }
}

class King extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-king-" + number, file, rank, color)
    }
    canMove(file, rank) {
        let capturable = getPiece(file, rank);
        let capturableColor = capturable ? capturable.color : false;

        if (capturableColor == this.color) { return false; }

        if (rank == this.rank && file == this.file) { return false; }

        if (Math.abs(file - this.file) <= 1
            && Math.abs(rank - this.rank) <= 1) { return true; }

        return false
    }
}

class Queen extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-queen-" + number, file, rank, color)
    }
    canMove(file, rank) {

        let bf = 0;

        if (Math.abs(file - this.file) != Math.abs(rank - this.rank)) { bf++; }

        let capturable = getPiece(file, rank);
        let capturableColor = capturable ? capturable.color : false;
        if (capturableColor == this.color) { return false; }

        let dir = [Math.sign(file - this.file), Math.sign(rank - this.rank)];

        for (let i = 1; ((this.file + dir[0] * i) * dir[0] < file * dir[0]) &&
            ((this.rank + dir[1] * i) * dir[1] < rank * dir[1]); i++) {

            if (getPiece(this.file + dir[0] * i, this.rank + dir[1] * i)) {
                bf++;
            }
        }

        let rf = 0;

        if (!((file - this.file == 0) ^ (rank - this.rank == 0))) { rf++; }

        let f = Math.sign(file - this.file);
        let r = Math.sign(rank - this.rank);

        if (r != 0) {
            for (let i = 1; r * (this.rank + i * r) < (rank * r); i++) {
                if (getPiece(this.file, this.rank + r * i)) {
                    rf++;
                }
            }
        }

        if (f != 0) {
            for (let i = 1; f * (this.file + i * f) < (file * f); i++) {
                if (getPiece(this.file + f * i, this.rank)) {
                    rf++;
                }
            }
        }
        return !(rf && bf);
    }
}

const pawnPositions = [[0, 0],
[1, 1], [2, 1], [3, 1],
[4, 2], [5, 2], [6, 2],
[7, 1], [8, 1], [9, 1],
[10, 0]];
const bishopPositions = [[3, 0], [4, 0], [6, 0], [7, 0]];
const rookPositions = [[1, 0], [9, 0]];
const kingPositions = [[5, 0]];
const queenPositions = [[5, 1]];
const knightPositions = [[4, 1], [6, 1]];

function setPieces(type, positions) {
    let out = [];
    for (let i = 1; i <= positions.length; i++) {
        out.push(new type(positions[i - 1][0], positions[i - 1][1], 'white', i));
        out.push(new type(positions[i - 1][0], 14 - positions[i - 1][1], 'black', i));
    }
    return out;
}

function drawPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        // console.log(pieces[i]);
        let piece = document.getElementById(pieces[i].name);
        let pos = pointTToTLPxl([pieces[i].file, 14 - pieces[i].rank]);
        piece.style.top = pos[1];
        piece.style.left = pos[0];
    }
}

function drawBall(b) {
    let elem = document.getElementById("ball");
    let pos = pointToTLPxl(b.file, b.rank);
    elem.style.top = pos[1];
    elem.style.left = pos[0];
}

function updateBoard() {
    drawPieces(pieces);
    drawBall(ball);
}

//set initial board
var pieces = [];
var ball = new Ball(5, 7);
pieces = pieces.concat(setPieces(Pawn, pawnPositions));
pieces = pieces.concat(setPieces(Bishop, bishopPositions));
pieces = pieces.concat(setPieces(Rook, rookPositions));
pieces = pieces.concat(setPieces(King, kingPositions));
pieces = pieces.concat(setPieces(Queen, queenPositions));
pieces = pieces.concat(setPieces(Knight, knightPositions));
updateBoard();

function getPiece(file, rank) {
    let out = false;
    pieces.forEach(p => {
        if ((p.file == file) && (p.rank == rank)) { out = p; }
    })
    return out;
}

function isBall(file, rank) { return ((ball.rank == rank) && (ball.file == file)); }

// var mouseDown = false;
// document.getElementById("body").addEventListener('mousedown', (e) => { click(e); mouseDown = true; }, false);
// document.getElementById("body").addEventListener('mouseup', (e) => { mouseDown = false; }, false);
// function click(e) {
//     while (mouseDown) {
//         console.log(e.target.id);
//     }
// }

var mouseDown = 0;
var curDragElem;
var curDragPiece;
var ofile;
var orank;
document.body.onmousedown = function(event) {
    if (event.button == 0) {
        mouseDown = 1;
        // console.log(mouseDown);
        curDragElem = event.target;
        console.log(curDragElem.id);
        if (curDragElem.id == "checker-board") {
            console.log("CHESSBOARD");
            console.log(" ");
            curDragElem = null;
            return;
        }
        if (curDragElem.id == "ball") {
            console.log("dont touch my balls");
            console.log(" ");
            curDragElem = null;
            return;
        }
        if (!curDragElem.id.includes("black") && !curDragElem.id.includes("white")) {
            console.log("not a piece");
            console.log(" ");
            curDragElem = null;
            return;
        }
        let divi = document.getElementById(curDragElem.id);
        divi.style.zIndex = 69420;

        let ofr = TLPxlToPoint(Number(divi.style.left.replace("px", "")) + 25,
            Number(divi.style.top.replace("px", "")) + 25);
        ofile = ofr[0];
        orank = ofr[1];
        curDragPiece = getPiece(ofile, orank);

        showHints(curDragPiece);

        console.log("" + ofile + ", " + orank);
        console.log(getPiece(ofile, orank))
        console.log(" ");
    }

}

document.body.onmouseup = function(event) {
    if (event.button == 0) {
        --mouseDown;
        // console.log(mouseDown);
        // console.log(event.target.id);
        if (!curDragElem) { return; }

        hideHints();

        let divi = document.getElementById(curDragElem.id);
        divi.style.zIndex = 1;

        let ffr = TLPxlToPoint(Number(divi.style.left.replace("px", "")) + 25,
            Number(divi.style.top.replace("px", "")) + 25);
        let ffile = ffr[0];
        let frank = ffr[1];

        if (!curDragPiece.getMoves().find((c) => c[0] == ffile && c[1] == frank)) {
            let pxl = pointToTLPxl(ofile, 14 - orank);
            divi.style.left = pxl[0]
            divi.style.top = pxl[1]

            return;
        }

        let capturable = getPiece(ffile, frank)
        if (capturable) {
            // pieces.forEach((x) => {if (x.name == capturable.name) {dele}})
            for (let i = pieces.length - 1; i >= 0; i--) {
                if (pieces[i].name == capturable.name) {
                    // delete pieces[i];
                    pieces.splice(i, 1);
                    break;
                }
            }
            document.getElementById(capturable.name).remove();
        }

        curDragPiece.file = ffile;
        curDragPiece.rank = frank;
        let pxl = pointToTLPxl(ffile, 14 - frank);
        divi.style.left = pxl[0]
        divi.style.top = pxl[1]

        if (isBall(ffile, frank)) {
            let ballMov = [ffile - ofile, frank - orank];
            let k = false;
            if ((Math.abs(ballMov[0]) == 2 && Math.abs(ballMov[1]) == 1) || (Math.abs(ballMov[0]) == 1 && Math.abs(ballMov[1]) == 2)) { k = true; }
            let balldiv = document.getElementById("ball");

            //collisions
            if (!k) {
                
            }

            let oldballpxl = pointToTLPxl(ball.file, 14 - ball.rank);
            ball.file += ballMov[0];
            ball.rank += ballMov[1];
            let ballpxl = pointToTLPxl(ball.file, 14 - ball.rank);

            //ANIMATE
            // console.log(balldiv.children.item(0));
            CoolAnimation(balldiv, oldballpxl[0], oldballpxl[1], ballpxl[0], ballpxl[1], 1000);
            // balldiv.style.left = ballpxl[0];
            // balldiv.style.top = ballpxl[1];
            balldiv.style.zindex = 1;
            let capture = getPiece(ball.file, ball.rank);
            if (capture) {
                for (let i = pieces.length - 1; i >= 0; i--) {
                    if (pieces[i].name == capture.name) {
                        // delete pieces[i];
                        pieces.splice(i, 1);
                        document.getElementById(capture.name).remove();
                    }
                }
            }
        }


    }
}

function CoolAnimation(elem, startPosLeft, startPosTop, endPosLeft, endPosTop, ms) {
    elem.children.item(0).setAttribute("src", "assets/ballin.gif");
    let t = 0;
    let iv = setInterval(() => {
        elem.style.left = (1 - t) * (startPosLeft) + t * endPosLeft;
        elem.style.top = (1 - t) * (startPosTop) + t * endPosTop;
        t += 1 / 130
    }, ms / 120)
    setTimeout(() => {
        clearInterval(iv);
        elem.children.item(0).setAttribute("src", "assets/ball.png");
        elem.style.left = endPosLeft;
        elem.style.top = endPosTop;
    }, ms)
}

document.body.onmousemove = function(event) {
    if (mouseDown == 1) {
        if (curDragElem) {
            let divi = document.getElementById(curDragElem.id);
            let board = document.getElementById("checker-board").getBoundingClientRect();
            divi.style.top = event.pageY - 40 - board.top;
            divi.style.left = event.pageX - 35 - board.left;
        }
    }
}

function showHints(piece) {
    let moves = piece.getMoves();
    moves.forEach((m) => {
        let hint = document.createElement('div');
        hint.setAttribute("id", "hint");

        let pxl = pointToTLPxl(m[0], 14 - m[1]);
        hint.style.left = pxl[0] + 50 / 2 - 15 / 2;
        hint.style.top = pxl[1] + 50 / 2 - 15 / 2;

        document.getElementById("checker-board").appendChild(hint);
    })
}
function hideHints() {
    document.querySelectorAll("[id = 'hint']").forEach((h) => h.remove());
}