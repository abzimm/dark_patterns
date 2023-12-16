function fadeOut() {
    document.body.classList.add('fade-out');
    document.body.classList.remove('fade-in');
}

function fadeIn() {
    document.body.classList.add('fade-in');
    document.body.classList.remove('fade-out');
}

// Set up an event listener for page load
window.addEventListener('load', function () {
    // Add the fade-in class to initiate the transition
    fadeIn();
});

// Set up an event listener for anchor clicks
document.addEventListener('click', function (event) {
    // Check if the clicked element is an anchor tag
    if (event.target.tagName === 'A') {
        // Prevent the default link behavior
        event.preventDefault();

        // Add the fade-out class to initiate the transition
        fadeOut();

        // Navigate to the new page after the transition is complete (0.5 seconds in this example)
        setTimeout(function () {
            window.location.href = event.target.href;
        }, 500);
    }
});