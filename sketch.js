var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,player;
var invisibleGround,zombie;
var zombieImg,bg,boy;
var skullImg,handImg,deadImg,bg2,coinImg;
var gamOverImg,restartImg;

var handGroup,coinsGroup,skullGroup;
var gameOver,restart,score;

function preload (){
bg=loadImage("images/bg.png");
girl=loadAnimation("images/girl1.png","images/girl 2.png");
zombieImg=loadAnimation("images/zombie1.png","images/zombie2.png","images/zombie3.png","images/zombie4.png","images/zombie5.png","images/zombie6.png");
handImg =loadImage("images/grave.png");
coinImg =loadImage("images/coin.png");
skullImg =loadImage("images/skull.png");
bg2 =loadImage("images/bg2.png");
deadImg =loadImage("images/dead.png");
gameOverImg =loadImage("images/game-over.png");
restartImg =loadImage("images/restore.png");
}

function setup (){
createCanvas(800,500);
ground=createSprite(500,-120,0,0);
ground.scale=1.7;
ground.x=ground.width/2;
ground.velocityX=-4;
ground.addImage(bg);

invisibleGround=createSprite(400,470,800,10);
invisibleGround.visible=false;

player=createSprite(300,420,20,100);
player.addAnimation("a",girl);
player.scale=0.5;

zombie=createSprite(150,410,20,100);
zombie.addAnimation("z",zombieImg);
zombie.scale=0.4;

gameOver = createSprite(400,80);
gameOver.addImage(gameOverImg);
gameOver.scale=0.15;

restart = createSprite(400,200);
restart.addImage(restartImg);
restart.scale=0.5;

handGroup = new Group();

coinsGroup = new Group();

skullGroup = new Group();

score = 0;

}

function draw(){
background("black");

if (ground.x<0) {
    ground.x=ground.width/2;

}

if (keyDown("space")&& player.y>=220) {
    player.velocityY=-10;
}
if (keyDown("left")) {
    player.x-=2;

}
if (keyDown("right")) {
    player.x+=2; 
}
    spawnHands();
    spawnCoins();

    if (score>200) {
      level1();
    }

    if (score ===400) {
       level2(); 
    }
player.velocityY=player.velocityY+0.8;

player.collide(invisibleGround);
zombie.collide(invisibleGround);
//rules

if (player.isTouching(coinsGroup)) {
    player.velocityY= 3;
    score =score + 5;
    coinsGroup.setvisibleEach(false);
}

drawSprites();
}
 
function spawnCoins() {
    if (frameCount % 100===0) {
        var coin=createSprite(800,ramdom(200,350),10,40);
        coin.addImage("coin",coinImg);
        coin.scale = 0.06;
        coin.velocityX = -6;
        coin.lifetime = 130;
        coinsGroup.addImage(coin);
        coin.setCollider("circle",0,0,1);
    }
    
}

function spawnHands() {
    if (frameCount % 100===0) {
        var hand= createSprite(800,450,10,40);
        hand.addImage("hand",handImg);
        hand.scale = 0.14;
        hand.velocityX = -(4 + score / 50);
        hand.lifetime = 200;
        handsGroup.addImage(hand);
        hand.setCollider("circle",0,0,1);
    }
    
}