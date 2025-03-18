class Ball {
  #x;
  #y;

  constructor() {
    this.#x = 0;
    this.#y = 0;
  }

  coordinates() {
    return { x: this.#x, y: this.#y };
  }

  moveUp() {
    this.#y += 500;
  }
  moveRight() {
    this.#x += 10;
  }
  moveDown() {
    this.#y -= 10;
  }
  moveLeft() {
    this.#x -= 10;
  }
}

const updateBallPosition = (x, y) => {
  console.log(x, y);
  const ball = document.querySelector("#ball");
  ball.style.left = x + "px";
  ball.style.bottom = y + "px";
  console.log(ball.style);
};

const moves = {
  ArrowUp(ball) {
    ball.moveUp();
  },
  ArrowRight(ball) {
    ball.moveRight();
  },
  ArrowDown(ball) {
    ball.moveDown();
  },
  ArrowLeft(ball) {
    ball.moveLeft();
  }
};

const moveBall = (event, ball) => {
  if (moves[event.key]) {
    moves[event.key](ball);
    const { x, y } = ball.coordinates();
    updateBallPosition(x, y);
  }
};

const main = () => {
  const ball = new Ball();
  const screen = document.querySelector("#screen");
  screen.addEventListener("keydown", (event) => moveBall(event, ball));
  console.log(screen);
};

main();