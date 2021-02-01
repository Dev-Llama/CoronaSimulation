//* Handels drawing and spawning in through setup and draw()

// setup
const WINDOW_WIDTH = window.innerWidth * (2/3);
const WINDOW_HEIGHT= 630;
const FR = 60/2;
let days_per_second;

// Town settings  //! Change these settings later
const POPULATION_MAX = 50;
const POPULATION_MIN = 150;
const MOVEMENT_MAX = 30;
const MOVEMENT_MIN = 50;

let radius_infection = 2;

//Towns and People
let admin_area = [];
let towns = 0,
    days = 0;
    people = 0,
    infected_not_severe = 0;
    infected_severe = 0;
    immune = 0;
    dead = 0;


function setup() {
  let canvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  canvas.parent("sketch-holder")
  background(0);
  frameRate(FR);
  // controls();
}


function draw() {
  background(0);
  //days
  days_per_second = int(day_speed * 0.01 * FR);
  if (frameCount % days_per_second == 0) {
    move();
    if (!travelBan) {
      travel();
    }
    if (infected_not_severe > 0 || infected_severe > 0) days++; // If the first one gets infected, the simulation day counter starts
  }
  paint();
  caption();
  info();
  instructions();

  console.log("mouseX",mouseX, "mouseY", mouseY)
  // debugging();
}

// swaps 2 people from 2 towns
function travel() {
  for (let i = 0; i < admin_area.length; i++) {
    //picks traveler at random
    let traveler_homeTown = int(random(admin_area[i].length)); //Picks travelers hometown
    let destination = int(random(admin_area.length)); //Picks a destination for traveler
    let traveler_destination = int(random(admin_area[destination].length)); //Picks the traveler from destination to swap town
    let traveler = admin_area[i][traveler_homeTown]; //Picks traveler from hometown
    let swap = admin_area[destination][traveler_destination];
    let copy_traveler = Object.assign({}, traveler); //copys Travelers

    if (traveler.state == 4 || swap.state == 4) { // checks if dead
      return;
    } else {
      // Transfers all the variables from the different objects except state    
      traveler.hometown = swap.hometown;
      traveler.expansion = swap.expansion;
      swap.hometown = copy_traveler.hometown;
      swap.expansion = copy_traveler.expansion;
  
      //Change the individuals in the Town list
      admin_area[destination][traveler_destination] = traveler;
      admin_area[i][traveler_homeTown] = swap;
    }



  }
}


function spawnTown() {
  // defining the props of the town
  let population = int(random(POPULATION_MIN, POPULATION_MAX));
  let movement = int(random(MOVEMENT_MIN, MOVEMENT_MAX));
  let town = [];
  let towncenter = createVector(mouseX, mouseY);

  // initialising every member of the town and giving them the same home
  for (let i = 0; i < population; i++)   {
    town[i] = new Person(towncenter.copy(), movement);
  }
  people += population;
  return town;
}


//moves all people and gets only called by draw()
function move() {
  for(let i = 0; i < admin_area.length; i++) {
    for(let j = 0; j < admin_area[i].length; j++) {
      admin_area[i][j].move();
      infections(admin_area[i][j], admin_area[i])
    }
  }
}


//paints all people and gets only called by draw()
function paint() {
  for(let i = 0; i < admin_area.length; i++) {
    for(let j = 0; j < admin_area[i].length; j++) {
      admin_area[i][j].paint();
    }
  }
}


//handles possible infections takes in the person and the towncenter. Gets only called by move()
function infections(patient, town) {
  if (patient.state != 1 && patient.state != 2) return;// if true, patient is healthy
  for (let i = 0; i < town.length; i++) {
    let person = town[i]; // this person ist not sikc and hasnt been sick
    socialDistancing ? radius_infection = (2/3) : radius_infection = 2;
    if (person.state == 0 && patient.position.dist(person.position) <= radius_infection) {
      // Probability if the person is getting infected or not.
      let add = 0; //lowers probability if face Maskas are compulsory
      if (faceMasks) {
        add = 30;
      }
      if (random(100) <= infection_probability - add) {
        person.infection();
      }
    }
  }
}

function debugging() {
  console.log("towns: ", towns)
  console.log("days: ", days)
  console.log("people: ", people)
  console.log("infected_not_severe: ", infected_not_severe)
  console.log("infections_severe: ", infected_severe)
  console.log("immune: ", immune)
  console.log("dead: ", dead)
}
