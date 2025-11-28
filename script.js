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
// ========== FREE RESOURCES LOGIC ==========
const resourceCards = document.querySelectorAll(".resource-card");
const resourceDetail = document.getElementById("resource-detail");
const resourceDetailTitle = document.getElementById("resource-detail-title");
const resourceDetailBody = document.getElementById("resource-detail-body");

if (resourceCards && resourceDetail && resourceDetailTitle && resourceDetailBody) {
  resourceCards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-resource");
      if (!type) return;

      let title = "";
      let bodyHtml = "";

      // 1) CREDIT CLEANUP CHECKLIST
      if (type === "cleanup") {
        title = "Credit Cleanup Checklist (DIY Starter)";

        bodyHtml = `
          <p>
            This is a simple, high-level checklist to help you see where you stand
            before you ever send a dispute. Take your time and write everything
            down. The more organized you are, the more powerful your paper trail is.
          </p>

          <ol>
            <li>
              <strong>Pull all three reports.</strong>
              Get your reports from all three major bureaus. Print them or save PDFs.
              Label them with the date you pulled them.
            </li>
            <li>
              <strong>Highlight every negative item.</strong>
              Collections, charge-offs, late payments, public records, repossessions,
              etc. Mark which bureau(s) they appear on.
            </li>
            <li>
              <strong>Circle anything that looks “off.”</strong>
              Wrong dates, balances that make no sense, accounts you don’t recognize,
              old items that might be too old to report, duplicate entries.
            </li>
            <li>
              <strong>Create a simple tracking list.</strong>
              On paper or in a notebook, make columns for:
              <em>Creditor / Account name, Type of item, Bureau(s), What looks wrong, Date you’ll dispute.</em>
            </li>
            <li>
              <strong>Decide your first 3–5 targets.</strong>
              Start with the biggest, clearest problems instead of trying to fight
              everything at once.
            </li>
            <li>
              <strong>Plan your mailing order.</strong>
              Disputes should be sent in a logical order and within reasonable time
              frames – and every letter should be copied and saved.
            </li>
            <li>
              <strong>Set a follow-up reminder.</strong>
              Mark a date about 30–45 days after you send each letter to check for
              responses and updated reports.
            </li>
          </ol>

          <p>
            This checklist doesn’t fix your credit by itself, but it puts you in
            control and gives you a clear starting point before you ever write the
            first dispute letter.
          </p>
        `;
      }

      // 2) SAMPLE DISPUTE LETTER
      if (type === "sample-dispute") {
        title = "Simple Sample Dispute Letter (Inaccuracy)";

        bodyHtml = `
          <p>
            This is a basic example of a letter where you are disputing an inaccuracy.
            You must adjust it to match <strong>your</strong> real situation and your
            real reports. Do not copy-paste this without changing details.
          </p>

          <pre style="white-space: pre-wrap; font-size: 0.85rem; background: rgba(15,23,42,0.9); padding: 0.75rem; border-radius: 0.8rem; border: 1px solid rgba(148,163,184,0.6);">
Your Name
Your Address
City, State ZIP

Date: ____________

Name of Credit Bureau
Bureau Address
City, State ZIP

Re: Request for Investigation – Inaccurate Information on My Credit Report

To Whom It May Concern:

I am writing to dispute inaccurate information that appears on my credit report. 
Please investigate the items listed below under your responsibilities in the Fair 
Credit Reporting Act (FCRA) and either correct them or remove them if they cannot 
be verified as accurate and complete.

The item I am disputing is:

• Creditor / Collector Name: ____________________________
• Account Number (last 4 digits is fine): __________
• Type of account (collection, charge-off, etc.): __________

This information is inaccurate because: 
(briefly explain – for example: the balance is wrong, the dates are wrong, this 
is not my account, it was paid before it was sent to collections, it is older than 
the reporting period, etc.)

Based on this, I am requesting that you conduct a reasonable investigation and 
either correct this item or delete it from my credit file. Please send me an updated 
copy of my credit report showing the results of your investigation.

I have enclosed copies of any supporting documents that help explain my position.

Thank you for your attention to this matter.

Sincerely,

___________________________
Your Signature
Your Printed Name
Your Date of Birth
Last 4 digits of SSN
          </pre>

          <p>
            Always keep a copy of every letter you send and every response you receive.
            Your paper trail is what proves that you gave them a fair chance to fix
            the problem and that they failed to follow the law if they don’t.
          </p>
        `;
      }

      // 3) BUDGET SNAPSHOT
      if (type === "budget") {
        title = "Budget Snapshot – Know Your Money Flow";

        bodyHtml = `
          <p>
            Good credit repair isn’t just about deleting negatives – it’s also about
            making sure you don’t get new ones. This budget snapshot helps you
            see your real money situation on paper.
          </p>

          <p><strong>Step 1 – Write down your monthly income.</strong></p>
          <ul>
            <li>Take-home pay from job(s)</li>
            <li>Side gigs / extra income</li>
            <li>Benefits (if any)</li>
            <li>Any other regular money coming in</li>
          </ul>

          <p><strong>Step 2 – List your fixed bills.</strong></p>
          <ul>
            <li>Rent / Mortgage</li>
            <li>Car payment and insurance</li>
            <li>Utilities (average)</li>
            <li>Phone, internet, subscriptions</li>
            <li>Minimum payments on credit cards and loans</li>
          </ul>

          <p><strong>Step 3 – List your flexible spending.</strong></p>
          <ul>
            <li>Groceries and eating out</li>
            <li>Gas / transportation</li>
            <li>Personal spending (clothes, random buys, etc.)</li>
            <li>Kids, pets, and other household needs</li>
          </ul>

          <p><strong>Step 4 – Compare income vs. expenses.</strong></p>
          <ul>
            <li>Subtract all bills and spending from your monthly income.</li>
            <li>See if there is anything left over or if you are short.</li>
            <li>Circle 2–3 areas where you can realistically cut back.</li>
          </ul>

          <p><strong>Step 5 – Connect it to your credit plan.</strong></p>
          <ul>
            <li>
              Decide how much you can safely put toward past-due accounts or
              settlements <em>without</em> falling behind on current bills.
            </li>
            <li>
              Use this same budget every month so you can see your progress on paper.
            </li>
          </ul>

          <p>
            Your budget snapshot and your dispute letters work together. The budget
            helps you avoid new late payments while your letters and paper trail
            work on getting old damage removed.
          </p>
        `;
      }

      // 4) BOOK PREVIEW
      if (type === "book-preview") {
        title = "Book Preview – Credit Survival Guide by AI";

        bodyHtml = `
          <p>
            This book is built for people who are tired of guessing, tired of being
            scared of their own credit report, and ready to finally understand what’s
            really going on.
          </p>

          <p>
            Instead of just telling you “pay your bills on time,” the guide walks you
            through how credit really works: how information gets on your report, who
            is allowed to report it, what your rights are under the law, and how to
            use paper, timelines, and strategy to fight back.
          </p>

          <p>
            Inside, you’ll see: real-world examples, sample letters, explanations of
            the regulators you can complain to, and advanced ideas for rebuilding
            after the damage is cleaned up – all explained in plain language, not
            legal talk.
          </p>

          <p>
            The goal is simple: when you finish the full book, you should feel like
            you finally understand your credit report better than most people you
            talk to at the bank, and you’ll know how to protect yourself for the long
            term.
          </p>

          <p>
            This preview is just a taste. The full digital book goes deeper into the
            laws, the letters, timing, and the “do this next” steps that can turn you
            from confused and stressed into informed and confident.
          </p>
        `;
      }

      // Put the content into the detail box
      resourceDetailTitle.textContent = title;
      resourceDetailBody.innerHTML = bodyHtml;
      resourceDetail.classList.remove("hidden");

      // Scroll down to the detail area (nice on mobile)
      resourceDetail.scrollIntoView({ behavior: "smooth", block: "start" });
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
