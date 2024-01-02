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

    // Map of year numbers to names
    const yearNames = ["The Adventurer", "The Braveheart", "The Companion", "The Dreamer", "The Explorer", "The Faithful", "The Guardian"];
    const yearName = yearNames[(zodiacInfo.year - 1) % yearNames.length];

    // Calculate the next dog birthday
    const nextDogYear = (zodiacInfo.year % 7) + 1; // Assuming a 7-year cycle
    const daysInYear = (nextDogYear === 1 && ageInDogYears > 0) ? 366 : 365; // Considering leap year in dog years
    let nextDogBirthday = new Date(dogBirthday.getTime());
    nextDogBirthday.setDate(dogBirthday.getDate() + daysInYear);

    if (nextDogBirthday < today) {
        nextDogBirthday.setDate(nextDogBirthday.getDate() + 365);
    }

    const daysUntilNextDogBirthday = Math.ceil((nextDogBirthday - today) / (1000 * 60 * 60 * 24));

    const nextYearName = yearNames[nextDogYear - 1];
    const nextBirthdayText = `The next birthday of ${dogName} will be on the ${ordinalSuffix(zodiacInfo.day)} day of the ${nextYearName} year in the cycle, which is in ${daysUntilNextDogBirthday} days.`;

    document.getElementById("zodiacResult").innerHTML = `${dogName} was born on the ${ordinalSuffix(zodiacInfo.day)} day of the ${yearName} year in the cycle.`;
    document.getElementById("nextDogBirthday").innerHTML = nextBirthdayText;
}