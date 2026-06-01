
let qno = 1;
let x = 0;
let startDate;
let running = false;

//1から9までの数字を1つ抜いて表示
function q(){
    let dgt = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let a = Array(8);
    x = Math.floor(Math.random() * 9);
    for(let i = 0, j = 0; i < 9; i++) {
        if (i !== x){
            a[j] = (dgt[i]);
            j++;
        }
    }
    shuffle(a);
}

//キー入力

document.addEventListener('keydown', myhandler, false);

function myhandler(event) {
    if(running === false){
        return;
    }
    for (let i = '1'; i <= '9'; i++) {
        if (event.key == i) {
            document.getElementById("ans" + qno).innerText = '[' + i + ']';
            if (i == x+1) {
                if (qno >= 10) {
                    stop();
                    running = false;
                    return;
                }
                qno++;
                q();
            }
        }
    }
}

//配列aの中身をシャッフルする
Array.prototype.shuffle = function(){
    let i = this.length;
    while(i){
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function shuffle(cards){
    //let cards = [1,1,2,2,3,3,4,4,5,5,6,6];
    cards.shuffle();
    document.getElementById("question" + qno).innerText = cards.join(" ");
}

function start() {
    for(let i = 1; i <= 10; i++){
        document.getElementById("question" + i).innerText = "";
        document.getElementById("ans" + i).innerText = "";
    }
    qno = 1;
    running = true;
    startDate = new Date();
    document.getElementById("time").textContent = "";
    q();
}

function stop() {
    let now = new Date();
    let elapsed = now.getTime() - startDate.getTime();
    document.getElementById("time").textContent = (elapsed / 1000).toFixed(2) + '秒';
}