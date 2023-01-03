Memmory.player = (() => {

    class Player {

        static States = {
            Playing: "playing",
            Resigned: "resigned"
        };

        constructor(number, color){
            this.number = number;
            this.color = color;

            this.score = 0;
            this.gameScore = 0;
            this.state = Player.States.Playing;
        }

        hasResigned(){
            return this.state == Player.States.Resigned;
        }

        reset(){
            this.score = 0;
            this.state = Player.States.Playing;
        }

        resign(){
            this.state = Player.States.Resigned;
        }

    }

    return Player;

})()