Memmory.Game = (() => {

    let Players = [];
    let Turn = null;
    let SelectedCards = [];

    function init(){
        // Adding players to game
        Players = [];
        for (let i = 0; i < Memmory.config.amountOfPlayers; i++) {
            let color = Memmory.Data.colors[i];
            let player = new Memmory.player(Players.length, color);

            Players.push(player)   
        }

        loadCards();
        loadGameScoreBoard();
        loadpairScoreBoard();

        Turn = Players[0];
        Memmory.Data.Elements.pairScoreBoard.toggleSlot(Turn.number);
    }

    function restart(){
        Memmory.config.parse();

        for (let i = 0; i < Memmory.config.amountOfPlayers; i++) {
            Players[i].reset();
        }
        
        loadCards();
        loadpairScoreBoard();
        
        Turn = Players[0];
        Memmory.Data.Elements.pairScoreBoard.toggleSlot(Turn.number);
    }

    function loadConfig(){
        Memmory.config.parse();
        
        if(Memmory.config.amountOfPlayers != Players.length){
            init();
            return
        }

        loadCards();
        loadpairScoreBoard();

        Turn = Players[0];
        Memmory.Data.Elements.pairScoreBoard.toggleSlot(Turn.number);
    }

    async function loadCards(){
        let board = Memmory.Data.Elements.cardBoard;
        let imageUrls = await Memmory.Data.getImageUrls();
        let amountOfPairs = Memmory.config.amountOfCards / 2;

        board.clear();

        for (let i = 0; i < amountOfPairs; i++) {
            let firstCard = document.createElement("memmory-card");
            let secondCard = document.createElement("memmory-card");

            let imageUrl = imageUrls[i];

            firstCard.setImage(imageUrl)
            secondCard.setImage(imageUrl);

            firstCard.addEventListener("click", onCardClick);
            secondCard.addEventListener("click", onCardClick);

            board.addCard(firstCard);
            board.addCard(secondCard);
        }

        board.shuffleCards();
    }

    function loadpairScoreBoard(){
        Memmory.Data.Elements.pairScoreBoard.clear();

        Players.forEach(player => {
            Memmory.Data.Elements.pairScoreBoard.addPlayerSlot(player);
        });
    }

    function loadGameScoreBoard(){
        Memmory.Data.Elements.gameScoreBoard.clear();

        Players.forEach(player => {
            Memmory.Data.Elements.gameScoreBoard.addPlayerSlot(player);
        });
    }

    function switchTurn(){
        let currentPlayerIndex = Players.indexOf(Turn);
        let nextPlayerIndex = currentPlayerIndex + 1;
        let lastPlayerIndex = Players.length - 1;

        if (nextPlayerIndex > lastPlayerIndex){nextPlayerIndex = 0;}

        while(Players[nextPlayerIndex].hasResigned()){
            nextPlayerIndex++;
            if (nextPlayerIndex > lastPlayerIndex){nextPlayerIndex = 0;}
        }

        Memmory.Data.Elements.pairScoreBoard.toggleSlot(currentPlayerIndex);
        Memmory.Data.Elements.pairScoreBoard.toggleSlot(nextPlayerIndex);

        Turn = Players[nextPlayerIndex];
    }

    function resign(){
        Turn.resign()
        switchTurn();

        if(finished()){end()}
    }

    function finished(){
        if (notEnoughActivePlayers()) {return true}
        if (allPairsFound()) {return true}

        return false;
    }

    function notEnoughActivePlayers(){
        let activePlayers = 0
        for (let i = 0; i < Players.length; i++) {
            if (Players[i].hasResigned()){continue}
            activePlayers++;
        }

        return activePlayers <= 1
    }

    function allPairsFound(){
        let pairsInGame = Memmory.config.amountOfCards / 2;
        let pairsFound = 0;

        for (let i = 0; i < Players.length; i++) {
            pairsFound += Players[i].score;
        }

        return pairsFound == pairsInGame;
    }

    function onCardClick(){
        if (Memmory.Game.isBusy) {return}

        this.flip();
        SelectedCards.push(this);

        if (SelectedCards.length != 2) {return}

        Memmory.Game.isBusy = true;
        setTimeout(() => {
            compareSelectedCards();
            Memmory.Game.isBusy = false;
        }, 1500);
    }

    function compareSelectedCards(){
        let card1 = SelectedCards[0];
        let card2 = SelectedCards[1];

        if (!card1.equals(card2)) {
            card1.flip();
            card2.flip();
            SelectedCards = [];

            switchTurn();

            return;
        }

        card1.markAsFound();
        card2.markAsFound();
        SelectedCards = [];

        Turn.score++;
        Memmory.Data.Elements.pairScoreBoard.setSlotValue(Turn.number, Turn.score);

        if(finished()){end()}
    }

    function getPlayerWithHighestScore(){
        let playerWithHighestScore = Players[0];
        Players.forEach(player => {
            if (player.score > playerWithHighestScore.score) {
                playerWithHighestScore = player
            }
        });

        return playerWithHighestScore
    }

    function end(){
        let winnerCard = document.createElement("memmory-win-screen");
        let winningPlayer = getPlayerWithHighestScore();

        winningPlayer.gameScore++;

        winnerCard.setWinner(winningPlayer);
        document.body.append(winnerCard);

        setTimeout(() => {
            winnerCard.remove();
            Memmory.Data.Elements.gameScoreBoard.setSlotValue(winningPlayer.number, winningPlayer.gameScore)
            restart();
        }, 3000);
    }

    return {
        init: init,
        resign: resign,
        loadConfig: loadConfig,
        restart: restart
    }
    
})()