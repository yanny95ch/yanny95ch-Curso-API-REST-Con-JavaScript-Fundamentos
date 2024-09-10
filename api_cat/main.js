const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_7f39cpLeL4kIw496F3WSvboyA0ZPG3tm1Vr1GNYh3j1wsZcZLreJbgrTU5jBCO2t';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_7f39cpLeL4kIw496F3WSvboyA0ZPG3tm1Vr1GNYh3j1wsZcZLreJbgrTU5jBCO2t';

const spanError = document.getElementById('michisError')
async function loadRandomMichis(){
    const  res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random');
    console.log(data);
    
    if (res.status !== 200){
        spanError.innerHTML = 'Hubo un Error: ' + res.status;
    }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        //img.src = data[0].url;
    
        img1.src = data[0].url;
        img2.src = data[1].url;
    }

}
loadRandomMichis();

async function loadFavoritesMichis(){var myHeaders = new Headers();
    const  res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favoritos');
    console.log(data);

    if (res.status !== 200){
        spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message ;
    }
}

loadRandomMichis();
loadFavoritesMichis();

async function saveFavoriteMichis() {
    const rest = await fetch(API_URL_FAVORITES, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: 'dje'
        }),
    });
    console.log('save');
    console.log(rest);
    const data = await rest.json();


    if (rest.status !== 200){
        spanError.innerHTML = 'Hubo un Error: ' + rest.status + data.message;
    }
    
}

saveFavoriteMichis()