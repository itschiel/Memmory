const Memmory = (() => {

    const elements = {
        scoreBoard: document.getElementsByTagName('score-board')[0],
        cardBoard:  document.getElementsByTagName('memmory-board')[0],
        restartButton: document.getElementById("restart"),
        resignButton: document.getElementById("resign")
    }

    let turn = '';

    document.addEventListener("DOMContentLoaded", setupGame);

    elements.restartButton.addEventListener("click", restartGame);

    elements.resignButton.addEventListener("click", () => {
        Memmory.turn.remise();

        let inGamePlayers = 0;
        Memmory.player.players.forEach(player => {
            if (player.state == "Playing") {inGamePlayers++}
        });

        if (inGamePlayers <= 1) {restartGame()}

        elements.scoreBoard.deSelect(Memmory.turn)
        Memmory.turn = nextPlayer();
        elements.scoreBoard.select(Memmory.turn);
    });



    function setupGame(){

        for (let i = 0; i < Memmory.config.amoutnOfPlayers; i++) {
            let color = Memmory.Data.colors[i];
            new Memmory.player(color);        
        }

        loadCards(Memmory.config.amountOfCards);
        loadScoreBoard();

        Memmory.turn = Memmory.player.players[0];
        elements.scoreBoard.select(Memmory.turn);
    }

    function restartGame(){

        Memmory.config.load();

        loadCards(Memmory.config.amountOfCards);

        Memmory.player.players = []

        for (let i = 0; i < Memmory.config.amoutnOfPlayers; i++) {
            let color = Memmory.Data.colors[i];
            new Memmory.player(color);        
        }

        loadScoreBoard();

        Memmory.turn = Memmory.player.players[0];
        elements.scoreBoard.select(Memmory.turn);
    }





    function nextPlayer(){
        let nextPlayerIndex = Memmory.turn.number + 1;
        let amountOfPlayers = Memmory.player.players.length;
        let nextPlayer = null;

        if (nextPlayerIndex > (amountOfPlayers - 1)){nextPlayerIndex = 0;}

        nextPlayer = Memmory.player.players[nextPlayerIndex];

        while (nextPlayer.state == "resigned") {
            nextPlayerIndex++
            if (nextPlayerIndex > (amountOfPlayers - 1)){nextPlayerIndex = 0;}
            nextPlayer = Memmory.player.players[nextPlayerIndex];
        }

        return nextPlayer;
    }



    function loadScoreBoard(){
        elements.scoreBoard.clear();

        Memmory.player.players.forEach(player => {
            elements.scoreBoard.addPlayer(player);
        });
    }


    async function loadCards(amountOfCards){
        let board = document.getElementsByTagName("memmory-board")[0];
        let ricks = await Memmory.Data.getImageUrls();

        board.clear();
        board.setSize(amountOfCards);

        for (let i = 0; i < (amountOfCards / 2); i++) {
            let firstCard = document.createElement("memmory-card");
            let secondCard = document.createElement("memmory-card");

            let imageUrl = ricks[i].image;

            firstCard.setImage(imageUrl)
            secondCard.setImage(imageUrl);

            board.addCard(firstCard);
            board.addCard(secondCard);
        }

        board.shuffleCards();
    }

    async function compareCards(card1, card2){

        if(!card1.equals(card2)){
            card1.deSelect()
            card2.deSelect();

            elements.scoreBoard.deSelect(Memmory.turn);

            Memmory.turn = nextPlayer();
            while (Memmory.turn.state == "resigned") {
                Memmory.turn = nextPlayer();
            }

            elements.scoreBoard.select(Memmory.turn);

            return
        }

        card1.markAsFound();
        card2.markAsFound();

        Memmory.turn.score += 1;

        if (elements.cardBoard.allCardsFound()) {
            let winScreen = document.createElement("memmory-win-screen");
            let winner = Memmory.player.players[0];

            Memmory.player.players.forEach(player => {
                if (player.score > winner.score) {winner = player}
            });

            winScreen.setWinner(winner);
            document.body.append(winScreen);

            setTimeout(() => {
                winScreen.remove();
                restartGame();
            }, 5000);
        }

        elements.scoreBoard.update(Memmory.turn);
    }
      

    return {
        loadCards: loadCards,
        compareCards: compareCards,
        turn: turn
    }
})()





Memmory.Data = (() => {
    
    async function getImageUrls(){
        let request = await fetch("https://rickandmortyapi.com/api/character/?name=rick");
        let response = await request.json();

        return response.results;
    }

    const colors = [
        '#dc2626', '#f97316', '#eab308', '#22c55e', '#0d9488', '#0ea5e9', '#6366f1', '#9333ea'
    ];


    return {
        getImageUrls: getImageUrls,
        colors: colors
    }

})()

Memmory.config = (() => {

    const elements = {
        cardInput: document.getElementById('sets'),
        playerInput: document.getElementById('player')
    }
    
    let amountOfCards = 16;
    let amoutnOfPlayers = 2;

    function load(){
        Memmory.config.amountOfCards = elements.cardInput.value * 2;
        Memmory.config.amoutnOfPlayers = parseInt(elements.playerInput.value);
    }


    return {
        amountOfCards,
        amoutnOfPlayers,
        load: load
    }

})()


Memmory.player = (() => {

    class Player {

        static players = [];

        constructor(color){
            this.color = color;
            this.number = Player.players.length;
            this.score = 0;
            this.state = "Playing";
            Player.players.push(this);
        }

        reset(){
            this.score = 0;
            this.state = "Playing";
        }

        remise(){
            this.state = "resigned";
        }

    }

    return Player;

})()