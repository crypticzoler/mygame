var bg,bgimg
var ss,ss1
var alien,ss2,ss3,ss4,ss5,ss6,ufo
var aliengroup,lasergroup
var laser,laserimg
var score = 0
var gameState = 'play'
var gameover,gameoverimg
var restart,restartimg
var walltop,wallbottom

function preload(){
   bgimg = loadImage("assets/bg1.jpg")
   ss2 = loadImage("assets/ss2.png")
   ss3 = loadImage("assets/ss3.png")
   ss4 = loadImage("assets/ss4.png")
   ss5 = loadImage("assets/ss5.png")
   ss1 = loadImage("assets/ss1.png")
   ss6 = loadImage("assets/ss6.png")
   ufo = loadImage('assets/ufo.png')
   laserimg = loadImage('assets/laserimh.png')
   restartimg = loadImage('assets/reset.png')
   gameoverimg = loadImage('assets/gameover.png')

}

function setup() {
  createCanvas(1500,700);
  bg = createSprite(750,350,1500,700)
  bg.addImage(bgimg)
  ss = createSprite(100,350)
  ss.addImage(ss1)
  gameover=createSprite(750,350)
  gameover.addImage(gameoverimg)
  reset = createSprite(750,500)
  reset.addImage(restartimg)
  gameover.visible = false
  reset.visible = false
  walltop =createSprite(0,10,1500,10)
  wallbottom = createSprite(0,690,1500,10)

  aliengroup = new Group()
  lasergroup = new Group()
}

function draw() {
  
  background(0);
  drawSprites();
  fill('white')
  textSize(30)
  text('score ='+score,1000,50)
  

  if (gameState==='play'){
   if(keyDown("W")){
     ss.y-=6.5
   }
  if(keyDown("s")){
   ss.y+=6.5
  }
  if(keyDown('space')){
    spawnLaser()
  }
  spawnAliens()
   lasergroup.isTouching(aliengroup,destroyAlien)
  aliengroup.isTouching(ss,gameOver)

  }
  if(mousePressedOver(reset)){
   reset() 
  }
  ss.collide(walltop)
 ss.collide(wallbottom)
  wallbottom.visible = false
  walltop.visible = false
} 
function spawnAliens(){
  if(frameCount%50==0){
    var rand = Math.round(random(100,600))
   alien = createSprite(1500,rand,50,50)
   alien.velocityX=-9
   var randimg = Math.round(random(1,5))
   switch(randimg){
     case 1:
       alien.addImage(ss2)
       alien.scale = 0.75
       break
       case 2:
         alien.addImage(ss3)
         alien.scale = 0.75
         break
         case 3:
          alien.addImage(ss4)
          alien.scale = 0.75
          break
          case 4:
         alien.addImage(ss5)
         alien.scale = 0.75
         break
         case 5:
          alien.addImage(ss6)
          alien.scale = 0.75
          break
   }
   alien.lifetime = 1500/4
   aliengroup.add(alien)
  }
}
function spawnLaser(){
  laser = createSprite(200,ss.y,60,5)
  laser.shapeColor = "blue"
  laser.addImage(laserimg)
  laser.scale=0.2 
  laser.velocityX = 10
  laser.lifetime = 150
  lasergroup.add(laser)
}
function destroyAlien(laser,alien){
  alien.destroy()
  lasergroup.destroyEach()
  score +=10
}
function gameOver(alien,ss){
   ss.destroy()
   gameover.visible = true
   reset.visible = true
   aliengroup.destroyEach()
}
function reset(){
  gameState = "play"
  gameover.visible = false
  reset.visible = false
  score = 0
}
 
