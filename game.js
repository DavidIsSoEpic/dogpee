const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2 - 50, // Adjusted to center horizontally
  y: canvas.height - 120,   // Adjusted initial position
  width: 200,
  height: 200,
  speed: 10,
  image: new Image(),
  movingLeft: false,
  movingRight: false

};
player.image.src = 'Medias/the_fog....png'; // Replace with the path to your player image

let fogs = [];
let score = 0;
let gameInterval;
let fogInterval;

document.getElementById('score').innerText = `Score: ${score}`;

function createFog() {
  let fogImages = ['Medias/fog1.png', 'Medias/fog2.png', 'Medias/fog3.png'];
  let fogImageIndex = Math.floor(Math.random() * fogImages.length);
  
  let fog = {
      x: Math.random() * (canvas.width - 100),
      y: 0,
      width: 100,
      height: 100,
      speed: 3 + Math.random() * 2,
      image: new Image()
  };
  fog.image.src = fogImages[fogImageIndex];
  fogs.push(fog);
}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    if (player.movingLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (player.movingRight && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    
    // Draw player
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
    
    for (let i = 0; i < fogs.length; i++) {
      let fog = fogs[i];
      fog.y += fog.speed;
      if (fog.y > canvas.height) {
          fogs.splice(i, 1);
          score++;
          document.getElementById('score').innerText = `Score: ${score}`;
          i--;
      } else {
          ctx.drawImage(fog.image, fog.x, fog.y, fog.width, fog.height);
          if (fog.x < player.x + player.width &&
              fog.x + fog.width > player.x &&
              fog.y < player.y + player.height &&
              fog.height + fog.y > player.y) {
              // Collision detected, end game
              clearInterval(gameInterval);
              clearInterval(fogInterval);
              alert('Game Over! Your score: ' + score);
              return;
          }
      }
  }
}  

function keyDownHandler(event) {
    if (event.key === 'ArrowLeft') {
        player.movingLeft = true;
    } else if (event.key === 'ArrowRight') {
        player.movingRight = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'ArrowLeft') {
        player.movingLeft = false;
    } else if (event.key === 'ArrowRight') {
        player.movingRight = false;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function startGame() {
    gameInterval = setInterval(update, 20);
    fogInterval = setInterval(createFog, 1000);
}

window.onload = startGame;
