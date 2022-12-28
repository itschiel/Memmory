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

        this.addEventListener("click", () => {
            if(Memmory.isRunning){return};

            this.flip();
            Memmory.selectCard(this);

            if(Memmory.selectedCards.length == 2){
                Memmory.isRunning = true;
                setTimeout(() => {
                    Memmory.compareCards();
                    Memmory.isRunning = false;
                }, 1500);
                return;
            }
        });
    }

    flip(){
        this.firstChild.classList.toggle("card-flip");
    }

    markAsFound(){
        this.style.filter = "brightness(85%)";
        this.firstChild.style.width = "98%";
        this.firstChild.style.height = "98%";

        this.style.pointerEvents = "none";
    }

    equals(MemmoryCard){
        return this.getAttribute("imageUrl") == MemmoryCard.getAttribute("imageUrl");
    }

}

window.customElements.define(`memmory-card`, MemmoryCard);