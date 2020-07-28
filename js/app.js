new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = [];
    },

    attack: function () {
      let damage = this.calculateDamage(10, 3);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage,
      });

      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    specialAttack: function () {
      let damage = this.calculateDamage(20, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage,
      });

      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },

    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10',
      });
      this.monsterAttacks();
    },

    giveUp: function () {
      this.gameIsRunning = false;
    },

    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won, New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('Monster Won, New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },

    calculateDamage: function (max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    monsterAttacks: function () {
      let damage = this.calculateDamage(12, 5);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage,
      });
      this.checkWin();
    },
  },
});
