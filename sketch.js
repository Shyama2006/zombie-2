var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombies;
var zombiesImg;
var zombiesGroup;
var shooterfall;
var blastImg;
var bullet;
var bulletGroups;
var heart1,heart2,heart3;
var h1,h2,h3;
var gameState="play";
//var score=0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombiesImg= loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  shooterfall = loadImage("assets/shooter_fall.png");
  blastImg = loadImage("assets/blast.webp");
  h1= loadImage("assets/heart_1.png");
  h2= loadImage("assets/heart_2.png");
  h3= loadImage("assets/heart_3.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  zombiesGroup=new Group();
 bulletGroups=new Group();

 

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.5;
  
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300);

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",h1)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",h2)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",h3)
    heart3.scale = 0.4


}



function draw() {
  background(0); 

  

if(gameState==="play"){

  
  //stroke("yellow");
  //textSize(20);
   
  

Spawnzombies();

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player. x= player.x-30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
 player.x = player.x+30;
}

  
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  player.addImage(shooter_shooting)
  bullet = createSprite(player.x+50,player.y-20,15,5);
  bullet.velocityX= 5;
  player.depth=bullet.depth;
  player.depth=player.depth+2;
  bulletGroups.add(bullet);
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
}


if(zombiesGroup.isTouching(player)){
  player.addImage(shooterfall);
}
if(zombiesGroup.isTouching(bulletGroups)){
  for(var i=0;i<zombiesGroup.length;i++){     
      
   if(zombiesGroup[i].isTouching(bulletGroups)){
        zombiesGroup[i].destroy()
        //text("Score="+score,displayWidth-150,20);
      
        bulletGroups.destroyEach()
        //score=+10;
   }
        } 
      }


drawSprites();

}

function Spawnzombies(){
    if (frameCount % 100 === 0) {
      var zombies = createSprite(width, Math.round(random(200,500)),40,10);
      zombies.addImage(zombiesImg);
      zombies.scale = 0.15;
      zombies.velocityX = -3;
      
       //assign lifetime to the variable
      zombies.lifetime = 500;
      
      //add each cloud to the group
      zombiesGroup.add(zombies);
    }
    
}

