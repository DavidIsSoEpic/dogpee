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
        'fahrenheit_celsius': value => (value - 32) * 5 / 9,
        'seconds_minutes': 1 / 60,
        'minutes_seconds': 60,
        'hours_minutes': 60,
        'minutes_hours': 1 / 60,
        'seconds_hours': 1 / 3600,
        'hours_seconds': 3600,
        'miles_kilometers': 1.60934,
        'kilometers_miles': 1 / 1.60934,
        'square-meters_square-feet': 10.7639,
        'square-feet_square-meters': 1 / 10.7639
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
