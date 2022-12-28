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

            this.firstChild.classList.remove("card-flip");
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



}

window.customElements.define(`memmory-card`, MemmoryCard);