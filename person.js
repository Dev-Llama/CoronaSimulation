//* Class file that defines the dots and all there methods. Gets accesed only by sketch.js

const STATE_COLOURS = ["#828282", "#f39ff6", "#710193", "#3BB143", "0"] // healty, easy, sever, immune, death


class Person {
    constructor(hometown, movement) {
        this.hometown = hometown;
        this.movement = movement;
        this.position = this.randomPosition();
        this.state = 0;
        this.infection_time = 0;
    }

    paint() {
        // Moving the person
        this.position.add(this.step)

        // Painting the person
        stroke(STATE_COLOURS[this.state]);
        strokeWeight(2);
        point(this.position.x, this.position.y);
    }

    move() {
        let destination = this.randomPosition();    
        this.step = p5.Vector.sub(destination, this.position).div(days_per_second);
        this.checkInfection();
    }

    randomPosition() {
        let distance = random(this.movement);
        let move = p5.Vector.random2D().mult(distance);
        return p5.Vector.add(this.hometown, move);
    }

    checkInfection() {
        if (this.state == 1) {
            if(this.infection_time < days_ill) {
                this.infection_time++;
            } else {
                this.state = 3;
                immune++;
                infected_not_severe--;
            }
        } else if (this.state == 2) {
            if (this.infection_time < days_ill) {
                let space_hospital = int(people * hospial_capacity); // number of people that can go to the hospital
                if (space_hospital > infected_severe) { // IF there is space in the hospital
                    this.infection_time++;
                } else {
                    this.state = 4;
                    infected_severe--;
                    dead++;
                }
            } else {
                this.state = 3;
                immune++;
                infected_severe--;
            }
        }
    }


    infection() {
        if (random(100) < probability_severe) {
            this.state = 2;
            infected_severe++;
        } else {
            this.state = 1;
            infected_not_severe++;
        }
    }

}
