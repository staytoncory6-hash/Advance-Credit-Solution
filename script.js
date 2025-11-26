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

    // In case button was disabled in HTML
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

      const reply = buildAiStyleReply(question);
      responseBox.textContent = reply;
    });
  });
}

// Fake AI response – educational only, same “old” style we liked
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

  const closer =
    "\nRemember: the goal isn’t to fix everything overnight. It’s to keep making the next right move so your credit tells the real story about you over time.";

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
// (since there’s no backend yet)
// -----------------------
function wireContactFormMessage() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Simple confirmation – could be upgraded later
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
