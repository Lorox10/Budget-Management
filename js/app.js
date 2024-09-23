const ingresos = [
new Ingreso('Ventas',3500),
new Ingreso('desarrollador',2000000)
];

const egresos = [
new Egreso('Renta de vivienda',1200000),
new Egreso('EPM',275000)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
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


const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML =`
     <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${ingreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                    <div class="elemento_eliminar"></div>
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="trash-outline"
                            onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso =(id) =>{
let indiceEliminar = ingresos.findIndex(ingreso=>ingreso.id === id);
ingresos.splice(indiceEliminar,1);
cargarCabecero();
cargarIngresos();
}

const cargarEgresos = () =>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) =>{
let egresoHTML = `
<div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${egreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                    <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                    <div class="elemento_eliminar"></div>
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="trash-outline"
                            onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
`;
return egresoHTML;
}

const eliminarEgreso = (id) =>{
    let indiceEliminar = egresos.findIndex(egreso=>egreso.id === id);
egresos.splice(indiceEliminar,1);
cargarCabecero();
cargarEgresos();
}

let agregarDato = () =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    if(descripcion.value !== "" && valor.value !== ""){
        if (tipo.value ==="ingreso"){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();

        }
        else if(tipo.value ==="egreso"){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }
       
}



