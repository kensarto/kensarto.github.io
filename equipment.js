let equipped = [];

function updateEquipment() {
    document.getElementById("playerEquipment").innerHTML = 
    "Head: " + equipped[0].name + 
    "<br>Body: " + equipped[1].name + 
    "<br>Legs: " + equipped[2].name + 
    "<br>Right Hand: " + equipped[3].name + 
    "<br>Left Hand: " + equipped[4].name + 
    "<br>Accessory 1: " + equipped[5].name + 
    "<br>Accessory 2: " + equipped[6].name;
}

function defaultEquipment() {
    equipped = [];
    equipped.push(emptyItem);
    equipped.push(beggarRagsItem);
    equipped.push(emptyItem);
    equipped.push(emptyItem);
    equipped.push(emptyItem);
    equipped.push(emptyItem);
    equipped.push(emptyItem);
}