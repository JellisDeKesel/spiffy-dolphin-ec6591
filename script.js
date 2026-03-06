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

  const naam = document.getElementById("naam").value;
  const positie = document.getElementById("positie").value;

  if (naam === "") return;

  werknemers.push({
    naam: naam,
    positie: positie
  });

  localStorage.setItem("werknemers", JSON.stringify(werknemers));

  document.getElementById("naam").value = "";

  renderWerknemers();
}


/* WERKNEMERS LADEN */

function renderWerknemers() {

  const lijst = document.getElementById("werknemerslijst");

  if (!lijst) return;

  lijst.innerHTML = "";

  werknemers.sort((a,b) => ranking[a.positie] - ranking[b.positie]);

  werknemers.forEach(w => {

    const div = document.createElement("div");

    div.innerHTML = `<strong>${w.naam}</strong> - ${w.positie}`;

    lijst.appendChild(div);

  });

}


/* PLANNING TOEVOEGEN */

function voegPlanningToe() {

  const naam = document.getElementById("planningNaam").value;
  const datum = document.getElementById("planningDatum").value;

  if (!naam || !datum) return;

  planning.push({
    naam: naam,
    datum: datum
  });

  localStorage.setItem("planning", JSON.stringify(planning));

  renderPlanning();

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

};
