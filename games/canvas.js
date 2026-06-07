let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let hanabis = [];
let particles = [];
let colors = ["red", "orange", "yellow", "skyblue", "purple"];
let timerId = NaN;

function ccl(x, y, r, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

class hanabi {
    constructor(x, y, vx, vy, exY, color){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.exY = exY;
        this.exploded = false;
        this.color = color;
    }

    move(){
        if(this.exploded){
            return;
        }
        this.y -= this.vy;
        if(this.y <= this.exY){
            this.explode();
            this.exploded = true;
        }
        ccl(this.x, this.y, 5, "white");
    }

    explode(){
        for(let i = 0; i < 30; i++){

            let vx = Math.random() * 5 - 2.5;
            let vy = Math.random() * 5;

        particles.push(
            new particle(
                this.x,
                this.y,
                vx,
                vy,
                this.color
            )
        );
        }
    }
}

class particle{
    constructor(x, y, vx, vy, color){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = Math.floor(Math.random() * 80) + 30;
        this.color = color;
    }
    move(){
        this.vy -= 0.1;//加速度
        this.y -= (this.vy);
        this.x += this.vx;
        this.life -= 1;
        ccl(this.x, this.y, 3, this.color);
    }
}

function tick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < hanabis.length; i++){
        hanabis[i].move();
    }
    for(let i = particles.length - 1; i >= 0; i--){
        particles[i].move();

        if(particles[i].life <= 0){
            particles.splice(i, 1);
        }
    }
}

function launch(){
    let color = colors[Math.floor(Math.random() * colors.length)];
    hanabis.push(
            new hanabi(
            (Math.random() * 700) + 50,
            600,
            0,
            10,
            (Math.random() * 500) + 100,
            color)
    );
}

function init(){
    canvas.addEventListener("click", launch);
    hanabis.push(new hanabi(350, 600, 0, 10, 200)

    );
    timerId = setInterval(tick, 70);
}



init();
