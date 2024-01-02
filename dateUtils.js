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
    const dogYearLengths = getDogYearLengths();

    let dayCount = 0;
    for (let i = 0; i < dogYearLengths.length; i++) {
        dayCount += dogYearLengths[i];
        if (daysPassed < dayCount) {
            return { year: i + 1, day: daysPassed - (dayCount - dogYearLengths[i]) + 1 };
        }
    }
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
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

function getDogYearName(dogYear) {
    const yearNames = ["The Adventurer", "The Braveheart", "The Companion", "The Dreamer", "The Explorer", "The Faithful", "The Guardian"];
    return yearNames[dogYear - 1];
}

function getDogYearLengths() {
    return [52, 52, 52, 52, 52, 52, 53]; // Array representing the length of each dog year
}

function getDaysInCurrentDogYear(dogYear) {
    const dogYearLengths = getDogYearLengths();
    return dogYearLengths[dogYear - 1];
}
function calculateDaysUntilNextDogBirthday(currentDogYear, currentDogDay) {
    const dogYearLengths = getDogYearLengths();
    const daysInCurrentDogYear = dogYearLengths[currentDogYear - 1];
    let daysUntilNextDogBirthday;

    if (currentDogDay <= daysInCurrentDogYear) {
        // If the current dog day has not yet passed in the current dog year
        daysUntilNextDogBirthday = currentDogDay - 1; // Subtract 1 since today is already counted
    } else {
        // If the current dog day has passed in the current dog year, calculate for the next dog year
        const nextDogYear = currentDogYear === 7 ? 1 : currentDogYear + 1;
        const daysInNextDogYear = dogYearLengths[nextDogYear - 1];
        daysUntilNextDogBirthday = daysInNextDogYear - (currentDogDay - daysInCurrentDogYear);
    }

    return daysUntilNextDogBirthday;
}

function calculateHumanDateForNextDogBirthday(today, daysUntilNextDogBirthday) {
    // Convert the number of days to milliseconds
    const msPerDay = 1000 * 60 * 60 * 24;
    const msUntilNextDogBirthday = daysUntilNextDogBirthday * msPerDay;

    // Create a new Date object with the added milliseconds
    let humanDateForNextDogBirthday = new Date(today.getTime() + msUntilNextDogBirthday);

    return humanDateForNextDogBirthday;
}

function calculateDogAgeInDogYears(dogBirthday, currentDate) {
    const daysInCurrentDogYear = getDaysInCurrentDogYear(humanToDogZodiac(dogBirthday).year);
    const ageInDays = (currentDate - dogBirthday) / (1000 * 60 * 60 * 24);
    return Math.floor(ageInDays / daysInCurrentDogYear);
}