var hypnoticballoon,balloonImage1,balloonImage2;
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  hypnoticballoon=createSprite(250,450,150,150);
  hypnoticballoon.addAnimation("hotAirBalloon",balloonImage1);
  hypnoticballoon.scale=0.5;

  var hypnoticballoonPosition = database.ref('balloon/position');
    hypnoticballoonPosition.on("value",readPosition,showError);

  textSize(20); 

}

// function to display UI
function draw() {
  background(bg);

  if(position!==undefined){
  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0)
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0)
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
    hypnoticballoon.scale = hypnoticballoon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10)
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
    hypnoticballoon.scale = hypnoticballoon.scale +0.01;  }
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
      'x': position.x+ x,
      'y': position.y+ y

  })
}

function readPosition(data){
  position = data.val();
  hypnoticballoon.x = position.x;
  hypnoticballoon.y = position.y;
}

function showError(){
  console.log("there is an error");
}
