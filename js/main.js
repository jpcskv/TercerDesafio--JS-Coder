// DISCOS

const productos = [
    // ROCK
    {
        id: "rock-01",
        titulo: "Iron Maiden",
        imagen: "./img/rock-01.webp",
        categoria: {
            nombre: "Rock",
            id: "rock"
        },
        precio: 99
    },
    {
        id: "rock-02",
        titulo: "Metallica",
        imagen: "./img/rock-02.webp",
        categoria: {
            nombre: "Rock",
            id: "rock"
        },
        precio: 75
    },
    {
        id: "rock-03",
        titulo: "Black Sabbath",
        imagen: "./img/rock-03.webp",
        categoria: {
            nombre: "Rock",
            id: "rock"
        },
        precio: 73
    },
    {
        id: "rock-04",
        titulo: "Red Hot Chili Peppers",
        imagen: "./img/rock-04.webp",
        categoria: {
            nombre: "Rock",
            id: "rock"
        },
        precio: 70
    },
    // RAP
    {
        id: "rap-01",
        titulo: "Childish Gambino",
        imagen: "./img/rap-01.webp",
        categoria: {
            nombre: "Rap",
            id: "rap"
        },
        precio: 13
    },
    {
        id: "rap-02",
        titulo: "Rayden",
        imagen: "./img/rap-02.webp",
        categoria: {
            nombre: "Rap",
            id: "rap"
        },
        precio: 12
    },
    {
        id: "rap-03",
        titulo: "Kendrick Lamar",
        imagen: "./img/rap-03.webp",
        categoria: {
            nombre: "RAP",
            id: "rap"
        },
        precio: 23
    },
    {
        id: "rap-04",
        titulo: "The Notorious Big",
        imagen: "./img/rap-04.webp",
        categoria: {
            nombre: "Rap",
            id: "rap"
        },
        precio: 14
    },
    // POP
    {
        id: "pop-01",
        titulo: "Amaia",
        imagen: "./img/pop-01.webp",
        categoria: {
            nombre: "Pop",
            id: "pop"
        },
        precio: 75
    },
    {
        id: "pop-02",
        titulo: "Michael Jackson",
        imagen: "./img/pop-02.webp",
        categoria: {
            nombre: "Pop",
            id: "pop"
        },
        precio: 10
    },
    {
        id: "pop-03",
        titulo: "La oreja de Vangogh",
        imagen: "./img/pop-03.webp",
        categoria: {
            nombre: "Pop",
            id: "pop"
        },
        precio: 77
    },
    {
        id: "pop-04",
        titulo: "Lola Indigo",
        imagen: "./img/pop-04.webp",
        categoria: {
            nombre: "Pop",
            id: "pop"
        },
        precio: 85
    },
    // URBANA
    {
        id: "urbana-01",
        titulo: "Rosalia",
        imagen: "./img/urb-01.webp",
        categoria: {
            nombre: "Urbana",
            id: "urbana"
        },
        precio: 31
    },
    {
        id: "urbana-02",
        titulo: "Rigoberta Bandini",
        imagen: "./img/urb-02.webp",
        categoria: {
            nombre: "Urbana",
            id: "urbana"
        },
        precio: 16
    },
    {
        id: "urbana-03",
        titulo: "Nathy Peluso",
        imagen: "./img/urb-03.webp",
        categoria: {
            nombre: "Urbana",
            id: "urbana"
        },
        precio: 65
    },
    {
        id: "urbana-04",
        titulo: "Rauw Alejandro",
        imagen: "./img/urb-04.webp",
        categoria: {
            nombre: "Urbana",
            id: "urbana"
        },
        precio: 12
    },   
]

// VARIABLES

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
let slideIndex = 0;


// FUNCIONES

// funcion para crear los productos
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles"> 
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="button producto-agregar" id="${producto.id}">
                <span class="button_lg">
                    <span class="button_sl"></span>
                    <span class="button_text">Agregar</span>
                </span>
                </button>
            </div>
            
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}
// funcion para agregar productos con el boton AGREGAR
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Funcion para que los productos se agreguen al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++; 
    }
    else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// funcion para actualizar el numero del carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "todos") {
        const productoCategoria = productos.find(producto => producto.categoria.id=== e.currentTarget.id);
        tituloPrincipal.innerText = productoCategoria.categoria.nombre;
        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
    }
    else {
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos(productos);
    }
    })
});

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

showSlides();