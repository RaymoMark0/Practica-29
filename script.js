
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
// Función para crear la tabla
function CrearTabla() {
    //hice una tabla temporal de mientras el encargado del css hacia lo suyo, para ir viendo mas o menos como funionaría
    var TablaDatos = "<table border='1'>";
    TablaDatos += "<tr><th>Lista de Alumnos</th></tr>";

    for (var i = 0; i < nombres.length; i++) { // Bucle para recorrer el array
        //Raya, aqui puse una clase para que en el css se ponga el pointer que se exige en el documento
        //Cambiala si quieres, modificala a tu gusto
        TablaDatos += "<tr class='FilaTabla'><td>" + nombres[i] + "</td></tr>"; 
    }

    TablaDatos += "</table>";

    document.getElementById('tabla').innerHTML = TablaDatos; 
}
