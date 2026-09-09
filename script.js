// Explore More — toggle hidden plant cards on the homepage

document.addEventListener("DOMContentLoaded", function () {

    const exploreBtn = document.getElementById("exploreMoreBtn");

    if (!exploreBtn) return;

    exploreBtn.addEventListener("click", function () {

        const hiddenCards = document.querySelectorAll(".plant-card.extra-plant");

        const isExpanded = exploreBtn.getAttribute("aria-expanded") === "true";

        hiddenCards.forEach(function (card) {

            if (isExpanded) {

                card.classList.remove("shown");

            } else {

                card.classList.add("shown");

            }

        });

        if (isExpanded) {

            // Collapse back to 3 cards

            exploreBtn.textContent = "🌿 Explore More Plants";

            exploreBtn.setAttribute("aria-expanded", "false");

            // Scroll back up to the plants section

            document.getElementById("plants").scrollIntoView({ behavior: "smooth" });

        } else {

            // Show all cards

            exploreBtn.textContent = "🔼 Show Less";

            exploreBtn.setAttribute("aria-expanded", "true");

        }

    });
});


// =============================
// PLANT DETAILS PAGE (plant.html)
// =============================

function getPlantIdFromUrl() {

    const params = new URLSearchParams(window.location.search);

    return params.get("id");
}


function renderPlantDetails(plant) {

    const container = document.getElementById("plantDetails");

    if (!container) return;

    container.innerHTML = `

        <div class="plant-detail-card">

            <img src="${plant.image}" alt="${plant.name}" class="plant-detail-img">

            <div class="plant-detail-info">

                <h1>${plant.name}</h1>

                <p class="plant-common-name">${plant.commonName}</p>

                <p class="plant-scientific-name"><em>${plant.scientificName}</em></p>

                <table class="plant-info-table">

                    <tr>
                        <th>Family</th>
                        <td>${plant.family}</td>
                    </tr>

                    <tr>
                        <th>Type</th>
                        <td>${plant.type}</td>
                    </tr>

                    <tr>
                        <th>Origin</th>
                        <td>${plant.origin}</td>
                    </tr>

                    <tr>
                        <th>Sunlight</th>
                        <td>${plant.sunlight}</td>
                    </tr>

                    <tr>
                        <th>Water</th>
                        <td>${plant.water}</td>
                    </tr>

                    <tr>
                        <th>Soil</th>
                        <td>${plant.soil}</td>
                    </tr>

                    <tr>
                        <th>Temperature</th>
                        <td>${plant.temperature}</td>
                    </tr>

                    <tr>
                        <th>Health Status</th>
                        <td><span class="health-badge ${plant.healthStatus.toLowerCase() === 'healthy' ? 'healthy' : 'unhealthy'}">${plant.healthStatus}</span></td>
                    </tr>

                </table>

                <h2>Description</h2>

                <p>${plant.description}</p>

                <h2>Benefits</h2>

                <ul class="plant-benefits-list">

                    ${plant.benefits.map(benefit => `<li>${benefit}</li>`).join("")}

                </ul>

                <h2>Care Instructions</h2>

                <p>${plant.care}</p>

                <div class="plant-qr-section">

                    <h2>Scan to Share</h2>

                    <img src="images/qr_codes/${plant.id}_qr.png" alt="QR code for ${plant.name}" class="plant-qr-img">

                    <p class="plant-qr-text">
                        Scan this QR code to open the ${plant.name} details page instantly.
                    </p>

                </div>

            </div>

        </div>
    `;
}


function showPlantError() {

    const container = document.getElementById("plantDetails");

    if (container) {

        container.innerHTML = `<p class="error-text">Sorry, plant information could not be loaded.</p>`;

    }
}


function loadPlantDetails() {

    const container = document.getElementById("plantDetails");

    if (!container) return; // Not on the details page

    const plantId = getPlantIdFromUrl();

    if (!plantId) {

        container.innerHTML = `<p class="error-text">No plant selected.</p>`;

        return;

    }

    // First try to load from JSON (works when served over http)

    fetch("data/plants.json")

        .then(response => response.json())

        .then(plants => {

            const plant = plants.find(p => p.id === plantId);

            if (plant) {

                renderPlantDetails(plant);

            } else {

                container.innerHTML = `<p class="error-text">Plant not found.</p>`;

            }

        })

        .catch(() => {

            // Fallback for file:// where fetch is blocked by the browser

            if (window.PLANTS_DATA) {

                const plant = window.PLANTS_DATA.find(p => p.id === plantId);

                if (plant) {

                    renderPlantDetails(plant);

                } else {

                    container.innerHTML = `<p class="error-text">Plant not found.</p>`;

                }

            } else {

                showPlantError();

            }

        });
}


document.addEventListener("DOMContentLoaded", loadPlantDetails);
