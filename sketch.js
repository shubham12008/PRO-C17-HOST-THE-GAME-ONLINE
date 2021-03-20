var path, boy, cash, diamonds, jwellery, sword;
var instruction, gameover, restertinformation;

var cashG, diamondsG, jwelleryG, swordGroup;

var PLAY = 1;
var END = 0;
var SERVE = 3;
var gameState = 3;
var treasureCollection = 0;

var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var instructionimg, gameoverimg, restertinformationimg;





function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
  instructionimg = loadImage("information.png");
  gameoverimg = loadImage("Game Over .png");
  restertinformationimg = loadImage("restart instruction.png");
}

function setup() {

  createCanvas(400, 600);

  path = createSprite(200, 200);
  path.addImage(pathImg);

  instruction = createSprite(200, 300);
  instruction.addImage(instructionimg);

  gameover = createSprite(200, 300);
  gameover.addImage(gameoverimg);

  restertinformation = createSprite(200, 360);
  restertinformation.addImage(restertinformationimg);

  boy = createSprite(70, 580, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);

  edges = createEdgeSprites();
  boy.collide(edges);


  if (gameState === SERVE) {
    treasureCollection = 0;
    boy.visible = false;
    instruction.visible = true;
    gameover.visible = false;
    restertinformation.visible = false;
  }
  if (gameState === SERVE && keyDown("space")) {
    instruction.visible = false;
    gameState = PLAY;
  }


  if (gameState === PLAY) {

    boy.visible = true;
    boy.x = World.mouseX;

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;

    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;


    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;


    } else {
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END
      }
    }

    if (path.y > 400) {
      path.y = height / 2;
    }
    path.velocityY = 4;

  }



  if (gameState === END) {
    
    boy.visible = false;
    instruction.visible = false;
    gameover.visible = true;
    restertinformation.visible = true;
     path.velocityY = 0;

  }
if (gameState === END && keyDown("r") ){
   gameState = SERVE
}


  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 300 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 400 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 500 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}