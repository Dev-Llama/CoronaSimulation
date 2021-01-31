//* Here the interaction with the user will be managed and also the display logic will be in this place.

let travelBan = false;
let faceMasks = false;
let socialDistancing = false;

function mousePressed() {
    // check if click is in window
    if(mouseX < WINDOW_WIDTH - MOVEMENT_MAX * 2 && mouseY < WINDOW_HEIGHT - MOVEMENT_MAX * 2 && mouseY > 0) {
        admin_area[towns] = spawnTown();
        towns++;
    }
}


// infect patient 0
function keyReleased() {
    if (key == "S") {
        let town = int(random(towns)); //Chosses the community patient 0 lives in
        let patient = int(random(admin_area[town].length)); //Chooses the person living in the choosen town
        if (admin_area[town][patient].state != 1 && admin_area[town][patient].state != 2) {
            admin_area[town][patient].infection();
        }
    }
    return false;

}




// display logic
function info() {
    document.getElementById("towns").innerHTML = `Towns: ${towns}`;
    document.getElementById("days").innerHTML = `Days: ${days}`;
    document.getElementById("people").innerHTML = `People starting: ${people}`;
    document.getElementById("healthy").innerHTML = `Healthy: ${people - infected_not_severe - infected_severe - dead}`;
    let txt_not_severe = document.getElementById("infected_not_severe")
    txt_not_severe.innerHTML = `Infected not severe: ${infected_not_severe}`;
    txt_not_severe.style.color = STATE_COLOURS[1];
    let txt_severe = document.getElementById("infected_severe")
    txt_severe.innerHTML = `Infected severe: ${infected_severe}`;
    txt_severe.style.color = STATE_COLOURS[2];
    let txt_immune = document.getElementById("immune");
    txt_immune.innerHTML = `Immune: ${immune}`;
    txt_immune.style.color = STATE_COLOURS[3]
    let txt_dead = document.getElementById("dead")
    txt_dead.innerHTML = `Dead: ${dead}`;
    txt_dead.style.color = STATE_COLOURS[4]
}


let infection_probability;
let probability_severe;
let days_ill;
let day_speed;
let hospial_capacity;

function caption() {
    infection_probability = document.getElementById("infectionProbability").value;
    document.getElementById("infectionProbabilityText").innerHTML = `${infection_probability}`;
    
    days_ill = document.getElementById("days_ill").value;
    document.getElementById("days_ill_text").innerHTML = `${days_ill}`;
    
    probability_severe = document.getElementById("probability_severe").value;
    document.getElementById("probability_severe_text").innerHTML = `${probability_severe}`
    
    day_speed = document.getElementById("day_speed").value;
    document.getElementById("day_speed_text").innerHTML = `${day_speed*0.01}`
    
    hospial_capacity = document.getElementById("hospial_capacity").value;
    document.getElementById("hospial_capacity_text").innerHTML = `${hospial_capacity}`
}



//gives the useer the pandemic instructions
function instructions() {
    if (infected_not_severe > 0 || infected_severe > 0) return; //IF ture pandemic started
    noStroke();
    var x = width/2;
    var y = 35
    
    textAlign(CENTER);
    textSize(17);
    if (towns == 0) { //means no towns and people in simulation
        fill(STATE_COLOURS[0]);
        text("Click to add communities", x, y);
    } else { //means people are allready there, patient 0 does not jet exsist
        fill(STATE_COLOURS[1]);
        text("Press 'S' to start the pandemic", x, y);
    }
}



// Actions logic
document.getElementById("travelBan").onclick = function() {
    travelBan = !travelBan;
    document.getElementById("travelBan_text").innerHTML = travelBan ? "Abolish" : "Enact";
}

document.getElementById("faceMasks").onclick = function() {
    faceMasks = !faceMasks;
    document.getElementById("faceMasks_text").innerHTML = faceMasks ? "Abolish" : "Enact";
}

document.getElementById("socialDistancing").onclick = function() {
    socialDistancing = !socialDistancing;
    document.getElementById("socialDistancing_text").innerHTML = socialDistancing ? "Abolish" : "Enact";
}


//reset logic
document.getElementById("resetBtn").onclick = function() {
    location.reload();
}
