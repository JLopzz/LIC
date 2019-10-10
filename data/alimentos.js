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
      descripcion: "Deliciosas palomitas caramelizadas para compartir.",
      img: ["producto02.jpg", ""]
    },
    {
      productoId: "pr003",
      titulo: "Pizza",
      precio: 2.99,
      descripcion: "Pizzas personales muy deliciosas, quedarás satisfecho.",
      img: ["producto03.png", ""]
    },
    {
      productoId: "pr004",
      titulo: "Papas",
      precio: 1.00,
      descripcion: "Las papas fritas son el mejor complemento ligero y salado para saciar el hambre.",
      img: ["producto04.png", ""]
    },
    {
      productoId: "pr005",
      titulo: "Café",
      precio: 1.50,
      descripcion: "Desde expresos, hasta amaretos, prueba nuestros ricos cafes.",
      img: ["producto05.png", ""]
    },
    {
      productoId: "pr006",
      titulo: "Chocolates",
      precio: 1.50,
      descripcion: "Nada como el chocolate para disfrutar de una buena película.",
      img: ["producto06.png", ""]
    },
    {
      productoId: "pr007",
      titulo: "Crepas",
      precio: 2.00,
      descripcion: "Prueba ya nuestras nuevas crepas, especialidades variadas.",
      img: ["producto07.png", ""]
    },
    {
      productoId: "pr008",
      titulo: "Smoothies",
      precio: 1.75,
      descripcion: "La bebida que necesitas para refrescar tu día y tu ánimo.",
      img: ["producto08.png", ""]
    },
    {
      productoId: "pr009",
      titulo: "Helados",
      precio: 1.00,
      descripcion: "Nuestros helados son los mejores, no te quedes sin probarlos. Porción de 12 oz.",
      img: ["producto09.jpg", ""]
    },
    {
      productoId: "pr010",
      titulo: "Paleta",
      precio: 0.75,
      descripcion: "Si tienes ganas de algo dulce y rico, dale una oportunidad a nuestras deliciosas paletas.",
      img: ["producto10.jpg", ""]
    },
    {
      productoId: "pr011",
      titulo: "Cheese cake",
      precio: 2.00,
      descripcion: "Porción de nuestra deliciosa seleccion de pasteles de queso.",
      img: ["producto11.png", ""]
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
let carrito = []
function loadFood() {
  window.addEventListener('load', () => {
    for (const [data, field] of [
      [alimentos.combos, document.tool.get('#combos')],
      [alimentos.productos, document.tool.get('#productos')]
    ]) {
      document.tool.filter({
        data, quantity: 20
      }).forEach(dt => {
        let id = (!!dt.productoId) ? dt.productoId : dt.comboId;
        let { titulo, precio, descripcion, img: imagen } = dt;

        let div = document.createElement('div');
        let BotonAgregar = document.createElement('button');
        BotonAgregar.textContent = '+';
        BotonAgregar.setAttribute('marcador', id);
        BotonAgregar.addEventListener('click', anyadirCarrito);

        div.appendChild(Object.assign(document.createElement('h3'), { innerText: titulo }));
        //div.appendChild(Object.assign());
        div.appendChild(Object.assign(document.createElement('img'), { src: `../data/alimentos/${imagen[0]}`, alt: imagen[1] }));
        div.appendChild(Object.assign(document.createElement('span'), { innerText: descripcion }));
        div.appendChild(BotonAgregar);
        
        let infoProducto={
          Imagen : imagen,
          Titulo: titulo,
          Precio: precio,
          Id: id,
          Cantidad: 1
      }

        field.appendChild(div);
        function anyadirCarrito () {
             let productosLS;
        productosLS = obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.Id === infoProducto.Id){
                productosLS = productoLS.Id;
            }
        });

        if(productosLS === infoProducto.Id){
          alert('El producto ya está agregado');
        }
        else {
            // Anyadimos el Nodo a nuestro carrito
            carrito.push(infoProducto);
            localStorage.setItem('carrito',JSON.stringify(carrito));
              }
        }
        
        function obtenerProductosLocalStorage(){
          let productoLS;
  
          //Comprobar si hay algo en LS
          if(localStorage.getItem('carrito') === null){
              productoLS = [];
          }
          else {
              productoLS = JSON.parse(localStorage.getItem('carrito'));
          }
          return productoLS;
      }
        
      });
    }
  });

}
