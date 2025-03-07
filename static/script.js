document.getElementById("plant-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let plantName = document.getElementById("plant-name").value;
    let plantList = document.getElementById("plant-list");
    let plantDiv = document.createElement("div");
    plantDiv.classList.add("plant-card");
    plantDiv.innerHTML = `<h3>${plantName}</h3><p>Laistīšanas atgādinājums tiks ģenerēts.</p>`;
    plantList.appendChild(plantDiv);
    document.getElementById("plant-name").value = "";
});