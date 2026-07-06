"use strict"
let W=27;// 幅
let H= 19;// 高さ

let maze=[];// 迷路

let ctx;

function random(v) {
    return Math.floor(Math.random()* v);
}

const player = new Player(1, 1);
const treasure = new Treasure(W - 2, H - 2);
const slime = new Slime(10, 10);

let keyCode =0;
let timer = NaN;

function Player(x, y) {
    this.x=x;// x座標
    this.y= y; // y座標
    this.dir =1;// 向き

    this.update = function () {
        let nx= 0;// 仮のx方向移動量
        let ny=0;// 仮のy方向移動量
        switch (keyCode) {
            case 37:
            nx = -1;
            this.dir = 2;
            break;
            case 38:
                ny = -1;
                this.dir = 0;
                break;
            case 39:
                nx = +1;
                this.dir = 3;
                break;
            case 40:
                ny = +1;
                this.dir = 1;
                break;
        }
        //壁を通りぬけないように
        if (maze[this.y + ny][this.x + nx] == 0 && (nx != 0 || ny != 0)) {
            this.x = this.x + nx;
            this.y = this.y + ny;
        }
    };
    
    this.paint = function (gc, x, y, w, h) {
        let img = document.getElementById("hero" + this.dir);
        gc.drawImage(img, this.x*32, this.y*32, w, h);
    };
}

function Treasure(x, y) {
    this.x = x;
    this.y = y;

    this.paint = function(gc) {
        gc.drawImage(
            treImg,
            this.x * 32,
            this.y * 32,
            32,
            32
        );
    };
}

function Slime(x, y) {
    this.x = x;
    this.y = y;
    this.dir = random(4);

    this.update = function () {
        let nx = 0;
        let ny = 0;

        switch (this.dir) {
            case 0:
                ny = -1;
                break;
            case 1:
                ny = 1;
                break;
            case 2:
                nx = -1;
                break;
            case 3:
                nx = 1;
                break;
        }

        // 壁がなければ移動
        if (maze[this.y + ny][this.x + nx] == 0) {
            this.x += nx;
            this.y += ny;

        } else {
            // 壁なら方向転換
            this.dir = random(4);
        }
    };

    this.paint = function(gc) {
        gc.drawImage(
            sliImg,
            this.x * 32,
            this.y * 32,
            32,
            32
        );
    };
}

function init() {
    let maze = document.getElementById("maze");
    ctx = maze.getContext("2d");

    createMaze(W,H);//迷路作成
    repaint();
    go();
}

function go() {
    window. onkeydown = mykeydown;
    window. onkeyup = mykeyup;

    let maze = document.getElementById("maze");
    maze.oncontextmenu = function (e) {
        e.preventfault();
    };
    timer = setInterval(tick,200);
}

function createMaze(w, h) {
    for (let y = 0; y < h; y++) {
        maze[y] = [];
        for (let x = 0; x < w; x++) {
            maze[y][x] = x == 0 || x == w - 1 || y == 0 || y == h - 1 ? 1 : 0;
        }
    }
    for (let y = 2; y < h -2; y +=2) {
        for (let x = 2; x < w -2; x += 2) {
            maze[y][x] = 1; //柱を立てる
            let dir;
            if (y == 2) {
            dir = random(4);
            } else {
            dir = random(3);
            }
            let px = x;// 今のx座標
            let py = y;// 今のy座標
            switch (dir) {
                case 0:
                py++;// 下に倒す
                break;
                case 1:
                px --; // 左に倒す
                break;
                case 2:
                px++; // 右に倒す
                break;
                case 3:
                py --; //上に倒す
                break;
            }
            maze[py][px] = 1; // 倒れた場所も柱にする
        }
    }
}


//描画


let wallImg = new Image();
wallImg.src = "../img/wall/chipB.png";

let loadImg = new Image();
loadImg.src = "../img/load/chipA.png";

let treImg = new Image();
treImg.src = "../img/entity/treasure.png";

let sliImg = new Image();
sliImg.src = "../img/entity/slime.png";

function changel(link){
    loadImg.src = link;
    createMaze(W,H);
    repaint();
}

function changew(link){
    wallImg.src = link;
    createMaze(W,H);
    repaint();
}

//メインルーチン
function tick(){
    player.update();
    slime.update();
    if(player.x == slime.x && player.y == slime.y){
    player.x = 1;
    player.y = 1;
}
    repaint();
}

//描画
function repaint() {
    //背景クリア
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 896, 608);

    // 迷路描画
    ctx.fillStyle = "brown";
    ctx.translate(0, 0);
    for (let x=0; x < W; x++) {
        for (let y = 0; y < H; y++) {
            if (maze[y][x] == 1) {
                ctx.drawImage(wallImg,
                              x * 32,
                              y * 32,
                              32,
                              32);
            }
            else {
                ctx.drawImage(loadImg,
                              x * 32,
                              y * 32,
                              32,
                              32);
            }
        }
    }
    treasure.paint(ctx, 0, 0, 32, 32);
    player.paint(ctx, 0, 0, 32, 32);
    slime.paint(ctx);
}

//キーマウ押下のイベントハンドラ
function mykeydown(e){
    keyCode = e.keyCode;
}

function mykeyup(e){
    keyCode = 0;
}