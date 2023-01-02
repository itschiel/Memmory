class MemmoryWinScreen extends HTMLElement {

    winner = null;

    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
            <h1>#1 <span id="color" style="background-color: ${this.winner.color}"> </span> won !!</h1>
            <h2>With ${this.winner.score} found pairs</h2>
        `;
    }

    setWinner(player){
        this.winner = player;
    }

}

window.customElements.define(`memmory-win-screen`, MemmoryWinScreen);