var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cat, cat_running;
var ground, invisibleGround;

var obstaclesGroup,obstacle1
var power,power1

var score = 0
var gameOver,restart


function preload(){
cat_running = loadAnimation("cat.png","cat2.png","cat3.png","cat4.png")
obstacle1 = loadImage("cage.png")
gameOverImage = loadImage("gameover.png")
restartImage = loadImage("restart.png")
power1 = loadImage("fishpower.png")
}

function setup() {
 createCanvas(windowWidth,windowHeight)
 cat = createSprite(50,180,20,50);

 cat.addAnimation("running",cat_running);
 cat.scale= 0.5;

 ground = createSprite(200,190,400,10)
ground.x = ground.width/2;
ground.velocityX = -(6 + 3*score/100);
invisibleGround = createSprite(200,190,400,3)
invisibleGround.visible = false

gameOver = createSprite(300,100)
gameOver.addImage(gameOverImage)


restart = createSprite(300,140)
restart.addImage(restartImage)


gameOver.scale=0.5
restart.scale=0.5

gameOver.visible = false
restart.visible = false

obstaclesGroup = new Group()

score = 0
}
function draw() {
background("background.png")
text("Score: "+ score, 500,50)


if(gameState === PLAY){
    
if(keyDown("space")&& cat.y >= 159){
    cat.velocityY = -12
}
cat.velocityY = cat.velocityY + 0.8

if(ground.x < 0){
    ground.x = ground.width/2
}

cat.collide(invisibleGround)
spawnObstacles()

if (power1.isTouching(cat)) {
    power1.destroyEach();
    score=score+50;
  }


if(obstaclesGroup.isTouching(cat)){
    gameState = END
 }
}
else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;



    ground.velocityX = 0
    cat.velocityY = 0
    obstaclesGroup.setVelocityEach(0)

    obstaclesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
        reset()
    }
}
drawSprites()
}
function spawnObstacles(){
    if(frameCount % 60 === 0){
var rand = math.round(random(1));
switch(rand){
    case 1: obstacle.addImage(obstacle1);
    break

    default: break;
}
obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle)
}
}
function reset(){
    gameState = PLAY
    gameOver.visible = false
    restart.visible = false

    obstaclesGroup.destroyEach()
    
    cat.changeAnimation("running",cat_running)


    score = 0
}


























