function displayMountainCards(mountains) {
    let mountainsContainer = document.querySelector('.card-container');

    mountains.forEach(mountain => {
        getSunsetForMountain(mountain.lat, mountain.lng).then(data => {
            mountain.sunrise = formatTimeStr(data.results.sunrise);
            mountain.sunset = formatTimeStr(data.results.sunset);
            console.log("sunrise: ", mountain.sunrise);
            console.log("sunset: ", mountain.sunset);
            return mountain
        }).then((mountain) => {
            let row = document.createElement('div');
            row.classList.add('row');
            mountainsContainer.appendChild(row);
            let mountainCard = document.createElement('div');
            mountainCard.classList.add('col-md', 'mb-4');
            mountainCard.innerHTML = `
                <div class="card">
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
        });
    //         let mountainCard = document.createElement('div');
    //         mountainCard.classList.add('col-md', 'mb-4');
    //         mountainCard.innerHTML = `
    //         <div class="card">
    //             <img class="card-img-top" src="../images/${mountain.img}" alt="${mountain.name}">
    //             <div class="card-body">
    //                 <h5 class="card-title">${mountain.name}</h5>
    //                 <p class="card-subtitle">${mountain.effort}</p>
    //                 <p class="card-subtitle">Sunrise: ${mountain.sunrise}</p>
    //                 <p class="card-subtitle">Sunset: ${mountain.sunset}</p>
    //                 <br>
    //                 <p class="card-text">${mountain.desc}</p>
    //             </div>
    //         </div>
    //         `;
    //         row.appendChild(mountainCard);
    //     });
    });
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