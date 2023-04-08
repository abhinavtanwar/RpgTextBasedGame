/*
TO DOs:
    health, xp not updating
    add mana stat and magic attacks
    add more weapons and monsters
    adding various classes like warrior and all
    add floors and floor bosses

*/

let xp = 0;
let health = parseInt("100");
let gold = parseInt("50");
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];

const locations = [
  {
    name: "town square",
    "button texts": ["Go to store", "Go to cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    Text: 'You entered Town Square, you see a sign that says "Store".',
  },
  {
    name: "store",
    "button texts": [
      "Buy 10 health points(10 gold)",
      "Upgrade weapon(30 gold)",
      "Go to townsquare",
    ],
    "button functions": [buyHealth, buyweapon, goTown],
    Text: "You entered the Store",
  },
  {
    name: "cave",
    "button texts": ["fight slime", "fight fanged beast", "Go to townsquare"],
    "button functions": [fightSlime, fightFangedBeast, goTown],
    Text: "You entered the moist cave, beware of its denizens",
  },
  {
    name: "fight",
    "button texts": ["attack", "dogde", "go to town square"],
    "button functions": [attack, dogde, goTown],
    Text: "you are fighting a monster, be careful",
  },
  {
    name: "kill monster",
    "button texts": [
      "go to town square",
      "go to town square",
      "go to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    Text: "You slayed the monster. You gained some experience and find gold as its body disappears in the mist.",
  },
  {
    name: "lose",
    "button texts": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    Text: "You died..Game over",
  },
  {
    name: "win",
    "button texts": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    Text: "YOU Deafeated THE DRAGON....YOU WON THE GAME!!!!",
  },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "FangedBeast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button texts"][0];
  button2.innerText = location["button texts"][1];
  button3.innerText = location["button texts"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.Text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    health += 10;
    gold -= 10;
    healthText.innerText = health;
    goldText.innerText = gold;
  } else {
    text.innerText = "Insufficient Gold";
  }
}

function buyweapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newweapon = weapons[currentWeapon].name;
      text.innerText = "You acquired " + newweapon + ".";
      inventory.push(newweapon);
      text.innerText += "You have " + inventory + " in your inventory.";
    } else {
      text.innerText = "Insufficient Gold";
    }
  } else {
    text.innerText = "You already have most powerful weapon";
    button2.innerText = "Sell older weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a" + currentWeapon + ".";
    text.innerText += "You have" + inventory + "in your inventory.";
  } else {
    text.innerText = "You can't sell your only weapon";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightFangedBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
  monsterHealth = monsters[fighting].health;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    "You attack it with your " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function dogde() {
  text.innerText =
    "You dogde the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  gold.innerText = gold;
  xp.innertext = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function win() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = parseInt("100");
  gold = parseInt("50");
  currentWeapon = 0;
  inventory = ["stick"];
  xpText = document.querySelector("#xpText");
  healthText = document.querySelector("#healthText");
  goldText = document.querySelector("#goldText");
  goTown();
}
