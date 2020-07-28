new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
    },

    attack: function () {
      this.monsterHealth -= this.calculateDamage(10, 3);

      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    specialAttack: function () {
      this.monsterHealth -= this.calculateDamage(20, 10);

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
      this.monsterAttacks();
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
      this.playerHealth -= this.calculateDamage(12, 5);
      this.checkWin();
    },
  },
});
