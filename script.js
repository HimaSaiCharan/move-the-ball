const debug = (args) => {
  console.log(args);
  return args;
};

class BallModel {
  #x;
  #y;

  constructor() {
    this.#x = 0;
    this.#y = 0;
  }

  get position() {
    return { x: this.#x, y: this.#y };
  }

  moveUp() { this.#y += 100; }

  moveRight() { this.#x += 50; }

  moveDown() { this.#y -= 100; }

  moveLeft() { this.#x -= 50; }
}

class BallView {
  #screenWidth;
  #screenHeight;
  constructor(element) {
    this.ball = element;
    const { height, width } = this.#parentDimensions();
    this.#screenHeight = height;
    this.#screenWidth = width;
  }

  updatePosition(x, y) {
    this.ball.style.left = x + "px";
    this.ball.style.bottom = y + "px";
  };

  #parentDimensions() {
    return { height: this.ball.parentElement.style.height, width: this.ball.parentElement.style.width };
  }

}

class BallController {
  #model;
  #view;
  #keys = {
    "ArrowUp": this.#jump,
    "ArrowLeft": this.#model.moveLeft,
    "ArrowRight": this.#model.moveRight,
    "ArrowRight": this.#model.moveRight,
  };

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
    this.#startGravity();
  }

  #updateView() {
    const { x, y } = this.#model.position;
    this.#view.updatePosition(x, y);
  }

  handleMove(event) {
    if (!(event.key in this.#keys)) return;

    if (this.#model.position.y === 0) {
      this.#keys[event.key]();
      this.#updateView();
      return;
    }

    if (event.key === "ArrowLeft") {
      this.#left();
      return;
    }

    if (event.key === "ArrowRight") {
      this.#right();
      return;
    }
  }

  #jump() {
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      if (jumpHeight >= 20) {
        clearInterval(jumpInterval);
        return;
      }
      this.#model.moveUp();
      this.#updateView();
      jumpHeight += 2;
    }, 1);
  }

  #left() {
    const interval = setInterval(() => {
      if (this.#model.position.y === 0) {
        clearInterval(interval);
        return;
      }
      this.#model.moveLeft();
      this.#updateView();
    }, 50);
  }

  #right() {
    const interval = setInterval(() => {
      if (this.#model.position.y === 0) {
        clearInterval(interval);
        return;
      }
      this.#model.moveRight();
      this.#updateView();
    }, 50);
  }

  #startGravity() {
    setInterval(() => {
      if (this.#model.position.y > 0) {
        this.#model.moveDown();
        this.#updateView();
      }
    }, 50);
  }
}

const main = () => {
  const ball = document.querySelector("#ball");
  const screen = document.querySelector("#screen");
  const ballModel = new BallModel();
  const ballView = new BallView(ball);
  const ballController = new BallController(ballModel, ballView);

  screen.addEventListener("keydown", (event) => ballController.handleMove(event));
  screen.focus();
};

main();