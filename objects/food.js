class Food {
  constructor(){
    this.position = { x: Math.floor(Math.random() * 30) * 20, 
                      y: Math.floor(Math.random() * 30) * 20
                    }
    this.size = 20
  }
  draw(){
    let c = color('green');
    fill(c);
    square(this.position.x, this.position.y, this.size)
  }
  
  reset_food(){
    this.position.x = Math.floor(Math.random() * 30) * 20
    this.position.y = Math.floor(Math.random() * 30) * 20
    this.draw()
  }
  
}