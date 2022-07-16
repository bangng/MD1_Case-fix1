let canvas = document.getElementById('ocb');
let ctx = canvas.getContext('2d');
let x = canvas.width/2;
let y = canvas.height - 30;
dx = 2;
dy =-2;

function drallBall(){
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fillStyle =
}
