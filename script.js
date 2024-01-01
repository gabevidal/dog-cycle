function parseDate(input) {
    var parts = input.match(/(\\d+)/g);
    return new Date(parts[2], parts[0]-1, parts[1]);
}

function humanToDogZodiac(humanDateStr) {
    const humanDate = parseDate(humanDateStr);

    const startOfYear = new Date(humanDate.getFullYear(), 0, 1);
    const isLeapYear = humanDate.getFullYear() % 4 === 0 && (humanDate.getFullYear() % 100 !== 0 || humanDate.getFullYear() % 400 === 0);

    const daysPassed = Math.floor((humanDate - startOfYear) / (1000 * 60 * 60 * 24));

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

    return [dogYearLetter, dogYearNumber, dogDay];
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function calculateDogInfo() {
    const dogBirthdayStr = document.getElementById("dogBirthday").value;
    const dogBirthday = parseDate(dogBirthdayStr);
    const today = new Date();

    // Calculate Dog Zodiac
    const [dogYearLetter, dogYearNumber, dogDay] = humanToDogZodiac(dogBirthdayStr);
    const zodiacResultText = `Dog Birthdate: Year ${dogYearLetter} (Year ${dogYearNumber} in the cycle), Day ${dogDay}`;
    document.getElementById("zodiacResult").innerHTML = zodiacResultText;

    // Calculate Dog Age in Human Years and Days
    const ageInDays = Math.floor((today - dogBirthday) / (1000 * 60 * 60 * 24));
    const ageInHumanYears = Math.floor(ageInDays / 365);
    const ageInHumanDays = ageInDays % 365;

    const ageResultText = `Age in Human Years: ${ageInHumanYears} years and ${ageInHumanDays} days`;
    document.getElementById("ageResult").innerHTML = ageResultText;
}