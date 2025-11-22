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

  // ---------------- ASK ELITE AI (CREDIT ONLY) ----------------
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
          Ask me anything about credit — collections, charge-offs, late payments,
          TransUnion, Experian, Equifax, auto loans, utilization, and rebuilding.
          I’ll break it down calmly and simply.</p>
        `;
        return;
      }

      askStatus.textContent = "Thinking…";

      setTimeout(() => {
        askStatus.textContent = "";

        if (!isCreditQuestion(lower)) {
          // Non-credit / off-topic / rude questions
          askAnswer.innerHTML = `
            <p><strong>Elite AI:</strong><br>
            I’m only programmed to answer credit questions and anything related to
            TransUnion, Experian, Equifax, accounts, approvals, disputes, and rebuilding.</p>
            <p>Try something like:</p>
            <ul>
              <li>"What is a collection and how does it hurt my score?"</li>
              <li>"What should I fix first if I want a $20,000 auto loan?"</li>
              <li>"How does piggybacking / authorized user trade lines work?"</li>
            </ul>
          `;
          return;
        }

        askAnswer.innerHTML = generateCreditAnswer(raw, lower);
      }, 900);
    });
  }

  // ---------------- SNAPSHOT PAGE LOGIC ----------------
  const snapshotForm = document.getElementById("snapshot-form");
  const snapshotDetails = document.getElementById("snapshot-details");
  const snapshotStatus = document.getElementById("snapshot-status");
  const snapshotOutput = document.getElementById("snapshot-output");
  const snapshotText = document.getElementById("snapshot-text");

  if (snapshotForm && snapshotDetails && snapshotOutput && snapshotText) {
    // Make sure output is hidden on load
    snapshotOutput.style.display = "none";

    snapshotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const story = snapshotDetails.value.trim();

      if (!story) {
        snapshotStatus.textContent =
          "Give me some detail. The more you tell me about your situation, the sharper your Snapshot Plan will be.";
        snapshotOutput.style.display = "none";
        snapshotText.innerHTML = "";
        return;
      }

      snapshotStatus.textContent = "Preparing your Snapshot Plan…";
      snapshotOutput.style.display = "none";
      snapshotText.innerHTML = "";

      setTimeout(() => {
        snapshotStatus.textContent = "";
        snapshotText.innerHTML = buildSnapshotPlanFromStory(story);
        snapshotOutput.style.display = "block";
      }, 1200);
    });
  }
});

// =======================================
// CREDIT FILTER AND ANSWER ENGINE
// =======================================

// Detect if a question is actually about credit
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

// Main answer engine for credit questions
function generateCreditAnswer(raw, lower) {
  // Collections
  if (lower.includes("collection")) {
    return wrapAnswer(`
      A collection is a debt that fell behind and the original creditor
      either sold or placed it with a collection agency. It signals serious
      delinquency and can hit your score hard.
      <br><br>
      Here’s the calm, step-by-step way to look at it:
      <ul>
        <li><strong>1.</strong> Pull all 3 reports (TransUnion, Equifax, Experian) and list each collection: who, how much, what dates, and which bureaus.</li>
        <li><strong>2.</strong> Dispute anything that is inaccurate, outdated, duplicated, or you genuinely don’t recognize.</li>
        <li><strong>3.</strong> Ask the collector for validation in writing before you pay, so you know who they are and what they’re claiming.</li>
        <li><strong>4.</strong> When possible, aim for a clean resolution and, if offered, a written agreement before you pay.</li>
      </ul>
      After that, your focus is <strong>low utilization, on-time payments, and adding 1–2 positive trade lines</strong> so your file starts to look stronger over time.
    `);
  }

  // Auto / car loan – e.g., $20,000 car loan
  if (
    lower.includes("car loan") ||
    lower.includes("auto loan") ||
    (lower.includes("car") && lower.includes("loan"))
  ) {
    return wrapAnswer(`
      For something like a $20,000 auto loan, lenders usually look at:
      <ul>
        <li>Your scores (around 620+ to get in the door, 680+ for better rates, 720+ for the strongest terms).</li>
        <li>Your income and debt-to-income ratio.</li>
        <li>Any recent late payments, collections, or charge-offs.</li>
        <li>Whether you’ve handled an installment loan before.</li>
      </ul>
      If you’ve been denied, a calm game plan looks like:
      <ol>
        <li>Clean up obvious errors and recent negatives first (wrong balances, accounts that don’t belong to you, outdated entries).</li>
        <li>Target collections and charge-offs one at a time rather than trying to fix everything at once.</li>
        <li>Work credit card utilization down under 30%, and eventually under 10% if possible.</li>
        <li>Add one or two positive accounts that you pay on time every month.</li>
      </ol>
      Then give the bureaus 30–60 days after major changes before you apply again.
    `);
  }

  // Piggybacking / Authorized User
  if (lower.includes("authorized user") || lower.includes("piggy")) {
    return wrapAnswer(`
      Piggybacking means being added as an <strong>authorized user</strong> on
      someone else’s strong credit card. If the card is clean, you can benefit from:
      <ul>
        <li>More age of credit history.</li>
        <li>Perfect on-time payment history.</li>
        <li>Lower overall utilization, if they keep the balance low.</li>
      </ul>
      A good authorized user trade line usually has:
      <ul>
        <li>2+ years of history.</li>
        <li>No late payments.</li>
        <li>Utilization under 10–20%.</li>
      </ul>
      This works best <em>after</em> you’ve addressed your worst negatives, so the boost has room to show up.
    `);
  }

  // Late payments
  if (lower.includes("late payment") || lower.includes("late payments")) {
    return wrapAnswer(`
      Late payments hurt because they show you didn’t keep the agreement on time.
      The impact depends on how recent and how severe the late was.
      <br><br>
      General approach:
      <ul>
        <li><strong>Under 30 days:</strong> Usually doesn’t report; catch it up immediately.</li>
        <li><strong>30–59 days:</strong> Can report as a single late; consider a goodwill request if you have a mostly clean history.</li>
        <li><strong>60+ days:</strong> Heavier damage; focus on getting the account current, then goodwill or simply letting time + perfect payments do their work.</li>
      </ul>
      Meanwhile, keep all other accounts current and work on lowering utilization so this one late isn’t the only story your file is telling.
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
      Utilization is simply how much of your available credit limits you are
      using. It’s one of the biggest factors in your score.
      <br><br>
      Rough guide:
      <ul>
        <li>Under 30% total is okay.</li>
        <li>Under 10% total usually looks very strong.</li>
        <li>Maxed-out cards can drag down even a decent file.</li>
      </ul>
      A calm way to tackle it:
      <ol>
        <li>Bring maxed-out cards under 80% first, just to get out of the danger zone.</li>
        <li>Then keep working them down under 30% total.</li>
        <li>Eventually aim for one or two cards reporting under 10% while everything else is low or at zero.</li>
      </ol>
    `);
  }

  // Repossession / repo
  if (lower.includes("repo") || lower.includes("repossess")) {
    return wrapAnswer(`
      A repossession tells lenders the vehicle was taken back after missed payments.
      It’s a serious negative, but not the end of the story.
      <br><br>
      Basic strategy:
      <ul>
        <li>Check all 3 reports for how it’s reporting: status, dates, and balances.</li>
        <li>Dispute anything that’s inaccurate, duplicated, or missing key information.</li>
        <li>If the lender or collector offers a settlement, get it in writing before you pay.</li>
      </ul>
      Going forward, you’ll want a period of clean payment history and lowered utilization before trying for another auto loan.
    `);
  }

  // Generic, but still helpful, fallback
  return wrapAnswer(`
    Here’s how I work: I help you think through credit reports from
    TransUnion, Experian, and Equifax — collections, charge-offs,
    late payments, auto loans, utilization, trade lines, and rebuilding strategy.
    <br><br>
    To give you a sharper answer, tell me:
    <ul>
      <li>What you’re trying to get approved for (car, house, cards, etc.).</li>
      <li>Roughly what’s on your reports (collections, lates, charge-offs, repos, public records).</li>
      <li>Your estimated scores, if you know them.</li>
    </ul>
    The more detail you share, the more precise the guidance can feel.
  `);
}

// Wrap answer with tone + disclaimer
function wrapAnswer(html) {
  return `
    <p><strong>Elite AI:</strong><br>${html}</p>
    <p style="font-size:0.8rem;color:#6b7280;margin-top:0.5rem;">
      <strong>Note:</strong> This is calm, educational guidance only — not legal,
      tax, or personalized financial advice. Always use your own judgment and local laws.
    </p>
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

  // ===== Warm, encouraging intro =====
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

  // ===== What’s hurting them most =====
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

  // ===== Goal-based section =====
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

  // ===== First moves =====
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

  // ===== Rebuilding =====
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

  // ===== Scores mention =====
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

  // ===== Final thoughts with warm, hypey but calm close =====
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
    <p style="font-size:0.85rem;color:#6b7280;margin-top:0.5rem;">
      You can save this plan using <strong>Print → Save as PDF</strong> on your
      device and keep it as your personal roadmap while you work through it.
    </p>
  `;

  return html;
}
}

// Escape HTML just in case (for the story text)
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
