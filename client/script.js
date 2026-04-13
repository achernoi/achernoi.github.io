// Calendar dropdown
function updateCalendar() {
    const season = document.getElementById("season").value;
    const output = document.getElementById("calendarOutput");

    if (season === "spring") {
        output.innerHTML = "Plant tomatoes, carrots, lettuce.";
    } else if (season === "summer") {
        output.innerHTML = "Plant beans and peppers.";
    } else if (season === "fall") {
        output.innerHTML = "Plant spinach and kale.";
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