document.querySelector('.exchange-button').addEventListener('click', function (event) {
    event.preventDefault();

    const amount = parseFloat(document.querySelector('input').value); // Get the input amount
    const fromCurrency = document.getElementById('from-dropdown').value; // Get 'from' currency
    const toCurrency = document.querySelectorAll('#from-dropdown')[1].value; // Get 'to' currency

    // Check if the amount is negative
    if (isNaN(amount) || amount < 0) {
        const messageDiv = document.querySelector('.message');
        messageDiv.textContent = 'Error: Please enter a valid positive amount.'; // Display error message
        messageDiv.classList.add('error'); // Add error class for styling
        return;
    }

    // Clear error message if input is valid
    document.querySelector('.message').classList.remove('error');

    // Fetch exchange rates using your API key
    fetch(`https://v6.exchangerate-api.com/v6/ae5b14d0d2b1f9ca83ba11d6/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[toCurrency]; // Get exchange rate
            const convertedAmount = (amount * rate).toFixed(2); // Calculate converted amount

            // Format the amounts with commas
            const formattedAmount = amount.toLocaleString(); // Format input amount
            const formattedConvertedAmount = parseFloat(convertedAmount).toLocaleString(); // Format converted amount

            document.querySelector('.message').textContent = `${formattedAmount} ${fromCurrency} = ${formattedConvertedAmount} ${toCurrency}`; // Display the result
        })
        .catch(error => console.error('Error fetching the exchange rate:', error));
});
