// let currScore = document.querySelector("#score");
// currScore.innerHTML = 0;
// let currLife = document.querySelector("#life");
// var lo = setInterval(draw, 1);
// let life = 3;
// currLife.innerHTML = life;

// let canvas = document.getElementById("mycanvas");
// let ctx = canvas.getContext("2d");
// let ballRadius = 10;
// //bricks-area
// let x = canvas.width / 2;
// let y = canvas.height - 30;

// //Ball Movement
// let dx = 2;
// let dy = -2;

// //create the paddle
// let paddleHeight = 5;
// let paddleWidth = 100;

// //specify starting point of paddle
// const paddle = {
//   x: canvas.width / 2 - paddleWidth / 2,
//   y: canvas.height - paddleHeight,
//   width: paddleWidth,
//   height: paddleHeight,
//   dx: 5,
// };
// let paddleX = (canvas.width - paddleWidth) / 2;

// //holding variables for right and left arrows on keyboard
// let rightPressed = false;
// let leftPressed = false;

// //holding variables for bricks structure
// let brickRowCount = 6;
// let brickColumnCount = 8;
// let brickWidth = 71;
// let brickHeight = 24;
// let brickPadding = 4;
// let brickOffsetTop = 2;
// let brickOffsetLeft = 2;

// //to have a score based on the bricks broken
// let score = 0;

// //arrays for the bricks
// let bricks = [];
// //nested loop for rows and cols of bricks
// for (i = 0; i < brickColumnCount; i++) {
//   bricks[i] = [];
//   for (j = 0; j < brickRowCount; j++) {
//     //set the x and y position of the bricks
//     bricks[i][j] = { x: 0, y: 0, status: 1 };
//   }
// }
// //track the user actions like mouse movement or keypad arrows < >
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);

// //Anchor paddle movement to mouse movement
// function mouseMoveHandler(e) {
//   var relativeX = e.clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvas.width) {
//     paddle.x = relativeX - paddleWidth / 2;
//   }
// }
// //for the movement through keypad < > arrows
// function keyDownHandler(e) {
//   if (e.keyCode === 39) {
//     rightPressed = true;
//   } else if (e.keyCode === 37) {
//     leftPressed = true;
//   }
// }
// function keyUpHandler(e) {
//   if (e.keyCode === 39) {
//     rightPressed = false;
//   } else if (e.keyCode === 37) {
//     leftPressed = false;
//   }
// }

// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
//   ctx.fillStyle = "#fff";
//   ctx.fill();
//   ctx.closePath();
// }
// //Create a function to create the paddle
// function drawPaddle() {
//   ctx.beginPath();
//   ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
//   ctx.fillStyle = "#0e9aa7";
//   ctx.fill();
//   ctx.closePath();
// }
// //Create a function to draw the bricks
// function drawBricks() {
//   for (c = 0; c < brickColumnCount; c++) {
//     for (r = 0; r < brickRowCount; r++) {
//       if (bricks[c][r].status === 1) {
//         let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
//         let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         ctx.fillStyle = "#0e9aa7";
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }
// //Create function to keep track of score
// function drawScore() {
//   ctx.font = "1.7rem Arial";
//   ctx.fillStyle = "#fff";
//   //   ctx.fillText("score: " + score, 8, 20); //position score at 8,20 on the x,y axis of the canvas
//   // currScore += 1;
//   currScore.innerHTML = score;
//   if (life === 0) {
//     clearInterval(lo);
//   }
// }

// //Collision dections for the bricks
// function collisionDetection() {
//   for (c = 0; c < brickColumnCount; c++) {
//     for (r = 0; r < brickRowCount; r++) {
//       let b = bricks[c][r];
//       if (b.status === 1) {
//         if (
//           x > b.x &&
//           x < b.x + brickWidth &&
//           y > b.y &&
//           y < b.y + brickHeight
//         ) {
//           dy = -dy;
//           b.status = 0;
//           score++;
//           // console.log("Score is Incres");
//           // currScore.innerHTML = score;
//           if (score === brickRowCount * brickColumnCount) {
//             alert("Congratulations! You win.");
//             document.location.reload();
//           }
//         }
//       }
//     }
//   }
// }
// function draw() {
//   //clear each instance of the canvas so a new circle can be drawn
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawScore();
//   drawBricks();
//   drawBall();
//   drawPaddle();
//   collisionDetection();
//   //Calculate collision detections
//   //left and right walls
//   if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//     dx = -dx;
//   }
//   //top walls
//   if (y + dy < ballRadius) {
//     dy = -dy;
//   } else if (y + dy > canvas.height - ballRadius) {
//     //detect paddle hits
//     if (x > paddle.x && x < paddle.x + paddleWidth) {
//       dy = -dy;
//     }
//     //if no paddle hit, body of canvas is hit ==> game over
//     else {
//       //   alert("GAME OVER!! Press OK to Play Again");

//       life -= 1;
//       currLife.innerHTML = life;
//       if (life == 0) {
//         currLife.innerHTML = 0;
//         // ! TODO  -- game over page
//         // alert('GAMEE OVER')
//       }
//       //   document.location.reload();
//     }
//   }
//   //bottom wall
//   if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
//     dy = -dy;
//   }
//   //Make paddle move
//   if (rightPressed && paddle.x + paddle.width < cvs.width) {
//     paddle.x += paddle.dx;
//   } else if (leftPressed && paddle.x > 0) {
//     paddle.x -= paddle.dx;
//   }
//   //Making the ball move
//   x += dx; //update x movement every frame
//   y += dy; //update y movement every frame
// }

// //Create an infinite loop that creates the ball
// //paints the ball on the canvas every 10 milliseconds.
// setInterval(draw, 10);
let currScore = document.querySelector("#score");
currScore.innerHTML = 0;
let currLife = document.querySelector("#life");

let life = 3;
currLife.innerHTML = life;

let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
//bricks-area
// let x = canvas.width / 2;
// let y = canvas.height - 30;

//create the paddle
let paddleHeight = 5;
let paddleWidth = 100;

// specify starting point of paddle
const paddle = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - paddleHeight,
  width: paddleWidth,
  height: paddleHeight,
  dx: 5,
};
//Ball Movement
let ball = {
  x: canvas.width / 2,
  y: paddle.y - ballRadius,
  radius: ballRadius,
  speed: 4,
  dx: 3,
  dy: -3,
};

//holding variables for right and left arrows on keyboard
let rightPressed = false;
let leftPressed = false;

//holding variables for bricks structure
let brickRowCount = 6;
let brickColumnCount = 8;
let brickWidth = 71;
let brickHeight = 24;
let brickPadding = 4;
let brickOffsetTop = 2;
let brickOffsetLeft = 2;

//to have a score based on the bricks broken
let score = 0;

//arrays for the bricks
let bricks = [];
//nested loop for rows and cols of bricks
for (i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];
  for (j = 0; j < brickRowCount; j++) {
    //set the x and y position of the bricks
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}
//track the user actions like mouse movement or keypad arrows < >
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Anchor paddle movement to mouse movement
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2;
  }
}
//for the movement through keypad < > arrows
function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}
//Create a function to create the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
  ctx.fillStyle = "#0e9aa7";
  ctx.fill();
  ctx.closePath();
}
//Create a function to draw the bricks
function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0e9aa7";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
//Create function to keep track of score
function drawScore() {
  ctx.font = "1.7rem Arial";
  ctx.fillStyle = "#fff";
  //   ctx.fillText("score: " + score, 8, 20); //position score at 8,20 on the x,y axis of the canvas
  // currScore += 1;
  currScore.innerHTML = score;
}
// RESET THE BALL
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = paddle.y - ballRadius;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
  paddle.x = canvas.width / 2 - paddleWidth / 2;
  // paddle.y = paddle.y - ballRadius;
}
//Collision dections for the bricks
function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brickWidth &&
          ball.y > b.y &&
          ball.y < b.y + brickHeight
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score++;
          // console.log("Score is Incres");
          // currScore.innerHTML = score;
          if (score === brickRowCount * brickColumnCount) {
            alert("Congratulations! You win.");
            document.location.reload();
          }
        }
      }
    }
  }
}
function draw() {
  //clear each instance of the canvas so a new circle can be drawn
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  //Calculate collision detections
  //left and right walls
  if (
    ball.x + ball.dx > canvas.width - ballRadius ||
    ball.x + ball.dx < ballRadius
  ) {
    ball.dx = -ball.dx;
  }
  //top walls
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    //detect paddle hits
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      ball.dy = -ball.dy;
    }
    //if no paddle hit, body of canvas is hit ==> game over
    else {
      //   alert("GAME OVER!! Press OK to Play Again");

      life -= 1;
      resetBall();
      currLife.innerHTML = life;
      if (life == 0) {
        currLife.innerHTML = 0;
        // ! TODO  -- game over page
        // alert('GAMEE OVER')
      }
      //   document.location.reload();
    }
  }
  //bottom wall
  if (
    ball.y + ball.dy > canvas.height - ballRadius ||
    ball.y + ball.dy < ballRadius
  ) {
    ball.dy = -ball.dy;
  }
  //Make paddle move
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  //Making the ball move
  ball.x += ball.dx; //update x movement every frame
  ball.y += ball.dy; //update y movement every frame
}

//Create an infinite loop that creates the ball
//paints the ball on the canvas every 10 milliseconds.
setInterval(draw, 10);
