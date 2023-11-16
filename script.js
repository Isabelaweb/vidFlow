const containerVideos = document.querySelector(".videos__container");
// Fetch faz a busca e retorna uma promise 
const api = fetch("http://localhost:3000/videos")
    // then significa: então. Ou seja, com a promise ok posso transformar tudo em Json.
    .then(resposta => resposta.json())
    .then(
        (videos) =>
            videos.forEach((video) => {
                containerVideos.innerHTML += `<li class="videos__item"> 

        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
        <div> </div> 
        </li>`
            })
    )


