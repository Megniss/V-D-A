document.getElementById("plant-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let plantName = document.getElementById("plant-name").value.trim();
    let wateringInterval = parseInt(document.getElementById("watering-interval").value);

    if (!plantName || isNaN(wateringInterval) || wateringInterval < 1) return;

    let plantList = document.getElementById("plant-list");
    let plantButton = document.createElement("button");

    plantButton.classList.add("plant-card");
    plantButton.innerHTML = `<h3>${plantName}</h3><p>${plantName} ir jāaplaista pēc ${wateringInterval} dienām.</p>`;

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
    
    let nextWateringDate = new Date();
    nextWateringDate.setDate(nextWateringDate.getDate() + wateringInterval);

    let plantData = {
        name: plantName,
        interval: wateringInterval,
        nextWatering: nextWateringDate.getTime()
    };

    localStorage.setItem(plantName, JSON.stringify(plantData));

    document.getElementById("plant-name").value = "";
    document.getElementById("watering-interval").value = ""; 
});

function checkWateringReminders() {
    let now = new Date().getTime();
    let message = "";

    for (let i = 0; i < localStorage.length; i++) {
        let plantKey = localStorage.key(i);
        let plantData = JSON.parse(localStorage.getItem(plantKey));

        if (plantData.nextWatering <= now) {
            message += `${plantData.name} ir jāaplaista šodien!\n`;

            let newDate = new Date();
            newDate.setDate(newDate.getDate() + plantData.interval);
            plantData.nextWatering = newDate.getTime();

            localStorage.setItem(plantKey, JSON.stringify(plantData));
        }
    }

    if (message) alert(message);
}

setInterval(checkWateringReminders, 5000);
