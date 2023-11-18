const containerVideos = document.querySelector(".videos__container");

async function buscaEmostraVideos() {
    try {
        // Fetch faz a busca e retorna uma promise 
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json();
        videos.forEach((video) => {
            containerVideos.innerHTML += `
                <li class="videos__item"> 
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video"> 
                        <img class="img-canal" src="${video.imagem} alt="Logo do canal"/>
                        <h3 class="titulo-video"> ${video.titulo}</h3>
                        <p class="titulo-canal"> ${video.descricao} </p>
                    </div> 
                </li> `
        })
    } catch (error) {
        containerVideos.innerHTML += `<p> Houve um erro ao carregar os videos ${error}  </p>`
    }


}

buscaEmostraVideos();


const barraPesquisa = document.querySelector(".pesquisar__input");

barraPesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item");

    if (barraPesquisa.value != "") {

        for (let video of videos) {
            let titulo = video.querySelector(".titulo-video")?.textContent?.toLowerCase();
            console.log("Acho que o erro é aqui ")
            let valorFiltro = barraPesquisa.value.toLowerCase();

            // Se o titulo do video não é o valor que a pessoa está pesquisando, esconde o vídeo.
            if (!titulo.includes(valorFiltro)) {
                video.style.display = "none";
                // Se o titulo do video e a pesquisa forem iquais, exibe o vídeo.
            } else {
                video.style.display = "block";
            }
        }
    } else {
        videos.style.display = "block"
    }
}