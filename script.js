
var nombres = [];
//Añade el nombre a la lista de nombres
function GuardarNombre() {
    var nombre = document.getElementById('nombres').value;

    if (nombre) {
        nombres.push(nombre);
        CrearTabla();
        document.getElementById('nombres').value = ""; // Limpia el input al pulsar "guardar"
    } else{
        document.getElementById('mensaje').innerHTML = "Introduce un nombre válido";
    }
}

//Función para eliminar el nombre del array
function EliminarNombre(indice) {
    nombres.splice(indice, 1);
    CrearTabla(); 
}

// Función para crear la tabla
function CrearTabla() {
    document.getElementById('mensaje').innerHTML =""
    var TablaDatos = "<table>";
    TablaDatos += "<tr><th>Lista de Alumnos</th><th>Eliminar</th></tr>";

    for (var i = 0; i < nombres.length; i++) { // Bucle para recorrer el array
        TablaDatos += "<tr><td>" + (i + 1) + " " + nombres[i] +" &nbsp; <input type='button' class='Eliminar' value='Eliminar' onclick='EliminarNombre(" + i + ")'></td></tr>";   
    }
    TablaDatos += "<tr><td><strong>Total de Alumnos:</strong></td><td>" + nombres.length + "</td></tr>";
    TablaDatos += "</table>";

    document.getElementById('tabla').innerHTML = TablaDatos; 
}
