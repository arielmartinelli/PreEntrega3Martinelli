document.getElementById('monto').addEventListener('input', function () {
    // Actualizamos el valor del span para mostrar el monto seleccionado
    document.getElementById('montoSeleccionado').innerText = `Monto Seleccionado: $${this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
});

function calcularInversion() {
    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);

    const resultados = {};

    // Datos de interés obtenidos de fuentes oficiales
    const interesPlazoFijo = 0.025; // 2.5%
    const interesDolares = 0.15; // Asumiendo la variación del último año
    const interesMercadoPago = 0.02; // 2%

    const opciones = ['Plazo Fijo', 'Dolares', 'Mercado Pago'];
    opciones.forEach(opc => {
        let gananciaMensual = 0;

        switch (opc) {
            case 'Plazo Fijo':
                gananciaMensual = monto * interesPlazoFijo;
                break;
            case 'Dolares':
                gananciaMensual = monto * interesDolares;
                break;
            case 'Mercado Pago':
                gananciaMensual = monto * interesMercadoPago;
                break;
        }

        // Calculamos la ganancia anual y mensual
        const gananciaAnual = gananciaMensual * 12;
        const gananciaMensualTotal = gananciaMensual * plazo;

        // Almacenamos los resultados en el objeto 'resultados'
        resultados[opc] = {
            gananciaMensual: gananciaMensual.toFixed(2),
            gananciaAnual: gananciaAnual.toFixed(2),
            gananciaMensualTotal: gananciaMensualTotal.toFixed(2)
        };
    });

    // Encontramos la opción con la mayor ganancia anual (la mejor opción)
    const mejorOpcion = compararResultados(resultados);

    // Mostramos todos los resultados y resaltamos la mejor opción
    Swal.fire({
        title: 'Resultados de Todas las Inversiones',
        html: Object.keys(resultados).map(opc => `<b>${opc}:</b><br>
            Ganancia Mensual: $${resultados[opc].gananciaMensual}<br>
            Ganancia Anual: $${resultados[opc].gananciaAnual}<br>
            Ganancia Mensual Total (${plazo} meses): $${resultados[opc].gananciaMensualTotal}<br><br>`).join(''),
        icon: 'info'
    }).then(() => {
        // Mostramos la recomendación de la mejor opción
        Swal.fire({
            title: 'Mejor Opción de Inversión',
            text: `La mejor opción de inversión es ${mejorOpcion}.`,
            icon: 'success'
        }).then(() => {
            // Mostramos alerta con recomendaciones adicionales
            Swal.fire({
                title: 'Recomendaciones',
                html: 'Considera explorar otras opciones de inversión como acciones, bonos, letras, entre otras.',
                icon: 'info'
            });
        });
    });
}

function compararResultados(resultados) {
    // Encontramos la opción con la mayor ganancia anual (la mejor opción)
    const mejorOpcion = Object.keys(resultados).reduce((a, b) => parseFloat(resultados[a].gananciaMensualTotal) > parseFloat(resultados[b].gananciaMensualTotal) ? a : b);

    // Mostramos un alert con la mejor opción
    Swal.fire({
        title: 'Comparación de Inversiones',
        text: `La mejor opción de inversión es ${mejorOpcion}.`,
        icon: 'success'
    });

    return mejorOpcion;
}

function calcularPrestamo() {
    const monto = parseFloat(document.getElementById('prestamo').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);
    const interes = parseFloat(document.getElementById('interes').value) / 100; // Convertir a porcentaje

    const totalPagar = monto * (1 + interes);
    const cuotaMensual = totalPagar / cuotas;

    Swal.fire({
        title: 'Detalles del Préstamo',
        html: `Monto Prestado: $${monto.toFixed(2)}<br>
                Total a Pagar: $${totalPagar.toFixed(2)}<br>
                Cuota Mensual: $${cuotaMensual.toFixed(2)}`,
        icon: 'info'
    });
}