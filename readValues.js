// Function to process all the necessary divs and modify T Note links
function readValues() {
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
    // Find the View Doc link within the current div. it contains text "View Doc"
    const viewDocBtn = dataDiv.querySelector('a[href*="uploads"]');
    // If the view_doc_btn link exists, replace it with an image
    if (viewDocBtn) {
      const href = viewDocBtn.href;
      const fileExtension = href.split('.').pop().toLowerCase();
      if (fileExtension === 'pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = href;
        iframe.style.width = '100%';
        iframe.style.height = '500px'; // Set a fixed height for the PDF viewer
        dataDiv.insertBefore(iframe, viewDocBtn);
      } else {
        const img = document.createElement('img');
        img.src = href;
        img.alt = 'Document';
        img.style.width = '100%';
        img.style.height = 'auto';
        dataDiv.insertBefore(img, viewDocBtn);
      }
    }

    // If the T Note link exists, append the query parameters
    if (tNoteLink) {
      tNoteLink.href += `&treatment_note_for=${encodeURIComponent(clientName)}&treatment_date=${encodeURIComponent(
        receiptDate
      )}&duration_time=${encodeURIComponent(receiptTime)}&fee=${encodeURIComponent(totalAmount)}`;

      TREATMENT_TYPES.map((t) => {
        // Clone the T Note link
        const duplicateLink = tNoteLink.cloneNode(false);
        duplicateLink.href += "&tType=" + t.code;
        duplicateLink.innerHTML = t.code;
        // Insert the duplicate link right after the original link
        dataDiv.appendChild(duplicateLink);
      });
    }
  });
}

const findValue = (name, nodeList) => {
  for (let i = 0; i < nodeList.length; i++) {
    let item = nodeList[i];
    if (name === item.textContent) return nodeList[i + 1].textContent?.trim() || "";
  }
};
