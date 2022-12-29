const Memmory = (() => {

    let selectedCards = [];

    async function loadCards(amountOfCards){
        let board = document.getElementsByTagName("memmory-board")[0];
        let ricks = await Memmory.Data.getImageUrls();

        board.clear();
        board.setSize(amountOfCards);

        for (let i = 0; i < (amountOfCards / 2); i++) {
            let firstCard = document.createElement("memmory-card");
            let secondCard = document.createElement("memmory-card");

            let imageUrl = ricks[i].image;

            firstCard.setAttribute("imageUrl", imageUrl);
            secondCard.setAttribute("imageUrl", imageUrl);

            board.addCard(firstCard);
            board.addCard(secondCard)
        }

        board.shuffleCards();
    }


    function selectCard(card){
        console.log("select");
        Memmory.selectedCards.push(card);
        console.log(Memmory.selectedCards);
    }

    async function compareCards(){
        console.log("compare");

        if(!Memmory.selectedCards[0].equals(Memmory.selectedCards[1])){
            console.log("unequal");

            Memmory.selectedCards[0].flip()
            Memmory.selectedCards[1].flip();

            Memmory.selectedCards = [];
            console.log(Memmory.selectedCards);

            return
        }
        console.log("equal");

        Memmory.selectedCards[0].markAsFound();
        Memmory.selectedCards[1].markAsFound();

        Memmory.selectedCards = [];
    }
      

    return {
        loadCards: loadCards,
        selectCard: selectCard,
        compareCards: compareCards,
        selectedCards: selectedCards
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