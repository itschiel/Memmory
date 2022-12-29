const Memmory = (() => {

    let selectedCards = [];

    let apiUrl = "https://rickandmortyapi.com/api/character/?name=rick";
    
    async function fetchImageUrls(){
        let request = await fetch(apiUrl);
        let response = await request.json();

        return response.results;
    }

    async function loadCards(amountOfCards){
        let board = document.getElementsByTagName("memmory-board")[0];
        let ricks = await fetchImageUrls();
        let cards = []

        for (let i = 0; i < (amountOfCards / 2); i++) {
            let firstCard = document.createElement("memmory-card");
            let seccondCard = document.createElement("memmory-card");

            let imageUrl = ricks[i].image;

            firstCard.setAttribute("imageUrl", imageUrl);
            seccondCard.setAttribute("imageUrl", imageUrl);

            cards.push(firstCard);
            cards.push(seccondCard);
        }

        board.clear();

        board.setSize(amountOfCards);

        cards.forEach(card => {
            board.addCard(card);
        });

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
        fetchImages : fetchImageUrls,
        loadCards: loadCards,
        selectCard: selectCard,
        compareCards: compareCards,
        selectedCards: selectedCards
    }
})()

