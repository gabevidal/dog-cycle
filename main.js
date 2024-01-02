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
    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const dogYearLength = isLeapYear(today.getFullYear()) ? 366 : 365; // Days in the current human year
    const ageInDays = Math.floor((today - dogBirthday) / (1000 * 60 * 60 * 24));
    const ageInDogYears = Math.floor(ageInDays / dogYearLength); 
    const ageInDogDays = ageInDays % dogYearLength;

    const zodiacInfo = humanToDogZodiac(dogBirthday);

    // Determine next dog year and its name
    const nextDogYear = (zodiacInfo.year % 7) + 1; // Assuming a 7-year cycle
    const yearNames = ["The Adventurer", "The Braveheart", "The Companion", "The Dreamer", "The Explorer", "The Faithful", "The Guardian"];
    const nextYearName = yearNames[nextDogYear - 1];

    // Calculate the next dog birthday
    let nextDogBirthday = new Date(dogBirthday);
    nextDogBirthday.setFullYear(today.getFullYear() + ((zodiacInfo.year === 7 && isLeapYear(today.getFullYear())) ? 1 : 0));
    nextDogBirthday.setDate(dogBirthday.getDate() + dogYearLength * (nextDogYear - zodiacInfo.year));

    if (nextDogBirthday < today) {
        nextDogBirthday.setFullYear(nextDogBirthday.getFullYear() + 1);
    }

    const daysUntilNextDogBirthday = Math.ceil((nextDogBirthday - today) / (1000 * 60 * 60 * 24));
    const nextBirthdayText = `The next birthday of ${dogName} will be on the ${ordinalSuffix(zodiacInfo.day)} day of the ${nextYearName} year in the cycle, which is in ${daysUntilNextDogBirthday} days.`;

    document.getElementById("zodiacResult").innerHTML = `${dogName} was born on the ${ordinalSuffix(zodiacInfo.day)} day of the ${yearNames[zodiacInfo.year - 1]} year in the cycle.`;
    document.getElementById("nextDogBirthday").innerHTML = nextBirthdayText;
}

console.log("JavaScript loaded.");