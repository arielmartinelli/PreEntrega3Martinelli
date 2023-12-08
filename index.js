document.getElementById('monto').addEventListener('input', function () {
    // Actualizamos el valor del span para mostrar el monto seleccionado
    document.getElementById('montoSeleccionado').innerText = `Monto Seleccionado: $${this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
});

function calcularInversion() {
    const monto = parseFloat(document.getElementById('monto').value);

    const resultados = {};
    
    const opciones = ['Plazo fijo', 'Dolares', 'Acciones', 'Mercado Pago', 'Bonos'];
    opciones.forEach(opc => {
        let gananciaMensual = 0;

        switch (opc) {
            case 'Plazo fijo':
                gananciaMensual = monto * 0.02;
                break;
            case 'Dolares':
                gananciaMensual = monto * 0.01;
                break;
            case 'Acciones':
                gananciaMensual = monto * 0.03;
                break;
            case 'Mercado Pago':
                gananciaMensual = monto * 0.015;
                break;
            case 'Bonos':
                gananciaMensual = monto * 0.025;
                break;
            default:
                break;
        }

        // Calculamos la ganancia anual
        const gananciaAnual = gananciaMensual * 12;

        // Almacenamos los resultados en el objeto 'resultados'
        resultados[opc] = {
            gananciaMensual: gananciaMensual.toFixed(2),
            gananciaAnual: gananciaAnual.toFixed(2)
        };
    });

    const mejorOpcion = Object.keys(resultados).reduce((a, b) => resultados[a].gananciaAnual > resultados[b].gananciaAnual ? a : b);

    Swal.fire({
        title: 'Resultados de Todas las Inversiones',
        html: Object.keys(resultados).map(opc => `<b>${opc}:</b><br>
            Ganancia Mensual: $${resultados[opc].gananciaMensual}<br>
            Ganancia Anual: $${resultados[opc].gananciaAnual}<br><br>`).join(''),
        icon: 'info'
    }).then(() => {
        Swal.fire({
            title: 'Mejor Opción de Inversión',
            text: `La mejor opción de inversión es Acciones.`,
            icon: 'success'
        });
    });
}
