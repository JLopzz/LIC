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
    filmId: "p003",
    exhibiendose: true,
    titulo: "El Rey Leon",
    sinopsis: "Versi&oacute;n de acci&oacute;n real del cl&aacute;sico de animación de Disney de 1994. La historia sigue la vida del pequeño Simba, un cachorro de león que vive felizmente en la sabana con el resto de su familia. Su padre Mufasa es el líder de la manada, algo que no termina de aceptar su hermano Scar, quien tratará por todos los medios de deshacerse de él. Será entonces cuando Simba tendrá que huir y abandonar su hogar para adentrarse en nuevos y aterradores parajes.<br>Durante su nueva aventura en solitario se cruzarán en su camino Timón y Pumba, un suricato y un facóquero - respectivamente - que harán que la vida del pequeño león vuelva a tener sentido.Sin embargo, el presente vendrá a recordar a Simba quién es verdaderamente y de dónde viene.",
    trailer: "https://www.youtube.com/embed/ag8i7Cw-ehE",
    portada: ["p003_portada01.jpg", "p003_portada02.jpg"],
    galeria: [
      ["p003_img01.jpg", ""], ["p003_img02.jpg", ""], ["p003_img03.jpg", ""],
      ["p003_img04.jpg", ""], ["p003_img05.jpg", ""], ["p003_img06.jpg", ""],
      ["p003_img07.jpg", ""], ["p003_img08.jpg", ""]
    ]
  }
];

function loadInfo(url) {
  window.addEventListener('load', () => {
    let filmId = document.tool.decodeURL(url).var['filme'];
    if (!(typeof filmId === 'string' || filmId instanceof String)) return;

    data.forEach(filme => {
      if (filme.filmId == filmId) {
        console.log(filmId);
        document.tool.get('#main').innerHTML = `
<div class="poster"><img src="../data/portada/${filme.portada[0]}" alt="Portada de ${filme.titulo}"></div>
<div class="video"><iframe width="560" height="315" src="${filme.trailer}" frameborder="0" allow="accelerometer; autoplay; encrypted-media" allowfullscreen></iframe></div>
<div class="info"><h2>Sinopsis</h2><p>${filme.sinopsis}</p><a href="./galeria.html?filme=${filme.filmId}"><input type="button" value="Ver Galeria de imagenes"></a></div>
    `;
      }
    });

  }, false);
}
