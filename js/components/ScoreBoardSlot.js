class ScoreBoardSlot extends HTMLElement {

    constructor(){
        super();
    }
    
    static States = {
        highLighted: "highlighted",

    }

    connectedCallback(){
        this.classList.add("score");
        this.innerHTML = 0;

        this.setAttribute("state", "")
    }

    isHighLighted(){
        if (this.getAttribute("state") != ScoreBoardSlot.States.highLighted) {return false}
        return true;
    }

    toggle(){
        if(this.isHighLighted()){
            this.style.removeProperty("background-color");
            this.style.color = this.color;
            this.setAttribute("state", "");

            return;
        }

        this.style.backgroundColor = this.color;
        this.style.color = "white";
        this.setAttribute("state", ScoreBoardSlot.States.highLighted);
    }

    setColor(color){
        this.color = color;
        this.style.color = color;
    }

    setValue(value){
        this.innerHTML = value;
    }

}

window.customElements.define(`score-board-slot`, ScoreBoardSlot);