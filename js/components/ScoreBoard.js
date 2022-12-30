class ScoreBoard extends HTMLElement {

    const 

    constructor(){
        super();
    }


    addPlayer(player){
        let slot = document.createElement(`span`);
        let number = this.getElementsByClassName("score").length;

        slot.classList.add('score');
        slot.setAttribute('player', player.number);
        slot.style.color = player.color;
        slot.innerHTML = 0;

        if (this.children.length > 0){this.addDevider()}

        this.append(slot);

    }

    addDevider(){
        let devider = document.createElement("span");
        devider.classList.add("score-devider");
        devider.innerHTML = `/`;

        this.append(devider);
    }
}

window.customElements.define(`score-board`, ScoreBoard);