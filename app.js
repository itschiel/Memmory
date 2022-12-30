const Memmory = (() => {

    const elements = {
        scoreBoard: document.getElementsByTagName('score-board')[0],
        cardBoard:  document.getElementsByTagName('memmory-board')[0]
    }

    document.addEventListener("DOMContentLoaded", () => {

        new Memmory.player("blue");
        new Memmory.player("red");

        loadCards(16);
        loadScoreBoard();

    });








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
            return
        }

        card1.markAsFound();
        card2.markAsFound();
    }
      

    return {
        loadCards: loadCards,
        compareCards: compareCards
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
            Player.players.push(this);
        }

    }

    return Player;

})()