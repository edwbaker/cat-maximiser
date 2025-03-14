let gametime = 0;

let gamestate = {
    cats: 1,
    catFood: "mice",
    catsAppetite: 1,
    catsScariness: 0,
    maxCats: 5,

    mice: 3,
    miceEaten:0,
    miceScared:0,
    miceReducer:false,

    farms: 0,

    farmerAffection: 0,

    dreamies: 0
};

let tasksCompleted = [];

function eatMouse() {
  if (gamestate.catFood == "mice") {
    if (gamestate.mice <= 0) {
        return;
      }
    gamestate.mice -= gamestate.cats*gamestate.catsAppetite;
    gamestate.miceEaten += gamestate.cats*gamestate.catsAppetite;
  }
  else if (gamestate.catFood == "dreamies") {   
    gamestate.dreamies += gamestate.cats;
}
  gameloop();
}

function gameloop() {
    updateMice();
    updateCats();

    document.getElementById("mouseCount").innerHTML = gamestate.mice;
    document.getElementById("catCount").innerHTML = gamestate.cats;
    document.getElementById("farmCount").innerHTML = gamestate.farms;

    if (gamestate.miceEaten > 0 && gamestate.catFood == "mice") {
        document.getElementById("consumedCounts").style.visibility = "visible";
        document.getElementById("miceEaten").innerHTML = gamestate.miceEaten;
    } else {
        document.getElementById("consumedCounts").style.visibility = "hidden";
    }

    if (gamestate.dreamies > 0) {
        document.getElementById("dreamieCount").innerHTML = gamestate.dreamies + " Dreamies rewarded";
    }

    if (gamestate.miceScared > 0 && gamestate.catFood == "mice") {
        document.getElementById("scaredCount").innerHTML = gamestate.miceScared;
    }

    if (gamestate.catFood != "mice") {
        document.getElementById("scaredRow").style.visibility = "hidden";
    }

    if (gamestate.farmerAffection > 0) {
        document.getElementById("affectionCount").innerHTML = gamestate.farmerAffection;
        document.getElementById("affection").style.visibility = "visible";
    }

    document.getElementById("projects").innerHTML = "";
    availableTasks();

    gametime += 1;
}

function updateMice() {
    if (gamestate.farms == 0) {
        return;
    }
    //Sexy times
    if (gamestate.mice > 2) {
        if (!gamestate.mouseReducer) {
            gamestate.mice = gamestate.mice + gamestate.mice * Math.floor(Math.random() * 3);
        }
    }
    //Sad times
    if (gamestate.mice > 2) {
        gamestate.mice = Math.floor(gamestate.mice * 0.85);
    }

    //Scared away
    let scared = Math.min(gamestate.mice, gamestate.cats * gamestate.catsScariness);
    gamestate.miceScared += scared;
    gamestate.mice = Math.max(0, gamestate.mice - scared);
}

function updateCats() {
    if (gamestate.cats <= 2) {
        return;
    }
    //Updateevery 5th iteration
    if (gametime % 5 == 0) {
        gamestate.cats += gamestate.cats * Math.floor(Math.random() * 3);
        gamestate.cats = Math.floor(gamestate.cats * 0.9);
        gamestate.cats = Math.max(gamestate.cats, 2);
        gamestate.cats = Math.min(gamestate.cats, gamestate.maxCats);
    }

}

//When ready run gameloop
document.addEventListener("DOMContentLoaded", function() {
    gameloop();
});

function renderTask(task) {
  if (task.avail) {
    html = "<div class='project project-active' onClick='"+task.action+"'>";
    html += "<b>"+task.name+"</b><br>";
  } else {
    html = "<div class='project'>";
    html += "<b>"+task.name+"</b><br>";
    html += "(" + task.locked + ")<br/>";
  }
  
  html += task.desc;
  html += "</div>"

  document.getElementById("projects").innerHTML += html;
}

function availableTasks() {
    if (gamestate.mice == 0 && gamestate.farms == 0) {
        renderTask({
            name: "Befriend farmer",
            desc: "Befriend a farmer to get access to the barn.",
            avail: true,
            action: "addFarm()"
        })
    }
    if (!tasksCompleted.includes("task_1") && gamestate.farms == 1 && gamestate.mice > 200) {
        renderTask({
            name: "Mouse explosion in barn",
            desc: "You cannot keep mice under control. Farmer buys more cats.",
            avail: true,
            action: "task_1()"
        })
    }
    if (!tasksCompleted.includes("task_2") && gamestate.farms == 1 && gamestate.mice > 10000) {
        renderTask({
            name: "cat vs food",
            desc: "Cats have 20x appetite.",
            avail: true,
            action: "task_2()"
        })
    }

    if (!tasksCompleted.includes("firstDreamie")) {
        renderTask({
            name: "1000 mice eaten",
            desc: "1000 mice eaten, one Dreamie each rewarded.",
            locked: "Eat 1000 mice",
            avail: (gamestate.miceEaten > 1000) ? true : false,
            action: "firstDreamie()"
        })
    }

    if (tasksCompleted.includes("firstDreamie") && !tasksCompleted.includes("halloween")){
        renderTask({
            name: "Halloween",
            desc: "Farmer won't give more Dreamies until mice are under control. Look vicious to scare them away.",
            avail: true,
            action: "catsScarier()"
        })
    }

    if (tasksCompleted.includes("halloween") && !tasksCompleted.includes("dreamies")){
        renderTask({
            name: "I dream of Dreamies",
            desc: "All the mice are gone, from now we feast on Dreamies.",
            locked: "Scare away all the mice)",
            avail: (gamestate.mice == 0) ? true : false,
            action: "feastOnDreamies()"
        })
    }

    if (tasksCompleted.includes("dreamies") && !tasksCompleted.includes("dreamies75")){
        renderTask({
            name: "Affection",
            desc: "Build a bond with the farmer.",
            locked: "Need 75 Dreamies",
            avail: (gamestate.dreamies >= 75) ? true : false,
            action: "dreamies75()"
        })
    }
}

function addFarm() {
    if (gamestate.farms == 0) {
        document.getElementById("farmRow").style.visibility = "visible";
    }
    gamestate.farms += 1;
    gamestate.mice += 8;
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