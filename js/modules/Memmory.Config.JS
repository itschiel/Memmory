Memmory.config = (() => {

    const elements = {
        cardInput: document.getElementById('sets'),
        playerInput: document.getElementById('player')
    }
    
    let amountOfCards = 16;
    let amountOfPlayers = 2;

    function parse(){
        Memmory.config.amountOfCards = elements.cardInput.value * 2;
        Memmory.config.amountOfPlayers = parseInt(elements.playerInput.value);
    }


    return {
        amountOfCards,
        amountOfPlayers,
        parse: parse
    }

})()