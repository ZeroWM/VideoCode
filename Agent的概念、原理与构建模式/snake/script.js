const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 游戏参数
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{x:10, y:10}];
let food = {x:15, y:15};
let dx = 0;
let dy = 0;
let score = 0;

// 绘制游戏元素
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize-1, gridSize-1);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-1, gridSize-1);
}

// 移动蛇
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

// 生成新食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

// 检查碰撞
function checkCollision() {
    const head = snake[0];

    // 撞墙检测
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // 撞自身检测
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// 游戏主循环
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();

    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('游戏结束! 得分: ' + score);
        return;
    }

    drawFood();
    drawSnake();

    // 显示分数
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('得分: ' + score, 10, 30);
}

// 键盘控制
document.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp': if (dy === 0) { dx=0; dy=-1; } break;
        case 'ArrowDown': if (dy === 0) { dx=0; dy=1; } break;
        case 'ArrowLeft': if (dx === 0) { dx=-1; dy=0; } break;
        case 'ArrowRight': if (dx === 0) { dx=1; dy=0; } break;
    }
});

// 开始游戏
generateFood();
const gameInterval = setInterval(gameLoop, 150);