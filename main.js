document.addEventListener("DOMContentLoaded", function() {
    showCurrentDogDate();
    document.getElementById("togglePassingDate").addEventListener("click", togglePassingDateField);
});
function calculateDogInfo() {
    const dogNameInput = document.getElementById("dogName").value;
    const dogName = dogNameInput || "Your dog";
    const userSuppliedDogBirthdayStr = document.getElementById("dogBirthday").value;
    const userSuppliedDogBirthday = parseDate(userSuppliedDogBirthdayStr);

    if (!userSuppliedDogBirthday) {
        document.getElementById("zodiacResult").innerHTML = "Please enter a valid birthday.";
        return;
    }

    const todayDate = new Date();
    const dogZodiacInfoOnBirthday = humanToDogZodiac(userSuppliedDogBirthday);
    const dogYearOnBirthday = dogZodiacInfoOnBirthday.year;
    const dogDayOfYearOnBirthday = dogZodiacInfoOnBirthday.day;
    const dogYearNameOnBirthday = getDogYearName(dogYearOnBirthday);

    const daysUntilNextDogYearBirthday = calculateDaysUntilNextDogBirthday(dogYearOnBirthday, dogDayOfYearOnBirthday);
    const humanDateForNextDogYearBirthday = calculateHumanDateForNextDogBirthday(todayDate, daysUntilNextDogYearBirthday);

    // Determine the dog year of the next birthday using the human date
    const nextDogBirthdayZodiacInfo = humanToDogZodiac(humanDateForNextDogYearBirthday);
    const nextDogBirthdayYear = nextDogBirthdayZodiacInfo.year;
    const nextDogYearName = getDogYearName(nextDogBirthdayYear);
    
    // Calculate the dog's age in dog years
   const dogAgeInDogYears = calculateDogAgeInDogYears(userSuppliedDogBirthday, todayDate);

    // Display results
    document.getElementById("zodiacResult").innerHTML = `${dogName} was born on the ${ordinalSuffix(dogDayOfYearOnBirthday)} day of the ${dogYearNameOnBirthday} year in the dog zodiac cycle. ${dogName} is ${dogAgeInDogYears} dog years old.`;
    document.getElementById("nextDogBirthday").innerHTML = `The next birthday of ${dogName} will be on the ${ordinalSuffix(dogDayOfYearOnBirthday)} day of the ${nextDogYearName} year in the dog zodiac cycle, which is in ${daysUntilNextDogYearBirthday} days. This approximately corresponds to the human date ${humanDateForNextDogYearBirthday.toLocaleDateString()}.`;
}