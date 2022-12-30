class MemmoryCard extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback(){  
        let card = document.createElement("div");

        card.classList.add("card");
        card.classList.add("card-flip");
        card.innerHTML = `
            <div class="card-face">
                <img src="${this.getAttribute('imageUrl')}">
            </div>
            <div class="card-back"></div>
        `;

        this.append(card);
        this.addEventListener("click", this.onClick);
    }

    flip(){
        this.firstChild.classList.toggle("card-flip");
    }

    markAsFound(){
        this.classList.add("marked");
        this.classList.remove("selected");
    }

    select(){
        this.classList.add("selected");
        this.flip();
    }

    deSelect(){
        this.classList.remove("selected");
        this.flip();
    }

    equals(MemmoryCard){
        return this.getAttribute("imageUrl") == MemmoryCard.getAttribute("imageUrl");
    }

    onClick(){
        if(Memmory.isRunning){return};

        this.select();

        let board = document.getElementsByTagName("memmory-board")[0];
        if(board.getSelectedCards().length != 2){return}

        Memmory.isRunning = true;
        setTimeout(() => {
            Memmory.compareCards(board.getSelectedCards()[0], board.getSelectedCards()[1]);
            Memmory.isRunning = false;
        }, 1500);

        return;
    }

    setImage(url){
        this.setAttribute("imageUrl", url);
    }

}

window.customElements.define(`memmory-card`, MemmoryCard);