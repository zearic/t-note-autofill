// Check the current page URL
if (window.location.href.includes("working-details.php")) {
  // If we are on the working-details.php page, observe changes and process divs
  observeDOMChanges();
} else if (window.location.href.includes("treatment-note.php")) {
  // If we are on the treatment-note.php page, autofill the form
  observeFormCreation();
}
// Function to observe form creation and autofill when the form is ready (in treatment-note.php)
function observeFormCreation() {
  // Start observing the body for the creation of the treatment_note_form
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check if the node added is the form we're looking for
        if (node.id === "treatment_note_form") {
          // Once the form is created, autofill it
          autofillForm();
          observer.disconnect(); // Stop observing once the form is found and autofilled
        }
      });
    });
  });

  // Observe the document body for changes (you can customize the target if necessary)
  observer.observe(document.body, {
    childList: true, // Watch for the addition/removal of direct children
    subtree: true, // Also watch the entire subtree for changes
  });
}

// Function to monitor DOM changes (using MutationObserver)
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check if the node added is the form we're looking for
        if (node.id === "working-details") {
          // Once the form is created, autofill it
          readValues();
          observer.disconnect(); // Stop observing once the form is found and autofilled
        }
      });
    });
  });

  // Observe the document body for changes (you can customize the target if necessary)
  observer.observe(document.body, {
    childList: true, // Watch for the addition/removal of direct children
    subtree: true, // Also watch the entire subtree for changes
  });
}
