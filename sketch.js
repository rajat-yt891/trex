var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cloudsGroup, obstaclesGroup;  
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0;
var gameoverimage, restartimage;
var gameOver, restart;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameoverimage = loadImage("gameOver.png")
    restartimage = loadImage("restart.png")

  groundImage = loadImage("ground2.png")
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
gameOver = createSprite(200,300);
restart = createSprite(200,340);
gameOver.addImage("gameOver", gameoverimage);
gameOver.scale = 0.5;
restart.addImage("restart", restartimage);
restart.scale = 0.5;
  
}

function draw() {
  background(000);
  if(gameState === PLAY) {
    ground.velocityX = -2;
    
    count = Math.round(frameCount/4);
    
    if(keyDown("space") && trex.y >= 161.5) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
     spawnClouds();
  spawnObstacles();
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }
    
  }else if(gameState === END) {
    ground.velocityX = 0;
    
     trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    
    trex.changeAnimation("trex1", trex_collided);   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
restart.visible = true;
    
    count = 0; 
  }
  
  text("Score: "+ count, 290, 10);
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    obstaclesGroup.add(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
         case 1:obstacle.addImage("obstacle1", obstacle1);
        break;
         case 2:obstacle.addImage("obstacle2", obstacle2);
        break;
         case 3:obstacle.addImage("obstacle3", obstacle3);
        break;
         case 4:obstacle.addImage("obstacle4", obstacle4);
        break;
         case 5:obstacle.addImage("obstacle5", obstacle5);
        break;
         case 6:obstacle.addImage("obstacle6", obstacle6);
        break;
        default:
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  }
}