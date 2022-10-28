let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

class Ball {
  constructor(x, y) {
    this.baseR = 20;
    this.r = this.baseR;
    this.x = x || randomIntFromInterval(0 + this.r, canvas.width - this.r);
    this.y = y || randomIntFromInterval(0 + this.r, canvas.height - this.r);
    this.vy = (Math.random() - 0.5) * 10;
    this.vx = (Math.random() - 0.5) * 10;
    this.draw();
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = "blue"; //`rgba(231,76,60,${Math.random()})`;
    c.fill();
  }

  update() {
    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
      this.vy = -this.vy;
    }
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.vx = -this.vx;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.draw();
  }
}

let balls = [];
for (let i = 0; i < 200; i++) {
  balls.push(new Ball());
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.update();
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("click", function (e) {
  balls.push(new Ball(e.clientX, e.clientY));
});

window.addEventListener("mousemove", function (e) {
  balls.forEach((ball) => {
    let distance = Math.sqrt(
      Math.pow(e.clientX - ball.x, 2) + Math.pow(e.clientY - ball.y, 2)
    );

    if (distance < 100 && ball.r < ball.baseR * 4) {
      ball.r += 1;
    } else if (ball.r > ball.baseR) {
      ball.r -= 1;
    }
  });
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
