

const x = x => y => x;
const y = x => y => y;
const Pair = x => y => selector => selector(x)(y);

const north = Pair(0)(-1);
const east  = Pair(1)(0);
const south = Pair(0)(1);
const west  = Pair(-1)(0);

let direction = north;

const clockwise = [north, east, south, west, north];
const countercw = [north, west, south, east, north];

let snake_solution2 = [
    Pair(10)(5),
    Pair(10)(6),
    Pair(10)(7),
    Pair(10)(8)
];
let food = Pair(15)(15);

function snakeEquals(a, b) {
    return a(x) === b(x) && a(y) === b(y);
}

function changeDirection(orientation) {
    const idx = orientation.indexOf(direction);
    direction = orientation[idx + 1];
}

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const rightArrow = 39;
    const leftArrow  = 37;
    window.onkeydown = evt => {
        const orientation = (evt.keyCode === rightArrow) ? clockwise : countercw;
        changeDirection(orientation);
    };

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
}

function nextBoard() {
    const maxX = 20;
    const maxY = 20;
    const oldHead = snake_solution2[0];

    function inBounds(x, max) {
        if (x < 0)   { return max - 1 }
        if (x > max) { return 0 }
        return x
    }

    const head = Pair
    (inBounds(oldHead(x) + direction(x), maxX))
    (inBounds(oldHead(y) + direction(y), maxY));


    if (snakeEquals(food, head)) {  // have we found any food?
        food = Pair   // place new food at random location
        (Math.floor(Math.random() * 20))
        (Math.floor(Math.random() * 20));
    } else {
        snake_solution2.pop(); // no food found => no growth despite new head => remove last element
    }

    snake_solution2.unshift(head); // put head at front of the list
}

function display(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw all elements
    context.fillStyle = "cyan";
    snake_solution2.forEach(element =>
        fillBox(context, element)
    );
    context.fillStyle = "green";
    fillBox(context, snake_solution2[0]);
    // draw food
    context.fillStyle = "red";
    fillBox(context, food);
}

function fillBox(context, element) {
    context.fillRect(element(x) * 20 + 1, element(y) * 20 + 1, 18, 18);
}


