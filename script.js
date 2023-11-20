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
                        <p class= "categoria" hidden > ${video.categoria} </p>
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
    const valorFiltro = barraPesquisa.value.toLowerCase();


    videos.forEach((video) => {
        const titulo = video.querySelector(".titulo-video")?.textContent?.toLowerCase();
        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
  });
}
    


const botaoCategoria = document.querySelectorAll(".superior__item");
botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    let valorFiltro = filtro.toLocaleLowerCase();
    
    videos.forEach((video) => {
        let categoria = video.querySelector(".categoria").textContent.toLocaleLowerCase();
        video.style.display = !categoria.includes(valorFiltro) && valorFiltro != "tudo" ? "none" : "block";
    }) 
}