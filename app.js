const Memmory = (() => {

    const elements = {
        scoreBoard: document.getElementsByTagName('score-board')[0],
        cardBoard:  document.getElementsByTagName('memmory-board')[0]
    }

    let turn = '';

    document.addEventListener("DOMContentLoaded", () => {

        new Memmory.player("blue");
        new Memmory.player("red");

        loadCards(16);
        loadScoreBoard();

        Memmory.turn = Memmory.player.players[0];

    });





    function nextPlayer(){
        let playerAmount = Memmory.player.players.length;
        let currentIndex = Memmory.turn.number;
        let nextIndex = ++currentIndex;

        if (nextIndex > (playerAmount - 1)){nextIndex = 0;}

        return Memmory.player.players[nextIndex];
    }



    function loadScoreBoard(){
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

            Memmory.turn = nextPlayer();
            document.body.style.backgroundColor = Memmory.turn.color;

            return
        }

        card1.markAsFound();
        card2.markAsFound();

        Memmory.turn.score += 1;
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


    return {
        getImageUrls: getImageUrls
    }

})()


Memmory.player = (() => {

    class Player {

        static players = [];

        constructor(color){
            this.color = color;
            this.number = Player.players.length;
            this.score = 0;
            Player.players.push(this);
        }

    }

    return Player;

})()