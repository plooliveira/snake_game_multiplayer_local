class Snake{
  
  constructor(controls = {up: 38 , down: 40, right: 39, left: 37}, initial_segment = [{x: 40, y: 40}]){
    this.segments = initial_segment
    this.size = 20
    this.direction = "right"
    this.crossX = false
    this.crossY = false
    this.crossXPosition = 0
    this.crossYPosition = 0
    this.controls = controls
    
  
  }
  
  draw(snake_color = "white"){
    let c = color(snake_color);
    fill(c);
    this.segments.forEach((segment) => {
      square(segment.x, segment.y, this.size)
    });
  }
  
  crossScreen(){
    
    if(this.segments[0].x < 0){
      this.crossXPosition = 580
      this.crossX = true
    } else if(this.segments[0].x >= 600){
      this.crossXPosition = 0
      this.crossX = true
    }
    if(this.segments[0].y < 0){
      this.crossYPosition = 580
      this.crossY = true
    } else if(this.segments[0].y >= 600){
      this.crossYPosition = 0
      this.crossY = true
    }
    
  }
  
  is_dead(){ 
    let dead = false
    this.segments.forEach((segment, index) => {
      if (index === 0 ) { return }
      if (segment.x === this.segments[0].x && segment.y === this.segments[0].y && index > 0)
        dead = true
    })
    return dead
  }
  
   grow(){
     let x = this.segments[this.segments.length - 1].x 
     let y = this.segments[this.segments.length - 1].y
     this.segments.push({x: x, y: y})
  }
  
  change_direction(new_direction){
    if (new_direction === this.controls.left && this.direction !== 'right') {
      this.direction = "left"       
    }
    
    if (new_direction === this.controls.right && this.direction !== 'left' ) {
      this.direction = "right"
    }

    if (new_direction === this.controls.up && this.direction !== 'down') {
      this.direction = "up"
    }

    if (new_direction === this.controls.down && this.direction !== 'up') {
      this.direction = "down"
    }
  }
  
  move(){
    // AcrossScreen movement =========================================================    
    if (this.crossX || this.crossY){
      if (this.crossX) {
        this.segments.unshift({ x: this.crossXPosition, y: this.segments[0].y })
        this.crossX = false    
      }
      if (this.crossY) {
        this.segments.unshift({ x: this.segments[0].x, y: this.crossYPosition })
        this.crossY = false    
      }
    }
    else{
      // Regular movement ==============================================================
      switch (this.direction){
        case 'right':
          this.segments.unshift({ x: this.segments[0].x + 20, y: this.segments[0].y })
          break
        case 'left':
          this.segments.unshift({ x: this.segments[0].x - 20, y: this.segments[0].y })
          break
        case 'up':
          this.segments.unshift({ x: this.segments[0].x, y: this.segments[0].y - 20 })
          break
        case 'down':
          this.segments.unshift({ x: this.segments[0].x, y: this.segments[0].y + 20 })
          break
      }
    // ==============================================================================
    }
    this.segments.pop()
  }
    
  eat_food(food_position){
    if (food_position.x === this.segments[0].x && food_position.y === this.segments[0].y){
      return true
    }
    
    return false
  }
}