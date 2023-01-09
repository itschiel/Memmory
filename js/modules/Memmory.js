
const Memmory = (() => {

    window.addEventListener("DOMContentLoaded", () => {
        Memmory.Game.init();
        Memmory.Data.Elements.resignButton.addEventListener("click", Memmory.Game.resign);
        Memmory.Data.Elements.restartButton.addEventListener("click", Memmory.Game.restart)
        Memmory.Data.Elements.loadConfigButton.addEventListener("click", Memmory.Game.loadConfig);
    });

    return {}
    
})()