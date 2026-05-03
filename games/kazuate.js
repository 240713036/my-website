let retryflag = false;
let count = 0;
let target = Math.floor(Math.random() * 100) + 1;

//
let select = document.getElementById('kazuate-level');
let hintp = document.getElementById('kazuate-hint');
let countp = document.getElementById('kazuate-count');
let ent = document.getElementById('ent');

//初期化
function retry() {
    count = 0;
    retryflag = false;
    ent.textContent = "Enter";
    hintp.textContent = "数字を入力してください";
    document.getElementById("kazuate-input").value = 0;
    countp.textContent = "試行回数：0";
    let max = 100;
    let l = select.value;
    if (l === "easy") {
        max = 50;
    }
    else if (l === "normal") {
        max = 100;
    }
    else if (l === "hard") {
        max = 200;
    }
    target = Math.floor(Math.random() * max) + 1;
}

//判定
function judge() {
    count++;
    countp.textContent = "試行回数：" + count;
    let ans = Number(document.getElementById("kazuate-input").value);
    if (target > ans) {
        hintp.textContent = "もっと大きい";
    }
    else if (target < ans) {
        hintp.textContent = "もっと小さい";
    }
    else if (target === ans) { 
        hintp.textContent = "正解！";
        retryflag = true;
        ent.textContent = "retry";
    }
}


//ボタンクリック
document.getElementById('ent').addEventListener('click', () => {
    if (retryflag === false) {
        judge();
    }
    else {
        retry();
    }
});
//エンターキー
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        if (retryflag === false) {
            judge();
        }
        else {
            retry();
        }
    }
});

//難易度変更
select.addEventListener('change', function() {
    retry();
});