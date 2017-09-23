function Cell(x,y,x_,y_) {
  this.posX = x;
  this.posY = y;
  this.width = x_;
  this.height = y_;

  this.index = [x/x_, y/y_];
  this.neighbours = [];
  this.max = 4;

  this.setNeighbours = function(cols,rows){
    let pX = this.index[0], pY = this.index[1];

    if(pX > 0){this.neighbours.push([pX-1,pY])}
    if(pX < cols-1){this.neighbours.push([pX+1,pY])}
    if(pY > 0){this.neighbours.push([pX,pY-1])}
    if(pY < rows-1){this.neighbours.push([pX,pY+1])}

    this.max = this.neighbours.length;
  }

  this.state = 0;
  this.Owner = -1;

  this.colour = [100,102,255];
  this.fill = function(){
      // change fill when cursor over cell
      if(mouseX > this.posX && mouseY > this.posY && mouseX < this.posX + this.width && mouseY < this.posY + this.height){
        return [200,255,200]
      } else {return 255}
  }

  this.drawState = function(){
    let cenX = this.posX + this.width/2, cenY = this.posY + this.height/2;
    push();
    translate(cenX,cenY);
    fill(this.colour);
    strokeWeight(2);
    for(let i = 0; i < this.state; i++){
      ellipse(-15+i*10,-15+i*10,20,20);
    }
    pop();
  }

  // When cell clicked, check if it's owned by player. If it is, increment state.
  // Then, check if state more then max. If it is, change state to 0 and increment states of neighbours

  this.changeStates = function(player,array,c){
    if(this.Owner == -1 || this.Owner == player){
      this.Owner = player;
      this.colour = c;
      this.state++;

      if(this.state >= this.max){
        this.state = 0;
        this.Owner = -1;
        for(let i = 0; i < this.neighbours.length; i++){
          let n = this.neighbours[i], m = array[n[0]][n[1]];
          m.Owner = this.Owner;
          m.states++;
          m.changeStates(player,array,c);
        }
      }
      return player+1
    } else {return player}
  }

  this.update = function(turn){
    fill(this.fill());
    rect(this.posX,this.posY,this.width,this.height);
    this.drawState();
  }

}

function Player(color,turn){
  this.colour = color;
  this.alive = 1;
  this.numCells = -1-turn;


}
/*
init a list of players
when checking validity of turn, check first if player is alive, then check if tile is player's
*/
