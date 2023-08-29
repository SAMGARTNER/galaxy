
var theta = 0;
var particles = [];
var symetryArray = [];
var spaceVolume = 800; 
//OUTTER CELESTIAL OBJECTS
var galaxy = '';
var nebula = '';
var blackHole = '';
var solarSytem = '';
var quasar = '';
var pulsar = '';
var magnetar = '';
var blitzar = '';
var nebula = '';
var hypernova ='';
var supernova ='';
//INNER CELESTIAL OBJECTS
var planet ='';
var moon='';
var asteroidRing = '';
var asteroidField = '';
//
var mx = spaceVolume/2, my = spaceVolume/2;
var cameraSpeed;
let myFont;
//framerate limiter
var maxFPS = 24.0;
var maxPeriod = 1.0/maxFPS;
var lastTime = 0.0;

function preload() {
  myFont = loadFont('assets/otf/Inconsolata-Black.otf');
}

function setup() 
  {
    createCanvas(spaceVolume,spaceVolume,WEBGL);
    background(0);
    noiseDetail(2);
    randomSeed(6604235316449002);
    cameraSpeed = TWO_PI /0.01;
    // values are examples in physics paper
    var galaxyFormulaScale = 50; // scale
    var galaxyFormulaCompactness = 4;  //both b and n determine spiral pitch
    var galaxyFormulaArmSpread = 0.5;// greater N makes spiral more compact
    for(var theta = 0; theta <2; theta+=(3/galaxyFormulaScale))
      {
        var aParticle = new Particle();
        var twinParticle = new Particle();
        //create galaxy shape with parameters
        var phi = 0*PI;
        var r = galaxyFormulaScale/log(galaxyFormulaArmSpread*tan(theta*PI/(2*galaxyFormulaCompactness)));
       //calculate x and y
        var xPos =  round(r*sin(theta*PI)*cos(phi));
        var yPos =  round(r*sin(theta*PI)*sin(phi));
        var zPos =  round(r*cos(theta*PI));
       //assigned calculated position to particl
        aParticle.pos.x = xPos;
        aParticle.pos.y = yPos;
        aParticle.pos.z = zPos;
        particles.push(aParticle);
        //we create an inversed copy for symetry according to the paper
        twinParticle.pos.x = xPos*-1; 
        twinParticle.pos.y = yPos*-1;
        twinParticle.pos.z = zPos*-1;
        symetryArray.push(twinParticle);
       //we use the position to create an spiral of particles around it using perlin noise
        for(var thetaB = 0; thetaB <2; thetaB+=(6/galaxyFormulaScale))
        {
          //we used fixed seed to the get the same results, perlin noise did gave me good results here (reconizable paterns)
          var radius = random(galaxyFormulaScale/6);
          var radiusB = random(galaxyFormulaScale/6);
          //create new particle (solar system or other type of space object)
          var orbitingParticle = new Particle();
          var orbitingTwinParticle = new Particle();
          //calculate x and y
          orbitingParticle.pos.x = aParticle.pos.x + round(radius*(log(theta*10)/log(10))*cos(thetaB*PI));
          orbitingParticle.pos.y = aParticle.pos.y + round(radius*(log(theta*10)/log(10))*sin(thetaB*PI));
          orbitingParticle.pos.z = aParticle.pos.z + randomGaussian((galaxyFormulaScale/27)*-1,(galaxyFormulaScale/27));
          //calculate x and y for symetric galaxy arm
          orbitingTwinParticle.pos.x = twinParticle.pos.x + round(radius*(log(theta*10)/log(10))*cos(thetaB*PI));
          orbitingTwinParticle.pos.y = twinParticle.pos.y + round(radius*(log(theta*10)/log(10))*sin(thetaB*PI));
          orbitingTwinParticle.pos.z = twinParticle.pos.z + randomGaussian((galaxyFormulaScale/27)*-1,(galaxyFormulaScale/27));
          //store particles into arrays
          particles.push(orbitingParticle);
          symetryArray.push(orbitingTwinParticle);
        }
      }
        //appended initial and symetric elements
        particles = particles.concat(symetryArray);
}

function keyPressed() {
  if (keyCode === 87) {
viewY = viewY - 10;
  } else if (keyCode === 83) {
viewY = viewY + 10;
  }
  if (keyCode === 65) {
    viewX = viewX - 5;
  } else if (keyCode === 68) {
    viewX = viewX + 5;
  }
  if (viewY >=spaceVolume){
   viewY = 0; 
  }
  if (viewX >=spaceVolume){
  viewX = 0; 
  }
}

function draw() 
  {
    const d = new Date();
    var time = d.getTime()/1000;
    var deltaTime = time - lastTime;
    background(0);
    rotateX(my);
    rotateY(mx);
    //framerate limit
    //if( deltaTime >= maxPeriod ) 
    if( true) 
      {
          lastTime = time;
          /*fill('#ED225D');
          textFont(myFont);
          textSize(36);
          text(''+round(1000/(deltaTime*1000)), 0,0);*/
          for(var i = 0; i < particles.length; i++)
            {
              particles[i].update();
              particles[i].show();
            }
        }
  }
  
  
function mouseDragged() 
  {
    mx += (mouseX - pmouseX)/500;
    my += (pmouseY - mouseY)/500;
  }
  
  
