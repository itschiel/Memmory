class ScoreBoard extends HTMLElement {

    constructor(){
        super();
    }

    slots = this.getElementsByTagName("score-board-slot");

    addPlayerSlot(player){
        let slot = document.createElement(`score-board-slot`);

        slot.setColor(player.color);

        if (this.children.length > 0){this.addDevider()}

        this.append(slot);
    }

    addDevider(){
        let devider = document.createElement("span");
        devider.classList.add("score-devider");
        devider.innerHTML = `/`;

        this.append(devider);
    }

    toggleSlot(index){
        this.slots[index].toggle();
    }

    setSlotValue(index, value){
        this.slots[index].setValue(value);
    }

    clear(){
        this.innerHTML = "";
    }
}

window.customElements.define(`score-board`, ScoreBoard);