
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
    //hice una tabla temporal de mientras el encargado del css hacia lo suyo, para ir viendo mas o menos como funionaría
    var TablaDatos = "<table border='1'>";
    TablaDatos += "<tr><th>Lista de Alumnos</th><th>Eliminar</th></tr>";

    for (var i = 0; i < nombres.length; i++) { // Bucle para recorrer el array
        //Raya, aqui puse una clase para que en el css se ponga el pointer que se exige en el documento
        //Cambiala si quieres, modificala a tu gusto
        TablaDatos += "<tr class='FilaTabla'><td>"+( i + 1)+ " " + nombres[i] + "</td>";
        //Aqui puse el boton para eliminar, por si tambien lo quieres cambiar
        TablaDatos += '<td><input type="button" value="Eliminar" onclick="EliminarNombre(' + i + ')"></td></tr>'; 
    }
    TablaDatos += "<tr><td><strong>Total de Alumnos:</strong></td><td>" + nombres.length + "</td><td></td></tr>";
    TablaDatos += "</table>";

    document.getElementById('tabla').innerHTML = TablaDatos; 
}
