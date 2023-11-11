const producto = [];

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
}

window.onload = updatelistaProducto;
