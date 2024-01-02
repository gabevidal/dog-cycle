document.addEventListener("DOMContentLoaded", function() {
    showCurrentDogDate();
    document.getElementById("togglePassingDate").addEventListener("click", togglePassingDateField);
});

function calculateDogInfo() {
    const dogName = document.getElementById("dogName").value || "Your dog";
    const dogBirthdayStr = document.getElementById("dogBirthday").value;
    const dogBirthday = parseDate(dogBirthdayStr);

    if (!dogBirthday) {
        document.getElementById("zodiacResult").innerHTML = "Please enter a valid birthday.";
        return;
    }

    const today = new Date();
    const zodiacInfo = humanToDogZodiac(dogBirthday);
    const currentDogYear = zodiacInfo.year;
    const currentDogDay = zodiacInfo.day;

    // Next dog year in the cycle
    const nextDogYear = (currentDogYear % 7) + 1; // Assuming a 7-year cycle
    const yearNames = ["The Adventurer", "The Braveheart", "The Companion", "The Dreamer", "The Explorer", "The Faithful", "The Guardian"];
    const nextYearName = yearNames[nextDogYear - 1];

    // Calculate days in each dog year
    const dogYearLengths = [52, 52, 52, 52, 52, 52, 53]; // Dog year lengths
    const daysInCurrentDogYear = dogYearLengths[currentDogYear - 1];

    // Calculate the days until next dog birthday
    let daysUntilNextDogBirthday;
    if (currentDogYear === 7) {
        // Special case for the transition from year 7 to year 1 in the dog cycle
        daysUntilNextDogBirthday = totalDaysInDogYear - currentDogDay + dogYearLengths[0];
    } else {
        daysUntilNextDogBirthday = dogYearLengths[currentDogYear] - currentDogDay;
    }

    // Calculate the human date equivalent of the next dog birthday
    let humanDateForNextDogBirthday = new Date(today);
    humanDateForNextDogBirthday.setDate(today.getDate() + daysUntilNextDogBirthday);

    // Display results
    document.getElementById("zodiacResult").innerHTML = `${dogName} was born on the ${ordinalSuffix(currentDogDay)} day of the ${yearNames[currentDogYear - 1]} year in the cycle.`;
    document.getElementById("nextDogBirthday").innerHTML = `The next birthday of ${dogName} will be on the ${ordinalSuffix(currentDogDay)} day of the ${nextYearName} year in the cycle, which is in ${daysUntilNextDogBirthday} days. This approximately corresponds to the human date ${humanDateForNextDogBirthday.toLocaleDateString()}.`;
}