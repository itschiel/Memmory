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

    setSize(amountOfCards){
        this.style.width = `${(amountOfCards / 4) * 200}px`;
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

    
}

window.customElements.define(`memmory-board`, Board)