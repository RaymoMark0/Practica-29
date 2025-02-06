
var nombres = [];
var NombreSeleccionado = "";

//Añade el nombre a la lista de nombres
function GuardarNombre() {
    var nombre = document.getElementById('nombres').value;

    if (nombre) {
        nombres.push(nombre);
        CrearTabla();
        document.getElementById('nombres').value = ""; 
    } else{
        document.getElementById('mensaje').innerHTML = "Introduce un nombre válido";
    }
}

//Función para eliminar el nombre del array
function EliminarNombre(indice) {
    nombres.splice(indice, 1);
    CrearTabla(); 
}

//Función para seleccionar un nombre
function Seleccionar(indice){
    document.getElementById('nombres').value = nombres[indice];
    NombreSeleccionado = indice;
    //Cambio de botones
    document.getElementById('guardar').style.display = 'none';
    document.getElementById('editar').style.display = 'inline-block';
    document.getElementById('cancelar').style.display = 'inline-block';
}

//Función para editar el nombre seleccionado
function EditarNombre(){
    var NombreNuevo = document.getElementById('nombres').value;

    if (NombreNuevo && NombreSeleccionado !==""){
        nombres[NombreSeleccionado] = NombreNuevo;
        CrearTabla();
        Cancelar();
    } else{ document.getElementById('mensaje').innerHTML = "Introduce un nombre válido.";

    }
}

//Función para cancelar la edición
function Cancelar(){
    document.getElementById('nombres').value = "";
    NombreSeleccionado = "";

    //Restablece los botones por defecto
    document.getElementById('guardar').style.display = 'inline-block';
    document.getElementById('editar').style.display = 'none';
    document.getElementById('cancelar').style.display = 'none';
}


// Función para crear la tabla
function CrearTabla() {
    document.getElementById('mensaje').innerHTML =""
    var TablaDatos = "<table>";
    TablaDatos += "<tr><th class='lista'>Lista de Alumnos</th></tr>";

    for (var i = 0; i < nombres.length; i++) { // Bucle para recorrer el array
        TablaDatos += "<tr onclick='Seleccionar(" + i + ")'><td>" + (i + 1) + " - " + nombres[i] +"<input type='button' class='Eliminar' value='Eliminar' onclick='EliminarNombre(" + i + ")'></td></tr>";   
    }
    TablaDatos += "<tr><td><strong>Total de Alumnos:</strong></td><td>" + nombres.length + "</td></tr>";
    TablaDatos += "</table>";

    document.getElementById('tabla').innerHTML = TablaDatos; 
}
