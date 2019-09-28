/* Cada pelicula o filme debe contener estos campos
{
  filmId: Identificador
  exhibiendose: verdadero o falso
  titulo: Titulo
  sinopsis: Texto
  trailer: url del video-trailer
  portada: [ "nombre_de_archivo" ]
  galeria: [
    [ "nombre_de_archivo", "descripcion de la imagen" ]
  ]
}

{
  filmId: "p000",
  exhibiendose: true,
  titulo: "",
  sinopsis: "",
  trailer: "",
  portada: [""]
  }
*/
let data = [
  {
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
  }, {
    filmId: "p004",
    exhibiendose: true,
    titulo: "Historias de Miedo",
    sinopsis: "Historias de miedo para contar en la oscuridad es una adaptación de las famosas novelas homónimas escritas por Alvin Schwartz e ilustradas por Stephen Gammell. Muy al estilo norteamericano, las historias están protagonizadas por esqueletos con la carne desgarrada que vagan por la tierra, un fantasma que se venga de la persona que lo asesinó y una casa encantada donde cada noche una cabeza ensangrentada cae por la chimenea. La cinta nos cuenta la historia de grupo de adolescentes que debe resolver el misterio que rodea a una serie de repentinas y macabras muertes que suceden en su pueblo. En 1968 en Mill Valley una pequeña comunidad, aparentemente alejada de los disturbios de las ciudades, la sombra de la familia Bellows ha crecido enormemente. En su mansión ubicada a las afueras del pueblo Sarah, una joven con terribles secretos, convirtió su tortuosa vida en una serie de historias de terror, escritas en un libro que ha trascendido el tiempo, historias que parecen ser demasiado reales para los adolescentes que lo descubren.",
    trailer: "https://www.youtube.com/embed/OwshkT4C3RM",
    portada: ["p004_portada01.jpg", "p004_portada02.jpg"]

  }, {
    filmId: "p005",
    exhibiendose: true,
    titulo: "Ready or not",
    sinopsis: "Durante su noche de bodas, una novia recibe una extraña invitación de la rica y excéntrica familia de su marido. Todo toma un giro siniestro cuando la obligan a participar en una tradición ancestral, que se convierte en un juego letal en el que tendrá que luchar por la superviviencia.",
    trailer: "https://www.youtube.com/embed/w6JqFGaN6S0",
    portada: ["p005_portada01.jpg"]

  }, {
    filmId: "p006",
    exhibiendose: false,
    titulo: "Metallica",
    sinopsis: "Documental que conmemora el 20.º aniversario de los míticos conciertos S&M y del álbum del mismo nombre grabado junto a la Orquesta Sinfónica de San Francisco. El concierto, que se grabará en directo el 6 y el 8 de septiembre, también celebrará la inauguración del vanguardista Chase Center, una incorporación histórica al litoral de la ciudad. Este estreno cinematográfico incluirá los «clásicos» del álbum S&M de 1999, a los que se unirán las versiones sinfónicas de nuevas canciones.",
    trailer: "https://www.youtube.com/embed/TgUnVhEblxU",
    portada: ["p006_portada01.jpg","p006_portada02.jpg"]
  }, {
    filmId: "p007",
    exhibiendose: false,
    titulo: "Musica de la Vida",
    sinopsis: "En la conflictiva Inglaterra de 1987, Javed es un adolescente de origen paquistaní, de clase obrera, que sufre racismo y penurias económicas. Sin embargo, gracias a la música de Bruce Springsteen, Javed aprende a comprender a su familia y encauzar su vida.",
    trailer: "https://www.youtube.com/embed/NGc2-Bj185A",
    portada: ["p007_portada01.jpeg","p007_portada02.jpg"]
  }, {
    filmId: "p008",
    exhibiendose: false,
    titulo: "Muñeco Malvado",
    sinopsis: "Una madre le regala a su hijo un muñeco por su cumpleaños, sin ser consciente de la naturaleza maligna que esconde en su interior.",
    trailer: "https://www.youtube.com/embed/OBsdejOTwrk",
    portada: ["p008_portada01.jpg","p008_portada02.jpg"]
  }, {
    filmId: "p009",
    exhibiendose: false,
    titulo: "Agente bajo fuego",
    sinopsis: "Tras los acontecimientos que tuvieron lugar pocos años antes, el agente Mike Banning (Gerard Butler) es acusado de un intento de asesinato del presidente de los Estados Unidos. Perseguido por su propia agencia y por el FBI, Banning participa una carrera a contrarreloj en la que ha de desvelar al auténtico grupo terrorista que ha puesto se mirada sobre el Air Force One para cometer su próximo atentado. Secuela de Objetivo: Londres (2016).",
    trailer: "https://www.youtube.com/embed/0IuuhO7XjlU",
    portada: ["p009_portada01.jpg","p009_portada02.jpg"]
  }, {
    filmId: "p010",
    exhibiendose: false,
    titulo: "Inesperado",
    sinopsis: "Abby Johnson (Ashley Bratcher) es una de las directoras más jóvenes de las clínicas \"Planned Parenthood\" que existen en la nación. Ejerciendo ese cargo ha estado involucrada hasta en 22.000 abortos y ha aconsejado a innumerables mujeres con respecto a la toma de decisiones relacionadas con la reproducción. Su pasión por la materia la llevaría a convertirse en la portavoz de la franquicia, luchando por establecer la legislación en que la ha que creído firmemente desde su adolescencia. Sin embargo, un día su perspectiva toma un inesperado rumbo tras presenciar algo que la marcará de por vida.",
    trailer: "https://www.youtube.com/embed/rlEtDbmRh5g",
    portada: ["p010_portada01.jpg"]
  }
];

function loadInfo(url) {
  window.addEventListener('load', () => {
    let vars = document.tool.decodeURL(url).var;
    let main = document.tool.get('#main');

    // Se muestra primero las paginas de exhibicion o estrenos
    if (vars && vars['exhibiendose']) {
      if (vars['exhibiendose'] == 1) {
        let str = `<div class="separador"><span>Exhibiendose</span><hr></div><article class="cards">`;
        data.forEach(filme => {
          if (filme.exhibiendose === true)
            str += `<div><a href="./informacion.html?filme=${filme.filmId}"><img src="../data/portada/${filme.portada[0]}" alt="${filme.titulo}"></a></div>`;
        });
        main.innerHTML += str + '</article>';
        return;
      } else {
        let str = `<div class="separador"><span>Proximos Estrenos</span><hr></div><article class="cards">`;
        data.forEach(filme => {
          if (filme.exhibiendose === false)
            str += `<div><a href="./informacion.html?filme=${filme.filmId}"><img src="../data/portada/${filme.portada[0]}" alt="${filme.titulo}"></a></div>`;
        });
        main.innerHTML += str + '</article>';
        return;
      }
    }
    let filmId = (vars && vars['filme']) ? vars['filme'] : null;
    if (typeof filmId === 'string' || filmId instanceof String) {
      let dt = data.find(filme => filme.filmId == filmId);
      main.innerHTML = `<div class="separador"><span>'${dt.titulo}'</span><hr></div>
        <div class="poster"><img src="../data/portada/${dt.portada[0]}" alt="Portada de ${dt.titulo}"></div>
        <div class="video"><iframe width="560" height="315" src="${dt.trailer}" frameborder="0" allow="accelerometer; autoplay; encrypted-media" allowfullscreen></iframe></div>
        <div class="info"><h2>Sinopsis</h2><p>${dt.sinopsis}</p><a href="./galeria.html?filme=${dt.filmId}"><input type="button" value="Ver Galeria de imagenes"></a></div>
      `;
      return;
    }

    main.innerHTML = '<div class="subtitulo"><span>Datos no encontrados</span></div>';
  }, false);
}
