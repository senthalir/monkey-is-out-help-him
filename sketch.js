var PLAY=1
var END=0

var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var love=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,400) 
  
monkey=createSprite(100,300)
monkey.addAnimation("m",monkey_running)
  monkey.scale=0.15
  bananaGroup=new Group()
  ground=createSprite(400,370,800,50) 
 ground.shapeColor="green"
  obstacleGroup=new Group()
  monkey.setCollider("circle",0,0,300)
  monkey.debug=true
  
}


function draw() {
 background(220)
  fill("black")
  textSize(22)
  text("Survival Score:  "+ score+"   Happiness: "+ love,150,50)
  monkey.collide(ground)
 
if(gameState===PLAY){
  score=score+((frameCount%30===0))
   monkey.velocityY=monkey.velocityY+0.5
 if(keyWentDown("space")&&monkey.y>250){
    monkey.velocityY=-random(13,16)
  }
   
  
ground.velocityX=-3
  if(ground.x<200){
    ground.x=400
  } 
   spawnBananas() 
  
  spawnObstacles()
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.bounceOff(monkey)
    love=love+10
  }
  

  if(monkey.isTouching(obstacleGroup)){
    
    ground.velocityX=0
    monkey.velocityY=0
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    gameState=END
  }
} else if(gameState===END){
  love=0
  obstacleGroup.setLifetimeEach(-1)
  bananaGroup.setLifetimeEach(-1)
} 
  
  

  
  
  
  
  drawSprites()
}
function spawnBananas(){
  
if(frameCount%80===0) { 
banana=createSprite(600,random(50,200))
banana.velocityX=-3 
  banana.addImage("baba",bananaImage)
  banana.scale=0.15
  bananaGroup.add(banana)
 banana.lifetime=200
}  
}

function spawnObstacles(){
  
if(frameCount%100===0) { 
obstacle=createSprite(600,300)
obstacle.velocityX=-(7+score/30)
  obstacle.setCollider("circle",0,0,180 )
  obstacle.debug=true
  obstacle.addImage("babu",obstacleImage)
  obstacle.scale=0.3
  obstacleGroup.add(obstacle)
 obstacle.lifetime=100
}  
}




