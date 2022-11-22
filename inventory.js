let inventorySize = 0;
let inventory = [];
class ItemSlot {
    constructor(item, amount) {
        this.item = item;
        this.amount = amount;
    }
}

function updateInventory() {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].item.name == emptyItem.name) {
            inventory.splice (i, 1);
        }
    }
    if (inventory.length < inventorySize) {
        let sizeDelta = inventorySize - inventory.length;
        for (let i=0; i < sizeDelta; i++) {            
            emptyItemSlot = new ItemSlot(emptyItem, 1);
            inventory.push(emptyItemSlot);
        }
    }
    displayInventory();
}

function displayInventory() {
    document.getElementById("playerInventory").innerHTML = "";
    for (let i = 0; i < inventory.length; i++) {
        newSlot = document.createElement("div");
        newSlot.style.height = 98;
        newSlot.style.width = 98;
        newSlot.id = "ItemSlot" + i;
        document.getElementById("playerInventory").appendChild(newSlot);
        //newSlot.innerHTML = inventory[i].item.name;
        switch (inventory[i].item.name) {
            case "empty": 
            break;
            case "Walking Stick": newSlot.innerHTML = "<img src='Images/WalkingStick.png' onClick='itemMenu(" + i + ")'/>";
            break;
            case "Wooden Sandals": newSlot.innerHTML = "<img src='Images/WoodenSandals.png' onClick='itemMenu(" + i + ")'/>";
            break;
            case "Travellers Clothes": newSlot.innerHTML = "<img src='Images/TravellersClothes.png' onClick='itemMenu(" + i + ")'/>";
            break;
            case "Beggar Rags": newSlot.innerHTML = "<img src='Images/BeggarRags.png' onClick='itemMenu(" + i + ")'/>";
            break;
        }
        newSlot.style.border = "1px solid lightgray";
        newSlot.style.display = "inline-block";
        newSlot.style.top = 0;
        newSlot.style.verticalAlign = "top";
    }
}

function itemMenu(itemSlot) {
    document.getElementById("itemSlotMenu").innerHTML = "";
    if (inventory[itemSlot].item.name != "empty") {
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].item.name == inventory[itemSlot].item.name) {

                menuName = document.createElement("div");
                menuName.innerHTML = inventory[itemSlot].item.name;
                menuName.style.display = "block";
                menuName.style.borderBottom = "1px solid lightgray";
                menuName.style.padding = 5;

                menuDescription = document.createElement("div");
                menuDescription.innerHTML = inventory[itemSlot].item.description;
                menuDescription.style.display = "block";
                menuDescription.style.borderBottom = "1px solid lightgray";
                menuDescription.style.padding = 5;

                menuEquip = document.createElement("button");
                menuEquip.innerHTML = "Equip";
                menuEquip.style.display = "block";
                switch (inventory[i].item.type) { //Head, Body, Legs, Right Hand, Left Hand, Accessory 1, Accessory 2 - add equip button
                    case "Head":
                        menuEquip.onclick = function() {
                            if (equipped[0].name == "empty") {
                                equipped[0] = inventory[i].item;
                                inventory[i].item = emptyItem;
                            } else {
                                let tempItem = equipped[0];
                                equipped[0] = inventory[i].item;
                                inventory[i].item = tempItem;
                            }
                            updateInventory();
                            document.getElementById("itemSlotMenu").style.display = "none";
                        } 
                        break;
                    case "Body":
                        menuEquip.onclick = function() {
                            if (equipped[1].name == "empty") {
                                equipped[1] = inventory[i].item;
                                inventory[i].item = emptyItem;
                            } else {
                                let tempItem = equipped[1];
                                console.log(tempItem);
                                equipped[1] = inventory[i].item;
                                inventory[i].item = tempItem;
                            }
                            updateInventory();
                            document.getElementById("itemSlotMenu").style.display = "none";
                        } 
                        break;
                    case "Legs":
                        menuEquip.onclick = function() {
                            if (equipped[2].name == "empty") {
                                equipped[2] = inventory[i].item;
                                inventory[i].item = emptyItem;
                            } else {
                                let tempItem = equipped[2];
                                equipped[2] = inventory[i].item;
                                inventory[i].item = tempItem;
                            }
                            updateInventory();
                            document.getElementById("itemSlotMenu").style.display = "none";
                        } 
                        break;
                    case "Right Hand":
                        menuEquip.onclick = function() {
                            if (equipped[3].name == "empty") {
                                equipped[3] = inventory[i].item;
                                inventory[i].item = emptyItem;
                            } else {
                                let tempItem = equipped[3];
                                equipped[3] = inventory[i].item;
                                inventory[i].item = tempItem;
                            }
                            updateInventory();
                            document.getElementById("itemSlotMenu").style.display = "none";
                        } 
                        break;
                    case "Left Hand":
                        menuEquip.onclick = function() {
                            if (equipped[4].name == "empty") {
                                equipped[4] = inventory[i].item;
                                inventory[i].item = emptyItem;
                            } else {
                                let tempItem = equipequippedment[4];
                                equipped[4] = inventory[i].item;
                                inventory[i].item = tempItem;
                            }
                            updateInventory();
                            document.getElementById("itemSlotMenu").style.display = "none";
                        } 
                        break;
                    case "Accessory 1":
                        menuEquip.onclick = function() {
                            if (equipped[5].name == "empty") {
                                equipped[5] = inventory[i].item;
                                inventory[i].item = emptyItem;
                            } else {
                                let tempItem = equipped[5];
                                equipped[5] = inventory[i].item;
                                inventory[i].item = tempItem;
                            }
                            updateInventory();
                            document.getElementById("itemSlotMenu").style.display = "none";
                        } 
                        break;
                    case "Accessory 2":
                        menuEquip.onclick = function() {
                            if (equipped[6].name == "empty") {
                                equipped[6] = inventory[i].item;
                                inventory[i].item = emptyItem;
                            } else {
                                let tempItem = equipped[6];
                                equipped[6] = inventory[i].item;
                                inventory[i].item = tempItem;
                            }
                            updateInventory();
                            document.getElementById("itemSlotMenu").style.display = "none";
                        } 
                        break;
                }

                menuClose = document.createElement("button");
                menuClose.innerHTML = "Close";
                menuClose.onclick = function() {document.getElementById("itemSlotMenu").style.display = "none";}
                menuClose.style.display = "block";

                document.getElementById("itemSlotMenu").style.top = document.getElementById("ItemSlot" + i).getBoundingClientRect().top + 100;
                document.getElementById("itemSlotMenu").style.left = document.getElementById("ItemSlot" + i).getBoundingClientRect().left;
                document.getElementById("itemSlotMenu").style.border = "1px solid lightgray";
                document.getElementById("itemSlotMenu").style.display = "inline-block";
                document.getElementById("itemSlotMenu").style.textAlign = "center";

                document.getElementById("itemSlotMenu").appendChild(menuName);
                document.getElementById("itemSlotMenu").appendChild(menuDescription);
                document.getElementById("itemSlotMenu").appendChild(menuEquip);
                document.getElementById("itemSlotMenu").appendChild(menuClose);
            }
        }
    }
}
