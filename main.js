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
    const ageInDays = Math.floor((today - dogBirthday) / (1000 * 60 * 60 * 24));
    const ageInDogYears = Math.floor(ageInDays / 52); // Assuming each dog year is 52 days
    const ageInDogDays = ageInDays % 52;

    const zodiacInfo = humanToDogZodiac(dogBirthday);
    const nextDogYear = (zodiacInfo.year % 7) + 1; // Cycle through 7 dog years
    const yearNames = ["The Adventurer", "The Braveheart", "The Companion", "The Dreamer", "The Explorer", "The Faithful", "The Guardian"];
    const nextYearName = yearNames[nextDogYear - 1];

    // Calculate the date for the next dog birthday
    let nextDogBirthday = new Date(dogBirthday.getTime());
    nextDogBirthday.setFullYear(dogBirthday.getFullYear() + ageInDogYears + (zodiacInfo.year === 7 ? 1 : 0));

    // Adjust for the next birthday if it's already passed in this year
    if (nextDogBirthday <= today) {
        nextDogBirthday.setFullYear(nextDogBirthday.getFullYear() + 1);
    }

    const daysUntilNextDogBirthday = Math.ceil((nextDogBirthday - today) / (1000 * 60 * 60 * 24));
    
    // Display the results
    document.getElementById("zodiacResult").innerHTML = `${dogName} was born on the ${ordinalSuffix(zodiacInfo.day)} day of the ${yearNames[zodiacInfo.year - 1]} year in the cycle.`;
    document.getElementById("nextDogBirthday").innerHTML = `The next birthday of ${dogName} will be on the ${ordinalSuffix(zodiacInfo.day)} day of the ${nextYearName} year in the cycle, which is in ${daysUntilNextDogBirthday} days.`;
}