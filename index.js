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

// class Ball {
//     //TODO!
// }

class Pawn extends Piece {
    constructor(file, rank, color, number) {
        super("" + color + "-pawn-" + number, file, rank, color)
    }
    canMove(file, rank) {
        //TODO!
        console.log(this.file);
        console.log(this.rank);
        console.log("" + file + ", " + rank)
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
const kingPositions = [[0, 5]];
const queenPositions = [[1, 5]];

function setPieces(type, positions) {
    var out = [];
    for (var i = 1; i <= positions.length; i++) {
        out.push(new type(positions[i - 1][0], positions[i - 1][1], 'white', i));
        out.push(new type(positions[i - 1][0], 14 - positions[i - 1][1], 'black', i));
    }
    return out;
}

function drawPieces(pieces) {
    for (var i = 0; i <= pieces.length; i++) {
        console.log(pieces[i].name);
        var piece = document.getElementById(pieces[i].name);
        var pos = pointTToTLPxl([pieces[i].file, pieces[i].rank]);
        piece.style.top = pos[1];
        piece.style.left = pos[0];
    }
}

//set initial board
var pieces = [];
pieces = pieces.concat(setPieces(Pawn, pawnPositions));
// pieces.concat(setPieces(Bishop, bishopPositions));
// pieces.concat(setPieces(Rook, rookPositions));
// pieces.concat(setPieces(King, kingPositions));
// pieces.concat(setPieces(Queen, queenPositions));
drawPieces(pieces);