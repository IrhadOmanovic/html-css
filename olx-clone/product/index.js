const loadProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    const product = await (await fetch(`http://localhost:3000/products/${id}`, {
        method: "GET"
    })).json();

    const tagsListId = "tags-list";
    const tagsList = document.getElementById(tagsListId);

    const descriptionId = "description";
    const decription = document.getElementById(descriptionId);
    
    decription.innerHTML = product.description;

    const tagObjects = [{
        firstName : "Proizvodjac",
        lastName : "Nissan",
        icon : '<i class="fa-solid fa-car p-2"></i>'
    }]

    tagsList.innerHTML = `
    <li class="mt-2 p-2 border border-radius d-flex align-items-center flex-two">
        <i class="fa-solid fa-car p-2"></i>
        <div class="d-flex flex-column">
            <span>Proizvodjac</span>
            <span><b>Nissan</b></span>
        </div>
    </li>
    <li class="mt-2 p-2 ms-2 border border-radius d-flex align-items-center flex-two">
        <i class="fa-solid fa-car-on p-2"></i>
        <div class="d-flex flex-column">
            <span>Model</span>
            <span><b>${product.vehicle}</b></span>
        </div>
    </li>
    <li class="mt-2 p-2 border border-radius d-flex align-items-center flex-two">
        <i class="fa-solid fa-gas-pump p-2"></i>
        <div class="d-flex flex-column">
            <span>Gorivo</span>
            <span><b>${product.fuel}</b></span>
        </div>
    </li>
    <li class="mt-2 p-2 ms-2 border border-radius d-flex align-items-center flex-two">
        <i class="fa-solid fa-road p-2"></i>
        <div class="d-flex flex-column">
            <span>Kilometraža</span>
            <span><b>${product.distanceCovered}km</b></span>
        </div>
    </li>
    <li class="mt-2 p-2 border border-radius d-flex align-items-center flex-two">
        <i class="fa-solid fa-clipboard-check p-2"></i>
        <div class="d-flex flex-column">
            <span>Kubikaža</span>
            <span><b>2.0</b></span>
        </div>
    </li>
    <li class="mt-2 p-2 ms-2 border border-radius d-flex align-items-center flex-two">
        <i class="fa-solid fa-gauge-simple-high p-2"></i>
        <div class="d-flex flex-column">
            <span>Snaga Motora</span>
            <span><b>${product.motorPower}kW</b></span>
        </div>
    </li>
    <li class="mt-2 p-2 border border-radius d-flex align-items-center flex-two">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 14h-3v2h3zm3 7H3V11l8-8h10a1 1 0 0 1 1 1zM11.83 5l-6 6H20V5z"/></svg>
        <div class="d-flex flex-column">
            <span>Broj vrata</span>
            <span><b>${product.numberOfDoors}</b></span>
        </div>
    </li>
    <li class="mt-2 p-2 ms-2 border border-radius d-flex align-items-center flex-two">
        <i class="fa-solid fa-calendar p-2"></i>
        <div class="d-flex flex-column">
            <span>Godiste</span>
            <span><b>2014</b></span>
        </div>
    </li>
    `
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadProduct();
}, false);