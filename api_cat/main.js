const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_7f39cpLeL4kIw496F3WSvboyA0ZPG3tm1Vr1GNYh3j1wsZcZLreJbgrTU5jBCO2t';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_7f39cpLeL4kIw496F3WSvboyA0ZPG3tm1Vr1GNYh3j1wsZcZLreJbgrTU5jBCO2t';
const API_URL_FAVORITES_DELETE = (id) =>  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_7f39cpLeL4kIw496F3WSvboyA0ZPG3tm1Vr1GNYh3j1wsZcZLreJbgrTU5jBCO2t`;

const spanError = document.getElementById('error')

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
        const btn1= document.getElementById('btn1');
        const btn2= document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () =>  saveFavouriteMichi(data[1].id);
    }
}

async function loadFavoriteMichis(){
    const  res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favoritos');
    console.log(data);

    if (res.status !== 200){
        spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message ;
    }else{
        const  section = document.getElementById('favoriteMichis');
        section.innerHTML= " ";
        const h2 = document.createElement('h2')
        const h2Text = document.createTextNode('Michis Favoritos')
        h2.appendChild(h2Text);
        section.appendChild(h2);
        data.forEach(michi => {
            
            const article = document.createElement('article');
            const img =   document.createElement('img');
            const btn = document.createElement('button');
            const btnTex = document.createTextNode('sacar al Michi de Favoritos');

            if(michi.image.url != null) {
                img.src = michi.image.url;
                img.width=350 ;
                img.height=350;
                btn.appendChild(btnTex)
                btn.onclick = () => deleteFavouriteMichi(michi.id);
                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article); 
            }
        });
    }
}

async function saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: id
      }),
    });
    const data = await res.json();
  
    console.log('Save')
    console.log(res)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        console.log('Michi Agregado a favoritos');
        loadFavoriteMichis();
      }
  }

  async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }else{
        console.log('Michi eliminado de favoritos');
        loadFavoriteMichis(); 
        
      }
  }
  
  loadRandomMichis();
  loadFavoriteMichis();