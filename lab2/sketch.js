class Monster {
    constructor() {
        this.x = width;
        this.y = height / 2;
        this.speed = 2;
    }

    move() {
        this.x -= this.speed;
    }

    draw() {
        text('👾', this.x, this.y);
    }

    reset() {
        this.x = width;
        this.y = random(0,height);
        this.speed += 1;
    }
}

class Ogre {
    constructor() {
        this.x = width;
        this.y = height / 2;
        this.speed = 1;
    }

    move() {
        this.x -= this.speed;
    }

    draw() {
        text('👹', this.x, this.y);
    }

    reset() {
        this.x = width;
        this.y = random(0,height);
        this.speed += 1.5;
    }
}

class Rocket {
    constructor() {
        this.x = 20;
        this.lifes = 10;
    }

    draw() {
        text('🚀', this.x, mouseY)
    }
}

let monster;
let ogre;
let rocket;

function setup() {
    createCanvas(400, 400);

    monster = new Monster();
    ogre = new Ogre();
    rocket = new Rocket();
}

function draw() {
    background(220);

    rocket.draw();

    if (rocket.lifes == 0) {

        text('Game over', 100, 200);

    } else {

        monster.move();
        monster.draw();

        if (monster.x < 20) {
            if (abs(monster.y - mouseY) > 10) {
                rocket.lifes -= 1;
            }

            monster.reset();
        } else {

            ogre.move();
            ogre.draw();
    
            if (ogre.x < 20) {
                if (abs(ogre.y - mouseY) > 10) {
                    rocket.lifes -= 1;
                }
    
                ogre.reset();
        }

        text('❤️' + rocket.lifes, 10, 40);
    }
  }
}