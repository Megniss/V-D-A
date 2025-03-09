document.getElementById("plant-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let plantName = document.getElementById("plant-name").value.trim();
    if (!plantName) return; // Neļauj pievienot tukšus vārdus

    let plantList = document.getElementById("plant-list");
    let plantButton = document.createElement("button");

    plantButton.classList.add("plant-card");
    plantButton.innerHTML = `<h3>${plantName}</h3><p>Laistīšanas atgādinājums tiks ģenerēts.</p>`;
    
    // Klikšķis uz auga kartītes rāda padomu
    plantButton.addEventListener("click", function() {
        let tips = [
            "Regulāri pārbaudiet augsnes mitrumu pirms laistīšanas.",
            "Novietojiet augu atbilstoši tā gaismas prasībām.",
            "Reizi mēnesī noslaukiet putekļus no lapām, lai augs elpotu labāk.",
            "Izvairieties no pārmērīgas laistīšanas – saknes var sākt pūt.",
            "Rudenī un ziemā augus laistiet retāk.",
            "Mēslojiet augus pavasarī un vasarā, kad tie visvairāk aug.",
            "Ja lapas sāk dzeltēt, pārbaudiet, vai augs nav pārlaistīts.",
            "Izmantojiet lietus ūdeni vai nostādinātu krāna ūdeni laistīšanai.",
            "Regulāri apgrieziet nokaltušās vai bojātās lapas, lai veicinātu jaunu augšanu.",
            "Pārstādiet augus reizi gadā, ja tie kļuvuši pārāk lieli podam."
        ];

        let randomTip = tips[Math.floor(Math.random() * tips.length)];
        document.getElementById("care-tips").textContent = randomTip;
    });

    plantList.appendChild(plantButton);
    document.getElementById("plant-name").value = ""; // Notīra ievadi
});
