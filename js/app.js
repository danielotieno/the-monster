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

    attack: function () {
      this.monsterHealth -= this.calculateDamage(10, 3);

      if (this.checkWin()) {
        return;
      }

      this.playerHealth -= this.calculateDamage(10, 3);

      this.checkWin();
    },
  },
});
