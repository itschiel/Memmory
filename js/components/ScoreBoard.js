class ScoreBoard extends HTMLElement {

    const 

    constructor(){
        super();
    }

    update(player){
        let playerScore = this.querySelector(`[player="${player.number}"]`);
        playerScore.innerHTML = player.score;
    }


    addPlayer(player){
        let slot = document.createElement(`span`);

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

    clear(){
        this.innerHTML = "";
    }

    select(player){
        let slot = this.querySelector(`[player="${player.number}"]`);

        slot.style.color = "white";
        slot.style.backgroundColor = player.color;
    }

    deSelect(player){
        let slot = this.querySelector(`[player="${player.number}"]`);

        slot.style.color = player.color;
        slot.style.backgroundColor = "rgb(200, 200, 200)";
    }
}

window.customElements.define(`score-board`, ScoreBoard);