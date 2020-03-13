new Vue ({
    el : "#app",
    data : {
        playerHeal : 100,
        monsterHeal : 100,
        gameIsOn : false,
        logs : [],
        attackMultiple : 10,
        specialAttackMultiple : 25,
        healMultiple : 20,
        monsterAttackMultiple : 15,
        logText : {
            attack : "Player Attack : ",
            specialAttack : "Special Player Attack : ",
            heal : "Player Healed : ",
            surrender : "Player Surrender : ",
            monster : "Monster : "
        }
    },
    methods: {
        startGame : function () {
            this.gameIsOn = true
        },
        attack : function () {
            var point = Math.ceil(Math.random()*this.attackMultiple);
            this.monsterHeal -= point;
            this.addLog({turn : "P" , text : this.logText.attack + point});
            this.monsterAttack();
        },
        specialAttack : function () {
            var sPoint = Math.ceil(Math.random()*this.specialAttackMultiple);
            this.monsterHeal -= sPoint;
            this.addLog({turn : "P" , text : this.logText.specialAttack + sPoint});
            this.monsterAttack();
        },
        health : function () {
            var heal = Math.ceil(Math.random()*this.healMultiple);
            this.playerHeal += heal;
            this.addLog({turn : "P" , text : this.logText.heal + heal});
            this.monsterAttack();
        },
        surrender : function () {
            this.playerHeal = 0;
            this.addLog({turn : "P" , text : this.logText.surrender});
         },
        monsterAttack : function () {
            var point = Math.ceil(Math.random() * this.monsterAttackMultiple);
            this.playerHeal -= point;
            this.addLog({turn : "M" , text : this.logText.monster + point});
        },
        addLog : function(log){
            this.logs.push(log);
        }
    },
    watch : {
        playerHeal : function (value) {
            if (value <= 0) {
                this.playerHeal = 0;
                if (confirm("Game Over! Play Again?")){
                    this.playerHeal = 100;
                    this.monsterHeal = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.playerHeal = 100;
            }
        },
        monsterHeal : function (value) {
            if(value <= 0){
                this.monsterHeal = 0;
                if (confirm("Victory! Play Again?")){
                    this.playerHeal = 100;
                    this.monsterHeal = 100;
                    this.logs = [];
                }
            }
        }
    },
    computed : {
        userProgress : function () {
            return {
                width : this.playerHeal + "%"
            }
        },
        monsterProgress : function () {
            return {
                width : this.monsterHeal + "%"
        }
        }
    }


});