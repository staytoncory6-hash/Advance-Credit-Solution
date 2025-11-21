// ===========================================
// ELITE AI CREDIT REPAIR – FRONTEND BRAIN
// ===========================================

// Small helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// -------------------------------------------
// NAV TOGGLE (MOBILE)
// -------------------------------------------
(function initNav() {
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  // Close menu when clicking a link (mobile)
  links.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      links.classList.remove("open");
      /* =======================================
   SUPERHERO MASCOT REVEAL ANIMATION
======================================= */

.hero-mascot-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.hero-mascot-reveal {
  width: 220px;
  max-width: 80%;
  opacity: 0;
  transform: scale(0.4) rotate(-20deg);
  animation: heroReveal 2.4s ease-out forwards;
  filter: drop-shadow(0 12px 20px rgba(0,0,0,0.5));
}

@keyframes heroReveal {
  0% {
    opacity: 0;
    transform: scale(0.4) rotate(-20deg);
  }
  40% {
    opacity: 1;
    transform: scale(1.15) rotate(2deg);
  }
  65% {
    transform: scale(0.96) rotate(-1deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
    }
  });
})();

// -------------------------------------------
// FOOTER YEAR
// -------------------------------------------
(function setYear() {
  const yearEl = $("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// -------------------------------------------
// TYPEWRITER EFFECT
// -------------------------------------------
function typeOut(element, text, speed = 12) {
  if (!element) return;
  element.textContent = "";
  let i = 0;

  const id = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(id);
  }, speed);
}

// -------------------------------------------
// AI LOGIC – SOFT, HUMAN, & LAW-FIRST
// -------------------------------------------
const aiEngine = {
  // Basic “score range” classification
  scoreProfile(range) {
    switch (range) {
      case "sub500":
        return {
          label: "Heavy-Lift Zone",
          text:
            "Right now you’re in a score range where every move counts. " +
            "This isn’t about quick tricks — it’s about structure, law, and consistent action."
        };
      case "500-579":
        return {
          label: "Rebuild Zone",
          text:
            "You’re in a range where real momentum is possible over 3–6 months if we’re intentional " +
            "about errors, utilization, and fresh positive data."
        };
      case "580-639":
        return {
          label: "Almost-There Zone",
          text:
            "You’re closer than you think. The right mix of clean-up and rebuilding can make a real difference."
        };
      case "640-699":
        return {
          label: "Fine-Tune Zone",
          text:
            "Your profile likely needs fewer but more precise adjustments — cleaning what truly doesn’t belong " +
            "and tightening the way new accounts and balances show up."
        };
      case "700plus":
        return {
          label: "Optimization Zone",
          text:
            "You’re not in disaster territory at all. Here it’s mostly about keeping your file clean and " +
            "strategically optimizing for bigger goals."
        };
      default:
        return {
          label: "Unknown Range",
          text:
            "You didn’t choose a score range yet, which is okay. We can still build a plan around what’s on your reports and what you want next."
        };
    }
  },

  stateNote(state) {
    if (state === "TX") {
      return (
        "You’re in Texas, which brings in the Texas Finance Code and Texas Business & Commerce Code on top of federal laws. " +
        "That means extra protections and extra responsibilities — we’ll keep both in mind."
      );
    }
    if (!state) {
      return "You didn’t pick a state yet, so this snapshot stays general and federal-focused for now.";
    }
    return (
      `You selected ${state}. This snapshot leans on federal laws like the FCRA and CROA. ` +
      "If your state offers stronger protections, that’s an extra bonus we can explore together."
    );
  },

  urgencyText(timeline) {
    switch (timeline) {
      case "30":
        return "You want movement inside 30 days. We’ll focus on the highest-impact issues first and be very realistic about what can happen that fast.";
      case "90":
        return "A 90-day window is where a lot of real progress can happen when we’re consistent and organized.";
      case "180":
        return "A 6-month runway gives us space to work disputes, rebuild and coach habits without rushing.";
      case "flexible":
        return "You’re flexible on timing, which is great. That lets us focus on high-quality work, not just quick wins.";
      default:
        return "You didn’t pick a timeframe, so we’ll assume you want honest progress without pressure, starting as soon as possible.";
    }
  },

  packageSuggestion(scoreRange, issuesText) {
    const lowerIssues = (issuesText || "").toLowerCase();
    const hasLotsOfNegatives =
      lowerIssues.includes("collections") ||
      lowerIssues.includes("charge-off") ||
      lowerIssues.includes("charge off") ||
      lowerIssues.includes("repossession") ||
      lowerIssues.includes("repo");

    if (scoreRange === "sub500" || scoreRange === "500-579" || hasLotsOfNegatives) {
      return {
        name: "Managed Monthly Plan",
        blurb:
          "Based on what you shared, the Managed Monthly Plan usually fits best — " +
          "ongoing dispute work, tracking, and coaching instead of a one-time “quick fix.”"
      };
    }

    if (scoreRange === "580-639" || scoreRange === "640-699") {
      return {
        name: "Deep Dive & DIY or Managed",
        blurb:
          "You might benefit from a Deep Dive & DIY Playbook if you like handling mail yourself — " +
          "or a lighter-touch Managed Monthly Plan if you’d rather have support doing the heavy lifting."
      };
    }

    return {
      name: "Deep Dive & Strategy Session",
      blurb:
        "You’re in a range where a focused review and a clear written plan may be enough, " +
        "with optional ongoing support if your goals grow."
    };
  },

  buildSnapshot({ name, state, scoreRange, issues, goal, timeline }) {
    const scoreInfo = this.scoreProfile(scoreRange);
    const stateInfo = this.stateNote(state);
    const urgencyInfo = this.urgencyText(timeline);
    const pkg = this.packageSuggestion(scoreRange, issues);

    const safeName = name ? name.trim() : "";

    const lines = [];
    lines.push("🧠   PERSONAL CREDIT SNAPSHOT");
    lines.push("-----------------------------------------");
    if (safeName) {
      lines.push(`Hi ${safeName}, here’s how your situation looks in plain language:`);
      lines.push("");
    }

    lines.push(`• Score Range Focus: ${scoreInfo.label}`);
    lines.push(scoreInfo.text);
    lines.push("");

    if (issues && issues.trim().length > 0) {
      lines.push("• Main Issues You Mentioned:");
      lines.push(`  "${issues.trim()}"`);
      lines.push("");
    }

    if (goal && goal.trim().length > 0) {
      lines.push("• Your Primary 90-Day Goal:");
      lines.push(`  "${goal.trim()}"`);
      lines.push("");
    }

    lines.push("• Location & Law Context:");
    lines.push(`  ${stateInfo}`);
    lines.push("");
    lines.push("• Timing & Urgency:");
    lines.push(`  ${urgencyInfo}`);
    lines.push("");
    lines.push("• Suggested Starting Point:");
    lines.push(`  ${pkg.blurb}`);
    lines.push("");
    lines.push(
      "This doesn’t promise results or deletions — it just gives us a clean starting point to " +
        "build a plan that respects the FCRA, CROA, and any state-level rules that apply."
    );

    return lines.join("\n");
  },

  buildPlaybook({ scoreRange, issues, goal, timeline }) {
    const lines = [];
    lines.push("📅   90-DAY PLAYBOOK PREVIEW (EDUCATIONAL)");
    lines.push("------------------------------------------------");
    lines.push("This is a high-level educational outline, not a contract or guarantee.");

    // Phase 1
    lines.push("");
    lines.push("Phase 1 — Weeks 1–4: Clean Up & Verify");
    lines.push("• Pull and safely store all three reports (Experian, TransUnion, Equifax).");
    lines.push("• Verify name, addresses, employers, and public records are reporting correctly.");
    lines.push("• Flag obvious errors, duplicates, or impossible dates for deeper review.");

    // Phase 2
    lines.push("");
    lines.push("Phase 2 — Weeks 4–8: Targeted Disputes & Challenges");
    if ((issues || "").toLowerCase().includes("collection")) {
      lines.push("• Collections: prioritize high-impact or clearly inaccurate accounts first.");
    } else {
      lines.push("• Focus on the most damaging negative items first (collections, charge-offs, or major late pays).");
    }
    lines.push("• Use FCRA-based disputes and, where applicable, state-law rights (like Texas Finance Code).");
    lines.push("• Track every letter and response by date, bureau, and account.");

    // Phase 3
    lines.push("");
    lines.push("Phase 3 — Weeks 8–12: Rebuild, Stabilize & Future-Proof");
    lines.push("• Coach utilization and new-account strategy (no shotgun applications).");
    lines.push("• Watch for re-aging, re-reporting, or inconsistencies after disputes.");
    lines.push("• Reinforce payment habits and structure so gains don’t evaporate later.");

    if (goal && goal.trim()) {
      lines.push("");
      lines.push("Goal Alignment Check:");
      lines.push(
        `• All of this is aimed at moving you closer to: "${goal.trim()}". ` +
          "We’ll adjust the pace and focus based on how aggressive your timeline is."
      );
    }

    if (timeline === "30") {
      lines.push("");
      lines.push(
        "Note on 30-Day Goals: 30 days is very tight. Some things can begin to shift, " +
          "but we’ll be extremely honest with you about what’s realistic in that window."
      );
    }

    return lines.join("\n");
  }
};

// -------------------------------------------
// INTAKE HANDLER
// -------------------------------------------
// -------------------------------------------
// INTAKE HANDLER – SNAPSHOT IS PRODUCT (LOCKED UNTIL PAID)
// -------------------------------------------
(function initIntake() {
  const btn = $("#intake-submit");
  const summaryEl = $("#intake-summary");
  const playbookEl = $("#playbook-dynamic-output");

  if (!btn || !summaryEl) return;

  // simple pricing logic based on score range
  function getSuggestedPrice(scoreRange) {
    switch (scoreRange) {
      case "sub500":
        return 299;
      case "500-579":
        return 249;
      case "580-639":
        return 199;
      case "640-699":
        return 169;
      case "700plus":
        return 149;
      default:
        return 199;
    }
  }

  btn.addEventListener("click", () => {
    const payload = {
      name: $("#intake-name")?.value.trim() || "",
      email: $("#intake-email")?.value.trim() || "",
      phone: $("#intake-phone")?.value.trim() || "",
      state: $("#intake-state")?.value || "",
      scoreRange: $("#intake-score")?.value || "",
      issues: $("#intake-issues")?.value.trim() || "",
      goal: $("#intake-goal")?.value.trim() || "",
      timeline: $("#intake-timeline")?.value || ""
    };

    // Basic check – we don't want totally empty forms
    if (!payload.scoreRange || !payload.state || !payload.goal) {
      alert("Please choose your state, score range, and main 90-day goal so the AI can build your snapshot.");
      return;
    }

    // Internally build snapshot + playbook for YOU (not shown to client)
    const internalSnapshot = aiEngine.buildSnapshot(payload);
    const internalPlaybook = aiEngine.buildPlaybook(payload);

    // You can inspect this in browser dev tools or extend to send via email later:
    console.log("INTERNAL SNAPSHOT (for you only):\n", internalSnapshot);
    console.log("INTERNAL PLAYBOOK (for you only):\n", internalPlaybook);
        // Save for admin page
    saveSnapshotRecord(payload, internalSnapshot, internalPlaybook);

    // Quote price for snapshot (client sees this)
    const price = getSuggestedPrice(payload.scoreRange);

    // Show "processing" first to make it feel smart
    const processingText =
      "Analyzing your information, score range, goals, and potential law-based options..." +
      "\n\nBuilding your personal AI snapshot. This may take up to 60 seconds.";

    typeOut(summaryEl, processingText, 12);

    if (playbookEl) {
      playbookEl.textContent = ""; // keep this empty / locked for now
    }

    // After a short delay, show LOCKED paywall instead of the actual plan
    setTimeout(() => {
      const lockedText = [
        "🔒 YOUR PERSONAL CREDIT SNAPSHOT IS READY (LOCKED)",
        "-----------------------------------------------",
        "",
        "Your AI snapshot and 90-day plan have been generated based on:",
        `• Your score range`,
        `• The issues you described`,
        `• Your main goal: "${payload.goal || "N/A"}"`,
        `• Federal laws (FCRA/CROA) and your state selection`,
        "",
        "But to protect the value of the work (and stay compliant),",
        "the full snapshot, legal strategy breakdown, and letters are only",
        "released after payment.",
        "",
        `Snapshot unlock fee: $${price}.00`,
        "",
        "What you unlock after payment:",
        "• Full AI-written snapshot broken into clear sections",
        "• 90-day playbook tailored to your situation",
        "• Recommended strategy sequence that respects the law",
        "• Pricing breakdown so you know what you’re paying for",
        "• Option to have dispute / validation / goodwill letters generated for you",
        "",
        "How to pay:",
"• Cash App: $YOURCASHAPPNAME",
"• Zelle: your@email.com",
"",
"After you pay:",
"1. Send a screenshot + your full name to the number on this site.",
"2. We verify payment and attach your AI snapshot to your file.",
"3. Your full snapshot + 90-day plan + letters (if purchased) are delivered digitally as downloadable PDFs.",
"4. You may print them yourself for personal use, but nothing physical is mailed.",
      ].join("\n");

      typeOut(summaryEl, lockedText, 10);
    }, 1800); // simulate “thinking” delay
  });
})();
  if (!btn || !summaryEl) return;

  btn.addEventListener("click", () => {
    const payload = {
      name: $("#intake-name")?.value || "",
      state: $("#intake-state")?.value || "",
      scoreRange: $("#intake-score")?.value || "",
      issues: $("#intake-issues")?.value || "",
      goal: $("#intake-goal")?.value || "",
      timeline: $("#intake-timeline")?.value || ""
    };

    const snapshot = aiEngine.buildSnapshot(payload);
    const playbook = aiEngine.buildPlaybook(payload);

    // Type out snapshot
    typeOut(summaryEl, snapshot, 10);

    // Type out playbook (slight delay so it feels staged)
    if (playbookEl) {
      setTimeout(() => typeOut(playbookEl, playbook, 10), 350);
    }

    // Here is where, in the future, you can hook up:
    // - EmailJS to send you the snapshot
    // - Backend logging
    // - Daily digest aggregation
    // For now, we just log to console for debug:
    console.log("New intake snapshot:", snapshot);
  });
})();

// -------------------------------------------
// EDUCATION Q&A – COMING SOON MESSAGE
// -------------------------------------------
(function initEducationQA() {
  const askBtn = $("#education-ask");
  const questionEl = $("#education-question");
  const answerEl = $("#education-answer");

  if (!askBtn || !questionEl || !answerEl) return;

  askBtn.addEventListener("click", () => {
    const q = questionEl.value.trim();

    const baseAnswer =
      "This will eventually be a live AI Q&A tied to our educational library. " +
      "For now, here’s the promise: clear, calm, non-scary explanations that stay within the law, " +
      "instead of hype or fear.\n\n";

    if (!q) {
      typeOut(
        answerEl,
        baseAnswer +
          "If you have a question about collections, charge-offs, disputes, or approvals, " +
          "type it in the box above so we can prioritize what to build first.",
        12
      );
      return;
    }

    typeOut(
      answerEl,
      baseAnswer +
        `You asked: "${q}"\n\nWhen this feature is fully live, you’ll see an answer here in plain English — ` +
        "what the term means, how it usually plays out in real life, and where the law fits into it.",
      12
    );
  });
})();

// -------------------------------------------
// CONTACT FORM – SIMPLE FRONTEND CONFIRMATION
// -------------------------------------------
(function initContactForm() {
  const btn = $("#contact-submit");
  const nameEl = $("#contact-name");
  const emailEl = $("#contact-email");
  const msgEl = $("#contact-message");

  if (!btn || !nameEl || !emailEl || !msgEl) return;

  btn.addEventListener("click", () => {
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const msg = msgEl.value.trim();

    if (!name || !email) {
      alert("Please include at least your name and email so we know how to reach you.");
      return;
    }

    // In the future, this is where you’d call EmailJS or your backend.
    console.log("Contact request:", { name, email, msg });

    btn.disabled = true;
    btn.textContent = "Request Sent";

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Submit Request";
    }, 2500);

    // Clear the fields for a clean feel
    msgEl.value = "";
  });
})();
