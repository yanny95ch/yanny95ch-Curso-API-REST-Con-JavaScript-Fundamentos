console.log('hello word');

const api_url = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_TtSoqzrETKB0SSzCq90LSkS71bprft9Jo7xXboD1hXHPUd2M0pYmHW9HHg3IAqDO'

async function reload() {
    const res = await fetch(api_url);
    const data = await res.json();

    console.log(data);
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}
reload()