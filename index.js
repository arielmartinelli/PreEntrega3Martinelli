const producto = JSON.parse(localStorage.getItem('listaProductos')) || [];

function agregarProducto() {
    const input = document.getElementById('input');
    const nombreProducto = input.value.trim();

    if (nombreProducto !== '') {
        const item = {
            nombre: nombreProducto,
            comprado: false
        };

        producto.push(item);

        input.value = '';

        updatelistaProducto();
        guardarListaEnStorage();
    }
}

function updatelistaProducto() {
    const listaProducto = document.getElementById('listaProducto');
    listaProducto.innerHTML = '';

    producto.forEach((item, index) => {
        const listado = document.createElement('li');
        listado.textContent = `${index + 1}) ${item.nombre} - ${item.comprado ? 'Comprado ✔' : 'Pendiente'}`;
        listado.style.color = item.comprado ? 'green' : 'black';

        listado.addEventListener('click', () => {
            toggleTask(index);
        });

        listaProducto.appendChild(listado);
    });
}

function toggleTask(index) {
    producto[index].comprado = !producto[index].comprado;
    updatelistaProducto();

    guardarListaEnStorage();
}

function guardarListaEnStorage() {
    localStorage.setItem('listaProductos', JSON.stringify(producto));
}

function borrarLista() {
    const confirmacion = confirm('¿Estás seguro de que deseas borrar la lista de compras?');

    if (confirmacion) {
        producto.length = 0;
        updatelistaProducto();

        
        guardarL
guardarListaEnStorage();
    }
}

window.onload = updatelistaProducto;


document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        agregarProducto();
    }
});
