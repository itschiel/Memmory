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

    deSelect(){
        this.classList.remove("selected");
        this.flip();
    }

    equals(MemmoryCard){
        return this.getAttribute("imageUrl") == MemmoryCard.getAttribute("imageUrl");
    }

    setImage(url){
        this.setAttribute("imageUrl", url);
    }

}

window.customElements.define(`memmory-card`, MemmoryCard);