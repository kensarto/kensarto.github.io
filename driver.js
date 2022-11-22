let curTime = new Date();
let gameTicksLeft = 0;
let timerCount = 0;

function tick() {
    const newTime = Date.now();
    gameTicksLeft += newTime-curTime;
    const delta = newTime - curTime;
    curTime = newTime;

    while (gameTicksLeft > 50) { //each game tick is 50 milliseconds. 20 ticks per second
        timer += 1; //timer goes up by 1
        switch (currentAction) {
            case "begging": begTimer += 1;
            break;
            case "performing": performTimer += 1;
            break;
            case "exploring": let x = 1;
            if (equipped[3].name == "Walking Stick") {
                x /= 0.9;
            }
            if (equipped[2].name == "Wooden Sandals") {
                x /= 0.9;
            }
            exploreTimer += x;
            break;
            case "resting": restTimer += 1;
            break;
        }
        gameTicksLeft -= 50 //reduce remaining game ticks by 50.
        if (timer % 80 == 0) {
            if (coins - (4*coinDelta) > 0) {
                coins -= (4*coinDelta);
                document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
            } else {
                coins = 0;
                document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
                health -= 1;
                if (health < 0) {
                    health = 0;
                }
                document.getElementById("health").innerHTML = "Health: " + Math.round(100*health)/100 + " / " + healthMax;
            }
        }
        if (timer % 40 == 0) {
            updateDate();
        }
        if (timer % 20 == 0) {
            if (energy + energyDelta < energyMax) {
                energy += energyDelta;
            } else {
                energy = energyMax;
            }
            if (health + healthDelta < healthMax) {
                if (coins >= 0.25) {
                    health += healthDelta;
                    document.getElementById("health").innerHTML = "Health: " + Math.round(100*health)/100 + " / " + healthMax;
                }
            } else {
                health = healthMax;
                document.getElementById("health").innerHTML = "Health: " + Math.round(100*health)/100 + " / " + healthMax;
            }
            //implement death at hp = 0
        }
        if (timer % 2 == 0) {
            if (currentAction == "begging" || currentAction == "performing" || currentAction == "exploring") {
                if (energy - 0.1 >= 0) {
                    energy -= 0.1;
                    document.getElementById("energy").innerHTML = "Energy: " + Math.round(100*energy)/100 + " / " + energyMax;
                } else {
                    energy = 0;
                    document.getElementById("energy").innerHTML = "Energy: " + Math.round(100*energy)/100 + " / " + energyMax;
                    lastAction = currentAction;
                    startAction('resting', 2);
                }
            }
        }
        updatePlayer();
        updateActions();
        updateAchievements();
        updateStory();
        updateTown();
        actionProgress();
    }

    /* if (timer >= timeNeeded) {
        
        timer -= timeNeeded;
        actionReward();
    } */

    switch (currentAction) {
        case "resting": 
        if (restTimer >= timeNeeded) {
            restTimer -= timeNeeded;
            actionReward();
        }
        break;
        case "begging":  if (begTimer >= timeNeeded) {
            begTimer -= timeNeeded;
            actionReward();
        }
        break;
        case "performing":  if (performTimer >= timeNeeded) {
            performTimer -= timeNeeded;
            actionReward();
        }
        break;
        case "exploring":  let actualTimeNeeded = timeNeeded;
            if (equipped[3].name == "Walking Stick") {
                actualTimeNeeded *= 0.9;
            }
            if (equipped[2].name == "Wooden Sandals") {
                actualTimeNeeded *= 0.9;
            }
            document.getElementById("exploreTooltip").innerHTML = "<b>Explore</b><br>Take a look around town and see what there is to do<hr color='white'/>Duration: " + Math.round(500*(actualTimeNeeded / timeNeeded))/100 + " sec<br>Energy Cost: 1/sec<br>Reward: 0.02 constitution.";
            if (exploreTimer >= timeNeeded) {
                exploreTimer -= timeNeeded;
                actionReward();
        }
        break;
    }
}

function recalculateInterval(fps) {
    window.fps = fps;
    doWork.postMessage({ stop: true });
    doWork.postMessage({ start: true, ms: (1000 / fps) });
}

function updatePlayer() {
    updateLevel();
    updateStats();
    updateSkills();
    updatePlayerStatistics();
    updateEquipment();
}

function updateLevel() {
    if (currentExperience >= experienceToLevel) {
        level += 1;
        experience = 0;
        experienceToLevel = Math.floor(experienceToLevel*1.07);
    }   
    //document.getElementById("level").innerHTML = "Level: " + level;
    //document.getElementById("experience").innerHTML = "Experience: " + currentExperience + " / " + experienceToLevel;
}

function updateStats() {
    document.getElementById("playerAttributes").innerHTML = "Strength: " + Math.floor(100*strength)/100 + 
        "<br>Dexterity: " + Math.floor(100*dexterity)/100 + 
        "<br>Constitution: " + Math.floor(100*constitution)/100 + 
        "<br>Intelligence: " + Math.floor(100*intelligence)/100 + 
        "<br>Charisma: " + Math.floor(100*charisma)/100 + 
        "<br>Soul: " + Math.floor(100*soul)/100;
    updateActionTooltips();
    updateEnergy();
    updateHealth();
}

function updateEnergy() {
    energyMax = 10 * Math.floor(100 * (1+Math.log10(constitution)))/100;
    document.getElementById("energy").innerHTML = "Energy: " + Math.round(100*energy)/100 + " / " + energyMax;
}

function updateHealth () {
    healthMax = 10 * Math.floor(100 * (1+Math.log10(constitution)))/100;
    document.getElementById("health").innerHTML = "Health: " + Math.round(100*health)/100 + " / " + healthMax;
}

function updateSkills() {

}

function updatePlayerStatistics() {

}

function updateDate() {
    day += 1;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day > 31) {
            day = 1;
            month += 1;
        }
    } else if (month == 2 && year%4 == 0) {
        if (day > 29) {
            day = 1;
            month += 1;
        }
    } else if (month == 2 && year%4 >= 1) {
        if (day > 28) {
            day = 1;
            month += 1;
        }
    } else {
        if (day > 30) {
            day = 1;
            month += 1;
        }
    }
    if (month > 12) {
        year += 1;
        month = 1;
    }
   
    document.getElementById("date").innerHTML = getDate();
}

function getDate() {
    var dayString = "st";
    var monthString = "January";

    if (day == 1 || day == 21 || day == 31) {
        dayString = "st";
    } else if (day == 2 || day == 22 ) {
        dayString = "nd";
    } else if (day == 3 || day == 23 ) {
        dayString = "rd";
    } else {
        dayString = "th";
    }
    if (month == 1) {
        monthString = "January";
    } else if (month == 2) {
        monthString = "February";
    } else if (month == 3) {
        monthString = "March";
    } else if (month == 4) {
        monthString = "April";
    } else if (month == 5) {
        monthString = "May";
    } else if (month == 6) {
        monthString = "June";
    } else if (month == 7) {
        monthString = "July";
    } else if (month == 8) {
        monthString = "August";
    } else if (month == 9) {
        monthString = "September";
    } else if (month == 10) {
        monthString = "October";
    } else if (month == 11) {
        monthString = "November";
    } else if (month == 12) {
        monthString = "December";
    }
    return "The " + day + dayString + " of " + monthString + " in the year " + year + ".";
}

function getAchievementDate(dayIn, monthIn, yearIn) {
    var dayString = "st";
    var monthString = "January";

    if (dayIn == 1 || dayIn == 21 || dayIn == 31) {
        dayString = "st";
    } else if (dayIn == 2 || dayIn == 22 ) {
        dayString = "nd";
    } else if (dayIn == 3 || dayIn == 23 ) {
        dayString = "rd";
    } else {
        dayString = "th";
    }
    if (monthIn == 1) {
        monthString = "January";
    } else if (monthIn == 2) {
        monthString = "February";
    } else if (monthIn == 3) {
        monthString = "March";
    } else if (monthIn == 4) {
        monthString = "April";
    } else if (monthIn == 5) {
        monthString = "May";
    } else if (monthIn == 6) {
        monthString = "June";
    } else if (monthIn == 7) {
        monthString = "July";
    } else if (monthIn == 8) {
        monthString = "August";
    } else if (monthIn == 9) {
        monthString = "September";
    } else if (monthIn == 10) {
        monthString = "October";
    } else if (monthIn == 11) {
        monthString = "November";
    } else if (monthIn == 12) {
        monthString = "December";
    }
    return "The " + dayIn + dayString + " of " + monthString + " in the year " + yearIn + ".";
}

function updateActions() {
    unlockActions();
}

function updateAchievements() {
    //100 Beg actions - unlock performing
    if (begCompletions >= 100 && !achievement1) {
        achievement1 = true;
        completeAchievement1();
    } 
    //10 coins - unlock exploring and town.
    if (coins >= 10 && !achievement2) {
        achievement2 = true;
        achievement2Day = day;
        achievement2Month = month;
        achievement2Year = year;
        completeAchievement2();
        updateStory();
        document.getElementById("storyHeaderButton").classList.add("blink");
        document.getElementById("townContent").display = "block";
    }
}
function completeAchievement1() {
    document.getElementById("lockedAchieve1").style.display = "none";
    document.getElementById("unlockedAchieve1").style.display = "block";
    document.getElementById("achievementHeaderButton").classList.add("blink");
}
function completeAchievement2() {
    document.getElementById("lockedAchieve2").style.display = "none";
    document.getElementById("unlockedAchieve2").style.display = "block";
    document.getElementById("achievementHeaderButton").classList.add("blink");
}

function updateStory() {
    if (achievement2) {
        document.getElementById("storyHeader2").innerHTML = getAchievementDate(achievement2Day, achievement2Month, achievement2Year);
        document.getElementById("storyHeader2").style.display = "block";
        document.getElementById("storyBody2").style.display = "block";
    }
}

function updateTown() {
    document.getElementById("town1ExplorationPercent").innerHTML = "Explored: " + (Math.floor(10000*town1Explorations/365)/100) + "%";
    if ((Math.floor(10000*town1Explorations/365)/100) >= 5) {
        document.getElementById("townBodyUnlocked1").style.display = "block";
        document.getElementById("townBodyLocked1").style.display = "none";
    }
    if ((Math.floor(10000*town1Explorations/365)/100) >= 10) {
        document.getElementById("townBodyUnlocked2").style.display = "block";
        document.getElementById("townBodyLocked2").style.display = "none";
    }
    if ((Math.floor(10000*town1Explorations/365)/100) >= 20) {
        document.getElementById("townBodyUnlocked3").style.display = "block";
        document.getElementById("townBodyLocked3").style.display = "none";
    }
    if ((Math.floor(10000*town1Explorations/365)/100) >= 30) {
        document.getElementById("townBodyUnlocked4").style.display = "block";
        document.getElementById("townBodyLocked4").style.display = "none";
    }
    if ((Math.floor(10000*town1Explorations/365)/100) >= 40) {
        document.getElementById("townBodyUnlocked5").style.display = "block";
        document.getElementById("townBodyLocked5").style.display = "none";
    }
    if ((Math.floor(10000*town1Explorations/365)/100) >= 50) {
        document.getElementById("townBodyUnlocked6").style.display = "block";
        document.getElementById("townBodyLocked6").style.display = "none";
    }
    if ((Math.floor(10000*town1Explorations/365)/100) >= 75) {
        document.getElementById("townBodyUnlocked7").style.display = "block";
        document.getElementById("townBodyLocked7").style.display = "none";
    }
    if ((Math.floor(10000*town1Explorations/365)/100) >= 100) {
        document.getElementById("townBodyUnlocked8").style.display = "block";
        document.getElementById("townBodyLocked8").style.display = "none";
    }
}