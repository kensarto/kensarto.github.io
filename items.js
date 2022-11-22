class Item {
    constructor(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}

let emptyItem = new Item("empty", "empty", "empty");
let beggarRagsItem = new Item("Beggar Rags", "Dirty torn clothing, lets people know you're a beggar.", "Body");
let walkingStickItem = new Item("Walking Stick", "Increases explore rate by 10% while equipped.", "Right Hand");
let woodenSandalsItem = new Item("Wooden Sandals", "Increases explore rate by 10% while equipped.", "Legs");
let travellersClothesItem = new Item("Travellers Clothes", "Sturdy enough to keep you safe while travelling; clean enough to not look like an outcast.", "Body");