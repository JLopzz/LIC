let alimentos = {
  productos: [
    {
      productoId: "pr001",
      titulo: "Golosinas",
      precio: 2.99,
      descripcion: "Si buscas algo dulce, nuestra seleccion de golosinas te sorprenderá.",
      img: ["producto01.jpg", ""]
    }, {
      productoId: "pr002",
      titulo: "Palomitas",
      precio: 3.99,
      descripcion: "Palomitas",
      img: ["producto02.jpg", ""]
    }
  ],
  combos: [
    {
      comboId: "c001",
      titulo: "Familiar",
      precio: 8.99,
      descripcion: "¡Nada mejor que compartir con la familia! Ven y prueba nuestro combo familiar.",
      img: ["combo01.png", ""]
    }, {
      comboId: "c002",
      titulo: "Para dos",
      precio: 3.00,
      descripcion: "Si vienes acompañado este es el combo para ti. Dos sandwiches acompañados con dos sodas.",
      img: ["combo02.png", ""]
    }, {
      comboId: "c003",
      titulo: "En pareja",
      precio: 5.50,
      descripcion: "Si tú y tu acompañante tienen mucha habre, prueba este fantastico combo.",
      img: ["combo03.png", ""]
    }, {
      comboId: "c004",
      titulo: "Solitario",
      precio: 2.50,
      descripcion: "Este combo es la mejor ocpion si disfrutas de un tiempo a solas.",
      img: ["combo04.png", ""]
    }, {
      comboId: "c005",
      titulo: "Nachos",
      precio: 1.99,
      descripcion: "Siempre se antojan unos ricos nachos, y estos son deliciosos.",
      img: ["combo05.png", ""]
    }
  ]
};

function loadFood() {
  window.addEventListener('load', () => {
    for (const [data, field] of [
      [alimentos.combos, document.tool.get('#combos')],
      [alimentos.productos, document.tool.get('#productos')]
    ]) {
      document.tool.filter({
        data
      }).forEach(dt => {
        let id = (!!dt.productoId) ? dt.productoId : dt.comboId;
        let { titulo, precio, descripcion, img: imagen } = dt;

        let div = document.createElement('div');

        div.appendChild(Object.assign(document.createElement('h3'), { innerText: titulo }));
        //div.appendChild(Object.assign());
        div.appendChild(Object.assign(document.createElement('img'), { src: `../data/alimentos/${imagen[0]}`, alt: imagen[1] }));
        div.appendChild(Object.assign(document.createElement('span'), { innerText: descripcion }));

        field.appendChild(div);
      });
    }
  });
}
