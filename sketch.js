const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var fruta,imagemfruta
var corrente
var corda
var coelho,imagemcoelho
var coelhotriste,coelhopisca,coelhocomendo

var fundo
var cortar
function preload(){
  imagemfruta=loadImage("midia/melon.png")
  imagemcoelho=loadImage("midia/Rabbit-01.png")
  fundo=loadImage("midia/background.png")
  coelhocomendo=loadAnimation("midia/eat_0.png","midia/eat_1.png","midia/eat_2.png","midia/eat_3.png","midia/eat_4.png")
coelhotriste=loadAnimation("midia/sad_1.png","midia/sad_2.png","midia/sad_3.png")
coelhopisca=loadAnimation("midia/blink_1.png","midia/blink_2.png","midia/blink_3.png")
  coelhopisca.playing=true
  coelhocomendo.playing=true
  coelhotriste.playing=true
  coelhotriste.looping=false
  coelhocomendo.looping=false
}


function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  fruta=Bodies.circle(250,300,20)
  corda=new Rope(9,{x:250,y:30})
  Composite.add(corda.body,fruta)
  corrente=new Link(corda,fruta)
  coelhopisca.frameDelay=20
  coelhocomendo.frameDelay=20
  coelho=createSprite(250,630)
  coelho.addAnimation("coelhopiscando",coelhopisca)
  coelho.addAnimation("coelhocome",coelhocomendo)
  coelho.addAnimation("coelhotriste-",coelhotriste)
  coelho.scale=0.2
  cortar=createImg("midia/cut_btn.png")
  cortar.position(230,30)
  cortar.size(50,50)
  cortar.mouseClicked(drop)
  rectMode(CENTER);
  ellipseMode(RADIUS);
 
  textSize(50)
  
}

function draw() 
{
  background(51);
  ground.show();
  ellipse(fruta.position.x,fruta.position.y,20)
  image(fundo,0,0,500,700)
  push()
  imageMode(CENTER)
  if (fruta!==null) {
    image(imagemfruta,fruta.position.x,fruta.position.y,70,70)   
  }
  pop()
  if(batida(fruta,coelho)==true){
    coelho.changeAnimation("coelhocome")
  }
  corda.show()
  drawSprites()
  Engine.update(engine);
   
}
function drop(){
  corda.break()
  corrente.detach()
  corrente=null
}
function batida(body,sprite){
  if (body!==null) {
    var d=dist(
      body.position.x,body.position.y,
      sprite.position.x,sprite.position.y
    )
      if (d<=80) {
       World.remove(world,fruta) 
       fruta=null
       return true
      } else {
        return false
      }
  }
}
