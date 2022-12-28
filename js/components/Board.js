class Board extends HTMLElement {
    
    constructor(){
        super();
    }

    addMemmoryCard(MemmoryCard){
        this.append(MemmoryCard);
    }

    clear(){
        this.innerHTML = "";
    }

    setSize(amountOfCards){
        this.style.width = `${(amountOfCards / 4) * 200}px`;
    }

    
}

window.customElements.define(`memmory-board`, Board)