let play1
let play2
let two_players = false
let food 
let score = 0
let score2 = 0
let frame_balance = 1
let can_change_direction = true
let can_change_direction2 = true
let pause = false

function setup() {
  document.getElementById("body").focus();
  soundtrack = createAudio('resources/soundtrack.webm')
  soundtrack.volume(0.04)
  soundtrack.loop()
  start_sound = createAudio('resources/smb_bump.wav')
  start_sound.volume(0.2)
  eat_sound = createAudio('resources/smb_coin.wav')
  eat_sound.volume(0.1)
  createCanvas(600, 600)
  textSize(width / 30);
  play1 = new Snake()
  play1.grow()
  play2 = new Snake({up: 87 , down: 83, right: 68, left: 65})
  play2.grow()
  food = new Food()
}

function draw() {
  
  frameRate(60)
  background("black")
  
  fill("white");
  text("Player1 Score: " + score, 30, 30)
  
  play1.draw()
  food.draw()
  play1.crossScreen()
  if (play1.eat_food(food.position)){
    eat_sound.stop()
    eat_sound.play()
    food.reset_food()
    play1.grow()
    score += 1
  }  
  if (play2.eat_food(food.position)){
    eat_sound.stop()
    eat_sound.play()
    food.reset_food()
    play2.grow()
    score2 += 1
  } 
  
  if(two_players){
    fill("white");
    text("Player2 Score: " + score2, 430, 30)
    play2.draw("lightblue")
    play2.crossScreen()
  }
  
  if(pause){
    fill("white");
    text("Paused", 260, 300)
  }
  
  if (frameCount > frame_balance + 5.5 && !pause) {
    frame_balance = frameCount
    play1.move()
    if (play1.is_dead()) {
      reset_game()
    }
    
    if(two_players){
      play2.move()
    if (play2.is_dead()) {
      reset_game()
    }
    }
  }
}

function music(){
  soundtrack.loop()
}

function reset_game(){
  start_sound.play()
  play1 = new Snake()
  food = new Food()
  score = 0
}

function keyPressed() {
  console.log(keyCode)
  if(keyCode == 80){
     pause = !pause
  if (pause){
    soundtrack.pause()
  } else { soundtrack.play() }
  }
  play1.change_direction(keyCode)
  play2.change_direction(keyCode)
  
  if(!two_players && keyCode === 50){
    two_players = true;
  }
  
}

