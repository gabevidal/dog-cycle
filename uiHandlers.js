function togglePassingDateField() {
    var passingDateField = document.getElementById("passingDateField");
    if (passingDateField.style.display === "none") {
        passingDateField.style.display = "block";
    } else {
        passingDateField.style.display = "none";
    }
}

function showCurrentDogDate() {
    const today = new Date();
    const currentZodiacInfo = humanToDogZodiac(today);
    if (currentZodiacInfo) {
        const currentDayOrdinal = ordinalSuffix(currentZodiacInfo.day);
        const currentYearName = getDogYearName(currentZodiacInfo.year);

        document.getElementById("currentDogDate").innerHTML = `Today is the ${currentDayOrdinal} day of the ${currentYearName} year in the dog zodiac cycle.`;
    }
}