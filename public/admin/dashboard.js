function setOptions({
  /* Each should be a function */
  view = null,
  add = null,
  update = null
} = {}) {
  let opts = $("#options-nav");

  // Removing opts childs
  opts.empty();

  if (Object.trueType(view, "function")) {
    let opt = document.newElement("li", { className: "nav-item active" },
      document.newElement("a", { className: "nav-link", href: "#" }, [
        "View ",
        document.newElement("span", { className: "sr-only" }, "(current)")
      ]));

    opt.addEventListener("click", view);
    opts.append(opt);
    opt.click();
  }

  for (const [text, fun] of [
    ['Add', add], ['Update', update]
  ]) {
    if (fun === null) break;

    let opt = document.newElement("li", { className: "nav-item" }, [
      document.newElement("a", { className: "nav-link", href: "#" }, [text])
    ]);

    opt.addEventListener("click", fun);
    opts.append(opt);
  }
}

/* Filmes functions */
function NavFilmes() {
  let _tbody = null, _pages = null;
  let _limit = 10, _page = 1;

  /* properties */
  this.setLimit = val => {
    if (isNaN(parseInt(val)) || parseInt(val) < 1 || parseInt(val) > 30) return;

    _limit = parseInt(val);
    this.Load();
  }
  this.setPage = val => {
    if (isNaN(parseInt(val)) || parseInt(val) < 1) return;

    _page = parseInt(val);
    this.Load();
  }

  /* methods */
  async function load() {
    let f = new Filmes({
      startAt: _limit * (_page - 1),
      limit: _limit
    });

    try {
      await f.get();

      _tbody.innerHTML = "";
      for (const filme of f.filmes) {
        _tbody.appendChild(document.newElement("tr", [
          document.newElement("td", filme.id),
          document.newElement("td",
            document.newElement("div", { className: "custom-control custom-checkbox" }, [
              document.newElement("input", { type: "checkbox", className: "custom-control-input", checked: filme.exhibiendose, disabled: true }),
              document.newElement("label", { className: "custom-control-label" }, filme.titulo)
            ])),
          document.newElement("td", filme.estreno.format("MM dd, yyyy")),
          document.newElement("td", filme.sinopsis.substring(0, 100)),
          document.newElement("td", document.newElement("a", { href: filme.trailer, target: "_blank" }, "Trailer")),
          document.newElement("td", `${filme.portada.length} portadas`),
        ]));
      }
    } catch (e) { console.log(e); }
  }

  function form(node) {

    let titulo = document.newElement("input", { type: "text", className: "form-control", placeholder: "Titulo" });
    let estreno = document.newElement("input", { type: "date", className: "form-control" });
    let exhibiendose = document.newElement("input", { type: "checkbox", className: "form-check-input", id: "cbexhibiendose" });

    node.append(
      document.newElement("form", { className: "form-row" }, [
        document.newElement("div", { className: "form-group col-md-6" }, [
          document.newElement("label", "Titulo"), titulo]),
        document.newElement("div", { className: "form-group col-md-3" }, [
          document.newElement("label", "Fecha de estreno"), estreno]),
        document.newElement("div", { className: "form-group" },
          document.newElement("div", { className: "form-check mx-auto" }, [exhibiendose,
            document.newElement("label", { className: "form-check-label", for: "cbexhibiendose" }, "Exhibiendose")]))
      ])
    );

    return {
      titulo
    };
  }

  /* public methods */
  this.View = function (node) {
    /* Titulo */
    let h1 = document.newElement("h1", { className: "mt-4" }, "Filmes registrados")

    /* Table */
    _tbody = document.newElement("tbody");

    let table = document.newElement("table", { className: "table table-striped table-bordered" }, [
      document.newElement("thead", document.newElement("tr", [
        document.newElement("th", "id"),
        document.newElement("th", "(Exhibiendose) Titulo"),
        document.newElement("th", "Fecha de estreno"),
        document.newElement("th", "Sinopsis"),
        document.newElement("th", "Trailer"),
        document.newElement("th", "Portadas"),
        //document.newElement("th", "Imagenes")
      ])),
      _tbody,
      document.newElement("tfoot", document.newElement("tr", [
        document.newElement("th", "id"),
        document.newElement("th", "(Exhibiendose) Titulo"),
        document.newElement("th", "Fecha de estreno"),
        document.newElement("th", "Sinopsis"),
        document.newElement("th", "Trailer"),
        document.newElement("th", "Portadas"),
        //document.newElement("th", "Imagenes")
      ]))
    ]);

    /* Pagination nav */
    let pag1 = document.newElement("li", { className: "page-item" }, document.newElement("a", { className: "page-link" }, "1"));
    let pag2 = document.newElement("li", { className: "page-item" }, document.newElement("a", { className: "page-link" }, "2"));
    let pag3 = document.newElement("li", { className: "page-item" }, document.newElement("a", { className: "page-link" }, "3"));
    let inter = document.newElement("li", { className: "page-item disabled" }, document.newElement("a", { className: "page-link" }, "..."));
    let next = document.newElement("li", { className: "page-item" }, document.newElement("a", { className: "page-link" }, "Siguiente"));

    _pages = document.newElement("ul", { className: "pagination" }, [pag1, pag2, pag3, inter, next]);

    let page = document.newElement("nav", { "aria-label": "Page navigation" }, _pages);

    node.empty();
    node.append(h1, table, page);
    load();
  }

  this.Add = function (node) {
    node.empty();
    node.append(document.newElement("h1", { className: "mt-4" }, "Ingresa un nuevo Filme"));

    let {
      titulo
    } = form(node);

  }
}


window.addEventListener("load", () => {
  $("#menu-toggle").click(e => {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  /* DOM sections */
  let
    nav_filmes = $("#nav-filmes"),
    nav_combos = $("#nav-combos"),
    main = $("#container");

  nav_filmes.click(e => {
    e.preventDefault();

    let navFilmes = new NavFilmes();
    setOptions({
      view: () => { navFilmes.View(main); },
      add: () => { navFilmes.Add(main); }
    })
  })
});
