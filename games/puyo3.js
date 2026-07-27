let ctx;
let timer = NaN;

const FW = 6;
const FH = 13;
const DELETE = 4;

let field = [
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
];

let n = 0;

let d_flag = false;
let f_flag = false;

let px = 0;
let py = 0;
let keyCode = 0;

let fallCount = 0;
const fall_speed = 25;

let score = 0;
let rensa = 0;

let hscore = 0;
let downKey = false;

function mykeydown(e) {
    if (e.keyCode == 40) {
        downKey = true;
    } else {
        keyCode = e.keyCode;
    }
}

function mykeyup(e) {
    if (e.keyCode == 40) {
        downKey = false;
    }
    keyCode = 0;
}

// ゲームフィールド描く
function paint() {
    for (y=1; y<FH; y++){
        ctx.fillStyle = "brown";
        ctx.fillRect(0,(y+1) *44, 42, 42);
        for (x = 0; x < FW; x++) {
            switch (field[x][y]) {
                case 0: ctx.fillStyle = "white"; break;
                case 1: ctx.fillStyle = "red";  break;
                case 2: ctx.fillStyle = "green"; break;
                case 3: ctx.fillStyle = "blue"; break;
                case 4: ctx.fillStyle = "yellow"; break;
            }
            ctx.fillRect((x+1) * 44, (y+1) * 44, 42, 42);
        }
        ctx.fillStyle = "brown";
        ctx.fillRect((FW+1)*44,(y+1)*44,42,42);
    }
    ctx.fillStyle = "brown";
    ctx.fillRect(0,(FH+1) *44, (FW+2) * 44, 42);
    ctx.clearRect(500,0,300,800);//消す処理を追加
    ctx.fillStyle = "rgba(220, 133, 30, 50)";
    ctx.font = "bold 50px sans-serif";
    ctx.fillText(("0000000" + score).slice(-7), 500, 170);
}

function init() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    timer = setInterval(tick, 20);
    paint();

    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;
    hscore = localStorage.getItem("hscore3036");
    if (hscore == null) {
        hscore = 0;
    }
    alert("これまでの最高スコア：" + hscore);
}

// 自分に隣接している同色ぷよの個数を調べる(探索後に消す→戻す)
function count(x, y) {
    c = field[x][y];//自分の色
    field[x][y] = 0;
    n++;
    if (x+1 < FW && field[x+1][y] == c) count(x + 1, y);
    if (y+1 < FH && field[x][y+1] == c) count(x, y + 1);
    if (x-1 >= 0 && field[x-1][y] == c) count(x - 1, y);
    if (y-1 >= 0 && field[x][y-1] == c) count(x, y - 1);

    //field[x][y] = c;
}

// ぷよを消す(count関数の応用)
function vanish(f, x, y) {

    c =f[x][y]; // 自分の色

    f[x][y]= 0; // 色ぷよを消す

    if (x+1 < FW && f[x+1][y] == c) vanish(f, x + 1, y);
    if (y+1 < FH && f[x][y+1] == c) vanish(f, x, y + 1);
    if (x-1 >= 0 && f[x-1][y] == c) vanish(f, x - 1, y);
    if (y-1 >= 0 && f[x][y-1] == c) vanish(f, x, y - 1);
}

// ゲームフィールドの色をコピーする
function copy_field(to, from) {

    for (let y =0 ; y < FH; y++) {
        for (x= 0 ; x< FW; x++) {
            to[x] [y] = from[x][y];
        }
    }
}

// 四方に DELETE 以上隣接している色ぷよを消す
// 戻り値:削除した色ぷよの数(スコア計算に利用可能)
function delete_puyo() {

    let f = Array(FW);
    for (let yy=0; yy < FH; yy++) {
        f[yy] = Array(FH);
    }
    d = 0;

    copy_field(f, field);
    for (y = 0; y < FH; y++) {
        for (x= 0; x < FW; x++) {
            n = field[x][y];
            if (n != 0) {
                n = 0;
                count(x, y);
                if (n >= DELETE) {
                    vanish(f, x, y);
                    d += n;
                }
            }
        }
    }
    copy_field(field, f);
    return d;
}

// 浮いているぷよを1マスだけ落とす
// 戻り値:ぷよを落とした列数
function fall_puyo() {

    py++;

    n = 0;
    for (x= 0; x < FW; x++) {
        for (y = FH-1; y >= 0; y -- ) {
            if (field[x][y] == 0) {
                for (iy = y-1; iy >= 0 && field[x][iy] == 0; iy -- );
                if (iy < 0) break;
                n++;
                for (iy = y; iy >= 0; iy -- ) {
                    if (iy-1 >= 0)
                        field[x][iy] = field[x][iy-1];
                    else
                        field[x][iy] =0;
                }
                break;
            }
        }
    }
    return n;
}

// 新しいぷよを作る
function new_puyo() {

    px = FW/2;
    py = 1;

    if (field[px][0] != 0 || field[px][1] != 0) {
        gameover();
        return;
    }
    //r = Math.floor(Math.random()*FW);
    field[px][0] = Math.floor(Math.random()*4)+1;
    field[px][1] = Math.floor(Math.random()*4)+1;
}

//メイン
function tick() {

    input()
    fallCount++;
    let speed = fall_speed;
    if (downKey) {
    speed = 10;
    }

    if (fallCount >= speed) {
        fallCount = 0;
        f_flag = fall_puyo();
        if (f_flag == 0){
            d_flag = delete_puyo();
            if (d_flag > 0) {
                rensa++;
                score += d_flag * 10 * rensa;
            }
            else {
                rensa = 0;
            }
            if (d_flag == 0){
                new_puyo();
            }
        }
    }
    paint();
}


// ゲームオーバー(現状どこからも呼ばれていない)
function gameover() {
    clearInterval(timer);
    timer = NaN;

    if (hscore < score) {
        hscore = score;
        localStorage.setItem("hscore3036", hscore);
    }
    alert("GameOver! Score:"+score);
}

function input() {
    switch (keyCode) {
        case 37: // 左キー
            if (px > 0){
                if (field[px-1][py] == 0 && field[px-1][py-1] == 0){
                    field[px-1][py] = field[px][py];
                    field[px-1][py-1] = field[px][py-1];
                    field[px][py] = 0;
                    field[px][py-1] = 0;
                    px --;
                }
            }
            break;
        case 39:// 右キー
            if (px < FW - 1){
                if (field[px+1][py] == 0 && field[px+1][py-1] == 0){
                    field[px+1][py] = field[px][py];
                    field[px+1][py-1] = field[px][py-1];
                    field[px][py] = 0;
                    field[px][py-1] = 0;
                    px ++;
                }
            }
            break;
        case 32://スペース
        let pre = field[px][py]
        field[px][py] = field[px][py-1];
        field[px][py-1] = pre;
        break;
    }
    keyCode = 0;
}
