let timerId = NaN;
let count = 0;
let imglink = new Array();
for (i = 0; i < 10; i++){
    imglink[i] = "<img src='../img/omikuji/" + i + ".png'>";
}
function startTimer(){
    timerId = setInterval(tick, 500);
}
function stopTimer(){
    clearInterval(timerId);
}
function tick(){
    document.getElementById("counter").innerHTML = imglink[count];
    count++;
    if (count == 10)
        count = 0;
}

