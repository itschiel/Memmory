const Memmory = (() => {

    let selectedCards = [];

    let apiUrl = "https://rickandmortyapi.com/api/character/?name=rick";
    
    async function fetchImageUrls(){
        let request = await fetch(apiUrl);
        let response = await request.json();

        return response.results;
    }

    async function loadCards(amountOfCards){
        let board = document.getElementById("board");
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

        cards = shuffle(cards);

        board.innerHTML = "";

        setBoardSize(amountOfCards);

        cards.forEach(card => {
            board.append(card);
        });

    }

    function setBoardSize(amountOfCards){
        let board = document.getElementById("board");
        board.style.width = `${(amountOfCards / 4) * 200}px`;
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }


    function selectCard(card){
        console.log("select");
        Memmory.selectedCards.push(card);
        console.log(Memmory.selectedCards);
    }

    async function compareCards(){
        console.log("compare");

        if(Memmory.selectedCards[0].getAttribute("imageUrl") != Memmory.selectedCards[1].getAttribute("imageUrl")){
            console.log("unequal");

            Memmory.selectedCards[0].flip()
            Memmory.selectedCards[1].flip();

            Memmory.selectedCards = [];
            console.log(Memmory.selectedCards);

            return
        }
        console.log("equal");

        markCardAsFound(Memmory.selectedCards[0]);
        markCardAsFound(Memmory.selectedCards[1]);

        Memmory.selectedCards = [];
    }

    function markCardAsFound(memmoryCard){
        memmoryCard.style.filter = "brightness(85%)";
        memmoryCard.firstChild.style.width = "98%";
        memmoryCard.firstChild.style.height = "98%";

        memmoryCard.style.pointerEvents = "none";
    }
      

    return {
        fetchImages : fetchImageUrls,
        loadCards: loadCards,
        selectCard: selectCard,
        compareCards: compareCards,
        selectedCards: selectedCards
    }
})()

