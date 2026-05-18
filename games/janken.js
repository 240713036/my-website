    let winCount = 0;
    let lossCount = 0;
    let drawCount = 0;
    let gameCount = 0;

    document.getElementById('rock').addEventListener('click', () => {
            const winRate = Math.floor((winCount / gameCount) * 100 * 100) / 100;
            document.getElementById('winRate').innerText = (winRate + '%');
            judge('グー');
        });

    document.getElementById('scissors').addEventListener('click', () => {
        judge('チョキ');
        });

    document.getElementById('paper').addEventListener('click', () => {
        judge('パー');
        });

function judge(inputItem){

    gameCount++;

    const items = ['グー', 'チョキ', 'パー'];
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];

    let message2 = '';

    if (inputItem === randomItem) {
        message2 = 'あいこ';
        drawCount++;
        document.getElementById('drawCount').innerText = drawCount;
    }
    else if (
        inputItem == 'グー' && randomItem == 'チョキ' ||
        inputItem == 'チョキ' && randomItem == 'パー' ||
        inputItem == 'パー' && randomItem == 'グー'
    ) {
        message2 = '勝ち';
        winCount++;
        document.getElementById('winCount').innerText = winCount;
    }
    else {
        message2 = '負け';
        lossCount++;
        document.getElementById('lossCount').innerText = lossCount;
    }

    // 結果表示
    document.getElementById('playerHand').innerText = inputItem;
    document.getElementById('cpuHand').innerText = randomItem;
    document.getElementById('gameResult').innerText = message2;

    // 勝率
    const winRate =
        Math.floor((winCount / gameCount) * 10000) / 100;

    document.getElementById('winRate').innerText =
        winRate + '%';
}













