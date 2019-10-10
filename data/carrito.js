window.onload = function () {
            // Variables
            let baseDeDatos= [
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
            ]
            let $items = document.querySelector('#items');
            let carrito = [];
            let total = 0;
            let $carrito = document.querySelector('#carrito');
            let $total = document.querySelector('#total');
            // Funciones
            function renderItems () {
                for (let info of baseDeDatos) {
                    // Estructura
                    let miNodo = document.createElement('div');
                    // Body
                    let miNodoCardBody = document.createElement('div');
                    // Titulo
                    let miNodoTitle = document.createElement('h5');
                    miNodoTitle.textContent = info['titulo'];
                    // descripcion
                    let miNodoDesc = document.createElement('p');
                    miNodoDesc.textContent = info['descripcion'];
                    // Precio
                    let miNodoPrecio = document.createElement('p');
                    miNodoPrecio.textContent = info['precio'] + '$';
                    // Boton
                    let miNodoBoton = document.createElement('button');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', info['productoId']);
                    miNodoBoton.addEventListener('click', anyadirCarrito);
                    // Insertamos
                    miNodoCardBody.appendChild(miNodoTitle);
                    miNodoCardBody.appendChild(miNodoDesc);
                    miNodoCardBody.appendChild(miNodoPrecio);
                    miNodoCardBody.appendChild(miNodoBoton);
                    miNodo.appendChild(miNodoCardBody);
                    $items.appendChild(miNodo);
                }
            }
            function obtener_localstorage() {
              let carrito=[];
              carrito.push(localStorage.getItem("carrito"));
              for(let w=0;w<=carrito.length;w++){
                console.log(carrito[w]);
              }

            }

            function anyadirCarrito () {
                // Anyadimos el Nodo a nuestro carrito
                carrito.push(this.getAttribute('marcador'))
                // Calculo el total
                calcularTotal();
                // Renderizamos el carrito
                obtener_localstorage();
                renderizarCarrito();

            }

            function renderizarCarrito () {
                // Vaciamos todo el html
                $carrito.textContent = '';
                // Generamos los Nodos a partir de carrito
                carrito.forEach(function (item, indice) {
                    // Obtenemos el item que necesitamos de la variable base de datos
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['productoId'] == item;
                    });
                    // Creamos el nodo del item del carrito
                    let miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right');
                    miNodo.textContent = `${miItem[0]['titulo']} - ${miItem[0]['precio']}$`;
                    localStorage.setItem('carrito',miNodo.textContent);
                    // Boton de borrar
                    let miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.setAttribute('posicion', indice);
                    miBoton.addEventListener('click', borrarItemCarrito);
                    // Mezclamos nodos
                    miNodo.appendChild(miBoton);
                    $carrito.appendChild(miNodo);
                })
            }

            function borrarItemCarrito () {
                // Obtenemos la posicion que hay en el boton pulsado
                let posicion = this.getAttribute('posicion');
                // Borramos la posicion que nos interesa
                carrito.splice(posicion, 1);
                // volvemos a renderizar
                renderizarCarrito();
                // Calculamos de nuevo el precio
                calcularTotal();
            }

            function calcularTotal () {
                // Limpiamos precio anterior
                total = 0;
                // Recorremos el array del carrito
                for (let item of carrito) {
                    // De cada elemento obtenemos su precio
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['productoId'] == item;
                    });
                    total = total + miItem[0]['precio'];
                }
                // Formateamos el total para que solo tenga dos decimales
                let totalDosDecimales = total.toFixed(2);
                // Renderizamos el precio en el HTML
                $total.textContent = totalDosDecimales;
            }
            // Eventos

            // Inicio
            renderItems();
        }
