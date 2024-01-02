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
    const birthDayOrdinal = ordinalSuffix(zodiacInfo.day);

    // Map of year numbers to names
    const yearNames = ["The Adventurer", "The Braveheart", "The Companion", "The Dreamer", "The Explorer", "The Faithful", "The Guardian"];
    const yearName = yearNames[(zodiacInfo.year - 1) % yearNames.length];

    const birthZodiacText = `${dogName} was born on the ${birthDayOrdinal} day of the ${yearName} year in the cycle.`;
    const ageText = `${dogName} is ${ageInDogYears} dog years and ${ageInDogDays} dog days old.`;

    // Calculate days until next birthday
    let nextBirthday = new Date(dogBirthday.getTime());
    nextBirthday.setFullYear(today.getFullYear());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    const nextBirthdayText = `The next birthday of ${dogName} in dog years will be in ${daysUntilNextBirthday} days.`;

    document.getElementById("zodiacResult").innerHTML = birthZodiacText;
    document.getElementById("ageResult").innerHTML = ageText;
    document.getElementById("nextDogBirthday").innerHTML = nextBirthdayText;
}

console.log("JavaScript loaded.");