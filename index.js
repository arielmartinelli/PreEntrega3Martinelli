window.addEventListener('scroll', function () {
    let whatsappContainer = document.getElementById('whatsapp-container');

    if (window.scrollY > 700) {
        whatsappContainer.style.display = 'block';
    } else {
        whatsappContainer.style.display = 'none';
    }
});


document.getElementById('monto').addEventListener('input', function () {
    document.getElementById('montoSeleccionado').innerText = `Monto Seleccionado: $${this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
});

function calcularInversion() {
    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);

    const resultados = {};

    const interesPlazoFijo = 0.025; 
    const interesDolares = 0.1; 
    const interesMercadoPago = 0.02; 

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

        const gananciaAnual = gananciaMensual * 12;
        const gananciaMensualTotal = gananciaMensual * plazo;

        resultados[opc] = {
            gananciaMensual: gananciaMensual.toFixed(2),
            gananciaAnual: gananciaAnual.toFixed(2),
            gananciaMensualTotal: gananciaMensualTotal.toFixed(2)
        };
    });

    const mejorOpcion = compararResultados(resultados);

    Swal.fire({
        title: 'Resultados de Todas las Inversiones',
        html: Object.keys(resultados).map(opc => `<b>${opc}:</b><br>
            Ganancia Mensual: $${resultados[opc].gananciaMensual}<br>
            Ganancia Anual: $${resultados[opc].gananciaAnual}<br>
            Ganancia Total (${plazo} meses): $${resultados[opc].gananciaMensualTotal}<br><br>`).join(''),
        icon: 'info'
    }).then(() => {
        Swal.fire({
            title: 'Mejor Opción de Inversión',
            text: `La mejor opción de inversión es ${mejorOpcion}.`,
            icon: 'success'
        }).then(() => {
            Swal.fire({
                title: 'Recomendaciones',
                html: 'Considera explorar otras opciones de inversión como acciones, bonos, letras, entre otras.',
                icon: 'info'
            });
        });
    });
}

function compararResultados(resultados) {
    const mejorOpcion = Object.keys(resultados).reduce((a, b) => parseFloat(resultados[a].gananciaMensualTotal) > parseFloat(resultados[b].gananciaMensualTotal) ? a : b);

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
    const interes = parseFloat(document.getElementById('interes').value) / 100; 
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



function calcularCompra() {
    const valorProducto = parseFloat(document.getElementById('valorProducto').value);
    const cuotas = parseFloat(document.getElementById('meses').value);
    const interesCuota = parseFloat(document.getElementById('interesCuota').value);

    const meses = cuotas;
    const inflacionMensual = 8.3; 
    const indiceInflacion = inflacionMensual * meses / 100;
    const inflacionTotal = 1 + indiceInflacion;

    let valorFinalCuotas = 0;

    switch (cuotas) {
        case 1:
            valorFinalCuotas = valorProducto * (1 + interesCuota / 100);
            break;
        case 3:
        case 6:
        case 9:
        case 12:
            valorFinalCuotas = valorProducto * (1 + interesCuota / 100);
            break;
        default:
            break;
    }

    const valorFinalInflacion = valorProducto * inflacionTotal;
    const valorCuota = valorFinalCuotas / meses


    Swal.fire({
        title: 'Detalles de la Compra',
        html: `Valor Contado: $${valorProducto.toFixed(2)}<br>
                Valor con financiamiento: $${valorFinalCuotas.toFixed(2)}<br>
                Valor de la cuota: $${valorCuota.toFixed(2)}<br>
                Valor final tomando la inflacion en los proximos ${meses} meses: $${valorFinalInflacion.toFixed(2)}`,
        icon: 'info'
    }).then(() => {
        let recomendacion = '';
        if (valorFinalCuotas <= valorFinalInflacion) {
            recomendacion = 'Recomendación: Comprar con financiamineto';
        } else {
            recomendacion = 'Recomendación: Comprar de contado considerando la inflación acumulada';
        }

        Swal.fire({
            title: 'Recomendación',
            text: recomendacion,
            icon: 'info'
        });
    });
}