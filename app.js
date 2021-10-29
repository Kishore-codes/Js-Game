const PLAYER_ATTACK = 10;
const MONSTER_ATTACK_VALUE = 14;
const PLAYER_STRONG_ATTACK = 17; //strong attack for player
const HEAL_VALUE = 20;
let bonusLife = true;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

//user can enter maxlife for monster and player
const userValue = prompt("Enter Maximum life for player and monster", "100");
let maxLife = parseInt(userValue);
if (isNaN(maxLife) || maxLife <= 0) {
  maxLife = 100;
}

let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;

adjustHealthBars(maxLife);

const reset = () => {
  currentMonsterHealth = maxLife;
  currentPlayerHealth = maxLife;
  resetGame(maxLife);
};

const endRound = () => {
  const initialPlayerHealth = currentPlayerHealth;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && bonusLife) {
    bonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert("You would be dead but bonus life saved you");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Game draw");
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
};

const attack = (attackType) => {
  let playerAttack;
  if (attackType === MODE_ATTACK) {
    playerAttack = PLAYER_ATTACK;
  } else if (attackType ===   MODE_STRONG_ATTACK) {
    playerAttack = PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(playerAttack);
  currentMonsterHealth -= damage;
  endRound();
};

const attackHandler = () => {
  attack(MODE_ATTACK);
};

const strongAttackHandler = () => {
  attack(MODE_STRONG_ATTACK);
};

const healHandler = () => {
  let healValue;
  if (currentPlayerHealth >= maxLife - HEAL_VALUE) {
    alert("You can't Heal");
    healValue = maxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
