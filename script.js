console.log("JavaScript loaded.");

function parseDate(input) {
    if (!input || input.trim() === '') {
        return null; // Return null for empty input
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

    const dogYearData = [
        { name: "The Adventurer", length: 52 },
        { name: "The Braveheart", length: 52 },
        { name: "The Companion", length: 52 },
        { name: "The Dreamer", length: 52 },
        { name: "The Explorer", length: 52 },
        { name: "The Faithful", length: 52 },
        { name: "The Guardian", length: 53 }
    ];

    let dayCount = 0;
    for (let i = 0; i < dogYearData.length; i++) {
        dayCount += dogYearData[i].length;
        if (daysPassed < dayCount) {
            return { yearName: dogYearData[i].name, day: daysPassed - (dayCount - dogYearData[i].length) + 1 };
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
    const dogPassingDateStr = document.getElementById("dogPassingDate").value;

    const dogBirthday = parseDate(dogBirthdayStr);
    const dogPassingDate = parseDate(dogPassingDateStr);

    if (!dogBirthday) {
        document.getElementById("zodiacResult").innerHTML = "Please enter a valid birthday.";
        return;
    }

    const zodiacInfo = humanToDogZodiac(dogBirthday);
    const birthDayOrdinal = ordinalSuffix(zodiacInfo.day);
    const birthZodiacText = `${dogName} was born on the ${birthDayOrdinal} day of the year ${zodiacInfo.yearName}.`;

    const endDate = dogPassingDate || new Date();
    const ageInDays = Math.floor((endDate - dogBirthday) / (1000 * 60 * 60 * 24));
    const ageInHumanYears = Math.floor(ageInDays / 365);
    const ageResultText = dogPassingDate ? 
        `${dogName} lived for ${ageInHumanYears} human years.` :
        `${dogName} is ${ageInHumanYears} human years old.`;

    document.getElementById("zodiacResult").innerHTML = birthZodiacText;
    document.getElementById("ageResult").innerHTML = ageResultText;
}

function showCurrentDogDate() {
    const today = new Date();
    const currentZodiacInfo = humanToDogZodiac(today);
    if (currentZodiacInfo) {
        const currentDayOrdinal = ordinalSuffix(currentZodiacInfo.day);
        document.getElementById("currentDogDate").innerHTML = `Today is the ${currentDayOrdinal} day of the year ${currentZodiacInfo.yearName}.`;
    }
}

window.onload = function() {
    showCurrentDogDate();
    document.getElementById("togglePassingDate").addEventListener("click", togglePassingDateField);
};

console.log("JavaScript end.");