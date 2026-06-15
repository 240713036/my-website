let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let old_x = 0;
let old_y = 0;
let size = 4;
let color = "#000000";

function init(){
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
}

function touchStart(event){
    let rect = canvas.getBoundingClientRect();
    old_x = event.touches[0].clientX - rect.left;
    old_y = event.touches[0].clientY - rect.top;
}

function touchMove(event){
    let c_x;
    let c_y;
    let rect = canvas.getBoundingClientRect();
    event.preventDefault();
    c_x = event.touches[0].clientX - rect.left;
    c_y = event.touches[0].clientY - rect.top;
    drawLine(old_x, old_y, c_x, c_y, size, color)
    old_x = c_x;
    old_y = c_y;
}

function drawLine(x1, y1, x2, y2, size, color){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
}

function drawCcl(x, y, r, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x+r, y+r, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function inputChange(event){
  size = sizeSlider.value;
}

let sizeSlider = document.getElementById('pensize');
sizeSlider.addEventListener('change', inputChange);

function colorChange(event){
  color = colorSlider.value;
}

let colorSlider = document.getElementById('pencolor');
colorSlider.addEventListener('change', colorChange);

document.getElementById("reset").addEventListener("click", reset);

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}