const dropdownMenuLocations = document.querySelector('#location-dropdown-menu');
const dropdownMenuParkTypes = document.querySelector('#parktype-dropdown-menu');
const cardContainer = document.querySelector('.card-container');

document.addEventListener('DOMContentLoaded', function() {
    updateLocationDrowdownMenu();
    updateParkTypeDropdownMenu();
});

dropdownMenuLocations.addEventListener('click', function(event) {
    cardContainer.innerHTML = '';
    if (event.target.matches('.dropdown-item')) {
        const selectedLocation = event.target.textContent;
        const parksInSelectedLocation = searchByLocation(selectedLocation);
        displayParks(parksInSelectedLocation);
    }
});

dropdownMenuParkTypes.addEventListener('click', function(event) {
    cardContainer.innerHTML = '';
    if (event.target.matches('.dropdown-item')) {
        const selectedParkType = event.target.textContent;
        const parksOfSelectedType = searchByParkType(selectedParkType);
        displayParks(parksOfSelectedType)
    }
});

function displayParks(parksArray) {
    console.log('--[]][]-', parksArray)
    const cardContainer = document.querySelector('.card-container');
    parksArray.forEach(park => {
        const card = document.createElement('div');
        let phone;
        
        if (park.Phone !== undefined && park.Phone !== 0) {
            phone = park.Phone;
        }

        card.classList.add('col-md', 'mb-4');
        card.innerHTML = `
            <div id="parks-card" class="card">
                <div id="${park.locationName}" class="card-body">
                    <h5 class="card-title">${park.LocationName}</h5>
                    <p class="card-text">${park.City}, ${park.State}</p>
                    <p class="card-text">${phone ? phone : ""}</p>
                </div>
            </div>
        `
        cardContainer.appendChild(card);

        if (park.Visit !== undefined) {
            console.log('park.visit', park.Visit);
            const cardBody = card.querySelector(`#${park.locationName}`);
            const visitLink = document.createElement('a');
            visitLink.href = park.Visit;
            visitLink.textContent = 'Visit Website';
            visitLink.target = '_blank';
            cardBody.appendChild(visitLink);
        }

    });
}

function updateLocationDrowdownMenu() {
    const dropdownMenu = document.querySelector('#location-dropdown-menu');
    const locations = locationsArray; // locations array is defined in locationData.js
    locations.forEach(location => {
        const dropdownItem = document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = '#';
        link.textContent = location;
        dropdownItem.appendChild(link);
        dropdownMenu.appendChild(dropdownItem);
    });
}

function updateParkTypeDropdownMenu() {
    const parkTypes = parkTypesArray; // parkTypes array is defined in parkTypeData.js
    const dropdownMenu = document.querySelector('#parktype-dropdown-menu');
    parkTypes.forEach(parkType => {
        const dropdownItem = document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = '#'; 
        link.textContent = parkType;
        dropdownItem.appendChild(link);
        dropdownMenu.appendChild(dropdownItem);
    });
}

function searchByLocation(location) {
    return nationalParksArray.filter(park => park.State === location); // nationalParksArray is defined in nationalParkData.js

}

function searchByParkType(parkType) {
    return nationalParksArray.filter(park => park.LocationName.includes(parkType)); // nationalParksArray is defined in nationalParkData.js
}

function showAllParks() {
    cardContainer.innerHTML = '';
    displayParks(nationalParksArray);
}

function clearSearch() {
    cardContainer.innerHTML = '';
}