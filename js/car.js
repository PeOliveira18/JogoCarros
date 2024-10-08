class Car {
    constructor(x, y, width, height, road) {
        this.x = x;
        this.y = y;
        this.initialX = x; 
        this.initialY = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.5;
        this.maxSpeed = 2;
        this.friction = 0.05;
        this.angle = 0;

        this.road = road; 

        this.controls = new Controls();

        this.image = new Image();
        this.image.src = "carro.png"; 
    }

    update() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        
        const carLeft = this.x - this.width / 2;
        const carRight = this.x + this.width / 2;

        if (carLeft < this.road.left) {
            this.x = this.road.left + this.width / 2;
        }

        if (carRight > this.road.right) {
            this.x = this.road.right - this.width / 2;
        }
    }

    resetPosition() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.speed = 0; 
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);


        ctx.drawImage(
            this.image,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.restore();
    }
}
