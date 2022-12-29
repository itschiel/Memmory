const Memmory = (() => {

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


    function selectCard(card){
        console.log("select");
        Memmory.selectedCards.push(card);
        console.log(Memmory.selectedCards);
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
        selectCard: selectCard,
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