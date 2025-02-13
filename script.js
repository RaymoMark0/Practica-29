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

    var estadisticas = obtenerEstadisticas();
    
    var totalLetras = estadisticas[0];
    var minLetras = estadisticas[1];
    var maxLetras = estadisticas[2];
    var PromedioLongitudNombres = estadisticas[3];


    var TablaDatos = "<table>";
    TablaDatos += "<tr><th class='lista'>Número</th><th class='lista'>Nombre de Alumno</th><th class='lista'>Opciones</th></tr>";

    for (var i = 0; i < nombres.length; i++) { // Bucle para recorrer el array
        TablaDatos += "<tr><td>"+(i + 1)+"</td> <td onclick='Seleccionar(" + i + ")'>"+ nombres[i] +"</td><td><input type='button' class='boton2' value='Eliminar' onclick='EliminarNombre(" + i + ")'><input type='button' class='boton2' value='Información' onclick='info(" + i + ")'><input type='button' class='botonrev' value='Reverse' onclick='reverse(" + i + ")'></td></tr>";
    }
    TablaDatos += "<tr><td><strong>Total de Alumnos:</strong>" + " "+ nombres.length + "</td></tr>";

    //Añadir las estadisticas al final
    TablaDatos += "<tr><td colspan='3'><strong>Promedio de longitud:</strong> " + PromedioLongitudNombres + " letras</td></tr><tr><td colspan='3'><strong>Nombre más corto:</strong> " + minLetras + " letras</td></tr><tr><td colspan='3'><strong>Nombre más largo:</strong> " + maxLetras + " letras</td></tr></table>";

    document.getElementById('tabla').innerHTML = TablaDatos; 

}

//Función cambiar el tema a modo oscuro
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

//Función para activar el botón de guardar al darle al intro
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nombres").addEventListener("keypress", function(event) {
        if (event.key === "Enter") { 
            event.preventDefault(); 
            document.getElementById("guardar").click();
        }
    });
});

function reverse(indice) {
    nombres[indice] = nombres[indice].split("").reverse().join(""); 
    
    CrearTabla();

    /*var botones = document.getElementsByClassName("botonrev");
    
    if (botones[indice]) {
        if (botones[indice].value === "Reverse") {
            botones[indice].value = "Normal";
        } else {
            botones[indice].value = "Reverse";
        }
    }*/
}

function obtenerEstadisticas() {
    var totalLetras = 0;
    var minLetras = nombres[0].length; // Suponemos que el primer nombre es el más corto inicialmente
    var maxLetras = nombres[0].length; // Igualmente, el primer nombre es el más largo al principio

    // Recorrer todos los nombres para calcular las estadísticas
    for (var i = 0; i < nombres.length; i++) {
        var longitud = nombres[i].length;
        totalLetras += longitud;

        // Verificar el nombre más corto
        if (longitud < minLetras) {
            minLetras = longitud;
        }

        // Verificar el nombre más largo
        if (longitud > maxLetras) {
            maxLetras = longitud;
        }
    }

    // Calcular el promedio de la longitud de los nombres
    var PromedioLongitudNombres = (totalLetras / nombres.length).toFixed(2);

    // Retornar un array con las estadísticas
    return [totalLetras, minLetras, maxLetras, PromedioLongitudNombres];
}

function info(indice){

    // Nombre y su longitud
    var nombreSeleccionado = nombres[indice];
    var longitudNombre = nombreSeleccionado.length;

    // Llama a la funcion para obtener la estadisticas
    var estadisticas = obtenerEstadisticas();

    //Pilla los datos de la funcion
    var totalLetras = estadisticas[0];
    var minLetras = estadisticas[1];
    var maxLetras = estadisticas[2];
    var PromedioLongitudNombres = estadisticas[3];
    var numVocales = contarVocales(nombreSeleccionado);

    // Hace una comparacion del nombre seleccionado con el promedio, determina si es el mas corto, el mas largo o esta en el promedio
    var comparacionPromedio = "Está en el promedio";
    if (longitudNombre < PromedioLongitudNombres) {
        comparacionPromedio = "Por debajo del promedio";
    } else if (longitudNombre > PromedioLongitudNombres) {
        comparacionPromedio = "Por encima del promedio";
    }

    // Comparar si el nombre seleccionado es el más corto o el más largo
    var tipoNombre = "No es el más largo ni el más corto";
    if (longitudNombre === minLetras) {
        tipoNombre = "Nombre más corto";
    } else if (longitudNombre === maxLetras) {
        tipoNombre = "Nombre más largo";
    }

    var infoDetalles = "";
    infoDetalles += "<p><strong>Información</strong></p>"+ "<p><strong>Nombre: </strong> "+ nombreSeleccionado + "</p> <p><strong>Longitud del nombre: </strong> " + longitudNombre + " letras</p>";
    infoDetalles += "<p><strong>Comparación con el promedio: </strong> " + comparacionPromedio + "</p><p><strong>Tipo de nombre: </strong> " + tipoNombre + "</p> <p><strong>Número de vocales: </strong> " + numVocales + "</p>";

    document.getElementById('DatosNombre').innerHTML = infoDetalles;

}

function contarVocales(nombre) {
    var vocales = "aeiouAEIOU"; 
    var contador = 0;
    
    // Recorremos cada letra del nombre
    for (var i = 0; i < nombre.length; i++) {
        if (vocales.indexOf(nombre[i]) !== -1) { 
            contador++;
        }
    }

    return contador;
}

function BuscarNombre() {
    var nombreBuscado = document.getElementById("buscarNombre").value.toLowerCase();
    var contador = 0;

    if (nombreBuscado === "") {
        document.getElementById("mensaje").innerHTML = "Por favor, ingrese un nombre para buscar.";
        return;
    }

    for (var i = 0; i < nombres.length; i++) {
        if (nombres[i].toLowerCase() === nombreBuscado) {
            contador++;
        }
    }

    if (contador > 0) {
        document.getElementById("mensaje").innerHTML = "El nombre '" + nombreBuscado + "' aparece " + contador + " veces.";
    } else {
        document.getElementById("mensaje").innerHTML = "El nombre '" + nombreBuscado + "' no se encuentra en la lista.";
    }
}

function ReemplazarNombre() {
    var nombreBuscado = document.getElementById("buscarNombre").value.toLowerCase();
    var nombreNuevo = document.getElementById("reemplazarNombre").value;

    if (nombreBuscado === "" || nombreNuevo === "") {
        document.getElementById("mensaje").innerHTML = "Por favor, ingrese el nombre a buscar y el nuevo nombre.";
        return;
    }

    var cambios = 0;

    // Se recorre la lista para buscar el nombre que se quiere reemplazar
    for (var i = 0; i < nombres.length; i++) {
        if (nombres[i].toLowerCase() === nombreBuscado) {
            nombres[i] = nombreNuevo;
            cambios++;
        }
    }

    if (cambios > 0) {
        document.getElementById("mensaje").innerHTML = "Se reemplazaron " + cambios + " coincidencias de '" + nombreBuscado + "' por '" + nombreNuevo + "'.";
        CrearTabla();
    } else {
        document.getElementById("mensaje").innerHTML = "No hay coincidencias'" + nombreBuscado + "'.";
    }
}



