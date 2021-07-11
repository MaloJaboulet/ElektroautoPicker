var x = 0;


function kilometerReisen() {
    var buttonHiden = document.getElementById("kilometerReisen");


    if (x == 1) {
        if (buttonHiden.style.display === 'block') {
            buttonHiden.style.display = 'none';
        } else {
            buttonHiden.style.display = 'block';
        }
        x = 0;
    } else {
        x = 1;
    }

}


function datenUebergeben() {

    var daten = {
        "anzahlEr": (document.querySelector('input[name="anzahlErwachsene"]:checked').value),
        "anzahlKi": (document.getElementById("kinder").value),
        "anzahlGeFaKM": (document.getElementById("kilometerWoche").value),
        "budget": (document.getElementById("budget").value),
        "ladestation": (document.getElementById("ladestation").value),
        "wReisen": (document.getElementById("kilometerReisen").value),
        "sportFahrverhalten": (document.getElementById("fahrverhalten").value)
    }

    console.log(document.querySelector('input[name="anzahlErwachsene"]:checked').value);

    localStorage.setItem("daten",JSON.stringify(daten));
}


