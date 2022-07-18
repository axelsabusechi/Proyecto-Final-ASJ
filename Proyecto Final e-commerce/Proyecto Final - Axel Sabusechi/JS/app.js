
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTalles = document.getElementById('selecTalles');

selecTalles.addEventListener('change',()=>{
    if(selecTalles.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(elemento => elemento.talle == selecTalles.value))
    }
})

mostrarProductos(stockProductos);

function mostrarProductos(array){
    contenedorProductos.innerHTML= "";
    for (const producto of array) {
        let div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML += `<div class="card">
                            <div class="card-image">
                                <img src=${producto.img}>
                                <span class="card-title">${producto.nombre}</span>
                                <a id="botonAgregar${producto.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                            </div>
                            <div class="card-content">
                                <p>${producto.desc}</p>
                                <p>Talle: ${producto.talle}</p>
                                <p> $${producto.precio}</p>
                            </div>
                        </div> `
                        
        contenedorProductos.appendChild(div);

        let btnAgregar = document.getElementById(`botonAgregar${producto.id}`)
        
        btnAgregar.addEventListener('click',()=>{
           agregarAlCarrito(producto.id)
        })

    }
}

function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(buscar => buscar.id == id)
    if(repetido){
        repetido.cantidad = repetido.cantidad + 1

        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad:${repetido.cantidad}</p>`

        actualizarCarrito()
    }
    else{
        let productoAgregar = stockProductos.find(elemento => elemento.id == id)
        console.log(productoAgregar)
        carritoDeCompras.push(productoAgregar)
        actualizarCarrito()

        let div = document.createElement('div')
        div.className = 'productoEnCarrito'
        div.innerHTML = `
                        <p>${productoAgregar.nombre}</p>
                        <p>Precio: $${productoAgregar.precio}</p>
                        <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>
                        <button id="btnEleminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                        `

    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`btnEleminar${productoAgregar.id}`)
        
    btnEliminar.addEventListener('click',()=>{
        if(productoAgregar.cantidad == 1){
            btnEliminar.parentElement.remove()
            console.log(productoAgregar.id)
            carritoDeCompras = carritoDeCompras.filter(item => item.id != productoAgregar.id)
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        }else{
            productoAgregar.cantidad = productoAgregar.cantidad - 1

            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>`

            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        }
        
   })

    }
    
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
}

function  actualizarCarrito (){                                   
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}


function recuperar() {
   let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
   console.log(recuperarLS)

   if(recuperarLS){
     recuperarLS.forEach(element => {
        agregarAlCarrito(element.id)
    });
  
   }
    
}

recuperar()
