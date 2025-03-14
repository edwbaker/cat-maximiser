function task_1() {
    gamestate.cats += 4;
    tasksCompleted.push("task_1");
    gameloop();
}

function task_2() {
    gamestate.catsAppetite = 20;
    tasksCompleted.push("task_2");
    gameloop();
}

function addDreamie(count=1) {
    gamestate.dreamies += count;
    document.getElementById("dreamieCount").style.visibility = "visible";
}

function firstDreamie() {
    addDreamie(gamestate.cats);
    tasksCompleted.push("firstDreamie");
    gameloop();
}

function catsScarier() {
    gamestate.catsScariness = 1000;
    gamestate.mouseReducer = true;
    tasksCompleted.push("halloween");
    document.getElementById("scaredRow").style.visibility = "visible";
    gameloop();
}

function feastOnDreamies() {
    gamestate.catFood = "dreamies";
    tasksCompleted.push("dreamies");
    document.getElementById("feed").innerHTML = "Get Dreamie";
    gameloop();
}

function dreamies75() {
    tasksCompleted.push("dreamies75");
    gamestate.farmerAffection += 1;
    gameloop();
}
function task_1() {
    gamestate.cats += 4;
    tasksCompleted.push("task_1");
    gameloop();
}

function task_2() {
    gamestate.catsAppetite = 20;
    tasksCompleted.push("task_2");
    gameloop();
}

function addDreamie(count=1) {
    gamestate.dreamies += count;
    document.getElementById("dreamieCount").style.visibility = "visible";
}

function firstDreamie() {
    addDreamie(gamestate.cats);
    tasksCompleted.push("firstDreamie");
    gameloop();
}

function catsScarier() {
    gamestate.catsScariness = 1000;
    gamestate.mouseReducer = true;
    tasksCompleted.push("halloween");
    document.getElementById("scaredRow").style.visibility = "visible";
    gameloop();
}

function feastOnDreamies() {
    gamestate.catFood = "dreamies";
    tasksCompleted.push("dreamies");
    document.getElementById("feed").innerHTML = "Get Dreamie";
    gameloop();
}

function dreamies75() {
    tasksCompleted.push("dreamies75");
    gamestate.farmerAffection += 1;
    gameloop();
}

function gettingIn() {
    document.getElementById("swapDreamiesWindowPaws").style.visibility = "visible";
    document.getElementById("windowPaws").style.visibility = "visible";
    tasksCompleted.push("gettingIn");
    gameloop();
}

function gettingIn2() {
    document.getElementById("shitFloor").style.visibility = "visible";
    document.getElementById("purr").style.visibility = "visible";
    document.getElementById("windowPaws").style.visibility = "hidden";
    document.getElementById("dogAffection").style.visibility = "visible";
    tasksCompleted.push("gettingIn2");
    gameloop();
}

function betrayDog() {
    gamestate.farmerAffectionDog -= 50;
    gamestate.dreamies -= 20;
    tasksCompleted.push("betrayDog");
    gameloop();
}

function beatDog() {
    document.getElementById("hideDogShit").style.visibility = "visible";
    tasksCompleted.push("beatDog");
    gameloop();
}

function evictDog() {
    gameComplete();
}
