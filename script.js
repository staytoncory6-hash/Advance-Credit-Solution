/* =========================================================
   GLOBAL CONFIG
   ========================================================= */
const OPENAI_API_KEY = "PASTE_YOUR_OPENAI_API_KEY_HERE"; 
// 👆 IMPORTANT:
// 1. Log in to your OpenAI account
// 2. Create an API key
// 3. Paste it here as a string
// 4. Do NOT commit the real key to public GitHub in the future.
//    For a real business, this should live on a backend server,
//    NOT in the browser.

/* =========================================================
   HELPER: SAFE LOG
   ========================================================= */
function safeLog(...args) {
  if (typeof console !== "undefined") {
    console.log(...args);
  }
}

/* =========================================================
   HELPER: CALL OPENAI "ASK AI"
   ========================================================= */
async function askOpenAI(question, extraContext = "") {
  if (!OPENAI_API_KEY || OPENAI_API_KEY.includes("PASTE_YOUR_OPENAI_API_KEY_HERE")) {
    throw new Error(
      "Missing OpenAI API key. Edit script.js and replace PASTE_YOUR_OPENAI_API_KEY_HERE with your real key."
    );
  }

  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const body = {
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a friendly, clear credit and finance assistant for Stayton Credit Solutions. " +
          "Explain things in simple terms, no legal advice, and encourage people to talk to a professional for big decisions."
      },
      {
        role: "user",
        content: extraContext
          ? `${extraContext}\n\nClient question: ${question}`
          : question
      }
    ],
    max_tokens: 400,
    temperature: 0.4
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || "Error from AI service.";
    throw new Error(message);
  }

  const answer = data.choices?.[0]?.message?.content || "";
  return answer.trim();
}

/* =========================================================
   ASK AI WIDGET SETUP
   Works on ALL pages: index.html, book.html, contact.html
   ========================================================= */
/*
  HTML expectations (any of these will work):

  FORM:
    <form id="ask-ai-form">...</form>
    OR <form id="askAiForm">...</form>
    OR <form class="ask-ai-form">...</form>

  QUESTION INPUT (inside the form):
    <textarea id="ask-ai-question"></textarea>
    OR <textarea id="askAiQuestion"></textarea>
    OR <textarea class="ask-ai-question"></textarea>
    OR <input type="text" ...>

  ANSWER BOX:
    <div id="ask-ai-answer"></div>
    OR <div id="askAiAnswer"></div>
    OR <div class="ask-ai-answer"></div>

  STATUS TEXT (optional, for "Thinking..." etc.):
    <div id="ask-ai-status"></div>
    OR <div id="askAiStatus"></div>
    OR <div class="ask-ai-status"></div>
*/

function setupAskAIWidgets() {
  // Collect any possible Ask AI forms on the page
  const forms = Array.from(
    document.querySelectorAll(
      "form#ask-ai-form, form#askAiForm, form.ask-ai-form, form[data-ask-ai='form']"
    )
  );

  if (!forms.length) {
    safeLog("Ask AI: no forms found on this page (that's okay on some pages).");
    return;
  }

  forms.forEach((form) => {
    const questionInput =
      form.querySelector(
        "#ask-ai-question, #askAiQuestion, .ask-ai-question, [data-ask-ai='question'], textarea, input[type='text']"
      ) || null;

    // Try to find answer box close to form, or by ID
    let answerBox =
      document.querySelector(form.getAttribute("data-answer-target") || "") ||
      form.querySelector(
        "#ask-ai-answer, #askAiAnswer, .ask-ai-answer, [data-ask-ai='answer']"
      ) ||
      document.querySelector("#ask-ai-answer, #askAiAnswer");

    // Optional status element
    let statusBox =
      form.querySelector(
        "#ask-ai-status, #askAiStatus, .ask-ai-status, [data-ask-ai='status']"
      ) || document.querySelector("#ask-ai-status, #askAiStatus");

    const submitBtn =
      form.querySelector("button[type='submit'], .ask-ai-submit") || null;

    if (!questionInput || !answerBox) {
      safeLog("Ask AI: missing questionInput or answerBox; skipping this form.");
      return;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const question = questionInput.value.trim();
      if (!question) {
        if (statusBox) {
          statusBox.textContent = "Type your question first.";
        } else {
          alert("Type your question first.");
        }
        return;
      }

      // Optional extra context per page
      let context = "";
      if (document.body.dataset.page === "book") {
        context =
          "The client is viewing the digital book 'Masters of the Unknown' about credit repair secrets.";
      } else if (document.body.dataset.page === "contact") {
        context = "The client is on the contact page for Stayton Credit Solutions.";
      } else {
        context = "The client is on the main Stayton Credit Solutions website.";
      }

      // UI: show loading
      if (statusBox) statusBox.textContent = "Thinking... please wait.";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = "Thinking...";
      }

      // Clear previous answer (optional)
      answerBox.textContent = "";

      try {
        const answer = await askOpenAI(question, context);
        answerBox.textContent = answer;
        if (statusBox) statusBox.textContent = "Answer ready ✅";
      } catch (err) {
        console.error(err);
        answerBox.textContent =
          "Sorry, something went wrong talking to the AI. Try again in a minute.";
        if (statusBox) {
          statusBox.textContent = err.message || "Error talking to AI.";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtn.dataset.originalText) {
            submitBtn.textContent = submitBtn.dataset.originalText;
          } else {
            submitBtn.textContent = "Ask AI";
          }
        }
      }
    });
  });
}

/* =========================================================
   NAVIGATION + SMOOTH SCROLL (OPTIONAL HELPERS)
   ========================================================= */

function setupSmoothScrollLinks() {
  const links = document.querySelectorAll("a[data-scroll], a[href^='#']");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* =========================================================
   MOBILE MENU TOGGLE (IF YOU HAVE ONE)
   ========================================================= */

function setupMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

/* =========================================================
   FOOTER YEAR AUTO-UPDATE
   ========================================================= */

function setupDynamicYear() {
  const yearSpan = document.querySelector("#currentYear, .current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* =========================================================
   CONTACT FORM (BASIC FRONT-END CHECK ONLY)
   ========================================================= */

function setupContactForm() {
  const form =
    document.querySelector("#contactForm") ||
    document.querySelector("form.contact-form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    // Only do basic validation here.
    const name = form.querySelector("input[name='name']");
    const email = form.querySelector("input[name='email']");
    const message = form.querySelector("textarea[name='message']");

    if (
      (name && !name.value.trim()) ||
      (email && !email.value.trim()) ||
      (message && !message.value.trim())
    ) {
      e.preventDefault();
      alert("Please fill out your name, email, and message before sending.");
    }
  });
}

/* =========================================================
   CASH APP / PLAN BUTTON (IF YOU USE IT)
   ========================================================= */

function setupPlanButton() {
  const button =
    document.querySelector("#generatePlanButton") ||
    document.querySelector(".generate-plan-btn");

  if (!button) return;

  button.addEventListener("click", () => {
    alert(
      "Before we build your custom plan, payment must be completed via Cash App as listed on the page."
    );
    // If you want: you can deep-link to your Cash App $cashtag page here.
    // window.open("https://cash.app/$YourCashtagHere", "_blank");
  });
}

/* =========================================================
   INITIALIZE EVERYTHING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  safeLog("script.js loaded: initializing website features...");

  setupAskAIWidgets();      // 🔥 Ask AI works on all pages
  setupSmoothScrollLinks(); // optional
  setupMobileMenu();        // optional
  setupDynamicYear();       // optional
  setupContactForm();       // optional
  setupPlanButton();        // optional
});
