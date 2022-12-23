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

        // onderstaande moet in een aparte functie

        const card = document.getElementsByClassName("card")[0];
        const htmlImage = document.createElement("img");
        htmlImage.src = ricks[0].image;

        card.append(htmlImage);

    }

    return {
        fetchImages : fetchImageUrls
    }


})()