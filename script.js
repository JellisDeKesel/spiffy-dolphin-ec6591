let werknemers = JSON.parse(localStorage.getItem("werknemers")) || [];
let planning = JSON.parse(localStorage.getItem("planning")) || [];

/* POSITIE SORTERING */
const ranking = {
  "manager": 1,
  "vaste werknemer": 2,
  "flexi werknemer": 3,
  "student": 4
};


/* WERKNEMER TOEVOEGEN */

function voegWerknemerToe() {

  const naam = document.getElementById("nieuweNaam").value;
  const winkel = document.getElementById("winkelSelect").value;
  const type = document.getElementById("typeSelect").value;

  if (naam === "") return;

  werknemers.push({
    naam: naam,
    winkel: winkel,
    type: type
  });

  localStorage.setItem("werknemers", JSON.stringify(werknemers));

  document.getElementById("nieuweNaam").value = "";

  renderWerknemers();
}


/* WERKNEMERS LADEN */

function renderWerknemers() {

  const lijst = document.getElementById("werknemersLijst");

  if (!lijst) return;

  lijst.innerHTML = "";

  werknemers.forEach(w => {

    const li = document.createElement("li");

    li.innerHTML = `<strong>${w.naam}</strong> - ${w.type} (${w.winkel})`;

    lijst.appendChild(li);

  });

}


/* KALENDER MAKEN */

function renderKalender() {

  const kalender = document.getElementById("kalender");

  if (!kalender) return;

  kalender.innerHTML = "";

  for (let i = 1; i <= 31; i++) {

    const dag = document.createElement("div");

    dag.className = "dag";

    dag.innerText = i;

    dag.onclick = function () {
      toggleDag(dag, i);
    };

    kalender.appendChild(dag);

  }

}


/* DAG STATUS WIJZIGEN */

function toggleDag(element, dag) {

  if (element.classList.contains("groen")) {
    element.classList.remove("groen");
    element.classList.add("geel");
  }
  else if (element.classList.contains("geel")) {
    element.classList.remove("geel");
    element.classList.add("rood");
  }
  else if (element.classList.contains("rood")) {
    element.classList.remove("rood");
  }
  else {
    element.classList.add("groen");
  }

}


/* RESET PLANNING */

function resetPlanning(){

  const kalender = document.getElementById("kalender");

  if(!kalender) return;

  const dagen = kalender.querySelectorAll(".dag");

  dagen.forEach(dag => {
    dag.classList.remove("groen","geel","rood");
  });

}


/* PLANNING LADEN */

function renderPlanning() {

  const container = document.getElementById("planning");

  if (!container) return;

  container.innerHTML = "";

  planning.forEach(p => {

    const div = document.createElement("div");

    div.innerHTML = `${p.naam} - ${p.datum}`;

    container.appendChild(div);

  });

}


/* PAGINA LADEN */

window.onload = function() {

  renderWerknemers();
  renderPlanning();

  /* BELANGRIJKE FIX */
  if(document.getElementById("kalender")){
      renderKalender();
  }

};
