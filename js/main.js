const canvas = document.getElementById('myCanvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 50, 50, road);


const obstacles = [];
const obstacleCount = 50; 

function createObstacles() {
    for (let i = 0; i < obstacleCount; i++) {
        const lane = Math.floor(Math.random() * 3);  
        const y = -200 - i * 200; 
        obstacles.push(new Obstacle(road.getLaneCenter(lane), y, 30, 50));
    }
}

createObstacles();

function animate() {
    car.update();


    obstacles.forEach(obstacle => {
        
        obstacle.y += car.speed;

        
        if (obstacle.checkCollision(car)) {
            resetGame(); 
        }
    });

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    obstacles.forEach(obstacle => obstacle.draw(ctx)); 
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}

function resetGame() {
    
    car.resetPosition();

    
    obstacles.length = 0; 
    createObstacles();
}

animate();