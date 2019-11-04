let data = [];

var uno, dos, tres, cuatro, cinco;

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
    </div><article class="cards"><div class='main-content'>`;
  data.forEach(filme => {
    if (filme.exhibiendose === exhibiendose)
      str += `<div class="card-body"><a href="${uri}informacion.html?filme=${filme.filmId}"><img src="${uri2}data/portada/${filme.portada[0]}" alt="${filme.titulo}"></a></div>`;
  });
  return str + '</div></article>';
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
        <article class="cards"><div class="main-content">

        <div class="card-body"><img src="../data/portada/${dt.portada[0]}" alt="Portada de ${dt.titulo}"></div>

        <div class="card-content"><div class="card-body"><h2>Sinopsis</h2><span>${dt.sinopsis}</span></div>

        <div class="card-body"><h2>Califica esta Pelicula</h2>

        <form>
        <ul id="calificacion">
        <li class="star" id="uno" onmouseleave="resetStars()" onmouseenter="hover1()" onclick="calificar1()"></li>
        <li class="star" id="dos" onmouseleave="resetStars()" onmouseenter="hover2()" onclick="calificar2()"></li>
        <li class="star" id"tres" onmouseleave="resetStars()" onmouseenter="hover3()" onclick="calificar3()"></li>
        <li class="star" id="cuatro" onmouseleave="resetStars()" onmouseenter="hover4()" onclick="calificar4()"></li>
        <li class="star" id="cinco" onmouseleave="resetStars()" onmouseenter="hover5()" onclick="calificar5()"></li></ul><br>
        <label>Haznos un comentario sobre la pelicula: </label><textarea id></textarea><input type="button" value="enviar"</form></div></div></div>
        <div class="double"><iframe src="${dt.trailer}" frameborder="0" width="100%" allow="accelerometer; autoplay; encrypted-media" allowfullscreen></iframe></div>
        <div class="card-body"><a href="./galeria.html?filme=${dt.filmId}"><input type="button" value="Ver Galeria de imagenes" class="btn-Gale"></a></div>

        </article>
      `;
      calif = document.getElementById('calificacion');
      return;
    }

    main.innerHTML = '<div class="subtitulo"><span>Datos no encontrados</span></div>';
  }, false);
}

function resetStars() {
  for (var i = 0; i < calif.childElementCount; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/empty_star.png)';
  }
}
function hover1() { calif.children[0].style.backgroundImage = 'url(../res/img/full_star.png)' }
function hover2() {
  for (var i = 0; i < 2; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)';
  }
}
function hover3() {
  for (var i = 0; i < 3; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)';
  }
}
function hover4() {
  for (var i = 0; i < 4; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)';
  }
}
function hover5() {
  for (var i = 0; i < 5; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)';
  }
}

function calificar1() { calif.children[0].style.backgroundImage = 'url(../res/img/full_star.png)!important' }
function calificar2() {
  for (var i = 0; i < 2; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)!important';
  }
}
function calificar3() {
  for (var i = 0; i < 3; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)!important';
  }
}
function calificar4() {
  for (var i = 0; i < 4; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)!important';
  }
}
function calificar5() {
  for (var i = 0; i < 5; i++) {
    calif.children[i].style.backgroundImage = 'url(../res/img/full_star.png)!important';
  }
}
