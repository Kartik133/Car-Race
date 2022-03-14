var backGround_Image,backGround;

var carImage,car;

var checkPoint_Image,checkPoint;

var obstacle_Image,obstacleGroup,obstacle;

var restart_Image,restart;

var gameOver_Image,gameOver;

var SERVE = 1;

var PLAY = 2;

var END = 0;

var gameState = SERVE;

var fuel_Image,fuel,fuel2,fuelGroup;

var remainingFuel = 20;

var coin_Image,coin,coin2,coin3,coinGroup;

var i;

var rand,rando;

var score = 0;

var button;



var x = 0;

function preload(){

 backGround_Image = loadImage("background.png");

 car_Image = loadImage("car.png");

 obstacle_Image = loadImage("obstacle.png");

 fuel_Image = loadImage("fuel.png");

 coin_Image = loadImage("coin.png");

}



function setup() {
 
 createCanvas(400,400);



 backGround = createSprite(300,210,600,600);

 backGround.addImage("background",backGround_Image);

 backGround.scale = 1.7;

 backGround.velocityX = -7;


 car = createSprite(100,200);

 car.addImage("car",car_Image);

 car.scale = 0.04;


 fuel = createSprite(20,20);

 fuel.addAnimation("fuel",fuel_Image);

 fuel.scale = 0.01;

  
 
 obstacleGroup = new Group();


 coinGroup = new Group();

 fuelGroup = new Group();

}



function draw() {

 background("white");

console.log(x);
 
 frameRate(60);

 drawSprites();
 
 

if(gameState===SERVE) {
  
   textSize(25);
  
   stroke("white");

   fill("black");

   text("Press Space To On",80,150);

   
obstacleGroup.setVelocityXEach(0);

   backGround.velocityX = 0;

   obstacleGroup.setLifetimeEach(-1);

   coinGroup.setVelocityXEach(0);

   fuelGroup.setVelocityXEach(0);

   

   if(keyDown("space")) {

   gameState = PLAY;
  
   }
 
 }
  
 

 if(backGround.x < 0) {

  backGround.x = backGround.width/2;

 }


 if(gameState===PLAY) {

    backGround.velocityX = -7;

   
 if(keyDown("up_Arrow")) {

     car.y = car.y - 4;
  
    }
   
  
   
    if(keyDown("down_Arrow")) {

      car.y = car.y + 4;
  
    }
   
  

    remainingFuel = remainingFuel - int(x);


    x+=0.0001;

    
points();

    energy();

  
    if(car.isTouching(coinGroup)) {

      coinGroup.destroyEach();

      score = score + 1;

    }
    
    if(car.isTouching(fuelGroup)) {

      fuelGroup.destroyEach();

      remainingFuel = remainingFuel + 10;

    }

  
  textSize(25);

    stroke("white");
  
  fill("black");

    text("Score : " + score,150,30);


  
  if(obstacleGroup.isTouching(car) || remainingFuel===0) {

      gameState = END;
  
    }
 
 }


 if(gameState===END) {

  obstacleGroup.setVelocityXEach(0);

  backGround.velocityX = 0;

  obstacleGroup.setLifetimeEach(-1);

  coinGroup.setVelocityXEach(0);

  coinGroup.setLifetimeEach(-1);

  fuelGroup.setVelocityXEach(0);

  fuelGroup.setLifetimeEach(-1);

  
  textSize(25);

  stroke("white");

  fill("black");

  text("Game Over",130,150);

  textSize(25);

  stroke("white");

  fill("black");

  text("Score : " + score,150,180);

  textSize(25);

  stroke("white");

  fill("black");

  text("Press R To Restart",90,210);


  if(keyDown("r")) {

   obstacleGroup.destroyEach();

   coinGroup.destroyEach();

   fuelGroup.destroyEach();

   remainingFuel = 20;

   score = 0;

   car.y = 200;

   gameState = SERVE;

  }
 
 } 
 
 
 
 obstacles();


 textSize(20);

 stroke("white");

 fill("black");

 text(remainingFuel + "L",40,30);

}



function energy() {

  if(frameCount%300===0) {

    rando = Math.round(random(1,2));

    
    
    switch(rando) {

      case 1:fuel2 = createSprite(400,100);

             fuel2.addAnimation("fuel2",fuel_Image);

             fuel2.scale = 0.02;

             fuel2.velocityX = -7;

             fuelGroup.add(fuel2);
  
    break;



      case 2:fuel2 = createSprite(400,300);

             fuel2.addAnimation("fuel2",fuel_Image);

             fuel2.scale = 0.02;

             fuel2.velocityX = -7;

             fuelGroup.add(fuel2);
      break;

    }
  
  }

}



function obstacles() {

 if(frameCount % 200===0) {

  obstacle = createSprite(450,0);

  obstacle.y = car.y;

  obstacle.addImage("obstacle",obstacle_Image);

  obstacle.scale = 0.5;

  obstacle.velocityX = -7;

  obstacle.lifetime = 400;

  obstacleGroup.add(obstacle);

 }

}



function points() {


 if(frameCount%80===0) {

  rand = Math.round(random(1,3));

  
  
  switch(rand) {

   case 1: for(i = 400; i < 490; i = i + 30) {
   
           coin = createSprite(i,100);

              coin.addAnimation("coin",coin_Image);

              coin.scale = 0.05;

              coin.velocityX = -7;

              coin.lifetime = 200;
 
              coinGroup.add(coin);

           }

   break;



   case 2: for(i = 400; i < 520; i = i + 30) {
    
          coin = createSprite(i,200);

              coin.addAnimation("coin",coin_Image);
 
              coin.scale = 0.05;
  
            coin.velocityX = -7;

              coin.lifetime = 200;

              coinGroup.add(coin);

           }

   break;



   case 3: for(i = 400; i < 550; i = i + 30) {
              coin = createSprite(i,300);
  
            coin.addAnimation("coin",coin_Image);
  
            coin.scale = 0.05;

              coin.velocityX = -7;

              coin.lifetime = 200;

              coinGroup.add(coin);

           }  
   
   break;


   
default:break;

  }
 
 }

}
