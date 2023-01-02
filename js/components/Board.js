class Board extends HTMLElement {
    
    constructor(){
        super();
    }

    addCard(MemmoryCard){
        this.append(MemmoryCard);
    }

    clear(){
        this.innerHTML = "";
    }

    shuffleCards(){
        for (var i = this.children.length; i >= 0; i--) {
            let element = this.children[Math.floor(Math.random() * i)]; //
            this.append(element); // hekserij! wrm worden de child elements ge dupliceerd en wrm blijft de reference niet staan
            element.firstChild.remove(); // wrm is dit nodig (bovenstaande comment)
        }
    }

    getSelectedCards(){
        return this.getElementsByClassName("selected");
    } 
    
    allCardsFound() {
        let cards = this.children;

        for (let i = 0; i < cards.length; i++) {
            if (!cards[i].classList.contains("marked")) {return false}
        }

        return true
    }
}

window.customElements.define(`memmory-board`, Board)