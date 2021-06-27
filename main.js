let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
//brick structure
let brickRowCount = 7;
let brickColumnCount = 9;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 3;
let brickOffsetTop = 0;
let brickOffsetLeft = 0;

//paddle structure
let paddleHeight = 20;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

//brick intilization
let bricks = [];
for (i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];
  for (j = 0; j < brickRowCount; j++) {
    //set the x and y position of the bricks
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}

//drawing bricks
let color = "#E74C3C";
function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        if (color === "#E74C3C") {
          color = "#F1C40F";
        } else {
          color = "#E74C3C";
        }
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
//paddle and stuff
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
  ctx.fillStyle = "#FF2F93";
  ctx.fill();
  ctx.closePath();
}
drawBricks();
drawPaddle();
