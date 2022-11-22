const timeNeededInitial = 50
let timer = timeNeededInitial;
let timeNeeded = timeNeededInitial;

const dayInitial = 1;
const monthInitial = 1;
const yearInitial = 600;
let day = dayInitial;
let month = monthInitial;
let year = yearInitial;

let coins = 0;
let coinsMax = 10;
let coinDelta = 0.2;

let begCompletions = 0;
let town1Explorations = 0;

let achievement1 = false; 
let achievement2 = false;
let achievement2Day = 1;
let achievement2Month = 1;
let achievement2Year = 600;

let strength = 1;
let dexterity = 1;
let constitution = 1;
let intelligence = 1;
let charisma = 1;
let soul = 1;

let level = 1;
let currentExperience = 0;
let experienceToLevel = 50;

let energy = 10;
let energyMax = 10;
let energyDelta = 0;

let health = 10;
let healthMax = 10;
let healthDelta = 0.05

let sleepingBagBought = 0;

const curDate = new Date();

const saveName = "idleCultivation1";

function startGame() {
    window.doWork = new Worker("interval.js");
    window.doWork.onmessage = function(event) {
        if (event.data === "interval.start") {
            tick();
        }
    };
    load();
}

function save() {
    const toSave = {};
    toSave.strength = strength;
    toSave.dexterity = dexterity;
    toSave.constitution = constitution;
    toSave.intelligence = intelligence;
    toSave.charisma = charisma;
    toSave.soul = soul;

    toSave.level = level;
    toSave.experience = experienceToLevel;

    toSave.begCompletions = begCompletions;
    toSave.town1Explorations = town1Explorations;

    toSave.achievement1 = achievement1;
    toSave.achievement2 = achievement2;
    toSave.achievement2Day = achievement2Day;
    toSave.achievement2Month = achievement2Month;
    toSave.achievement2Year = achievement2Year;

    toSave.day = day;
    toSave.month = month;
    toSave.year = year;

    toSave.energyMax = energyMax;
    toSave.energy = energy;
    toSave.healthMax = healthMax;
    toSave.health = health;

    toSave.coins = coins;
    toSave.coinsMax = coinsMax;

    toSave.purseStock = purseStock;
    toSave.pouchStock = pouchStock;
    toSave.smallBagStock = smallBagStock;
    toSave.walkingStickStock = walkingStickStock;
    toSave.woodenSandalStock = woodenSandalStock;

    toSave.inventorySize = inventorySize;
    toSave.inventory = inventory;

    toSave.equipped = equipped;
    console.log(toSave.equipped);

    window.localStorage[saveName] = JSON.stringify(toSave);
}

function load() {

    let toLoad = {};
    defaultEquipment();
    // has a save file
    if (window.localStorage[saveName] && window.localStorage[saveName] !== "null") {
        toLoad = JSON.parse(window.localStorage[saveName]);

        strength = toLoad.strength;
        dexterity = toLoad.dexterity;
        constitution = toLoad.constitution;
        intelligence = toLoad.intelligence;
        charisma = toLoad.charisma;
        soul = toLoad.soul;

        level = toLoad.level;
        experienceToLevel = toLoad.experience;

        begCompletions = toLoad.begCompletions;
        town1Explorations = toLoad.town1Explorations;
        
        achievement1 = toLoad.achievement1;
        if (achievement1) {completeAchievement1();}
        achievement2 = toLoad.achievement2;
        if (achievement2) {completeAchievement2();}
        achievement2Day = toLoad.achievement2Day;
        achievement2Month = toLoad.achievement2Month;
        achievement2Year = toLoad.achievement2Year;

        day = toLoad.day;
        month = toLoad.month;
        year = toLoad.year;

        energyMax = toLoad.energyMax;
        energy = toLoad.energy;
        healthMax = toLoad.healthMax;
        health = toLoad.health;

        coins = toLoad.coins;
        coinsMax = toLoad.coinsMax;

        purseStock = toLoad.purseStock;
        if (purseStock == 0) {
            document.getElementById("shop1Purse").style.display = "none";
        }
        pouchStock = toLoad.pouchStock;
        if (pouchStock == 0) {
            document.getElementById("shop1Pouch").style.display = "none";
        }
        smallBagStock = toLoad.smallBagStock;
        if (smallBagStock == 0) {
            document.getElementById("shop1SmallBag").style.display = "none";
        }
        walkingStickStock = toLoad.walkingStickStock;
        if (walkingStickStock == 0) {
            document.getElementById("shop1WalkingStick").style.display = "none";
        }
        woodenSandalStock = toLoad.woodenSandalStock;
        if (woodenSandalStock == 0) {
            document.getElementById("shop1WoodenSandals").style.display = "none";
        }
        updateStock();

        inventorySize = toLoad.inventorySize;
        inventory = toLoad.inventory;
        updateInventory();

        if (toLoad.equipped != undefined) {
            equipped = toLoad.equipped;
        }
        updateEquipment();

        document.getElementById("storyHeaderButton").classList.remove("blink");
        document.getElementById("achievementHeaderButton").classList.remove("blink");
        document.getElementById("townHeaderButton").classList.remove("blink");
    }
    recalculateInterval(50);
    
}
