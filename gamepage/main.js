let currScore = document.querySelector('#score')
currScore.innerHTML = 0
let currLife = document.querySelector('#life')
let gameover = document.getElementById('gameover')
let gamebox = document.getElementById('gamebox')
let level = document.getElementById('level')
let life = 5
let lvl = 1
currLife.innerHTML = life

//music
let collidemusic = new Audio()
collidemusic.src = '../audio/collide.mp3'
let bgmusic = new Audio()
bgmusic.src = '../audio/backgroundmusic.mp3'
bgmusic.play()
// bgmusic.volume = 0.6;

let canvas = document.getElementById('mycanvas')
let ctx = canvas.getContext('2d')
let ballRadius = 10

//create the paddle
let paddleHeight = 10
let paddleWidth = 100

// paddle
const paddle = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - paddleHeight,
  width: paddleWidth,
  height: paddleHeight,
  dx: 5,
}
//Ball
let ball = {
  x: canvas.width / 2,
  y: paddle.y - ballRadius,
  radius: ballRadius,
  speed: 4,
  dx: 3,
  dy: -3,
}

//setting variables
let rightPressed = false
let leftPressed = false

// bricks structure
let brickRowCount = 1
let brickColumnCount = 8
let brickWidth = 71
let brickHeight = 24
let brickPadding = 4
let brickOffsetTop = 2
let brickOffsetLeft = 2

//score
let score = 0
let displayScore = 0

//array
let bricks = []
// loop for bricks
for (i = 0; i < brickColumnCount; i++) {
  bricks[i] = []
  for (j = 0; j < brickRowCount; j++) {
    //set the x and y position of the bricks
    bricks[i][j] = { x: 0, y: 0, status: 1 }
  }
}
//user actions
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)

// mouse movement
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2
  }
}
// arrows
function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true
  } else if (e.keyCode === 37) {
    leftPressed = true
  }
}
function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false
  } else if (e.keyCode === 37) {
    leftPressed = false
  }
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2) //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
  ctx.fillStyle = '#fff'
  ctx.fill()
  ctx.closePath()
}
//DRAW paddle
function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height) //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
  ctx.fillStyle = '#91f085'
  ctx.fill()
  ctx.closePath()
}
// draw bricks
function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = '#03fd3d'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
  level.innerHTML = lvl
}
// score
function drawScore() {
  ctx.font = '1.7rem Arial'
  ctx.fillStyle = '#fff'
  currScore.innerHTML = displayScore
}
// RESET THE BALL
function resetBall() {
  ball.x = paddle.x + 50
  ball.y = paddle.y - ballRadius
  ball.dx = 3 * (Math.random() * 2 - 1)
  ball.dy = -3
  // paddle.x = canvas.width / 2 - paddleWidth / 2;
  // paddle.y = paddle.y - ballRadius;
}
function ballPaddleCollision() {
  // CHECK WHERE THE BALL HIT THE PADDLE
  let collidePoint = ball.x - (paddle.x + paddle.width / 2)

  // NORMALIZE THE VALUES
  collidePoint = collidePoint / (paddle.width / 2)

  // CALCULATE THE ANGLE OF THE BALL
  let angle = (collidePoint * Math.PI) / 3

  ball.dx = ball.speed * Math.sin(angle)
  ball.dy = -ball.speed * Math.cos(angle)
}

//ayush ne likha hai
function levelUp() {
  // if (brickRowCount < 8) {
  //   brickRowCount += 1
  // }
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      bricks[c][r].status = 1
    }
  }
  brickRowCount += 1
  for (i = 0; i < brickColumnCount; i++) {
    bricks[i] = []
    for (j = 0; j < brickRowCount; j++) {
      //set the x and y position of the bricks
      bricks[i][j] = { x: 0, y: 0, status: 1 }
    }
  }
  drawBricks()
  ball.speed += 1
  resetBall()
  score = 0
  // life = 5;
  lvl += 1
}

//Collision detections
function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r]
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brickWidth &&
          ball.y > b.y &&
          ball.y < b.y + brickHeight
        ) {
          ball.dy = -ball.dy
          collidemusic.play()
          b.status = 0
          score++
          displayScore++
          // console.log("Score is Incres");
          // currScore.innerHTML = score;
          if (score === brickRowCount * brickColumnCount) {
            // alert('Congratulations! You win.')
            // document.location.reload()
            levelUp()
          }
        }
      }
    }
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawScore()
  drawBricks()
  drawBall()
  drawPaddle()
  collisionDetection()
  //Calculate collision detections
  //left and right walls
  if (
    ball.x + ball.dx > canvas.width - ballRadius ||
    ball.x + ball.dx < ballRadius
  ) {
    ball.dx = -ball.dx
  }
  //top walls
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    //detect paddle hits
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      ball.dy = -ball.dy
      ballPaddleCollision()
    } else {
      life -= 1
      resetBall()
      currLife.innerHTML = life
      if (life == 0) {
        currLife.innerHTML = 0
        bgmusic.pause()
        clearInterval(myvar)

        gamebox.style.setProperty('display', 'none', 'important')
        gameover.style.setProperty('display', 'block', 'important')
        gameover.style.setProperty('height', '100%', 'important')
        gameover.style.setProperty('width', '100%', 'important')

        document.getElementById('playagain').addEventListener('click', () => {
          location.href = './index.html'
        })

        document.getElementById('quit').addEventListener('click', () => {
          location.href = '../index.html'
        })

        // alert('GAMEE OVER')
      }
    }
  }
  //bottom wall
  if (
    ball.y + ball.dy > canvas.height - ballRadius ||
    ball.y + ball.dy < ballRadius
  ) {
    ball.dy = -ball.dy
  }
  // paddle movement
  if (rightPressed && paddle.x < canvas.width - paddleWidth) {
    paddle.x += 7
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7
  }
  //ball movement
  ball.x += ball.dx //update x movement every frame
  ball.y += ball.dy //update y movement every frame
}

//Create an infinite loop that creates the ball
let myvar = setInterval(draw, 10)
