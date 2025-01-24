// Ensure default source and destination currency, and source value set to 1
let request = new XMLHttpRequest();
request.open('GET', 'https://ipapi.co/currency');
request.send();
request.onload = () => {
    if (request.status === 200) {
        localStorage.setItem("currency", request.response);
        let currency = localStorage.getItem("currency");
    } else {
        console.error(request.statusText);
    }
}

// Fetch currency data and populate dropdowns
fetch('https://www.floatrates.com/daily/usd.json')
    .then((response) => response.json())
    .then((data) => {
        currency = localStorage.getItem("currency");
        const defaultSourceCurrency = 'GBP'; // Default source currency (UK)
        const defaultDestinationCurrency = 'INR'; // Default destination currency (India)

        for (const [key, value] of Object.entries(data)) {
            // Populate source currency dropdown
            var option = document.createElement("option");
            option.text = `${value.name}`;
            option.value = `${value.rate}`;
            var select = document.getElementById("firstCurrency");
            select.appendChild(option);
            if (key.toUpperCase() === defaultSourceCurrency) {
                option.selected = 'selected';
            }

            // Populate destination currency dropdown
            var option2 = document.createElement("option");
            option2.text = `${value.name}`;
            option2.value = `${value.rate}`;
            var select2 = document.getElementById("secondCurrency");
            select2.appendChild(option2);
            if (key.toUpperCase() === defaultDestinationCurrency) {
                option2.selected = 'selected';
            }
        }
        updateCurrencyConverter();
    });

document.getElementById('firstCurrency').addEventListener('change', updateCurrencyConverter);
document.getElementById('secondCurrency').addEventListener('change', updateCurrencyConverter);

document.getElementById('amount').value = '1'; // Set default source value to 1

document.getElementById('amount').addEventListener('blur', function () {
    checkAmount();
});

function updateCurrencyConverter() {
    const amount = parseFloat(document.getElementById('amount').value);

    const sourceCurrencyRate = document.getElementById('firstCurrency').options[document.getElementById('firstCurrency').selectedIndex].value;
    const destinationCurrencyRate = document.getElementById('secondCurrency').options[document.getElementById('secondCurrency').selectedIndex].value;

    const exchangeRate = getExchangeRate(sourceCurrencyRate, destinationCurrencyRate).toFixed(3);
    const sourceCurrencyName = document.getElementById('firstCurrency').options[document.getElementById('firstCurrency').selectedIndex].text.toUpperCase();
    const destinationCurrencyName = document.getElementById('secondCurrency').options[document.getElementById('secondCurrency').selectedIndex].text.toUpperCase();

    const convertedAmount = (amount * exchangeRate).toFixed(3);

    document.getElementById('exchangeRate').innerText = `1 ${sourceCurrencyName} = ${exchangeRate} ${destinationCurrencyName}`;
    document.getElementById('calculationTimestamp').innerText = getCalculationTimestamp();
    document.getElementById('result').innerText = `${amount} ${sourceCurrencyName} = ${convertedAmount} ${destinationCurrencyName}`;
}

function getExchangeRate(sourceCurrencyRate, destinationCurrencyRate) {
    return destinationCurrencyRate / sourceCurrencyRate;
}

function getCalculationTimestamp() {
    const options = {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 24-hour format
    };

    return new Date().toLocaleString('en-GB', options);
}

function convertCurrency(event) {
    event.preventDefault();
    updateCurrencyConverter();
}

function checkAmount() {
    var input = document.getElementById('amount');
    var error = document.getElementById('error');

    if (!input.value || isNaN(input.value) || parseFloat(input.value) <= 0) {
        error.textContent = 'Amount must be greater than 0.';
        error.style.display = 'block';
        input.value = '1';
    } else if (parseFloat(input.value) > 1000) {
        error.textContent = 'Amount should not exceed 1000.';
        error.style.display = 'block';
        input.value = '1000';
    } else {
        error.textContent = '';
        error.style.display = 'none';
    }
    updateCurrencyConverter();
}
