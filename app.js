document.querySelector('.exchange-button').addEventListener('click', function (event) {
    event.preventDefault();

    const amount = parseFloat(document.querySelector('input').value); // Get the input amount
    const fromCurrency = document.getElementById('from-dropdown').value; // Get 'from' currency
    const toCurrency = document.querySelectorAll('#from-dropdown')[1].value; // Get 'to' currency

    // Fetch exchange rates using your API key
    fetch(`https://v6.exchangerate-api.com/v6/ae5b14d0d2b1f9ca83ba11d6/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[toCurrency]; // Get exchange rate
            const convertedAmount = (amount * rate).toFixed(2); // Calculate converted amount
            document.querySelector('.message').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`; // Display the result
        })
        .catch(error => console.error('Error fetching the exchange rate:', error));
});
