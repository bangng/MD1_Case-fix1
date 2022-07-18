let canvas = document.getElementById('myCanvas1');
canvas.width = innerWidth * 0.5
canvas.height = innerHeight * 0.8
let ctx = canvas.getContext('2d');
let audio1 = new Audio('audio/bloody.wav')
let audio2 = new Audio('audio/mix1.wav')
let audio3 = new Audio("audio/win.wav")
let audio4 = new Audio("audio/huhu.wav")
let x = canvas.width / 2;
let y = canvas.height - 30;
// // let angle = Math.floor(Math.random() * 100 + 40)
// *(Math.random()*2-1);
let dx = 3
let dy = -3;
// console.log(dx, dy)
let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 90;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;


let brickRowCount = 3; // dòng
let brickColumnCount = 8; // hàng
let brickWidth = 75;  // chiều rộng
let brickHeight = 20; // chiều ddài
let brickPadding = 10; // khoảng cách giữa các ô
let brickOffsetTop = 20;
let brickOffsetLeft = 20;
let bricks = [];
let score = 0;
let lives = 3;

// let level = 1;
// let totalLevels = 2;

// function createBricks(){

// }
// let rank = [];
// let scoreIncrease = 10;
let level = 1
let totalLevel0 = 3


//
// let position = {
//     m: Math.floor(Math.random() * 5),
//     n: Math.floor(Math.random() * 3),
//
// }

for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = {x: 0, y: 0, status: 1}
    }
}


function collistionDetection() {    // phát hiện va chạm
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            let b = bricks[i][j];
            if (b.status === 1) {
                if (x +ballRadius> b.x && x -ballRadius < b.x + brickWidth && y +ballRadius> b.y && y - ballRadius< b.y + brickHeight) {
                    dy = -dy;
                 // /   console.log('aaaaa')
                    b.status = 0
                    score++
                    audio1.play();
                    if (score === brickColumnCount * brickRowCount) {
                        audio3.play();
                        alert('You Win !!! Your score is ' + (score + lives));
                        // drawBricks();



                        document.location.reload();

                    }
                }
            }


        }
    }
}

function drawBricks() { // vẽ khối

    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].status === 1) {
                let bricksX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                let bricksY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = bricksX;
                bricks[i][j].y = bricksY;

                ctx.beginPath();
                ctx.rect(bricksX, bricksY, brickWidth, brickHeight);
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// let ball = {
//     x: canvas.width / 2,
//     y: canvas.height - 30,
//     radius: ballRadius,
//     speed: 4,
//     dx: 3 * (Math.random() * 2 - 1),
//     dy: -3
// }






function drawPaddle() { // ván đẩy
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#4d616a';
    ctx.fill();
    ctx.closePath();
}

document.addEventListener('keydown', keyDownHandler, false); // sự kiện phím
document.addEventListener('keyup', keyUpHandler, false);

document.addEventListener('mousemove', mouseMoveHandler, false);// sự kiện chuột

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}
//
// //thêm mới
// // function resetBall(){
// //     x = canvas.width / 2;
// //     y = canvas.height - 30;
// //     dx = 3*(Math.random()*2-1);
// //     dy = -3;
//
// }

// kích hoạt chuột!!!!
// function mouseMoveHandler(e) {
//     let relativeX = e.clientX - canvas.offsetLeft;
//     if (relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth / 2;
//     }
//
// }

//thêm mới
// function levelUp(){
//     let levelDone = true;
//     for (let i= 0;i<brickRowCount; i ++){
//         for (let j =0;j<brickColumnCount;j++){
//             levelDone = levelDone&& !bricks[i][j].status
//         }
//     }
//     if (levelDone){
//     //    chèn nhạc vào đây
//         if (level>= totalLevels){
//         //    chèn nhạc
//             alert('Game Over !!! ' + 'Your score is ' + score);
//             return;
//         }
//         brickRowCount++;
//         createBricks();
//         ball.speed += 0.5;
//         resetBall();
//         level++;
//
//     }
// }


function drawBall() { // vẽ bóng!!!

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#dd2100';
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;

}

function drawLives() { // số lần chơi!!!
    ctx.font = '16px Arial';
    ctx.fillStyle = '#3b0e73';
    ctx.fillText('Lives:' + lives, canvas.width - 65, 20);

}


function drawScore() {  // thiết lập điểm!!!!
    ctx.font = '16px Arial';
    ctx.fillStyle = '#dd0000';
    ctx.fillText('Score:' + score, 8, 20);

}




function draw() { //


    // let angle = Math.floor(Math.random() * 70 + 10)
    // dx += Math.sin(angle)
    // dy += Math.cos(angle)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawBricks()
    // ctx.beginPath();
    // ctx.rect((position.m * (brickWidth + brickPadding)) + brickOffsetLeft, (position.n * (brickHeight + brickPadding)) + brickOffsetTop, brickWidth, brickHeight);
    // ctx.fillStyle = 'green';
    // ctx.fill();
    // ctx.closePath();
    drawPaddle()
    drawScore()
    drawLives()
    collistionDetection()

    // if (x=== bricks){
    //     alert( 'Game Over')
    //
    // }


    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y -= paddleHeight) {
                dy = -dy
                console.log('vao day')
            }
        } else {
            lives--;
            if (lives === 0) {
                window.location.reload();
                audio4.play();
                alert('Game Over !!! ' + 'Your score is ' + score);




            // * (Math.random() * 2 - 1);;

            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;

            }


        }

    }
    //di chuyển bóng
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
// if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//     dy = -dy;
// }
//di chuyển ván
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 10;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 10;
    }


    //
    // dx = 2
    // dy = -2
requestAnimationFrame(draw);
}
draw();
// function update() {
//     levelUp();
// }
//
// function loop() {
//     draw();
//     update();
//
//
//     requestAnimationFrame(loop);
// }
// loop();