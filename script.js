// =======================
// ELITE AI CREDIT REPAIR
// Global site script
// =======================

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  wireAskAIOnAllForms();
});

// ---- Footer year ----
function setCurrentYear() {
  const span = document.getElementById("year");
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}

// ---- Attach Ask AI to ANY form with class="ask-ai-form" ----
function wireAskAIOnAllForms() {
  const forms = document.querySelectorAll(".ask-ai-form");
  if (!forms.length) return;

  forms.forEach((form) => {
    const textarea = form.querySelector("textarea");
    const responseBox = form.querySelector(".ask-ai-response");
    const submitButton = form.querySelector('button[type="submit"]');

    if (!textarea || !responseBox) return;

    // Just in case button was disabled in HTML
    if (submitButton) submitButton.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const question = textarea.value.trim();
      if (!question) {
        responseBox.style.display = "block";
        responseBox.textContent =
          "Type your question first so I can give you a next step.";
        return;
      }

      responseBox.style.display = "block";
      responseBox.textContent = "Thinking through your situation…";

      // Build a simple educational-style reply
      const reply = buildAiStyleReply(question);
      responseBox.textContent = reply;
    });
  });
}

// ---- Fake AI reasoning (front-end only, educational) ----
function buildAiStyleReply(question) {
  const intro =
    "Educational guidance only – not legal, tax, or investment advice.\n\n" +
    `You asked: "${question}".\n\n`;

  const steps =
    "Here are solid next steps to start with:\n" +
    "1. Pull all three credit reports (Equifax, Experian, TransUnion) from annualcreditreport.com and save each as a PDF.\n" +
    "2. Make a list of every negative item: collections, charge-offs, late payments, public records, and hard inquiries.\n" +
    "3. Mark anything that looks inaccurate, duplicated, incomplete, or older than the reporting time limit.\n" +
    "4. Dispute only a few items at a time so you can track responses and deadlines.\n" +
    "5. Keep copies of every letter and every response in one folder – that paper trail protects you.\n" +
    "6. While disputes are running, work on utilization (how much of your credit limits you use) and on-time payments going forward.\n";

  return intro + steps;
}
