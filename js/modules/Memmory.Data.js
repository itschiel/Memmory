Memmory.Data = (() => {
    
    async function getImageUrls(){
        let request = await fetch("https://rickandmortyapi.com/api/character/?name=rick");
        let response = await request.json();

        let urls = [];
        for (let i = 0; i < response.results.length; i++) {
            urls.push(response.results[i].image)
        }

        return urls;
    }

    const colors = [
        '#dc2626', '#f97316', '#eab308', '#22c55e', '#0d9488', '#0ea5e9', '#6366f1', '#9333ea'
    ];

    const Elements = {
        gameScoreBoard: document.getElementById("game-score"),
        pairScoreBoard: document.getElementById("pair-score"),
        cardBoard:  document.getElementsByTagName('memmory-board')[0],
        loadConfigButton: document.getElementById("load-config"),
        resignButton: document.getElementById("resign")
    }


    return {
        getImageUrls: getImageUrls,
        colors: colors,
        Elements: Elements
    }

})()