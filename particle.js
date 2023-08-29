function Particle()
{
  
  this.pos = createVector(0,0,0);

  this.update = function()
  {
    
       
    
  };

  
  this.show = function()
  {
     noFill();
  stroke(random(150,255),random(150,255),random(150,255));
  //stroke(255);
  push();
    translate(this.pos.x,this.pos.y,this.pos.z);
    sphere(0.1);
    pop();
  };

}
