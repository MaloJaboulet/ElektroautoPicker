var data = localStorage.getItem("daten");

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


function autoWaehlen() {

    var auto = [];
    var autoTemp = [];

    var daten = JSON.parse(data);

    readTextFile("./daten.json", function (datenJson) {
        var autoDaten = JSON.parse(datenJson);
        var anzahlPersonen = parseInt(daten.anzahlEr) + parseInt(daten.anzahlKi);
        var kilometerProTag = parseInt(daten.anzahlGeFaKM) / 7;
        var langeReisen = parseInt(daten.wReisen);
        var budget = parseInt(daten.budget);


        for (var i = 0; i < autoDaten.length; i++) {
            if (anzahlPersonen <= autoDaten[i].anzahlPlaetze) {
                if (kilometerProTag < (autoDaten[i].reichweite / 2)) {
                    if (budget >= autoDaten[i].preis) {
                        if (langeReisen > 0) {
                            if (autoDaten[i].reichweite >= 350) {
                                auto[i] = autoDaten[i];
                            }
                        } else {
                            auto[i] = autoDaten[i];
                        }
                    }
                }

            }
        }

        autoAnzeigen(auto);
        console.log(auto);
    })
}

function autoAnzeigen(autoDaten) {

    var auto = [];
    var zaehler = 0;
    for (let i = 0; i < autoDaten.length; i++) {
        if (autoDaten[i] != null) {
            auto[zaehler] = autoDaten[i];
            zaehler = zaehler + 1;
        }
    }

    if (auto.length != 0) {
        var autoObjekt = auto[Math.floor(Math.random() * auto.length)];

        document.getElementById("autoTitel").innerHTML = "Model: " +autoObjekt.name;
        document.getElementById("marke").innerHTML = "Marke: " + autoObjekt.marke;
        document.getElementById("reichweite").innerHTML = "Reichweite: " + autoObjekt.reichweite;
        document.getElementById("anzahlPlaetze").innerHTML = "Anzahl Plätze: " + autoObjekt.anzahlPlaetze;
        document.getElementById("fahrverhalten").innerHTML = "Fahrverhalten: " + autoObjekt.fahrverhalten;
        document.getElementById("preis").innerHTML = "Preis: " + autoObjekt.preis + " Franken";

        if (autoObjekt.bild != "") {
            var img = document.createElement("img");
            img.src = "./Img/" + autoObjekt.bild;

            var src = document.getElementById("autoBild");
            //src.appendChild(img);
            var name = "./Img/" + autoObjekt.bild;
            document.getElementById("autoBild").style.backgroundImage = "url(" + name + ")";
        }

    } else {
        document.getElementById("autoTitel").innerHTML = "Es wurde kein Auto gefunden, dass auf Ihre Wünsche " +
            "zu trifft. Probieren Sie es nochmals mit anderen Angaben.";
    }


}
