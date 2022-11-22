let pouchStock = 2;
let purseStock = 2;
let smallBagStock = 1;
let mediumBagStock = 1;
let sleepingBagStock = 1;
let walkingStickStock = 1;
let woodenSandalStock = 1;
let travellersClothesStock = 1;

function updateStock() {
    if (pouchStock == 0) {
        document.getElementById("shop1Pouch").style.display = "none";
    } else {
        document.getElementById("shop1PouchStock").innerHTML = pouchStock;
    }
    if (purseStock == 0) {
        document.getElementById("shop1Purse").style.display = "none";
    } else {
        document.getElementById("shop1PurseStock").innerHTML = purseStock;
    }
    if (smallBagStock == 0) {
        document.getElementById("shop1SmallBag").style.display = "none";
    } else {
        document.getElementById("shop1SmallBagStock").innerHTML = smallBagStock;
    }
    if (mediumBagStock == 0) {
        document.getElementById("shop1MediumBag").style.display = "none";
    } else {
        document.getElementById("shop1MediumBagStock").innerHTML = mediumBagStock;
    }
    if (sleepingBagStock == 0) {
        document.getElementById("shop1SleepingBag").style.display = "none";
    } else {
        document.getElementById("shop1SleepingBagStock").innerHTML = sleepingBagStock;
    }
    if (walkingStickStock == 0) {
        document.getElementById("shop1WalkingStick").style.display = "none";
    } else {
        document.getElementById("shop1WalkingStickStock").innerHTML = walkingStickStock;
    }
    if (woodenSandalStock == 0) {
        document.getElementById("shop1WoodenSandals").style.display = "none";
    } else {
        document.getElementById("shop1WoodenSandalStock").innerHTML = woodenSandalStock;
    }
    if (travellersClothesStock == 0) {
        document.getElementById("shop1TravellersClothes").style.display = "none";
    } else {
        document.getElementById("shop1TravellersClothesStock").innerHTML = travellersClothesStock;
    }
}

function buyPouch() {
    if (coins >= 10) {
        coins -= 10;
        pouchStock -= 1;
        coinsMax += 15;
        document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
        updateStock();
    }
}

function buyPurse() {
    if (coins >= 25) {
        coins -= 25;
        purseStock -= 1;
        coinsMax += 30;
        document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
        updateStock();
    }
}

function buySmallBag() {
    if (coins >= 10) {
        coins -= 10;
        document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
        smallBagStock -= 1;
        inventorySize += 5;
        updateInventory();
        updateStock();
    }
}

function buyMediumBag() {
    if (coins >= 100) {
        coins -= 100;
        document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
        mediumBagStock -= 1;
        inventorySize += 5;
        updateInventory();
        updateStock();
    }
}

function buySleepingBag() {
    if (coins >= 10) {
        coins -= 10;
        document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
        sleepingBagStock -= 1;
        sleepingBagBought = 0.05;
        updateInventory();
        updateStock();
    }
}

function buyWalkingStick() {
    if (coins >= 30) {
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].item.name == "empty") {
                inventory[i].item = walkingStickItem;
                coins -= 30;
                document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
                walkingStickStock -= 1;
                updateInventory();
                updateStock();
                return;
            }
        }
        return;
    }
    return;
}

function buyWoodenSandals() {
    if (coins >= 30) {
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].item.name == "empty") {
                inventory[i].item = woodenSandalsItem;
                coins -= 30;
                document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
                woodenSandalStock -= 1;
                updateInventory();
                updateStock();
                return;
            }
        }
        return;
    }
    return;
}

function buyTravellersClothes() {
    if (coins >= 50) {
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].item.name == "empty") {
                inventory[i].item = travellersClothesItem;
                coins -= 50;
                document.getElementById("coins").innerHTML = "Coins: " + Math.floor(coins) + " / " + coinsMax;
                travellersClothesStock -= 1;
                updateInventory();
                updateStock();
                return;
            }
        }
        return;
    }
    return;
}