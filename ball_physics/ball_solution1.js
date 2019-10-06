
const radius = 10;

// x, y ball_solution1 position and dx, dy velocity of the direction
const ball_solution1 = {x:20, y:0, dx: 5, dy: 1};
let   old  = {x: ball_solution1.x, y: ball_solution1.y};
var velocity = 50;

function ballEqual(a, b) {
    return a.x === b.x && a.y === b.y
        && a.dx === b.dx && a.dy === b.dy;
}

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "yellow";
    context.fillRect(0, 0, canvas.width, canvas.height);

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000/velocity);
}

function nextBoard() {
     const canvas  = document.getElementById("canvas");

    // keep old ball_solution1 values for the sake of efficient clearing of the old display
    old = JSON.parse(JSON.stringify(ball_solution1));

    // handle ball_solution1 is hitting the bounds
    //   reverse direction
    //   lose some energy relative to the current inertia (only velocity varies)
    if (ball_solution1.y + radius > canvas.height) { ball_solution1.dy *= -1 }
    if (ball_solution1.x + radius > canvas.width || ball_solution1.x < 1) { ball_solution1.dx *= -1 }

    // calculate new position
    // calculate any changes in velocity due to gravitational pull or medium resistance
    console.info(ball_solution1.y + " : " + ball_solution1.dy + " : " + ball_solution1.x);
    ball_solution1.dy += 1;
    ball_solution1.y += ball_solution1.dy;
    ball_solution1.x += ball_solution1.dx;
}

function display(context) {
    context.clearRect(old.x - radius - 1 , old.y - radius -1 , 22, 22 );
    context.fillStyle = "yellow";
    context.fillRect(old.x - radius - 1 , old.y - radius -1 , 22, 22 );
    fillBox(context)
}

function fillBox(context) {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(ball_solution1.x, ball_solution1.y, radius, 0, 6.3, false);
    context.fill();
}


