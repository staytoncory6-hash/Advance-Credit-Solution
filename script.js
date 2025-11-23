// =======================================
// ELITE AI CREDIT REPAIR - GLOBAL JS
// =======================================

document.addEventListener("DOMContentLoaded", () => {
  // ---------------- YEAR IN FOOTER ----------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---------------- SMOOTH SCROLL FOR SAME-PAGE LINKS ----------------
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---------------- ASK ELITE AI (CREDIT ONLY, UPLIFTING, PUSH TO PAID) ----------------
  const askForm = document.getElementById("ask-ai-form");
  const askInput = document.getElementById("ask-ai-question");
  const askAnswer = document.getElementById("ask-ai-answer");
  const askStatus = document.getElementById("ask-ai-status");

  if (askForm && askInput && askAnswer) {
    askForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const raw = askInput.value.trim();
      const lower = raw.toLowerCase();

      if (!raw) {
        askAnswer.innerHTML = `
          <p><strong>Elite AI:</strong><br>
          Ask me anything about credit — collections, charge-offs, denials, scores,
          TransUnion, Experian, Equifax, auto loans, utilization, and rebuilding.
          I’ll keep it calm and simple, and if it looks like you’d benefit from a
          Snapshot Plan or membership, I’ll tell you.</p>
        `;
        return;
      }

      askStatus.textContent = "Thinking…";

      setTimeout(() => {
        askStatus.textContent = "";

        if (!isCreditQuestion(lower)) {
          askAnswer.innerHTML = `
            <p><strong>Elite AI:</strong><br>
            I’m only programmed to answer <strong>credit-related</strong> questions –
            things tied to TransUnion, Experian, Equifax, accounts, approvals,
            denials, utilization, and rebuilding.</p>
            <p>Try something like:</p>
            <ul>
              <li>“Why did my collection hurt my score so much?”</li>
              <li>“What should I work on first if I want a $20,000 auto loan?”</li>
              <li>“What does a charge-off actually mean?”</li>
            </ul>
          `;
          return;
        }

        askAnswer.innerHTML = generateCreditAnswer(raw, lower);
      }, 800);
    });
  }

  // ---------------- SNAPSHOT PAGE LOGIC ----------------
  const snapshotForm = document.getElementById("snapshot-form");
  const snapshotDetails = document.getElementById("snapshot-details");
  const snapshotStatus = document.getElementById("snapshot-status");
  const snapshotOutput = document.getElementById("snapshot-output");
  const snapshotText = document.getElementById("snapshot-text");
  const snapshotLetters = document.getElementById("snapshot-letters");
  const snapshotPaywall = document.getElementById("snapshot-paywall");
  const snapshotPaidBtn = document.getElementById("snapshot-paid-btn");
  const downloadPlanBtn = document.getElementById("download-plan-btn");
  const downloadResourcesBtn = document.getElementById("download-resources-btn");

  if (
    snapshotForm &&
    snapshotDetails &&
    snapshotStatus &&
    snapshotOutput &&
    snapshotText &&
    snapshotLetters
  ) {
    snapshotOutput.classList.add("hidden");
    if (snapshotPaywall) snapshotPaywall.classList.add("hidden");

    // Step 1: they fill out the story
    snapshotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const story = snapshotDetails.value.trim();

      if (!story) {
        snapshotStatus.textContent =
          "Give me some detail. The more you tell me about your situation, the sharper your Snapshot Plan will be.";
        snapshotOutput.classList.add("hidden");
        snapshotText.innerHTML = "";
        snapshotLetters.innerHTML = "";
        if (snapshotPaywall) snapshotPaywall.classList.add("hidden");
        return;
      }

      snapshotStatus.textContent = "";
      if (snapshotPaywall) snapshotPaywall.classList.remove("hidden");
      snapshotOutput.classList.add("hidden");
    });

    // Step 2: they click "I've sent the payment"
    if (snapshotPaidBtn) {
      snapshotPaidBtn.addEventListener("click", () => {
        const story = snapshotDetails.value.trim();
        if (!story) {
          snapshotStatus.textContent =
            "Tell your story first so I can actually build something useful for you.";
          return;
        }

        snapshotStatus.textContent = "Preparing your Snapshot Plan…";
        snapshotOutput.classList.add("hidden");

        setTimeout(() => {
          snapshotStatus.textContent = "";
          snapshotText.innerHTML = buildSnapshotPlanFromStory(story);
          snapshotLetters.innerHTML = buildDisputeLettersFromStory(story);
          snapshotOutput.classList.remove("hidden");
        }, 1200);
      });
    }

    // Download buttons -> open print window (user can save as PDF)
    if (downloadPlanBtn) {
      downloadPlanBtn.addEventListener("click", () => {
        if (!snapshotText.innerHTML.trim()) {
          snapshotStatus.textContent =
            "Generate your Snapshot Plan first, then you can download it.";
          return;
        }
        snapshotStatus.textContent = "";
        openPrintWindow(
          "Elite AI Snapshot Plan",
          snapshotText.innerHTML
        );
      });
    }

    if (downloadResourcesBtn) {
      downloadResourcesBtn.addEventListener("click", () => {
        if (!snapshotLetters.innerHTML.trim()) {
          snapshotStatus.textContent =
            "Generate your Snapshot Plan first, then you can download the contacts.";
          return;
        }
        snapshotStatus.textContent = "";
        openPrintWindow(
          "Elite AI Action Steps & Contacts",
          snapshotLetters.innerHTML
        );
      });
    }
  }
});

// =======================================
// HELPER: OPEN PRINT WINDOW (FOR PDF)
// =======================================

function openPrintWindow(title, contentHtml) {
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return;

  w.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 24px;
            background: #f9fafb;
            color: #111827;
            line-height: 1.6;
          }
          h1 {
            font-size: 1.4rem;
            margin-bottom: 1rem;
          }
          h4, h5 {
            margin-top: 1rem;
          }
          ul, ol {
            margin-left: 1.2rem;
          }
          pre {
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${contentHtml}
      </body>
    </html>
  `);

  w.document.close();
  w.focus();
  w.print();
}

// =======================================
// CREDIT FILTER AND ANSWER ENGINE
// =======================================

function isCreditQuestion(lower) {
  const bannedWords = [
    "pussy", "sex", "porn", "naked", "boobs", "dick", "cock",
    "murder", "kill", "bomb", "shoot", "rape"
  ];
  for (const bad of bannedWords) {
    if (lower.includes(bad)) return false;
  }

  const creditKeywords = [
    "credit", "collection", "collections", "charge off", "charge-off",
    "late payment", "late payments", "transunion", "equifax", "experian",
    "report", "credit report", "score", "fico", "loan", "auto loan",
    "car loan", "mortgage", "utilization", "trade line", "tradeline",
    "authorized user", "piggyback", "inquiry", "inquiries", "bankruptcy",
    "repossession", "repo", "eviction", "public record", "dispute", "deletion",
    "chargeoff", "derogatory", "negative item", "negative items"
  ];

  return creditKeywords.some((w) => lower.includes(w));
}

// Main answer engine for credit questions – general, uplifting, pushes paid products
function generateCreditAnswer(raw, lower) {
  // Collections
  if (lower.includes("collection")) {
    return wrapAnswer(`
      First off, you’re smart for even asking about this. Most people just ignore
      collections and hope they fade away, and that’s usually when the damage drags
      on for years.
      <br><br>
      A collection is basically a debt that went far enough past due that the
      original creditor either sent it to a collection agency or sold it. It tells
      lenders, “this account got seriously behind.”
      <br><br>
      In general, the calm approach is:
      <ul>
        <li>Pull all 3 reports (TransUnion, Experian, Equifax) and list every collection: who, how much, what dates, and which bureaus.</li>
        <li>Look for anything that’s clearly wrong, duplicated, outdated, or not yours at all.</li>
        <li>Make a simple priority list: which ones are the biggest, which are the newest, and which matter most to your goals.</li>
      </ul>
      I’m keeping it high-level here on purpose. If you want me to turn <em>your</em>
      exact situation into a step-by-step Snapshot Plan with clear rounds and
      timing, that’s what the paid Snapshot and membership are built for.
    `);
  }

  // Auto / car loan
  if (
    lower.includes("car loan") ||
    lower.includes("auto loan") ||
    (lower.includes("car") && lower.includes("loan"))
  ) {
    return wrapAnswer(`
      Wanting a clean approval on a car is a smart goal – and honestly, the fact
      you’re asking what to fix first means you’re already ahead of most people
      who just keep applying and taking hits.
      <br><br>
      In general, lenders look at:
      <ul>
        <li>Your scores across TransUnion, Experian, and Equifax.</li>
        <li>Any recent late payments, collections, or charge-offs.</li>
        <li>How much of your available credit you’re using (utilization).</li>
        <li>Your income and overall debt-to-income.</li>
      </ul>
      The usual order of attack looks like:
      <ol>
        <li>Stabilize everything current – no new lates while you’re rebuilding.</li>
        <li>Lower your utilization on credit cards if it’s high.</li>
        <li>Decide which negatives are worth challenging or addressing first.</li>
      </ol>
      If you want, the Snapshot Plan can take your full story and turn it into a
      month-by-month roadmap aimed specifically at getting that auto approval, with
      rounds and timing built around your goals.
    `);
  }

  // Piggybacking / Authorized User
  if (lower.includes("authorized user") || lower.includes("piggy")) {
    return wrapAnswer(`
      You’re thinking in the right direction. Piggybacking (authorized user trade
      lines) can be a helpful tool <em>if</em> it’s done carefully.
      <br><br>
      General idea:
      <ul>
        <li>You’re added as an authorized user to someone else’s clean card.</li>
        <li>If the card has low utilization and on-time history, that can make your profile look stronger.</li>
        <li>This works best after you’ve calmed down your own negatives and balances.</li>
      </ul>
      I’m keeping this as guidance, not a specific game plan. If you want a full
      strategy that mixes piggybacking with disputes, utilization, and your goals,
      that’s exactly where the paid Snapshot Plan or membership comes in.
    `);
  }

  // Late payments
  if (lower.includes("late payment") || lower.includes("late payments")) {
    return wrapAnswer(`
      Late payments are one of the most common pain points, so you’re not alone on
      this at all. The key thing is: recent lates usually hurt more than older
      ones.
      <br><br>
      Big-picture view:
      <ul>
        <li>Keep everything current now – no new lates while you’re trying to rebuild.</li>
        <li>Look at how many lates, how recent, and on which types of accounts.</li>
        <li>Focus on building a streak of on-time payments going forward.</li>
      </ul>
      For a deeper breakdown of which lates to focus on, in what order, and how to
      pair that with disputes or goodwill attempts, the Snapshot Plan can map that
      out around your exact history.
    `);
  }

  // Utilization / maxed out cards
  if (
    lower.includes("utilization") ||
    lower.includes("maxed") ||
    lower.includes("maxed out") ||
    lower.includes("over limit")
  ) {
    return wrapAnswer(`
      You’re asking about one of the biggest levers in the whole scoring system.
      Utilization (how much of your limits you’re using) can move scores up or
      down even if nothing else changes.
      <br><br>
      General guidelines:
      <ul>
        <li>Under 30% total use is okay.</li>
        <li>Under 10% total is usually ideal.</li>
        <li>Maxed-out cards can drag everything down even if you pay on time.</li>
      </ul>
      A simple approach is:
      <ol>
        <li>Stop adding new balances while you’re trying to fix this.</li>
        <li>Work on the most maxed-out cards first to get them out of the danger zone.</li>
        <li>Then smooth everything down toward that under-30%, then under-10% range.</li>
      </ol>
      If you’d like a custom pay-down sequence built around your actual limits and
      balances, that’s something the Snapshot Plan can lay out step-by-step.
    `);
  }

  // Repossession / repo
  if (lower.includes("repo") || lower.includes("repossess")) {
    return wrapAnswer(`
      A repossession is definitely a heavy mark, but it’s not the end of the road.
      You’re already doing the smart thing by asking how to handle it instead of
      just ignoring it.
      <br><br>
      In general:
      <ul>
        <li>Pull all 3 reports and see exactly how the repo is reporting on each bureau.</li>
        <li>Check dates, balances, and status for anything that looks off or inconsistent.</li>
        <li>Focus on building a positive pattern elsewhere while you decide how to approach the repo itself.</li>
      </ul>
      The specific moves (settlement vs. challenge vs. time) depend a lot on the
      rest of your file and your goals. That’s where a paid Snapshot and, if you
      choose, membership can give you a round-by-round plan instead of a guess.
    `);
  }

  // Generic fallback – always warm + upsell
  return wrapAnswer(`
    You’re asking the right kind of question, and that already puts you in a better
    spot than most people who never look at their reports at all.
    <br><br>
    Big picture, almost every credit situation comes down to a few things:
    <ul>
      <li>What’s negative (collections, lates, charge-offs, repos, public records).</li>
      <li>How those negatives are reporting on TransUnion, Experian, and Equifax.</li>
      <li>How much of your available credit you’re using (utilization).</li>
      <li>What you’re trying to get approved for next (car, house, cards, etc.).</li>
    </ul>
    Ask me follow-up questions anytime. And if you want me to take your full story
    and turn it into a written Snapshot Plan with clear steps and options, that’s
    exactly what the paid Snapshot page is designed to do.
  `);
}

// Wrap answer with tone + disclaimer + upsell
function wrapAnswer(html) {
  return `
    <p><strong>Elite AI:</strong><br>${html}</p>
    <p style="font-size:0.8rem;color:#6b7280;margin-top:0.4rem;">
      <strong>Note:</strong> This is general, educational guidance – not legal,
      tax, or personalized financial advice. For a true step-by-step plan based
      on your full story, use the <strong>Snapshot Plan</strong> page, and if you
      want ongoing help through multiple rounds of disputes, that’s what the
      <strong>membership</strong> is for.</p>
  `;
}

// =======================================
// SNAPSHOT PLAN BUILDER FROM STORY TEXT
// =======================================

function buildSnapshotPlanFromStory(story) {
  const lower = story.toLowerCase();
  const safeStory = escapeHtml(story);

  const hasCollections =
    lower.includes("collection") || lower.includes("collections");
  const hasChargeOff =
    lower.includes("charge off") ||
    lower.includes("charge-off") ||
    lower.includes("chargeoff");
  const hasLates =
    lower.includes("late payment") || lower.includes("late payments");
  const hasRepo =
    lower.includes("repo") || lower.includes("repossess");
  const hasBankruptcy = lower.includes("bankruptcy") || lower.includes("bk");
  const wantsAuto =
    lower.includes("car loan") ||
    lower.includes("auto loan") ||
    (lower.includes("car") && lower.includes("loan"));
  const wantsHouse =
    lower.includes("mortgage") || lower.includes("home loan");
  const mentionsScores =
    lower.includes("score") || lower.includes("fico") || lower.match(/\d{3}/);

  let html = `
    <p>
      First off, thank you for laying all of that out. Most people can’t even
      describe their own situation this clearly – so you’re already ahead of
      the average person just by getting this out of your head and onto “paper.”
    </p>

    <p>
      Nothing you wrote here is something to be ashamed of. Everybody hits rough
      patches with credit. The difference is that <strong>you’re actually doing
      something about it</strong>, and that’s exactly the kind of person this
      Snapshot Plan is built for.
    </p>

    <p>
      The details you shared give me real signal to work with – denials,
      accounts, history, what you remember and what you don’t. That’s exactly
      what I need to build a calm, straight-line game plan instead of random
      guessing. You’re not alone in this, and you’re not flying blind anymore.
    </p>

    <h4>1. What You Told Me</h4>
    <p>${safeStory}</p>
  `;

  html += `<h4>2. What’s Probably Hurting You Most</h4><ul>`;

  if (hasCollections) {
    html += `<li>Collections – these show serious delinquency and usually get a lot of weight from lenders and scoring models.</li>`;
  }
  if (hasChargeOff) {
    html += `<li>Charge-offs – original creditors writing off debt, which can be a major red flag until it’s dealt with or aged out.</li>`;
  }
  if (hasLates) {
    html += `<li>Late payments – especially any within the last 24 months, which can drag things down even if older history is decent.</li>`;
  }
  if (hasRepo) {
    html += `<li>Repossession – this tells future auto lenders that a previous auto account didn’t stay on track.</li>`;
  }
  if (hasBankruptcy) {
    html += `<li>Bankruptcy / public record – a big event that sets the tone for how cautious lenders will be for a while.</li>`;
  }

  if (!hasCollections && !hasChargeOff && !hasLates && !hasRepo && !hasBankruptcy) {
    html += `<li>You didn’t clearly mention collections, charge-offs, late payments, repos, or bankruptcy. If any are there, we’d want to list them out with dates, balances, and bureaus so nothing important is hiding in the background.</li>`;
  }

  html += `</ul>`;

  html += `<h4>3. What It Sounds Like You Want</h4><p>`;

  if (wantsAuto) {
    html += `
      It sounds like you’re focused on getting an auto loan through without
      ridiculous interest – something like a clean approval on a $15k–$25k
      vehicle instead of a “take it or leave it” deal. So we’ll shape the plan
      around what auto lenders actually care about: recent pay history, open
      negatives, and overall utilization.
    `;
  } else if (wantsHouse) {
    html += `
      It sounds like the big picture for you is home-ownership or being
      mortgage-ready. That means we’re looking at a slightly longer runway:
      cleaning serious negatives, building stable payment history, and keeping
      overall utilization low and predictable.
    `;
  } else {
    html += `
      You’re working toward a stronger, cleaner profile where approvals are on
      <em>your</em> terms – not just whatever you can get. The moves are
      similar either way: clean the file, build positives, and give the bureaus
      time to catch up.
    `;
  }

  html += `</p>`;

  html += `
    <h4>4. First Moves (Next 30–60 Days)</h4>
    <p>
      Here’s where we take all that stress and turn it into a simple sequence.
      No magic, no hype – just the grown-up steps that actually move the needle.
    </p>
    <ul>
      <li>Pull and save all 3 reports from TransUnion, Experian, and Equifax.</li>
      <li>Highlight anything inaccurate, outdated, duplicated, or not yours – these are top dispute targets.</li>
      <li>List each negative with: name, balance, date opened, date reported, and which bureaus show it.</li>
      <li>Keep all current accounts paid on time – no new late payments while you’re fixing the old ones.</li>
    </ul>

    <h4>5. Dispute and Clean-Up Strategy</h4>
    <p>
      Under the Fair Credit Reporting Act (FCRA), you have the right to dispute
      information that is inaccurate, incomplete, or cannot be verified. That’s
      the law – not a loophole.
    </p>
    <ul>
      <li>Start with the worst or most obviously wrong items first.</li>
      <li>Dispute in writing, clearly stating what’s wrong and attaching any proof you have.</li>
      <li>Keep copies of every letter, report, and response in a single folder.</li>
    </ul>
  `;

  html += `
    <h4>6. Rebuilding and Trade Lines</h4>
    <p>
      Cleaning up is half the battle. The other half is showing the bureaus and
      future lenders a new story: low balances and on-time behavior.
    </p>
    <ul>
      <li>Keep credit card utilization low (under 30% total, then under 10% if you can).</li>
      <li>Consider a credit builder loan or secured card if you don’t have any positive trade lines.</li>
      <li>Use authorized user / piggybacking only on clean, low-utilization cards with on-time history.</li>
    </ul>
  `;

  if (mentionsScores) {
    html += `
      <h4>7. About Your Scores</h4>
      <p>
        Your scores aren’t a fixed “grade” on you as a person – they’re just a
        snapshot of what’s reporting right now. As negatives are removed or
        updated and new positive history builds, lenders literally start to see
        you differently on their screens.
      </p>
      <p>
        Give each major change 30–60 days to fully show up across the bureaus
        before you judge your new starting point.
      </p>
    `;
  }

  html += `
    <h4>8. Final Thoughts</h4>
    <p>
      What you shared gives me more than enough to start carving out a smart,
      legal, and realistic path forward. None of this is about tricks – it’s
      about using your rights under the FCRA, cleaning up what’s wrong, and
      then building something stronger on top of it.
    </p>
    <p>
      If you stick with the steps and stay consistent, this stops being a
      random mess on your report and starts looking like a turnaround story.
      You’ve already done the hardest part by being honest about where you are.
      From here, it’s just one smart move at a time.
    </p>
  `;

  return html;
}

// Action steps & contacts (no full letters; letter packs = membership)
function buildDisputeLettersFromStory(story) {
  const safeStory = escapeHtml(story);

  return `
    <div class="snapshot-letter">
      <h5>Primary Targets Based on Your Story</h5>
      <p>${safeStory}</p>
      <p>
        From what you described, you’ll usually be dealing with a mix of:
      </p>
      <ul>
        <li>The three credit bureaus (TransUnion, Experian, Equifax).</li>
        <li>Original creditors or collection agencies reporting the accounts.</li>
        <li>Regulators, if you need to escalate (CFPB, FTC, state Attorney General).</li>
      </ul>
    </div>

    <div class="snapshot-letter" style="margin-top:0.9rem;">
      <h5>Credit Bureaus – Mailing Information</h5>
      <ul>
        <li><strong>TransUnion</strong><br>P.O. Box 2000<br>Chester, PA 19016</li>
        <li style="margin-top:0.4rem;"><strong>Experian</strong><br>P.O. Box 4500<br>Allen, TX 75013</li>
        <li style="margin-top:0.4rem;"><strong>Equifax</strong><br>P.O. Box 740256<br>Atlanta, GA 30374</li>
      </ul>
      <p style="margin-top:0.4rem;font-size:0.9rem;">
        Send disputes by mail with copies (not originals) of any proof you have.
        Keep copies of everything you send.
      </p>
    </div>

    <div class="snapshot-letter" style="margin-top:0.9rem;">
      <h5>Regulators & Consumer Protection</h5>
      <ul>
        <li><strong>Consumer Financial Protection Bureau (CFPB)</strong><br>Online: consumerfinance.gov</li>
        <li style="margin-top:0.4rem;"><strong>Federal Trade Commission (FTC)</strong><br>Online: ftc.gov</li>
        <li style="margin-top:0.4rem;"><strong>State Attorney General</strong><br>Search: "[Your State] Attorney General consumer complaint"</li>
      </ul>
      <p style="margin-top:0.4rem;font-size:0.9rem;">
        These offices are for escalations when bureaus or furnishers ignore clear
        errors or refuse to correct obviously bad information.
      </p>
    </div>

    <div class="snapshot-letter" style="margin-top:0.9rem;">
      <h5>How Rounds Usually Flow</h5>
      <ol style="font-size:0.95rem;">
        <li><strong>Round 1:</strong> Basic disputes to bureaus about clearly wrong or questionable items.</li>
        <li><strong>Round 2:</strong> Follow-up on what wasn’t fixed, with more detail or supporting info.</li>
        <li><strong>Round 3:</strong> Deeper challenge (method of verification, procedural questions).</li>
        <li><strong>Round 4:</strong> Escalation to CFPB / FTC / state AG if serious non-compliance continues.</li>
      </ol>
      <p style="margin-top:0.4rem;font-size:0.9rem;">
        Full letter packs for each round, written around your exact situation,
        are part of membership / higher-level services — this page is your
        summary map and contact sheet.
      </p>
    </div>
  `;
}

// Escape HTML for story text
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
