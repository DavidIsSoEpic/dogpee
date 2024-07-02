document.getElementById('conversion-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    let result;

    const conversionFactors = {
        'meters_feet': 3.28084,
        'kilograms_pounds': 2.20462,
        'liters_gallons': 0.264172,
        'celsius_fahrenheit': value => value * 9/5 + 32,
        // Add more conversions as needed
    };

    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = conversionFactors['celsius_fahrenheit'](value);
    } else {
        const conversionKey = `${fromUnit}_${toUnit}`;
        result = value * conversionFactors[conversionKey];
    }

    document.getElementById('result').innerText = `Result: ${result}`;
});
