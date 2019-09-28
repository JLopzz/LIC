/* Cada pelicula o filme debe contener estos campos
{
  filmId: Identificador
  exhibiendose: verdadero o falso
  titulo: Titulo
  sinopsis: Texto
  trailer: url del video-trailer
  portada: [ "ubicacion" ]
  galeria: [
    [ "ubicacion", "descripcion de la imagen" ]
  ]
}
*/
let data = [
  {
    filmId: "p000",
    exhibiendose: true,
    titulo: "",
    sinopsis: "",
    trailer: "",
    portada: [""],
    galeria: [["", ""]]
  }, {
    filmId: "p001",
    exhibiendose: true,
    titulo: "Habia una vez",
    sinopsis: "La película Había Una Vez ... En Hollywood de Quentin Tarantino nos lleva a la ciudad de Los Angeles en 1969 donde todo está cambiando, la estrella de la televisión, Rick Dalton (Leonardo DiCaprio), y su doble de acción Cliff Booth (Brad Pitt) buscan un camino en una industria que ya no reconocen - la novena película del guionista -director incluye un gran ensamble como elenco y múltiples historias en un tributo a los últimos momentos de la época dorada de Hollywood.",
    trailer: "https://www.youtube.com/embed/bLqTt35GCA4",
    portada: ["p001_portada01.jpg", "p001_portada02.jpg"]
  }, {
    filmId: "p002",
    exhibiendose: true,
    titulo: "Rapidos y Furiosos",
    sinopsis: "Luke Hobbs (Dwayne Johnson) es un leal policía, miembro de los Servicios de Seguridad del Cuerpo Diplomático de EEUU. Por su parte, Deckard Shaw (Jason Statham) es un solitario mercenario, ex miembro del Cuerpo de élite del ejército británico. De entrada, no tienen nada en común. Además, desconfían el uno del otro, y los insultos y golpes entre ambos no han cesado desde que se conocieron. Eso sí, cuando el mundo se enfrente a una terrible amenaza que podría cambiar nuestro planeta para siempre, estos dos adversarios no tendrán más remedio que unir sus fuerzas. Su objetivo será detener a Brixton (Idris Elba), quien se ha hecho con una peligrosa arma biológica. Hobbs y Shaw tendrán que dejar a un lado su enemistad para salvar el mundo.",
    trailer: "https://www.youtube.com/embed/xoGUI0jlbVo",
    portada: ["p002_portada01.jpg", "p002_portada02.jpg", "p002_portada03.jpg"]
  }, {
    filmId: "p003",
    exhibiendose: true,
    titulo: "El Rey Leon",
    sinopsis: "Versi&oacute;n de acci&oacute;n real del cl&aacute;sico de animación de Disney de 1994. La historia sigue la vida del pequeño Simba, un cachorro de león que vive felizmente en la sabana con el resto de su familia. Su padre Mufasa es el líder de la manada, algo que no termina de aceptar su hermano Scar, quien tratará por todos los medios de deshacerse de él. Será entonces cuando Simba tendrá que huir y abandonar su hogar para adentrarse en nuevos y aterradores parajes.<br>Durante su nueva aventura en solitario se cruzarán en su camino Timón y Pumba, un suricato y un facóquero - respectivamente - que harán que la vida del pequeño león vuelva a tener sentido.Sin embargo, el presente vendrá a recordar a Simba quién es verdaderamente y de dónde viene.",
    trailer: "https://www.youtube.com/embed/ag8i7Cw-ehE",
    portada: ["p003_portada01.jpg", "p003_portada02.jpg"]
  }
];

function loadInfo(url) {
  window.addEventListener('load', () => {
    let filmId = document.tool.decodeURL(url).var['filme'];
    if (!(typeof filmId === 'string' || filmId instanceof String)) {
      document.tool.get('#main').innerHTML = '<p>Filme no encontrado</p>';
      return;
    }

    data.forEach(filme => {
      if (filme.filmId == filmId) {
        document.tool.get('#main').innerHTML = `
<div class="poster"><img src="../data/portada/${filme.portada[0]}" alt="Portada de ${filme.titulo}"></div>
<div class="video"><iframe width="560" height="315" src="${filme.trailer}" frameborder="0" allow="accelerometer; autoplay; encrypted-media" allowfullscreen></iframe></div>
<div class="info"><h2>Sinopsis</h2><p>${filme.sinopsis}</p><a href="./galeria.html?filme=${filme.filmId}"><input type="button" value="Ver Galeria de imagenes"></a></div>
    `;
        return;
      }
    });

  }, false);
}
