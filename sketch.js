var w = 550, h = 550;
var rows = 8, cols = 8;
let wid = w/cols, hgt = h/rows;

var weight = 5; //stroke weight

var board = [];
var numPlayers = 2;
var turn = 0;
var clicked = true;

// var colours = ['6464ff','64ff64','ff6464'];
var colours = [[100,100,255],[100,255,100],[255,100,100]];
var players = [];


function setup() {
  createCanvas(w,h);
  // create board cells
  for(let i = 0; i < cols; i++){
    board[i] = [];
    for(let j = 0; j < rows; j++){
      board[i][j] = new Cell(i*wid,j*hgt,wid,hgt);
      board[i][j].setNeighbours(cols,rows);
    }
  }
  //create player list
  for(let i = 0; i < numPlayers; i++){
    players[i] = new Player(colours[i],i);
  }
}

function mouseClicked() {
  let x_ = floor(mouseX/wid), y_ = floor(mouseY/hgt);
  turn = board[x_][y_].changeStates(turn,board,colours[turn]) % players.length;

  for(let n = players.length - 1; n >= 0; n--){
    let temp = 0;
    for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        if(board[i][j].Owner == n){temp++;}
      }
    }
    if(temp == 0){
      if(players[n].numCells >= 0){players.splice(n,1);}
      else {players[n].numCells++;}
    } else {players[n].numCells = temp;}
  }
  // setTimeout(function() {if(players.length == 1){alert("Game Over")}},1000);

  clicked = !clicked;
}

function draw() {
  strokeWeight(weight);
  stroke(50);

  // draw cells
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      board[i][j].update();
      // if(clicked){
      //
      //   clicked = !clicked;
      // }
    }
  }

}
