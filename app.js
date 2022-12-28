const Memmory = (() => {
    console.log("hallo universe")

    function fetchImages(){

    }

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
      

    return {
        fetchImages : fetchImageUrls,
        loadCards: loadCards
    }


})()