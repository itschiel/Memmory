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
            this.firstChild.classList.remove("card-flip");
        });
    }



}

window.customElements.define(`memmory-card`, MemmoryCard);