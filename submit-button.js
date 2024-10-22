//💙 MEMBERSCRIPT #108 v0.1 💙 CUSTOM FORM SUBMIT BUTTON


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with the ms-code-submit-new attribute
    const newSubmitButtons = document.querySelectorAll('[ms-code-submit-new]');

    // Add click event listeners to each new submit button
    newSubmitButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default action if it's a link

            // Get the value of the ms-code-submit-new attribute
            const submitId = this.getAttribute('ms-code-submit-new');

            // Find the corresponding old submit button
            const oldSubmitButton = document.querySelector(`[ms-code-submit-old="${submitId}"]`);

            // If found, trigger a click on the old submit button
            if (oldSubmitButton) {
                oldSubmitButton.click();
            } else {
                console.error(`No matching old submit button found for ID: ${submitId}`);
            }
        });
    });
});