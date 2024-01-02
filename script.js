console.log("JavaScript loaded.");

function parseDate(input) {
    if (!input || input.trim() === '') {
        return null;
    }

    var parts = input.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
    if (!parts) {
        console.error('Invalid date format. Expected MM-DD-YYYY or M-D-YYYY.');
        return null;
    }

    return new Date(parts[3], parts[1] - 1, parts[2]);
}

function humanToDogZodiac(date) {
    if (!date) return null;

    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const daysPassed = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
    const dogYearLengths = [52, 52, 52, 52, 52, 52, 53];

    let dayCount = 0;
    for (let i = 0; i < dogYearLengths.length; i++) {
        dayCount += dogYearLengths[i];
        if (daysPassed < dayCount) {
            return { year: i + 1, day: daysPassed - (dayCount - dogYearLengths[i]) + 1 };
        }
    }
}

function ordinalSuffix(day) {
    const j = day % 10, k = day % 100;
    if (j == 1 && k != 11) {
        return day + "st";
    }
    if (j == 2 && k != 12) {
        return day + "nd";
    }
    if (j == 3 && k != 13) {
        return day + "rd";
    }
    return day + "th";
}

function togglePassingDateField() {
    var passingDateField = document.getElementById("passingDateField");
    if (passingDateField.style.display === "none") {
        passingDateField.style.display = "block";
    } else {
        passingDateField.style.display = "none";
    }
}

function calculateDogInfo() {
    const dogName = document.getElementById("dogName").value || "Your dog";
    const dogBirthdayStr = document.getElementById("dogBirthday").value;
    const dogBirthday = parseDate(dogBirthdayStr);

    if (!dogBirthday) {
        document.getElementById("zodiacResult").innerHTML = "Please enter a valid birthday.";
        return;
    }

    const today = new Date();
    const ageInDays = Math.floor((today - dogBirthday) / (1000 * 60 * 60 * 24));
    const ageInDogYears = Math.floor(ageInDays / 52); // Assuming each dog year is 52 days
    const ageInDogDays = ageInDays % 52;

    const zodiacInfo = humanToDogZodiac(dogBirthday);
    const birthDayOrdinal = ordinalSuffix(zodiacInfo.day);

    // Map of year numbers to names
    const yearNames = ["The Adventurer", "The Braveheart", "The Companion", "The Dreamer", "The Explorer", "The Faithful", "The Guardian"];
    const yearName = yearNames[(zodiacInfo.year - 1) % yearNames.length];

    const birthZodiacText = `${dogName} was born on the ${birthDayOrdinal} day of the ${yearName} year in the cycle.`;
    const ageText = `${dogName} is ${ageInDogYears} dog years and ${ageInDogDays} dog days old.`;

    const nextDogYear = (zodiacInfo.year % 7) + 1; // Assuming a 7-year cycle
    const nextYearName = yearNames[nextDogYear - 1];
    const nextBirthdayText = `The next birthday of ${dogName} in dog years will be in the year ${nextYearName}.`;

    document.getElementById("zodiacResult").innerHTML = birthZodiacText;
    document.getElementById("ageResult").innerHTML = ageText;
    document.getElementById("nextDogBirthday").innerHTML = nextBirthdayText;
}

function showCurrentDogDate() {
    const today = new Date();
    const currentZodiacInfo = humanToDogZodiac(today);
    if (currentZodiacInfo) {
        const currentDayOrdinal = ordinalSuffix(currentZodiacInfo.day);
        document.getElementById("currentDogDate").innerHTML = `Today is the ${currentDayOrdinal} day of the ${currentZodiacInfo.year} year in the cycle.`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    showCurrentDogDate();
    document.getElementById("togglePassingDate").addEventListener("click", togglePassingDateField);
});

console.log("JavaScript end.");