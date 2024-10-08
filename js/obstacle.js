class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }

    checkCollision(car) {

        return (
            car.x - car.width / 2 < this.x + this.width / 2 &&
            car.x + car.width / 2 > this.x - this.width / 2 &&
            car.y - car.height / 2 < this.y + this.height &&
            car.y + car.height / 2 > this.y
        );
    }
}