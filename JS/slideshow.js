var time = 5000;
var i = 0;

function changeCar() {
    readTextFile("./daten.json", function (data) {
        autodaten = JSON.parse(data);

        var modelMarke = autodaten[i].marke + " " + autodaten[i].name;
        document.getElementById("modelName").innerHTML = modelMarke;
        document.getElementById("reichweite").innerHTML = "Reichweite: " + autodaten[i].reichweite;
        document.getElementById("preis").innerHTML = "Preis: " + autodaten[i].preis;
        document.getElementById("insassen").innerHTML = "Insassen: " + autodaten[i].anzahlPlaetze;

        var img = document.createElement("img");
        img.src = "./Img/" + autodaten[i].bild;

        var name = "./Img/" + autodaten[i].bild;
        console.log(name)
        document.getElementById("bildAutoHome").style.backgroundImage = "url(" + name + ")";

        if (i < autodaten.length - 1) {
            i++;
        } else {
            i = 0;
        }

        setTimeout("changeCar()", time)
    });


}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
