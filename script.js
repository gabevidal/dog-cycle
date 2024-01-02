console.log("JavaScript loaded.");

function parseDate(input) {
    console.log("parseDate called with input:", input);
    if (!input) {
        console.error('No input provided for parseDate.');
        return new Date(); // or handle the error as needed
    }

    var parts = input.match(/(\\d{1,2})-(\\d{1,2})-(\\d{4})/);
    if (!parts) {
        console.error('Invalid date format. Expected MM-DD-YYYY or M-D-YYYY.');
        return new Date(); // or handle the error as needed
    }

    console.log("Parsed date parts:", parts);
    return new Date(parts[3], parts[1] - 1, parts[2]);
}

function humanToDogZodiac(humanDateStr) {
    console.log("humanToDogZodiac called with date string:", humanDateStr);
    const humanDate = parseDate(humanDateStr);

    const startOfYear = new Date(humanDate.getFullYear(), 0, 1);
    const isLeapYear = humanDate.getFullYear() % 4 === 0 && (humanDate.getFullYear() % 100 !== 0 || humanDate.getFullYear() % 400 === 0);

    const daysPassed = Math.floor((humanDate - startOfYear) / (1000 * 60 * 60 * 24));
    console.log("Days passed in year:", daysPassed);

    let dogYearLetter = 'A';
    let dogYearNumber = 1;
    let dogDay = daysPassed + 1;

    const dogYearLengths = [52, 52, 52, 52, 52, 52, isLeapYear ? 54 : 53];

    for (let i = 0; i < dogYearLengths.length; i++) {
        if (dogDay <= dogYearLengths[i]) {
            dogYearLetter = String.fromCharCode('A'.charCodeAt(0) + i);
            dogYearNumber = i + 1;
            break;
        }
        dogDay -= dogYearLengths[i];
    }

    console.log("Calculated dog year:", dogYearLetter, dogYearNumber, dogDay);
    return [dogYearLetter, dogYearNumber, dogDay];
}

function formatDate(date) {
    console.log("formatDate called with date:", date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function calculateDogInfo() {
    console.log("calculateDogInfo called");
    const dogBirthdayStr = document.getElementById("dogBirthday").value;
    console.log("Dog birthday string:", dogBirthdayStr);
    const dogBirthday = parseDate(dogBirthdayStr);
    const today = new Date();
    console.log("Today's date:", today);

    // Calculate Dog Zodiac
    const [dogYearLetter, dogYearNumber, dogDay] = humanToDogZodiac(dogBirthdayStr);
    const zodiacResultText = `Dog Birthdate: Year ${dogYearLetter} (Year ${dogYearNumber} in the cycle), Day ${dogDay}`;
    document.getElementById("zodiacResult").innerHTML = zodiacResultText;

    // Calculate Dog Age in Human Years and Days
    const ageInDays = Math.floor((today - dogBirthday) / (1000 * 60 * 60 * 24));
    console.log("Age in days:", ageInDays);
    const ageInHumanYears = Math.floor(ageInDays / 365);
    const ageInHumanDays = ageInDays % 365;

    const ageResultText = `Age in Human Years: ${ageInHumanYears} years and ${ageInHumanDays} days`;
    document.getElementById("ageResult").innerHTML = ageResultText;
}

console.log("JavaScript end.");