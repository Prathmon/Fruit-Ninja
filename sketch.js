var sword, sword_Image,game_Over,sword_Sound,gamove_Sound;

var PLAY = 1;
var END = 0;
var gamestate = 1;
var score = 0;

var fruitGroup, alienGroup;
var fruit,fruit1, fruit2, fruit3, fruit4;
var alien,alien_Image;

function preload() {
  sword_Image = loadImage("sword.png");
  game_Over = loadImage("gameover.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alien_Image = loadAnimation("alien1.png","alien2.png");
  
  sword_Sound = loadSound("knifeSwooshSound.mp3");
  gamove_Sound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(400, 400);

  sword = createSprite(40, 200, 20, 20);
  sword.addImage("swo", sword_Image);
  sword.addImage("gamove",game_Over);
  sword.scale = 0.7;

  fruitGroup = new Group();
  alienGroup = new Group();

}

function draw() {
  background(220);
  
  if(gamestate === PLAY){
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      sword_Sound.play();
      score = score + 2;
    }
   
  }
  
  text("Score = "+score,340,50);
  spawnFruits();
  spawnAliens();
  
  if(alienGroup.isTouching(sword)) {
    gamestate = END;
    gamove_Sound.play();
  }

  if(gamestate === END){
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    alienGroup.setVelocityXEach(0);
    sword.changeImage("gamove",game_Over);
    sword.x = 200;
    sword.y = 200;
  }
  
  if(score === 4){
    
  }
  
  drawSprites();
}

function spawnFruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    var rup = Math.round(random(1, 2));
    console.log(rup);
    if(rup === 1){
      fruit.x = 0;
      fruit.velocityX = 7+score/4;
    }
    else if(rup === 2){
      fruit.x = 400;
      fruit.velocityX = -(7+score/4);
    }
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
    if (r === 1) {
      fruit.addImage("fr", fruit1);
    } else if (r === 2) {
      fruit.addImage("fru", fruit2);
    } else if (r === 3) {
      fruit.addImage("frui", fruit3);
    } else if (r === 4) {
      fruit.addImage("ft", fruit4);
    }
    fruit.y = random(50, 340);
    fruit.lifetime = 150;
    fruitGroup.add(fruit);
  }
}

function spawnAliens(){
  if(frameCount % 200 === 0){
    alien = createSprite(400,200,20,20);
    alien.addAnimation("running",alien_Image);
    alien.y = random(100,300);
    alien.velocityX = -(8+score/10);
    alien.lifetime = 150;
    alienGroup.add(alien);
  }
}