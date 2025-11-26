// =======================
// ELITE AI CREDIT REPAIR
// Global site script
// =======================

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();

  // Hook up ALL Ask AI forms that exist on any page
  setupAskAI("ask-ai-form", "ask-ai-input", "ask-ai-response", "general");
  setupAskAI("ask-ai-form-free", "ask-ai-input-free", "ask-ai-response-free", "free");
  setupAskAI("ask-ai-form-membership", "ask-ai-input-membership", "ask-ai-response-membership", "membership");
  setupAskAI("ask-ai-form-contact", "ask-ai-input-contact", "ask-ai-response-contact", "contact");
});

// ---- Footer year ----
function setCurrentYear() {
  const span = document.getElementById("year");
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}

// ---- Generic Ask AI handler ----
function setupAskAI(formId, inputId, responseId, contextLabel) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const responseBox = document.getElementById(responseId);

  // If this page doesn't have that form, just skip
  if (!form || !input || !responseBox) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = input.value.trim();

    if (!question) {
      responseBox.style.display = "block";
      responseBox.textContent = "Please type your question first so I can give you a next step.";
      return;
    }

    // Show a quick "thinking" message
    responseBox.style.display = "block";
    responseBox.textContent = "Thinking through your situation…";

    // Fake AI reply on the front-end (no backend needed)
    const reply = buildAiReply(question, contextLabel);
    responseBox.textContent = reply;
  });
}

// ---- Simple front-end AI style reply (educational only) ----
function buildAiReply(question, contextLabel) {
  const intro =
    "This is educational guidance, not legal, tax, or investment advice.\n\n" +
    `You asked: "${question}".\n\n`;

  let steps =
    "Here is a solid set of next steps to start with:\n" +
    "1. Pull all three credit reports (Equifax, Experian, TransUnion) from annualcreditreport.com and save PDFs.\n" +
    "2. Make a list of every negative item: collections, charge-offs, late payments, public records, hard inquiries.\n" +
    "3. Circle anything that looks wrong, older than 7 years (or 10 for BK), duplicated, or missing information.\n" +
    "4. Dispute only a few items at a time so responses are easier to track.\n" +
    "5. Keep copies of every letter you send and every response you get.\n";

  if (contextLabel === "membership") {
    steps +=
      "\nIf you become a member, we’d translate this into a step-by-step snapshot plan and help you track replies in your member dashboard.";
  } else if (contextLabel === "free") {
    steps +=
      "\nYou can also use the free checklist, dispute templates, and score guide on this page to plug these steps into real letters.";
  } else if (contextLabel === "contact") {
    steps +=
      "\nIf your situation is complex (identity theft, mixed files, or court records), sending this question through the contact form so a human can review it is a smart move.";
  }

  return intro + steps;
}
