function loadAll(uri, uri2) {
  window.addEventListener('load', () => {
    document.tool.get('#main').innerHTML = loadCards(true, uri, uri2) + loadCards(false, uri, uri2);
  });
}

function loadCards(exhibiendose, uri, uri2) {
  uri = (uri) ? uri : './';
  uri2 = (uri2) ? uri2 : '../';

  let str = `<div class="separador">
      <span>${exhibiendose ? '&#127916;Películas en cartelera&#127916;' : '&#127916;Próximos Estrenos&#127916;'}</span><hr>
    </div><article class="cards">`;
  data.forEach(filme => {
    if (filme.exhibiendose === exhibiendose)
      str += `<div><a href="${uri}informacion.html?filme=${filme.filmId}"><img src="${uri2}data/portada/${filme.portada[0]}" alt="${filme.titulo}"></a></div>`;
  });
  return str + '</article>';
}

function loadInfo(url) {
  window.addEventListener('load', () => {
    let vars = document.tool.decodeURL(url).var;
    let main = document.tool.get('#main');

    // Se muestra primero las paginas de exhibicion o estrenos
    if (vars && vars['exhibiendose']) {
      main.innerHTML = loadCards(vars['exhibiendose'] == 1);
      return;
    }

    let filmId = (vars && vars['filme']) ? vars['filme'] : null;
    if (typeof filmId === 'string' || filmId instanceof String) {
      let dt = data.find(filme => filme.filmId == filmId);
      main.innerHTML = `<div class="separador"><span>'${dt.titulo}'</span><hr></div>
        <article class="cards">
        <div><img src="../data/portada/${dt.portada[0]}" alt="Portada de ${dt.titulo}"></div>
        <div><h2>Sinopsis</h2><span>${dt.sinopsis}</span></div>
        <div class="double"><iframe src="${dt.trailer}" frameborder="0" allow="accelerometer; autoplay; encrypted-media" allowfullscreen></iframe></div>
        <div><a href="./galeria.html?filme=${dt.filmId}"><input type="button" value="Ver Galeria de imagenes" class="btn-Gale"></a></div>
        </article>
      `;
      return;
    }

    main.innerHTML = '<div class="subtitulo"><span>Datos no encontrados</span></div>';
  }, false);
}
