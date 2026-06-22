"use strict"
let W=31;// 幅
let H= 31;// 高さ

let maze=[];// 迷路

let ctx;

function random(v) {
    return Math.floor(Math.random()* v);
}

function init() {
    let maze = document.getElementById("maze");
    ctx = maze.getContext("2d");

    createMaze(W,H);//迷路作成
    repaint();
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

function repaint() {
    //背景クリア
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 900, 600);

    // 迷路描画
    ctx.fillStyle = "brown";
    ctx.translate(0, 0);
    for (let x=0; x < W; x++) {
        for (let y = 0; y < H; y++) {
            if (maze[y][x] == 1) {
                ctx.drawImage(wallImg,
                              x * 16,
                              y * 16,
                              16,
                              16);
            }
            else {
                ctx.drawImage(loadImg,
                              x * 16,
                              y * 16,
                              16,
                              16);
            }
        }
    }
    ctx.restore();
}


