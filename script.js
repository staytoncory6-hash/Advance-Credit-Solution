// script.js
// Shared behavior for Elite AI Credit Repair site
// - Auto year in footer
// - "Ask AI" helper tied into monthly services
// - Safe front-end only (no real API keys in browser)

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
   * 1. Auto-update footer year
   * ========================= */
  const currentYear = new Date().getFullYear();
  const yearIds = [
    "year",
    "year-home",
    "year-book",
    "year-services",
    "year-contact",
    "year-membership"
  ];

  yearIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = currentYear;
  });

  /* =========================
   * 2. Ask AI widget
   *
   * Expected HTML (can be on Home, Services, or Contact):
   *
   * <section id="ask-ai-section">
   *   <h2>Ask AI About Your Credit</h2>
   *   <form id="ask-ai-form">
   *     <textarea
   *       id="ask-ai-input"
   *       placeholder="Ask a question about your credit, monthly services, disputes, or rebuilding..."
   *       rows="4"
   *     ></textarea>
   *     <button type="submit" class="btn-primary">Ask AI</button>
   *   </form>
   *   <div id="ask-ai-output"></div>
   * </section>
   *
   * ========================= */
  const askAiForm = document.getElementById("ask-ai-form");
  const askAiInput = document.getElementById("ask-ai-input");
  const askAiOutput = document.getElementById("ask-ai-output");

  if (askAiForm && askAiInput && askAiOutput) {
    askAiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const rawQuestion = askAiInput.value.trim();

      if (!rawQuestion) {
        askAiOutput.innerHTML = `
          <p><strong>AI:</strong> Ask me something specific about your credit report, one of the monthly plans, or a dispute you’re thinking about. I’ll walk you through how to handle it.</p>
        `;
        return;
      }

      const q = rawQuestion.toLowerCase();

      // Decide what type of explanation to give
      let responseHtml = "";

      if (q.includes("starter") || q.includes("basic")) {
        responseHtml = aiExplainStarterPlan(rawQuestion);
      } else if (q.includes("elite") || q.includes("restoration") || q.includes("full")) {
        responseHtml = aiExplainElitePlan(rawQuestion);
      } else if (q.includes("book") || q.includes("digital") || q.includes("ebook")) {
        responseHtml = aiExplainBook(rawQuestion);
      } else if (
        q.includes("monthly") ||
        q.includes("service") ||
        q.includes("plan") ||
        q.includes("subscription")
      ) {
        responseHtml = aiExplainMonthlyServices(rawQuestion);
      } else if (
        q.includes("dispute") ||
        q.includes("collection") ||
        q.includes("charge off") ||
        q.includes("charge-off") ||
        q.includes("late")
      ) {
        responseHtml = aiExplainDispute(rawQuestion);
      } else if (
        q.includes("rebuild") ||
        q.includes("rebuilding") ||
        q.includes("trade line") ||
        q.includes("tradeline") ||
        q.includes("rent")
      ) {
        responseHtml = aiExplainRebuilding(rawQuestion);
      } else {
        responseHtml = aiGenericCreditAnswer(rawQuestion);
      }

      askAiOutput.innerHTML = responseHtml;
      askAiInput.value = "";
    });
  }

  /* =========================
   * 3. Make monthly service buttons talk to Ask AI
   *
   * Add data attributes to your buttons on Services page, like:
   *
   * <button
   *   class="btn-primary ask-ai-plan"
   *   data-plan="starter"
   * >
   *   Ask AI About Starter Clean-Up
   * </button>
   *
   * <button
   *   class="btn-primary ask-ai-plan"
   *   data-plan="elite"
   * >
   *   Ask AI About Elite Restoration
   * </button>
   *
   * <button
   *   class="btn-primary ask-ai-plan"
   *   data-plan="education"
   * >
   *   Ask AI About Education + DIY Assist
   * </button>
   *
   * ========================= */
  const planButtons = document.querySelectorAll(".ask-ai-plan");
  if (planButtons.length && askAiInput && askAiOutput) {
    planButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const plan = btn.getAttribute("data-plan") || "";

        let prefill = "";

        switch (plan.toLowerCase()) {
          case "starter":
            prefill =
              "Explain the Starter Clean-Up monthly service and who it is best for. Also tell me what kind of results timeline is realistic.";
            break;
          case "elite":
            prefill =
              "Explain the Elite Restoration monthly service and who should choose this level. Include when it makes sense to go beyond basic disputes.";
            break;
          case "education":
            prefill =
              "Explain the Education + DIY Assist option and how it works with the digital book and AI help.";
            break;
          default:
            prefill =
              "Explain the monthly services and help me choose which plan fits my situation best.";
        }

        askAiInput.value = prefill;

        // Smooth scroll to Ask AI section if it exists
        const askSection = document.getElementById("ask-ai-section");
        if (askSection) {
          askSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Also immediately trigger a response so they see something right away
        if (askAiForm) {
          askAiForm.dispatchEvent(new Event("submit"));
        }
      });
    });
  }
});

/* =========================
 * AI helper "responses"
 * NOTE: These are local templates, not real API calls.
 * ========================= */

function aiExplainStarterPlan(question) {
  return `
    <p><strong>You asked:</strong> ${escapeHtml(question)}</p>
    <p><strong>AI:</strong> The <strong>Starter Clean-Up</strong> monthly service is best if your credit report
    is messy but not a total disaster. Think: a handful of collections, some late payments, and outdated personal info.</p>
    <ul>
      <li>We focus on cleaning up <em>inaccurate, incomplete, or outdated</em> negative items.</li>
      <li>We update personal information (names, addresses, employers) to remove old "baggage."</li>
      <li>We provide dispute letters and tracking so you know who was contacted and when.</li>
      <li>You also get basic rebuilding guidance so new positive history starts working for you.</li>
    </ul>
    <p><strong>Timeline:</strong> Most people start seeing movement within 30–90 days, but every file is different.
    You’ll get more consistent results if you open and read your mail and send us copies of responses.</p>
  `;
}

function aiExplainElitePlan(question) {
  return `
    <p><strong>You asked:</strong> ${escapeHtml(question)}</p>
    <p><strong>AI:</strong> The <strong>Elite Restoration</strong> monthly service is built for serious clean-up.
    It’s for people with heavier damage: multiple collections, charge-offs, public records, or identity theft issues.</p>
    <ul>
      <li>We go beyond basic disputes and use more advanced letters (incomplete info, returned mail, reinsertion, etc.).</li>
      <li>We help you organize documentation: police reports, proof of identity theft, and supporting evidence.</li>
      <li>We map out a full-year strategy: clean-up <em>and</em> rebuilding with new trade lines and rent reporting.</li>
      <li>This is the plan when you’re serious about future home, car, or business financing and want a guided partner.</li>
    </ul>
    <p><strong>Timeline:</strong> Deep restorations are often a 6–12 month project, but the goal is permanent changes,
    not quick gimmicks that fall apart later.</p>
  `;
}

function aiExplainBook(question) {
  return `
    <p><strong>You asked:</strong> ${escapeHtml(question)}</p>
    <p><strong>AI:</strong> The <strong>Masters of the Unknown</strong> digital book is your education piece.
    It shows you how the laws, regulators, public records, and advanced letters actually work behind the scenes.</p>
    <ul>
      <li>You learn who the regulators are (FTC, CFPB, State AG, OCC) and how to use them when companies ignore you.</li>
      <li>You see how public records and data miners like LexisNexis create loopholes for removal.</li>
      <li>You get structures for letters you can use forever, even if you move or get new accounts.</li>
      <li>When you combine the book with the Ask AI box, you basically have your own credit coach on standby 24/7.</li>
    </ul>
    <p>If you want to stay in control of your own file and understand <em>why</em> things work, the book is a great fit.</p>
  `;
}

function aiExplainMonthlyServices(question) {
  return `
    <p><strong>You asked:</strong> ${escapeHtml(question)}</p>
    <p><strong>AI:</strong> Elite AI Credit Repair monthly services are designed so you’re not guessing or doing this alone.</p>
    <ul>
      <li><strong>Starter Clean-Up:</strong> For lighter files with a few negatives and basic organization needed.</li>
      <li><strong>Elite Restoration:</strong> For heavy damage, identity theft, public records, and complicated histories.</li>
      <li><strong>Education + DIY Assist:</strong> For people who want to do most of the work themselves but still want guidance, letters, and the digital book.</li>
    </ul>
    <p>When you tell us about your situation on the Contact page, we match you with the smallest plan that can still
    realistically hit your goals. We don’t believe in overselling – the best plan is the one that fits your budget
    and timeline without stressing you out.</p>
  `;
}

function aiExplainDispute(question) {
  return `
    <p><strong>You asked:</strong> ${escapeHtml(question)}</p>
    <p><strong>AI:</strong> When you’re disputing a collection, charge-off, or late payment, think in terms of
    <strong>accuracy, completeness, and proof</strong>, not magic wording.</p>
    <ol>
      <li>Identify the exact account on your report (creditor name, account number, dates, balance).</li>
      <li>Decide why it’s a problem: not yours, wrong balance/date, incomplete info, or unverifiable.</li>
      <li>Write a short, clear letter to the bureaus explaining what’s wrong and what you want corrected or deleted.</li>
      <li>Include copies of ID and any proof you have (statements, letters, police report, etc.).</li>
      <li>Send by mail with tracking and keep copies. Mark the date so you can follow up if they ignore you.</li>
    </ol>
    <p>If you paste a sample of the way the account appears on your credit report (leave out full SSN or account numbers),
    I can help you reword it into a stronger paragraph for your dispute letter.</p>
  `;
}

function aiExplainRebuilding(question) {
  return `
    <p><strong>You asked:</strong> ${escapeHtml(question)}</p>
    <p><strong>AI:</strong> Rebuilding is the second half of the game after clean-up. Lenders want to see that
    you’re handling credit well <em>right now</em>, not just that old negatives disappeared.</p>
    <ul>
      <li>Consider <strong>secured cards</strong>, <strong>credit-builder loans</strong>, and <strong>rent reporting</strong> to stack positive history.</li>
      <li>Keep utilization low – often under 30%, and ideally under 10% of your limits.</li>
      <li>Never miss payments on the new accounts; one late can undo a lot of progress.</li>
      <li>Piggybacking (authorized user trade lines) can help, but only when done safely with people you trust.</li>
    </ul>
    <p>The right monthly service plan can help you choose and time these moves so you’re not opening the wrong accounts or over-applying.</p>
  `;
}

function aiGenericCreditAnswer(question) {
  return `
    <p><strong>You asked:</strong> ${escapeHtml(question)}</p>
    <p><strong>AI:</strong> I can’t see your actual credit report from here, but I can help you think like a professional:</p>
    <ol>
      <li>Get all three reports (Experian, Equifax, TransUnion) and save them with today’s date.</li>
      <li>Highlight negatives (collections, charge-offs, lates, public records) and separate “definitely mine” vs “questionable.”</li>
      <li>Clean up personal information first – old names, addresses, and employers that don’t belong.</li>
      <li>Dispute items that are inaccurate, incomplete, or unverifiable in writing with proof and tracking.</li>
      <li>At the same time, start rebuilding with new positive accounts that make sense for your budget.</li>
    </ol>
    <p>If you tell me whether your main goal is a car, home, or just breathing room, I can also suggest which monthly
    service tier usually fits that kind of goal.</p>
  `;
}

/* ========== Helper: simple HTML escape ========== */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
