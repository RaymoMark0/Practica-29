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
    TablaDatos += "<tr><th class='lista'>Número</th><th class='lista'>Nombre de Alumno</th><th class='lista'>Opciones</th></tr>";

    for (var i = 0; i < nombres.length; i++) { // Bucle para recorrer el array
        TablaDatos += "<tr><td>"+(i + 1)+"</td> <td onclick='Seleccionar(" + i + ")'>"+ nombres[i] +"</td><td><input type='button' class='boton2' value='Eliminar' onclick='EliminarNombre(" + i + ")'><input type='button' class='boton2' value='Información' onclick='info(" + i + ")'><input type='button' class='botonrev' value='Reverse' onclick='reverse(" + i + ")'></td></tr>";
    }
    TablaDatos += "<tr><td><strong>Total de Alumnos:</strong>" + " "+ nombres.length + "</td></tr>";

    // Esto son las estadisticas de los nombres
    var totalLetras = 0;
    var minLetras = nombres[0].length;
    var maxLetras = nombres[0].length;

    for (var i = 0; i < nombres.length; i++) {
        var longitud = nombres[i].length;
        totalLetras += longitud;

        if (longitud < minLetras) {
            minLetras = longitud;
        }
        if (longitud > maxLetras) {
            maxLetras = longitud;
        }
    }

    var PromedioLongitudNombres = (totalLetras / nombres.length).toFixed(2);

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
