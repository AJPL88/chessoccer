'use strict';
const board = document.getElementById('checker-board');
var whitePieces = [];
var blackPieces = [];
const squareWidth = 50;
const boardDim = (11, 15);

function pointToTLPxl(file, rank) {
    return [squareWidth * file, squareWidth * rank];
}

function pointTToTLPxl(pos) {
    return [squareWidth * pos[0], squareWidth * pos[1]];
}

function TLPxlToPoint(x, y) {
    return [Math.floor(x / squareWidth), Math.floor(y / squareWidth)];
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
}


class Ball {
    //File: |
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
        // if ((isPiece(file, rank).color == (this.color == "white" ? "black" : "white") )
        //     && (file == this.file + 1 || file == this.file - 1)
        //     && (rank == this.file + 1 || rank == this.file -1) { return true; }

        // if (!i)
    }
}

class Knight extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-knight-" + number, file, rank, color)
    }
    canMove(file, rank) {
        if (Math.abs(file - this.file) == 1 && Math.abs(rank-this.rank) == 2) { return true; }
        if (Math.abs(file - this.file) == 2 && Math.abs(rank-this.rank) == 1) { }
        //TODO!
    }
}

class Bishop extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-bishop-" + number, file, rank, color)
    }
    canMove(file, rank) {
        //TODO!
        console.log(this.file);
        console.log(this.rank);
        console.log("" + file + ", " + rank)
    }
}

class Rook extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-rook-" + number, file, rank, color)
    }
    canMove(file, rank) {
        //TODO!
        console.log(this.file);
        console.log(this.rank);
        console.log("" + file + ", " + rank)
    }
}

class King extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-king-" + number, file, rank, color)
    }
    canMove(file, rank) {
        //TODO!
        console.log(this.file);
        console.log(this.rank);
        console.log("" + file + ", " + rank)
    }
}

class Queen extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-queen-" + number, file, rank, color)
    }
    canMove(file, rank) {
        //TODO!
        console.log(this.file);
        console.log(this.rank);
        console.log("" + file + ", " + rank)
    }
}

//white
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
        out.push(new type(positions[i - 1][0], 14 - positions[i - 1][1], 'white', i));
        out.push(new type(positions[i - 1][0], positions[i - 1][1], 'black', i));
    }
    return out;
}

function drawPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        console.log(pieces[i]);
        let piece = document.getElementById(pieces[i].name);
        let pos = pointTToTLPxl([pieces[i].file, pieces[i].rank]);
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

function isPiece(file, rank) {
    let out = false;
    pieces.forEach(p => {
        if ((p.file == file) && (p.rank == rank)) { out = p; }
    })
    return out;
}

function isBall(file, rank) { return ((ball.rank == rank) && (ball.file == file)); } 


window.addEventListener('click', click);

function click(e) {
    console.log(e.target);
    console.log(e.target.id);
}