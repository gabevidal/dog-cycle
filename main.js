function loadHTML(url, id, callback) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        document.getElementById(id).innerHTML += data;
        if (callback) {
            callback();
        }
    })
    .catch(error => console.error('Error loading the HTML section:', error));
}

function loadSections() {
    loadHTML('headerSection.html', 'mainContainer', function() {
        // Callback after header section is loaded, if needed
    });
    loadHTML('calendarReadingSection.html', 'mainContainer', function() {
        // Callback after calendar reading section is loaded, if needed
    });
    loadHTML('dogZodiacInfoSection.html', 'mainContainer', setUpEventListeners);
}

function setUpEventListeners() {
    // Set up event listeners here
    // Example: 
    document.getElementById("togglePassingDate").addEventListener("click", togglePassingDateField);
    showCurrentDogDate();
}

window.onload = loadSections; // Call loadSections when the window loads