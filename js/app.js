const ingresos = [
new Ingreso('Salario',2100.00),
new Ingreso('Ventas',1500)
];

const egresos = [
new Egreso('Renta de vivienda',900),
new Egreso('Ropa',400)
];

let cargarApp = ()=>{
    cargarCabecero();
}

let totalIngresos = () =>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

}

let formatoMoneda = (valor) => {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits:2});
}

let formatoPorcentaje = (valor) => {
    return valor.toFixed(2) + '%';
}