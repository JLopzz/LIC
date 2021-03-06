let galeria = [
  {
    filmId: "p001",
    titulo: "Habia una vez",
    imagenes: [
      ["p001_img01.png", ""], ["p001_img02.jpg", ""], ["p001_img03.jpg", ""],
      ["p001_img04.jpg", ""], ["p001_img05.jpg", ""], ["p001_img06.jpg", ""],
      ["p001_img07.jpg", ""], ["p001_img08.jpg", ""]],
  }, {
    filmId: "p002",
    titulo: "Rapidos y Furiosos",
    imagenes: [
      ["p002_img01.jpg", ""], ["p002_img02.jpg", ""], ["p002_img03.jpg", ""],
      ["p002_img04.jpg", ""], ["p002_img05.jpg", ""], ["p002_img06.jpg", ""],
      ["p002_img07.jpg", ""], ["p002_img08.jpg", ""]],
  }, {
    filmId: "p003",
    titulo: "El Rey Leon",
    imagenes: [
      ["p003_img01.jpg", ""], ["p003_img02.jpg", ""], ["p003_img03.jpg", ""],
      ["p003_img04.jpg", ""], ["p003_img05.jpg", ""], ["p003_img06.jpg", ""],
      ["p003_img07.jpg", ""], ["p003_img08.jpg", ""]],
  }, {
    filmId: "p004",
    titulo: "Historias de Miedo",
    imagenes: [
      ["p004_img01.jpg", ""], ["p004_img02.jpg", ""], ["p004_img03.jpg", ""],
      ["p004_img04.jpg", ""], ["p004_img05.jpg", ""], ["p004_img06.jpg", ""],
      ["p004_img07.jpg", ""], ["p004_img08.jpg", ""]],
  }, {
    filmId: "p005",
    titulo: "Ready or not",
    imagenes: [
      ["p005_img01.jpg", ""], ["p005_img02.jpg", ""], ["p005_img03.jpg", ""],
      ["p005_img04.jpg", ""], ["p005_img05.jpg", ""], ["p005_img06.jpg", ""],
      ["p005_img07.jpg", ""], ["p005_img08.jpg", ""]]
  }
];

function loadGalery(url) {
  window.addEventListener('load', () => {
    let vars = document.tool.decodeURL(url).var;
    let filmId = (vars && vars['filme']) ? vars['filme'] : null;
    let main = document.tool.get('#main');

    // Para cuando no se especifica un Id en la URL se cargan 3 imagenes maximo de todas las peliculas
    if (!(typeof filmId === 'string' || filmId instanceof String)) {
      galeria.forEach(filme => {
        let str = `<div class="subtitulo"><span>${filme.titulo}</span></div><article class="cards">
          <article class="cards">`;
        for (let i = 0; i < filme.imagenes.length && i < 3; i++) {
          str += `<div class="card-body"><a href="./galeria.html?filme=${filme.filmId}">
            <img src="../data/img/${filme.imagenes[i][0]}" alt="${filme.imagenes[i][1]}">
            </a></div>`;
        }
        main.innerHTML += str + '</article>';
      });
      return;
    }

    // Cuando se especifica un Id se cargan todas las imagenes de dicha pelicula
    galeria.forEach(filme => {
      if (filme.filmId == filmId) {
        let str = `<div class="subtitulo"><span>${filme.titulo}</span></div><article class="cards">`;
        filme.imagenes.forEach(img => {
          str += `<div class="card-body"><img src="../data/img/${img[0]}" alt="${img[1]}"></div>`;
        });
        main.innerHTML += str + '</article>';
        return;
      }
    });

  }, false);
}
