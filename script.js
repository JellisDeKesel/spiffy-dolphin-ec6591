// =============================
// Kalender & Werknemer pagina
// =============================

// Haal naam uit URL
const urlParams = new URLSearchParams(window.location.search);
const naam = urlParams.get("naam") || "Werknemer";
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("titel").innerText = naam;

    // Toon huidige datum
    const vandaag = new Date();
    document.getElementById("huidigeDatum").innerText = vandaag.toLocaleDateString("nl-NL", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
    });

    // Kalender renderen
    renderKalender();
});

// =============================
// Kalender functies
// =============================
function renderKalender() {
    const kalender = document.getElementById("kalender");
    if (!kalender) return;

    kalender.innerHTML = "";

    // Maak 31 dagen
    for (let i = 1; i <= 31; i++) {
        const dag = document.createElement("div");
        dag.classList.add("dag");
        dag.textContent = i;

        // Klikbare dag
        dag.addEventListener("click", () => toggleDag(dag));

        kalender.appendChild(dag);
    }
}

function toggleDag(element) {
    if (element.classList.contains("groen")) {
        element.classList.remove("groen");
        element.classList.add("geel");
    } else if (element.classList.contains("geel")) {
        element.classList.remove("geel");
        element.classList.add("rood");
    } else if (element.classList.contains("rood")) {
        element.classList.remove("rood");
    } else {
        element.classList.add("groen");
    }
}

function resetPlanning() {
    if (!confirm("Ben je zeker dat je je planning wil resetten?")) return;

    const kalender = document.getElementById("kalender");
    if (!kalender) return;

    // Verwijder alle kleuren
    kalender.querySelectorAll(".dag").forEach(dag => {
        dag.classList.remove("groen", "geel", "rood");
    });

    // Optioneel: her-render kalender (kan je ook weglaten)
    // renderKalender();
}