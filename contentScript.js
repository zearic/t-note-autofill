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

// Function to autofill the form on treatment-note.php
function autofillForm() {
  // Retrieve query parameters from URL
  const params = new URLSearchParams(window.location.search);

  // Fill the form fields with query parameter values
  document.querySelector('input[name="treatment_note_for"]').value = params.get("treatment_note_for");
  document.querySelector('input[name="treatment_date"]').value = params.get("treatment_date");
  document.querySelector('input[name="duration_time"]').value = params.get("duration_time");
  document.querySelector('input[name="fee"]').value = params.get("fee");

  // Pre-fill consent and therapist fields
  document.querySelector('input[name="consent_recived"][value="1"]').checked = true;
  document.querySelector('input[name="consent_recived"][value="2"]').checked = true;
  document.querySelector('input[name="therapist_name"]').value = "B-1016 Yi Wang";
}

// Function to process all the necessary divs and modify T Note links
function processDivs() {
  // Find all divs with the specific style
  const dataDivs = document.querySelectorAll("#working-details>div");

  // Iterate over each div and extract the necessary information
  dataDivs.forEach((dataDiv) => {
    // Extract information from the current div
    const clientName = findValue("Client's Name: ", dataDiv.childNodes);

    const receiptDate = findValue("Receipt Date: ", dataDiv.childNodes);
    const receiptTime = findValue("Receipt Time: ", dataDiv.childNodes)?.replace(" Mins", "") || "";
    const totalAmount = findValue("Total Amount : ", dataDiv.childNodes);

    // Find the T Note link within the current div
    const tNoteLink = dataDiv.querySelector('a[href*="treatment-note.php"]');

    // If the T Note link exists, append the query parameters
    if (tNoteLink) {
      tNoteLink.href += `&treatment_note_for=${encodeURIComponent(clientName)}&treatment_date=${encodeURIComponent(
        receiptDate
      )}&duration_time=${encodeURIComponent(receiptTime)}&fee=${encodeURIComponent(totalAmount)}`;
    }
  });
}

const findValue = (name, nodeList) => {
  for (let i = 0; i < nodeList.length; i++) {
    let item = nodeList[i];
    if (name === item.textContent) return nodeList[i + 1].textContent?.trim() || "";
  }
};

// Function to monitor DOM changes (using MutationObserver)
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    //   mutations.forEach((mutation) => {
    //     // Check if new nodes are added
    //     if (mutation.addedNodes.length) {
    //       // Call the function to process the new divs
    processDivs();
    //     }
    //   });
  });

  // Observe the document body for changes (you can customize the target if necessary)
  observer.observe(document.body, {
    childList: true, // Watch for the addition/removal of direct children
    subtree: true, // Also watch the entire subtree for changes
  });
}
