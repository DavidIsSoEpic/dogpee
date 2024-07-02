document.getElementById('conversion-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    let result;

    const conversionFactors = {
        'meters_feet': 3.28084,
        'feet_meters': 1 / 3.28084,
        'kilograms_pounds': 2.20462,
        'pounds_kilograms': 1 / 2.20462,
        'liters_gallons': 0.264172,
        'gallons_liters': 1 / 0.264172,
        'celsius_fahrenheit': value => value * 9 / 5 + 32,
        'fahrenheit_celsius': value => (value - 32) * 5 / 9
    };

    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = conversionFactors['celsius_fahrenheit'](value);
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = conversionFactors['fahrenheit_celsius'](value);
    } else {
        const conversionKey = `${fromUnit}_${toUnit}`;
        if (conversionFactors[conversionKey]) {
            result = value * conversionFactors[conversionKey];
        } else {
            result = 'Conversion not supported.';
        }
    }

    document.getElementById('result').innerText = `Result: ${result}`;
});
