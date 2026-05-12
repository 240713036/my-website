# my-website
https://240713036.github.io/my-website/  

## 🛠 Tech
- HTML  
- CSS  
- JavaScript  

## 📁 Structure
```
.  
├── README.md  
├── index.html  
├──default.css  
├──jiko.html  
├──kadai.html  
├──sonota.html  
├──title.png  
└──games  
   └──kazuate.html  
   └──kazuate.js
   └──janken.html  
   └──janken.js  
```

講義で作成・使用するウェブサイトです。  
レスポンシブデザインは調整中です。  

---デザインについて工夫した点  
-kadai.hemlページは、gridを使用して追加を容易にしました  
-gridの調整を行いました(2026/05/12)  

---数当てゲームについて工夫した点  
-難易度の変更を追加しました  
-ウェブページの読み込み時と難易度変更時にランダムを振り直すことで、操作の度に答えが変わることのないようにしました  
-ボタンの挙動をEnterとRetryに切り替えることやキーボードでもボタンを押せるようにすることで、シンプルで直感的な操作ができるようにしました  
-初期化処理を関数にまとめることでコードを整理しました 

---じゃんけんゲームについて工夫した点  
-じゃんけんの手をボタンで選べるようにしました  
-勝利数、敗北数、引き分け数の累計と、勝率が表示されるようにしました  
