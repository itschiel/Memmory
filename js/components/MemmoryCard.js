class MemmoryCard extends HTMLElement {

    constructor() {
        super();

        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.classList.add("card-flip");
        cardElement.innerHTML = `
            <div class="card-face">
                <img src="${this.getAttribute('imageUrl')}">
            </div>
            <div class="card-back"></div>
        `;

        this.append(cardElement);

        this.addEventListener("click", () => {
            this.firstChild.classList.toggle("card-flip");
        });
    }

}

window.customElements.define(`memmory-card`, MemmoryCard);