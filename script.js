let werknemers = JSON.parse(localStorage.getItem("werknemers")) || [];
let planning = JSON.parse(localStorage.getItem("planning")) || [];


/* =========================
   WERKNEMERS LADEN
========================= */

function renderWerknemers(){

    const lijst = document.getElementById("werknemersLijst");
    if(!lijst) return;

    lijst.innerHTML = "";

    werknemers.forEach(w => {

        const li = document.createElement("li");
        li.innerHTML = `<strong>${w.naam}</strong> - ${w.type || ""} (${w.winkel || ""})`;

        lijst.appendChild(li);

    });

}


/* =========================
   KALENDER MAKEN
========================= */

function renderKalender(){

    const kalender = document.getElementById("kalender");

    if(!kalender) return;

    kalender.innerHTML = "";

    for(let i = 1; i <= 31; i++){

        const dag = document.createElement("div");

        dag.classList.add("dag");

        dag.innerText = i;

        dag.addEventListener("click", function(){
            veranderStatus(dag);
        });

        kalender.appendChild(dag);

    }

}


/* =========================
   DAG STATUS WIJZIGEN
========================= */

function veranderStatus(element){

    if(element.classList.contains("groen")){
        element.classList.remove("groen");
        element.classList.add("geel");
    }
    else if(element.classList.contains("geel")){
        element.classList.remove("geel");
        element.classList.add("rood");
    }
    else if(element.classList.contains("rood")){
        element.classList.remove("rood");
    }
    else{
        element.classList.add("groen");
    }

}


/* =========================
   RESET PLANNING
========================= */

function resetPlanning(){

    if(confirm("Ben je zeker dat je je planning wil resetten?")){

        const kalender = document.getElementById("kalender");

        if(!kalender) return;

        kalender.innerHTML = "";

        /* Kalender opnieuw maken */
        renderKalender();

    }

}


/* =========================
   PAGINA LADEN
========================= */

document.addEventListener("DOMContentLoaded", function(){

    renderWerknemers();

    /* BELANGRIJKE FIX */
    const kalender = document.getElementById("kalender");

    if(kalender){
        renderKalender();
    }

});