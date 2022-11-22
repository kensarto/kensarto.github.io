var currentAction = "resting";
var lastAction = "";

let begTimer = 0;
let performTimer = 0;
let exploreTimer = 0;
let restTimer = 0;

function actionReward () {
    if (currentAction == "begging") {
        if (coins+(1+Math.log10(charisma)) < coinsMax) {
            coins += (1+Math.log10(charisma));
            charisma += 0.01;
            document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
            begTimer = 0;
        } else {
            coins = coinsMax;
            document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
            lastAction = currentAction;
            begTimer = 0;
            startAction('resting', 2);
        }
        begCompletions += 1;
    } else if (currentAction == "performing") {
        if (coins+6*(1+Math.log10(charisma)) < coinsMax) {
            coins += 6*(1+Math.log10(charisma));
            charisma += 0.1;
            performTimer = 0;
            document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
        } else {
            coins = coinsMax;
            document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins)  + " / " + coinsMax;
            lastAction = currentAction;
            performTimer = 0;
            startAction('resting', 2);
        }
    } else if (currentAction == "exploring") {
        if (town1Explorations+1 < 365) {
            town1Explorations += 1;
            exploreTimer = 0;
            constitution += 0.02;
        } else if (town1Explorations+1 == 365) {
            town1Explorations += 1;
            exploreTimer = 0;
            startAction('resting', 2);
        }
    } else if (currentAction == "resting") {
        if (energy + 0.1 + sleepingBagBought < energyMax) {
            energy += 0.1 + sleepingBagBought;
            restTimer = 0;
            document.getElementById("energy").innerHTML = "Energy: " + Math.round(100*energy)/100 + " / " + energyMax;
        } else {
            energy = energyMax;
            restTimer = 0;
            document.getElementById("energy").innerHTML = "Energy: " + Math.round(100*energy)/100 + " / " + energyMax;
            switch (lastAction) {
                case "begging": startAction("begging", 40);
                break;
                case "performing": startAction("performing", 200);
                break;
                case "exploring": startAction("exploring", 100);
                break;
            }
        }
    }
}

function actionProgress() {
    switch (currentAction) {
        case "begging": document.getElementById("currentAction").innerHTML = "You are currently " + currentAction + ". (" + (Math.floor(100*begTimer/timeNeeded)) + "%)";
        break;
        case "performing": document.getElementById("currentAction").innerHTML = "You are currently " + currentAction + ". (" + (Math.floor(100*performTimer/timeNeeded)) + "%)";
        break;
        case "exploring": document.getElementById("currentAction").innerHTML = "You are currently " + currentAction + ". (" + (Math.floor(100*exploreTimer/timeNeeded)) + "%)";
        break;
        case "resting": document.getElementById("currentAction").innerHTML = "You are currently " + currentAction + "."
        break;
    }
}

function startAction(newAction, newTimeNeeded) {
    if (currentAction != newAction) {
        timeNeeded = newTimeNeeded;
        switch (newAction) {
            case "begging":setActiveTaskButton("begButton");
            break;
            case "performing": setActiveTaskButton("performButton");
            break;
            case "exploring": setActiveTaskButton("exploreButton");
            break;
            case "resting": lastAction = currentAction;
            setActiveTaskButton("restButton");
            break;
        }
        currentAction = newAction;
    }
    if (currentAction == "resting") {
        document.getElementById("currentAction").innerHTML = "You are currently " + currentAction + "."
    } else {
        document.getElementById("currentAction").innerHTML = "You are currently " + currentAction + ". (" + (Math.floor(100*timer/timeNeeded)) + "%)";
    }
}

function unlockActions() {
    //unlock performing by completing 100 beg actions - achievement 1
    if (achievement1 == true) {
        document.getElementById("performButton").style.display = "block";
    }
    //unlock exploring by reaching 10 coins for the firest time - achievement 2 / lose the explore action when the town is fully explored
    if (achievement2 == true && town1Explorations <= 365) {
        document.getElementById("exploreButton").style.display = "block";
        document.getElementById("townHeaderButton").style.display = "block";
    } else {
        document.getElementById("exploreButton").style.display = "none";
    }
}

function setActiveTaskButton(id) {
    document.getElementById("begButton").classList.remove("active");
    document.getElementById("performButton").classList.remove("active");
    document.getElementById("exploreButton").classList.remove("active");
    document.getElementById("restButton").classList.remove("active");
    document.getElementById(id).classList.add("active");
}

function updateActionTooltips() {
    document.getElementById("begTooltip").innerHTML = "<b>Beg</b><br>Beg for coins from strangers<hr color='white'/>Duration: 2 sec<br>Energy Cost: 1/sec<br>Reward: " + Math.floor(100 * (1+Math.log10(charisma)))/100 + " coins, 0.01 charisma.";
    document.getElementById("performTooltip").innerHTML = "<b>Perform</b><br>Sing and dance to earn your coin<hr color='white'/>Duration: 10 sec<br>Energy Cost: 1/sec<br>Reward: " + 6*Math.floor(100 * (1+Math.log10(charisma)))/100 + " coins, 0.1 charisma.";
}
