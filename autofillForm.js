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
  ["1", "2"].map((i) => {
    document.querySelector('input[name="consent_recived"][value="' + i + '"]').checked = true;
  });
  document.querySelector('input[name="therapist_name"]').value = "B-1016 Yi Wang";

  document.querySelector('input[name="techniques_used"][value="1"]').checked = true;

  ["1", "2", "3", "9", "10", "11", "12"].map((i) => {
    document.querySelector('input[name="area_treated"][value="' + i + '"]').checked = true;
  });
  document.querySelectorAll("textarea").forEach((t) => {
    t.rows = 3;
    t.style.width = "70%";
  });

  const tType = params.get("tType");
  const type = TREATMENT_TYPES.filter((t) => t.code === tType)[0];
  if (type) {
    document.querySelector('textarea[name="clinical_finding"]').value = type.findings;
    document.querySelector('textarea[name="clinical_reaction"]').value = type.clientReaction;
    document.querySelector('textarea[name="recommended_selfcare"]').value = type.recommendation;
  }
}
