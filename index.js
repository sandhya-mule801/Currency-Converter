const BASE_URL =
    "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

for (let select of dropdowns) {

    for (let currCode in countryList) {

        let option = document.createElement("option");

        option.innerText = currCode;

        option.value = currCode;

        if (select.name === "from" && currCode === "USD") {

            option.selected = true;

        }

        if (select.name === "to" && currCode === "INR") {

            option.selected = true;

        }

        select.append(option);

    }

    select.addEventListener("change", (evt) => {

        updateFlag(evt.target);

    });

}

function updateFlag(element) {

    let countryCode = countryList[element.value];

    let img = element.parentElement.querySelector("img");

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;

}

async function updateExchangeRate() {

    let amount = document.querySelector(".amount input");

    let amtVal = Number(amount.value);

    if (amtVal < 1 || isNaN(amtVal)) {

        amtVal = 1;

        amount.value = 1;

    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try {

        let response = await fetch(URL);

        let data = await response.json();

        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

        let finalAmount = (amtVal * rate).toFixed(2);

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    }

    catch (error) {

        msg.innerText = "Unable to fetch exchange rate.";

        console.log(error);

    }

}

btn.addEventListener("click", (e) => {

    e.preventDefault();

    updateExchangeRate();

});

window.addEventListener("load", () => {

    updateExchangeRate();

});

const swap = document.querySelector(".swap");

swap.addEventListener("click", () => {

    let temp = fromCurr.value;

    fromCurr.value = toCurr.value;

    toCurr.value = temp;

    updateFlag(fromCurr);

    updateFlag(toCurr);

    updateExchangeRate();

});