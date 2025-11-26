// =======================
// ELITE AI CREDIT REPAIR
// Global site script
// =======================

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  wireAskAIOnAllForms();
});

// -----------------------
// Footer year
// -----------------------
function setCurrentYear() {
  const span = document.getElementById("year");
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}

// -----------------------
// Attach Ask AI to ANY form with class="ask-ai-form"
// -----------------------
function wireAskAIOnAllForms() {
  const forms = document.querySelectorAll(".ask-ai-form");
  if (!forms.length) return;

  forms.forEach((form) => {
    const textarea = form.querySelector("textarea");
    const responseBox = form.querySelector(".ask-ai-response");
    const submitButton = form.querySelector('button[type="submit"]');

    if (!textarea || !responseBox) return;

    // Make sure the response box is visible when we need it
    responseBox.style.display = "none";

    // Just in case the button was disabled in HTML
    if (submitButton) {
      submitButton.disabled = false;
    }

    // Clear message when user starts typing again
    textarea.addEventListener("input", () => {
      if (!textarea.value.trim()) {
        responseBox.style.display = "none";
        responseBox.textContent = "";
      }
    });

    // Handle submit
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const question = textarea.value.trim();
      if (!question) {
        responseBox.style.display = "block";
        responseBox.textContent =
          "Type your question first so I can give you a next step.";
        return;
      }

      // Show “thinking” message
      responseBox.style.display = "block";
      responseBox.textContent = "Thinking through your situation…";

      // Simulate a bit of delay so it feels natural
      setTimeout(() => {
        const reply = buildAiStyleReply(question);
        responseBox.textContent = reply;
      }, 400);
    });
  });
}

// -----------------------
// Fake AI reasoning (front-end only, educational)
// -----------------------
function buildAiStyleReply(question) {
  const lower = question.toLowerCase();

  const intro =
    "Educational guidance only – not legal, tax, or investment advice.\n\n" +
    `You asked: "${question}".\n\n`;

  // Tailor a block based on keywords
  let focusBlock = "";

  if (
    lower.includes("collection") ||
    lower.includes("collections") ||
    lower.includes("charge off") ||
    lower.includes("charge-off")
  ) {
    focusBlock =
      "Because you mentioned collections or charge-offs, here’s a smart way to start:\n" +
      "• Pull all three reports (Equifax, Experian, TransUnion) and list each negative account with the bureau, amount, and dates.\n" +
      "• Look for inaccuracies: wrong dates, wrong balance, duplicate accounts, or accounts that don’t belong to you.\n" +
      "• Dispute factual errors first and keep copies of every letter and response in one folder.\n\n";
  } else if (lower.includes("repo") || lower.includes("repossession")) {
    focusBlock =
      "Because you mentioned a repossession, timing and accuracy are key:\n" +
      "• Confirm the dates of default and repossession on each report.\n" +
      "• Check whether the balance and status match any paperwork you have.\n" +
      "• If something is off or you never received required notices, that can change how you approach disputes or settlements.\n\n";
  } else if (lower.includes("late") || lower.includes("30 days")) {
    focusBlock =
      "Because you mentioned late payments, focus on these areas:\n" +
      "• Verify the exact months and days reported late against your own records or bank statements.\n" +
      "• If a late is wrong or misdated, dispute it as inaccurate.\n" +
      "• If the late is accurate, your best play is strong on-time history going forward and keeping utilization low.\n\n";
  } else if (
    lower.includes("identity theft") ||
    lower.includes("id theft") ||
    lower.includes("fraud")
  ) {
    focusBlock =
      "Because you mentioned identity theft or fraud, you need a tight paper trail:\n" +
      "• File an identity theft report at IdentityTheft.gov (FTC) and get a police report if possible.\n" +
      "• Place fraud alerts (or a freeze) with all three bureaus.\n" +
      "• Dispute fraudulent accounts as identity theft and include copies of your reports and ID with your letters.\n\n";
  } else if (
    lower.includes("utilization") ||
    lower.includes("maxed") ||
    lower.includes("maxed out") ||
    lower.includes("%")
  ) {
    focusBlock =
      "Because you mentioned utilization / maxed-out cards, that’s a big scoring factor:\n" +
      "• Try to bring each card under about 30% of its limit, and under 10% if possible for best score impact.\n" +
      "• Even one card going from 90% used down to 20–30% can move your score more than removing a small collection.\n\n";
  } else if (lower.includes("inquiry") || lower.includes("hard pull")) {
    focusBlock =
      "Because you mentioned hard inquiries, here’s the deal:\n" +
      "• Legitimate hard pulls from when you actually applied for credit usually lose most impact after about a year.\n" +
      "• You can challenge inquiries that are clearly unauthorized or due to identity theft.\n\n";
  } else if (
    lower.includes("public record") ||
    lower.includes("bankruptcy") ||
    lower.includes("judgment")
  ) {
    focusBlock =
      "Because you mentioned public records or bankruptcy, accuracy and age matter a lot:\n" +
      "• Make sure dates, case numbers, and court names are correct on each report.\n" +
      "• Old or incorrectly reported public records can sometimes be challenged on accuracy and completeness grounds.\n\n";
  } else {
    focusBlock =
      "Let’s treat this like a general credit clean-up question:\n" +
      "• First, get crystal clear on what’s on each bureau.\n" +
      "• Then group problems: collections, charge-offs, late payments, inquiries, and public records.\n" +
      "• Start with the easiest wins and factual errors instead of trying to fix everything at once.\n\n";
  }

  const coreSteps =
    "Here are solid next steps to start with:\n" +
    "1. Pull all three credit reports (Equifax, Experian, TransUnion) from annualcreditreport.com and save each as a PDF.\n" +
    "2. Make a list of every negative item: collections, charge-offs, late payments, public records, and hard inquiries.\n" +
    "3. Mark anything that looks inaccurate, duplicated, incomplete, or older than the reporting time limit.\n" +
    "4. Dispute only a few items at a time so you can track responses and deadlines instead of getting overwhelmed.\n" +
    "5. Keep copies of every letter and every response in one folder – that paper trail protects you if bureaus or furnishers mess up.\n" +
    "6. While disputes are running, work on your utilization (how much of your credit limits you use) and avoid new late payments if you can help it.\n\n";

  const closing =
    "If you work with Elite AI Credit Repair, we’d turn this into a snapshot and a step-by-step game plan so you always know what you’re doing and why.\n";

  return intro + focusBlock + coreSteps + closing;
}
