// =======================
// ELITE AI CREDIT REPAIR
// Global site script
// =======================

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  wireAskAIOnAllForms();
  wireResourceSmoothScroll();
  wireContactFormMessage();
  wireAuthPlaceholders();
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
// Ask AI – works on ANY form
// with class="ask-ai-form"
// -----------------------
function wireAskAIOnAllForms() {
  const forms = document.querySelectorAll(".ask-ai-form");
  if (!forms.length) return;

  forms.forEach((form) => {
    const textarea = form.querySelector("textarea");
    const responseBox = form.querySelector(".ask-ai-response");
    const submitButton = form.querySelector('button[type="submit"]');

    if (!textarea || !responseBox) return;

    // Make sure button is clickable
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

      // Try to grab any snapshot-style fields if they exist on this page
      const snapshot = readPublicSnapshotFields();

      const reply = buildAiStyleReply(question, snapshot);
      responseBox.textContent = reply;
    });
  });
}

// Try to read the public snapshot fields if they exist on the page
function readPublicSnapshotFields() {
  const data = {
    collections: valueOrNull("#ps-collections"),
    chargeoffs: valueOrNull("#ps-chargeoffs"),
    lates: valueOrNull("#ps-lates"),
    repos: valueOrNull("#ps-repos"),
    utilization: valueOrNull("#ps-utilization"),
  };

  // Check if at least one field has something
  const hasAny =
    data.collections ||
    data.chargeoffs ||
    data.lates ||
    data.repos ||
    data.utilization;

  return hasAny ? data : null;
}

function valueOrNull(selector) {
  const el = document.querySelector(selector);
  if (!el) return null;
  const val = el.value.trim();
  return val ? val : null;
}

// Build the fake AI reply – educational only
function buildAiStyleReply(question, snapshot) {
  let intro =
    "Educational guidance only – not legal, tax, or investment advice.\n\n" +
    `You asked: "${question}".\n\n`;

  if (snapshot) {
    intro += "Based on the numbers you shared:\n";

    if (snapshot.collections)
      intro += `• Collections: ${snapshot.collections}\n`;
    if (snapshot.chargeoffs)
      intro += `• Charge-offs: ${snapshot.chargeoffs}\n`;
    if (snapshot.lates)
      intro += `• Late payments (24 months): ${snapshot.lates}\n`;
    if (snapshot.repos)
      intro += `• Repos / judgments: ${snapshot.repos}\n`;
    if (snapshot.utilization)
      intro += `• Utilization: ${snapshot.utilization}\n`;

    intro += "\nHere’s a solid way to start:\n\n";
  }

  const steps =
    "1. Pull all three credit reports (Equifax, Experian, TransUnion) from annualcreditreport.com and save each as a PDF.\n" +
    "2. Make a list of every negative item: collections, charge-offs, late payments, public records, and hard inquiries.\n" +
    "3. Mark anything that looks inaccurate, duplicated, incomplete, or older than the reporting time limit.\n" +
    "4. Dispute only a few items at a time so you can track responses and deadlines without getting overwhelmed.\n" +
    "5. Keep copies of every letter and every response in one folder – that paper trail protects you if someone ignores the law.\n" +
    "6. While disputes are running, focus on lowering utilization and keeping every new payment on time.\n";

  const closer =
    "\nRemember: you don’t have to fix everything overnight. The goal is to keep making the next right move so your credit starts telling the real story about you over time.";

  return intro + steps + closer;
}

// -----------------------
// Free Resources – smooth scroll
// from top cards to detail sections
// -----------------------
function wireResourceSmoothScroll() {
  const cardLinks = document.querySelectorAll('.resource-card a[href^="#"]');
  if (!cardLinks.length) return;

  cardLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

// -----------------------
// Contact form – friendly frontend-only message
// -----------------------
function wireContactFormMessage() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    alert(
      "Thank you for reaching out to Elite AI Credit Repair.\n\nYour message has been noted. We’ll review the situation you described and follow up with next-step style guidance."
    );

    form.reset();
  });
}

// -----------------------
// Login / Signup placeholders
// (until Firebase auth is connected)
// -----------------------
function wireAuthPlaceholders() {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(
        "Login system is coming soon.\n\nRight now, your membership is handled directly through Elite AI Credit Repair. Use the Contact page if you need help with your account."
      );
      loginForm.reset();
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(
        "Account creation will be fully powered soon.\n\nFor now, you can choose your plan on the Membership page and pay via Cash App ($Cory12151983). Then use the Contact page to send your info so we can set everything up."
      );
      signupForm.reset();
    });
  }
}
