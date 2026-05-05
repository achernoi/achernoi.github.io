// Calendar dropdown
function selectSeasonPlants() {
    const season = document.getElementById("season").value;
    const output = document.getElementById("calendarOutput");

    if (season === "spring") {
        output.innerHTML = 
            "During the spring, the recommended crops to plant are lettuce, peas, carrots, kale, and strawberries. Spring offers cooler temperatures and increasing daylight, which supports early germination and leafy green growth.";
    } else if (season === "summer") {
        output.innerHTML = "During the summer, the recommended crops to plant are tomatoes, peppers, cucumbers, basil, and eggplants. Summer provides high sunlight and warm soil conditions ideal for fruiting and fast-growing plants.";
    } else if (season === "fall") {
        output.innerHTML = "During the fall, the recommended crops to plant are spinach, broccoli, carrots, and radishes. Fall offers cooler temperatures and stable growing conditions, ideal for leafy greens and root vegetables.";
    } else {
        output.innerHTML = "Select a season.";
    }
}

// Contact form validation
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("All fields are required.");
        return false;
    }

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) {
        alert("Enter a valid email.");
        return false;
    }

    alert("Form submitted!");
    return true;
}