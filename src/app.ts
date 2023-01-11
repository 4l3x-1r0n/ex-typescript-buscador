import { Car } from "./cars.js";
import { cars } from "./cars.js";


const marca_select = document.querySelector("#marca") as HTMLSelectElement;
const year_select = document.querySelector("#year") as HTMLSelectElement;
const minPrice_select = document.querySelector("#minimo") as HTMLSelectElement;
const maxPrice_select = document.querySelector("#maximo") as HTMLSelectElement;
const doors_select = document.querySelector("#puertas") as HTMLSelectElement;
const transmision_select = document.querySelector("#transmision") as HTMLSelectElement;
const color_select = document.querySelector("#color") as HTMLSelectElement;

const result_div = document.querySelector("#resultado") as HTMLDivElement;

//Variables
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const dataSearch = {
    marca: "",
    model: "",
    year: 0,
    minPrice: 0,
    maxPrice: 0,
    doors: 0,
    color: "",
    transmision: ""
};


// Events
document.addEventListener("DOMContentLoaded", () => {
    showCars(cars);
    fillYearSelect();
});

marca_select.addEventListener("change", (e) => {
    dataSearch.marca = (e.target as HTMLInputElement).value;
    carFilter();
});

year_select.addEventListener("change", (e) => {
    dataSearch.year = +(e.target as HTMLInputElement).value;
    carFilter();
});
minPrice_select.addEventListener("change", (e) => {
    dataSearch.minPrice = +(e.target as HTMLInputElement).value;
    carFilter();
});
maxPrice_select.addEventListener("change", (e) => {
    dataSearch.maxPrice = +(e.target as HTMLInputElement).value;
    carFilter();
});
doors_select.addEventListener("change", (e) => {
    dataSearch.doors = +(e.target as HTMLInputElement).value;
    carFilter();
});
transmision_select.addEventListener("change", (e) => {
    dataSearch.transmision = (e.target as HTMLInputElement).value;
    carFilter();
});
color_select.addEventListener("change", (e) => {
    dataSearch.color = (e.target as HTMLInputElement).value;
    carFilter();
});



//Functions
function showCars(cars: Car[]): void {
    resetHTML(result_div);


    if (cars.length === 0) {
        showError(result_div);
        return;
    }

    cars.forEach((car: Car) => {
        const { marca, model, year, price, doors, color, transmision } = car;
        const carHHTML = document.createElement("p");
        carHHTML.textContent = `
            ${marca} ${model} - ${year} - ${doors} Puertas - Transminion: ${transmision} - Precion: ${price} - Color: ${color}
        `;
        result_div.append(carHHTML);
    });
}

function resetHTML(element: HTMLElement) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function showError(element: HTMLDivElement) {
    const alert = document.createElement("P");
    alert.textContent = "No hay resultados";
    alert.classList.add("alerta", "error");
    element.append(alert);
}

function fillYearSelect() {
    for (let i = maxYear; i >= minYear; i--) {
        const option = document.createElement("option");
        option.value = i.toString();
        option.textContent = i.toString();
        year_select.append(option);
    }
}

function carFilter() {
    const filteredCars: Car[] = cars
        .filter(marcaFilter)
        .filter(yearFilter)
        .filter(minPriceFilter)
        .filter(maxPriceFilter)
        .filter(doorsFilter)
        .filter(transmisionFilter)
        .filter(colorFilter);

    showCars(filteredCars);
}

function marcaFilter(car: Car): boolean {
    const { marca } = dataSearch;
    if (marca) {
        return car.marca === marca;
    }
    return true;
}
function yearFilter(car: Car): boolean {
    const { year } = dataSearch;
    if (year) {
        return car.year === year;
    }
    return true;
}
function minPriceFilter(car: Car): boolean {
    const { minPrice } = dataSearch;
    if (minPrice) {
        return car.price >= minPrice;
    }
    return true;
}
function maxPriceFilter(car: Car): boolean {
    const { maxPrice } = dataSearch;
    if (maxPrice) {
        return car.price <= maxPrice;
    }
    return true;
}
function doorsFilter(car: Car) {
    const { doors } = dataSearch;
    if (doors) {
        return car.doors === doors;
    }
    return true;
}
function transmisionFilter(car: Car) {
    const { transmision } = dataSearch;
    if (transmision) {
        return car.transmision === transmision;
    }
    return true;
}
function colorFilter(car: Car) {
    const { color } = dataSearch;
    if (color) {
        return car.color === color;
    }
    return true;
}



