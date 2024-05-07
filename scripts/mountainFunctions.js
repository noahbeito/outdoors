async function displayMountainCards(mountains) {
    mountainsContainer.innerHTML = '';
    for (const mountain of mountains) {
        await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng).then(data => {
            mountain.sunrise = formatTimeStr(data.results.sunrise);
            mountain.sunset = formatTimeStr(data.results.sunset);
        }).catch(err => console.error(err));

        let row = document.createElement('div');
        row.classList.add('row');
        mountainsContainer.appendChild(row);
        let mountainCard = document.createElement('div');
        mountainCard.classList.add('col-md', 'mb-4');
        mountainCard.innerHTML = `
            <div class="card mountain">
                <div class="card-front">
                    <img class="card-img-top" src="../images/${mountain.img}" alt="${mountain.name}">
                    <div class="card-body">
                        <h5 class="card-title">${mountain.name}</h5>
                        <h5 class="card-subtitle">(${mountain.elevation}')</h5>
                        <br>
                        <p class="card-subtitle">Climb: ${mountain.effort}</p>
                        <p class="card-subtitle">Sunrise: ${mountain.sunrise}</p>
                        <p class="card-subtitle">Sunset: ${mountain.sunset}</p>
                    </div>
                </div>
                <div class="card-back">
                    <div class="card-body">
                        <p class="card-text">${mountain.desc}</p>
                    </div>
                </div>
            </div>
        `;
        mountainCard.addEventListener('click', () => {
            mountainCard.querySelector('.card').classList.toggle('flipped');
        });
        row.appendChild(mountainCard);
    }
}

function displayMountain(mountain) {
    mountainsContainer.innerHTML = '';
    getSunsetForMountain(mountain.coords.lat, mountain.coords.lng).then(data => {
        mountain.sunrise = formatTimeStr(data.results.sunrise);
        mountain.sunset = formatTimeStr(data.results.sunset);
        let row = document.createElement('div');
        row.classList.add('row');
        mountainsContainer.appendChild(row);
        let mountainCard = document.createElement('div');
        mountainCard.classList.add('col-md', 'mb-4');
        mountainCard.innerHTML = `
            <div class="card mountain">
                <div class="card-front">
                    <img class="card-img-top" src="../images/${mountain.img}" alt="${mountain.name}">
                    <div class="card-body">
                        <h5 class="card-title">${mountain.name}</h5>
                        <h5 class="card-subtitle">(${mountain.elevation}')</h5>
                        <br>
                        <p class="card-subtitle">Climb: ${mountain.effort}</p>
                        <p class="card-subtitle">Sunrise: ${mountain.sunrise}</p>
                        <p class="card-subtitle">Sunset: ${mountain.sunset}</p>
                    </div>
                </div>
                <div class="card-back">
                    <div class="card-body">
                        <p class="card-text">${mountain.desc}</p>
                    </div>
                </div>
            </div>
        `;
        mountainCard.addEventListener('click', () => {
            mountainCard.querySelector('.card').classList.toggle('flipped');
        });
        row.appendChild(mountainCard);
    }).catch(err => console.error(err));
}

async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}

function formatTimeStr(timeStr){
    let index = timeStr.indexOf(":");
    index = timeStr.indexOf(":", index + 1);
    if (index !== -1) {
        timeStr = timeStr.slice(0, index) + timeStr.slice(index + 3);
    }
    return timeStr;
}

function updateMountainDropdownMenu() {
    const dropdownMenu = document.querySelector('#mountain-dropdown-menu');
    const mountains = mountainsArray; // mountains array is defined in mountainData.js
    mountains.forEach(mountain => {
        const dropdownItem = document.createElement('div');
        dropdownItem.classList.add('dropdown-item');
        dropdownItem.textContent = mountain.name;
        dropdownMenu.appendChild(dropdownItem);
    });
}

function searchMountainByName(mountainName) {
    return mountainsArray.filter(mountain => mountain.name === mountainName)[0];
}
