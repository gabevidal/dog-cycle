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
    const dogYearLengths = [52, 52, 52, 52, 52, 52, 53]; // Adjust for leap years as needed

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