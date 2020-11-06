var myArrayObject = [];
var divState;

function init() {
    console.log("Carga de la página finalizada.");
    if (typeof(Storage) == "undefined") {
        alert("El navegador no tiene soporte para HTML5 y almacenamiento local.Se recomienda actualizarlo. ");
    } else {
        console.log("El navegador soporta tanto localStorage como sessionStorage. ");
        divState = document.getElementById("state");
    }
    divState = document.getElementById("state");
    if (typeof(localStorage) == "undefined") {
        divState.style.display = 'none';
    } else {
        divState.style.display = 'block';
    }
}

function save() {
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
	var mensa = document.getElementById("mensa");
    var msg;
    //Verificar si se puede utilizar localStorage en el navegador
    try {
        localStorage.setItem("name", myName.value);
        localStorage.setItem("age", age.value);
		localStorage.setItem("mensa", mensa.value);
        myName.value = "";
        age.value = "";
		mensa.value = "";
        msg = "Datos Enviados.";
        console.log(msg);
        //Mostrar al usuario mensaje de estado
        divState.innerHTML = "<p>" + msg + "</p>";
    } catch (e) {
        //Verificar si el límite de almacenamiento no se ha sobrepasado
        if (e >= QUOTA_EXCEEDED_ERR) {
            console.log("Error: Límite para almacenamiento local se ha alcanzado. ");
        } else {
            console.log("Error: Guardando en el almacenamiento local.");
        }
    }
}

function obtain() {
    var msg = "Obteniendo el dato " + localStorage.key(0) + " y " +
        localStorage.key(1) + " desde el localStorage.";
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
	  var mensa = document.getElementById("mensa");
    console.log(msg);
    divState.innerHTML = "<p>" + msg + "</p>";
    myName.value = localStorage.getItem("name");
    age.value = localStorage.getItem("age");
	mensa.value = localStorage.getItem("mensa");
}

function remove() {
    console.log("Removiendo dato del localStorage.");
    localStorage.removeItem("name");
    localStorage.removeItem("age");
	localStorage.removeItem("mensa");
}

function clearStorage() {
    divState.innerHTML = "";
    console.log("Borrando todo el contenido de localStorage.");
    localStorage.clear();
}

function saveComplexData() {
    console.log("Guardando datos complejos a localStorage.");
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
	var mensa = document.getElementById("mensa");
    var personObject = new Object();
    personObject.name = myName.value;
    personObject.age = age.value;
	 personObject.age = mensa.value;
    localStorage.setItem("person", JSON.stringify(personObject));
}

function restoreComplexData() {
    console.log("Restaurando datos complejos desde localStorage.");
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
	var mensa = document.getElementById("mensa");
    var personObject = JSON.parse(localStorage.getItem("person"));
    myName.value = personObject.name;
    age.value = personObject.age;
	 mensa.value = personObject.mensa;
    //Mostrar al usuario en el elemento DIV el contenido del objeto
    divState.innerHTML = "<p>Nombre: " + personObject.name + ", Edad: " + personObject.age + " ,Nombre: " + personObject.mensa + "</p>";
}

function saveArrayData() {
    var myName = document.getElementById("name");
    var myAge = document.getElementById("age");
	 var myMensa = document.getElementById("mensa");
    //Creando el arreglo con los datos
    var personObject1 = new Object();
    personObject1.name = myName.value;
    personObject1.age = parseInt(myAge.value);
	personObject1.mensa = myMensa.value;
    myArrayObject.push(personObject1);
    console.log("Guardando arreglo de datos en localStorage.");
    localStorage.setItem("persons", JSON.stringify(myArrayObject));
}

function restoreArrayData() {
    divState.innerHTML = "";
    console.log("Restaurando arreglo de datos desde localStorage.");
    var myArrayObject = JSON.parse(localStorage.getItem("persons"));
    for (var i = 0; i < myArrayObject.length; i++) {
        var personObject = myArrayObject[i];
        console.log("Nombre: " + personObject.name, "Edad: " +
            personObject.age );
        divState.innerHTML += "<p>Nombre: " + personObject.name + ", Edad: " +
            personObject.age + "</p>";
    }
}
if (window.addEventListener) {
    window.addEventListener("load", init, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", init);
}