const urlParams = new URLSearchParams(window.location.search);
const naam = urlParams.get("naam") || "Werknemer";

window.onload = async function() {
  document.getElementById("titel").innerText = naam;

  const vandaag = new Date();
  document.getElementById("huidigeDatum").innerText = vandaag.toLocaleDateString("nl-NL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  await loadPlanning(); // haal planning van server
};

async function loadPlanning() {
  const res = await fetch(`/.netlify/functions/getPlanning`);
  const data = await res.json();
  renderKalender(data);
}

function renderKalender(planningData = []) {
  const kalender = document.getElementById("kalender");
  if (!kalender) return;
  kalender.innerHTML = "";

  for (let i = 1; i <= 31; i++) {
    const dag = document.createElement("div");
    dag.classList.add("dag");
    dag.textContent = i;

    // Check of er een status is voor deze werknemer & dag
    const entry = planningData.find(p => p.werknemer === naam && new Date(p.datum).getDate() === i);
    if (entry) dag.classList.add(entry.status);

    dag.addEventListener("click", () => toggleDag(dag));
    kalender.appendChild(dag);
  }
}

async function toggleDag(element) {
  let status;
  if (element.classList.contains("groen")) {
    element.classList.remove("groen");
    element.classList.add("geel");
    status = "geel";
  } else if (element.classList.contains("geel")) {
    element.classList.remove("geel");
    element.classList.add("rood");
    status = "rood";
  } else if (element.classList.contains("rood")) {
    element.classList.remove("rood");
    status = null;
  } else {
    element.classList.add("groen");
    status = "groen";
  }

  const datum = new Date();
  datum.setDate(parseInt(element.textContent));
  await fetch(`/.netlify/functions/updatePlanning`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      werknemer: naam,
      datum: datum.toISOString().split("T")[0],
      status
    })
  });
}

function resetPlanning() {
  if (!confirm("Ben je zeker dat je je planning wil resetten?")) return;
  const kalender = document.getElementById("kalender");
  if (!kalender) return;

  kalender.querySelectorAll(".dag").forEach(dag => {
    dag.classList.remove("groen", "geel", "rood");
  });
}