let his = [];
function init() {
    let b = document.getElementById("board");
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 8; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            let img = document.createElement("img");
            img.src = '../img/load/chipA.png';
            td.appendChild(img);
            img.addEventListener("click", clicked);

            img.style.width = "50px";
            img.style.height = "50px";
            td.style.padding= "0px";
            b.style.borderCollapse = "collapse";
            b.style.borderSpacing = "0";
            img.style.display = "block";
        }
        b.appendChild(tr);
    }
}


function clicked(e) {
    let img = e.target;
    his.push({
        place: img,
        prev: img.src
    });
    img.src = '../img/wall/chipB.png';
}

function undo() {
    if (his.length === 0) return;
    let last = his.pop();
    last.place.src = last.prev;
}