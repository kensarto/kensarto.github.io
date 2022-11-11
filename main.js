var qi = 0;
var coins = 0;

var currentAction = "";

const timeNeededInitial = 0; // measured in seconds
let timer = timeNeededInitial;
let timeNeeded = timeNeededInitial;
let curTime = new Date();
let gameTicksLeft = 0;
let timeCounter = 0;

const view = new View();

function View() {
    this.initalize = function() {
        this.updateTime();
    };

    this.update = function() {
        this.updateTime();
    };

    this.updateTime = function() {
        if (timeNeeded > 0) {
            document.getElementById("timeBar").style.width = `${timer / timeNeeded * 100}%`;
        } else {
            document.getElementById("timeBar").style.width = `100%`;
        }
    };
}
function qiClick(number) {
    qi = qi + number;
    document.getElementById("qi").innerHTML = qi;
};

function buySpiritStones(number) {
    var spiritStoneCost = Math.floor(10*Math.pow(1.1,spiritStones)); 
    if (qi >= spiritStoneCost) {
        spiritStones = spiritStones + number;
        qi -= spiritStoneCost;
        document.getElementById("spiritStones").innerHTML = spiritStones;
        document.getElementById("qi").innerHTML = qi;
        var nextCost = Math.floor(10*Math.pow(1.1,spiritStones)); 
        document.getElementById("spiritStoneCost").innerHTML = nextCost;
    }
}

function startMeditating () {
    timeNeeded = 5;
    timer = 0;
    currentAction = "meditating";
    document.getElementById("timerAction").innerHTML = "Meditating";
}

function startBegging () {
    timeNeeded = 2;
    timer = 0;
    currentAction = "begging";
    document.getElementById("timerAction").innerHTML = "Begging";
}

function actionReward () {
    if (currentAction == "begging") {
        coins += 1;
        document.getElementById("coins").innerHTML = coins;
    } else if (currentAction == "meditating") {
        qi += 1;
        document.getElementById("qi").innerHTML = qi;
    }
}



function tick() {
    const newTime = Date.now();
    gameTicksLeft += newTime-curTime;
    const delta = newTime - curTime;
    curTime = newTime;

    while (gameTicksLeft > 500) { //each game tick is 500 milliseconds.
        timer += 0.5; //increment timer by 0.5 seconds.
        gameTicksLeft -= 500 //reduce remaining game ticks by 500.
    }

    view.update();

    if (timer >= timeNeeded) {
        timer -= timeNeeded;
        actionReward();
    }
}

function startGame() {
    window.doWork = new Worker("interval.js");
    window.doWork.onmessage = function(event) {
        if (event.data === "interval.start") {
            tick();
        }
    };
    recalculateInterval(50)
}
function recalculateInterval(fps) {
    window.fps = fps;
    doWork.postMessage({ stop: true });
    doWork.postMessage({ start: true, ms: (1000 / fps) });
}