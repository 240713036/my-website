//canvasの基礎
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function init()
{
    for (rotDig = 0; rotDig < 360; rotDig += 45){
        ctx.save(); //回転前の状態を保存しておく
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotDig / 180 * Math.PI);
        drawRct(0*32, 0*32, 32*2, 32*2, "red");
        drawCcl(2*32, 2*32, 32, "green");
        drawTri(4*32, 4*32, 32*2, 32*2, "blue");
        ctx.restore(); //回転前の状態に戻す
    //drawImgA(6*32, 6*32, 32*2, 32*2);
    }
}

//長方形の描画
function drawRct(x, y, w, h, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

//多角形の描画
function drawTri(x, y, w, h, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x+y/2, y);
    ctx.lineTo(x, y+h);
    ctx.lineTo(x+w, y+h);
    ctx.closePath();
    ctx.fill();
}

//円の描画
function drawCcl(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x+r, y+r, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

/***図形の描画
let img = new Image();
img.src = "button_r.png";
function drawImg(x, y, w, h)
{
    ctx.drawImg(img, x, y, w, h)
}

複数の図形を配列として扱う
let img = new Array();
for (i = 0; i < 3; i++) {
    img[i] = new Image();
    img[i].src = "button"+i+".png";
}***/

function drawImgA(x, y, w, h, i)
{
    ctx.drawImg(img[i], x, y, w, h);
}




init();
