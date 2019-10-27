function createSeparator(title) {
  return document.newElement("div", { className: "row separator justify-content-center" }, [
    document.newElement("h2", { className: "text-center text-second mt-4" }, title),
    document.newElement("hr")
  ]);
}

function createCard({
  title,
  text,
  img = null
}) {
  let childs = [];

  if (!!img && Object.trueType(img.src, "string"))
    childs.push(document.newElement("img", { src: img.src, alt: img.alt, className: "card-img-top" }));

  childs = [
    ...childs,
    document.newElement("div", { className: "card-body" }, (() => {
      let body_parts = []

      if (Object.trueType(title, "string"))
        body_parts.push(document.newElement("h5", { className: "card-title" }, title));
      if (Object.trueType(text, "string"))
        body_parts.push(document.newElement("p", { className: "card-text" }, text));

      return body_parts;
    })())
  ];

  return document.newElement("div", { className: "col-sm-3 mt-4" },
    document.newElement("div", { className: "card" }, childs)
  );
}

function createCardContainer(cards) {
  let rows = Object.trueType(cards, "array") ? cards : [];
  return document.newElement("div", { className: "row container-fluid" }, rows)
}

/*<div class="row container-fluid">
        <div class="col-sm-3">
        </div>
      </div>
      */

window.addEventListener("load", () => {
  let store = new Storage();
  let
    nav_ini = $("#nav_ini"),
    nav_dul = $("#nav_dul"),
    nav_exh = $("#nav_exh"),
    nav_est = $("#nav_est"),
    nav_pro = $("#nav_pro"),
    nav_gal = $("#nav_gal"),
    nav_qui = $("#nav_qui"),
    main = $("#container");

  nav_ini.click(async function (e) {
    e.preventDefault();
    main.empty();

    let f0 = new Filmes({
      exhibiendose: false,
      limit: 5
    });
    let f1 = new Filmes({
      exhibiendose: true,
      limit: 5
    });

    //await f0.get();
    await f1.get();

    let cards1 = await Promise.all(f1.filmes.map(async function ({ titulo, portada }) {
      let src = await store.getPortada(portada[0]);

      return createCard({
        title: titulo,
        img: { src, alt: `Filme '${titulo}'` }
      });
    }));

    main.append(
      createSeparator("🎬Películas en cartelera🎬"),
      createCardContainer(cards1),
      createSeparator("🎬Próximos Estrenos🎬")
    );
  });
});
