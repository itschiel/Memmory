const Memmory = (() => {
    console.log("hallo universe")

    function fetchImages(){

    }

    let apiUrl = "https://rickandmortyapi.com/api/character/?name=rick";
    
    async function fetchImageUrls(){
        let request = await fetch(apiUrl);
        let response = await request.json();

        let ricks = response.results

        // images ergens cachen
        ricks.forEach(element => {
            console.log(element.image)
        });
    }

    return {
        fetchImages : fetchImageUrls
    }


})()