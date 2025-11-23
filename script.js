// Dynamic main footer year on index
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---------------------- SNAPSHOT SAMPLE ----------------------
const snapshotButton = document.getElementById("snapshot-generate");
const snapshotOutput = document.getElementById("snapshot-output");
const snapshotPlanText = document.getElementById("snapshot-plan-text");

if (snapshotButton && snapshotOutput && snapshotPlanText) {
  snapshotButton.addEventListener("click", () => {
    const nameField = document.getElementById("snap-name");
    const goalField = document.getElementById("snap-goal");
    const storyField = document.getElementById("snap-story");

    const name = nameField?.value.trim() || "Client";
    const goal = goalField?.value.trim() || "your credit goal";
    const story = storyField?.value.trim() || "your current credit situation";

    const plan = `
      <p><strong>Hi ${name}, here’s what a typical 90-day Snapshot Plan could look like based on ${goal} and the details you share.</strong></p>
      <p><strong>Phase 1 (Days 1-30):</strong> Pull all three reports, list every negative item, and target the biggest legal weaknesses first (incomplete data, wrong dates, identity issues, or items you genuinely don’t recognize). Send out your first round of disputes by certified mail. Keep copies of everything.</p>
      <p><strong>Phase 2 (Days 31-60):</strong> Watch for responses. Anything “verified” without proof becomes a candidate for escalations and regulator pressure. At this stage, you focus on consistency: if a creditor or bureau responds differently across bureaus, that inconsistency becomes leverage.</p>
      <p><strong>Phase 3 (Days 61-90):</strong> Second-round and escalation letters, using the responses (or lack of responses) from the first round. This is where regulators like CFPB, FTC, and your State Attorney General can be pulled into the conversation when needed.</p>
      <p><strong>Along the way:</strong> You start prepping for rebuilding — keeping utilization low, choosing safer starter lines, and avoiding moves that can actually hurt your score while you’re cleaning things up.</p>
      <p class="small-bold"><strong>Your paid Snapshot Plan will be specific to your story, not generic. It will reference real items from your reports and outline the exact order to attack them in.</strong></p>
    `;

    snapshotPlanText.innerHTML = plan;
    snapshotOutput.classList.remove("hidden");
    snapshotOutput.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ---------------------- ASK AI LOGIC (BASIC FRONTEND MOCK) ----------------------
function handleAskAi(question, outputElement) {
  const q = question.toLowerCase();

  // Simple filters – credit only
  const disallowedWords = ["sex", "pussy", "nude", "kill", "suicide", "drug"];
  if (disallowedWords.some((w) => q.includes(w))) {
    return `
      <strong>
        I’m only here to talk about credit, credit reports, and the laws that control them.
        Please keep your questions about credit only.
      </strong>
    `;
  }

  // Some simple pattern-based responses
  if (q.includes("collection")) {
    return `
      <strong>
        A collection is a debt that was sent to a third-party collection agency after the original
        creditor decided you were too late or too far behind. On a credit report, collections are
        negative because they signal serious delinquency.<br><br>
        Under the Fair Credit Reporting Act (FCRA), a collection must be accurate, verifiable, and
        reported within the allowable time window (generally up to 7 years from the original
        default). If the dates, amounts, or ownership are off — or you don’t recognize it — that’s
        exactly the kind of thing you target with disputes and, if needed, regulator complaints.
      </strong>
    `;
  }

  if (q.includes("late") && q.includes("payment")) {
    return `
      <strong>
        Most late payments can stay on your credit report for up to 7 years from the date of the
        first missed payment. That doesn’t mean they’re always reported correctly.<br><br>
        If a late payment has the wrong date, the wrong number of days late, or shows as late
        across multiple months when it shouldn’t, that’s a potential FCRA issue. You can dispute
        inaccurate lates and sometimes use goodwill or adjustment requests with lenders that you
        otherwise have a strong history with.
      </strong>
    `;
  }

  if (q.includes("bankruptcy")) {
    return `
      <strong>
        Bankruptcies are public records and can generally report for up to 10 years. But the
        reporting must still be accurate, complete, and obtained from legitimate sources.<br><br>
        Courts themselves usually do <em>not</em> furnish information to the credit bureaus. Data
        often flows through third-party data miners, which creates opportunities for errors. When
        the information is incomplete, mismatched, or can’t be properly verified, that’s where
        deeper disputes and public-record strategies come in.
      </strong>
    `;
  }

  if (q.includes("shopping cart")) {
    return `
      <strong>
        The “Shopping Cart Trick” refers to getting certain store cards or lines of credit by going
        through a retailer’s online checkout flow and then accepting a pre-approved offer. It’s not
        magic, but it can sometimes help people with thinner files pick up easier trade lines.<br><br>
        Like any tool, it works best when your negative items are under control and you’re using
        it as part of a bigger rebuilding plan, not as a quick band-aid.
      </strong>
    `;
  }

  if (q.includes("cfpb") || q.includes("ftc") || q.includes("attorney general")) {
    return `
      <strong>
        Regulators like the CFPB, FTC, and your State Attorney General exist to enforce consumer
        protection laws. When a bureau or furnisher ignores valid disputes, reports obviously false
        data, or keeps repeating the same mistakes, regulators can put real pressure on them.<br><br>
        In a serious dispute journey, those agencies are escalation tools you use when normal
        disputes aren’t taken seriously.
      </strong>
    `;
  }

  // Default generic answer
  return `
    <strong>
      That’s a solid question. In simple terms: anything on your report must be accurate, complete,
      and legally reportable under the Fair Credit Reporting Act. If it’s not — wrong dates, wrong
      amounts, mixed files, or unverifiable — that’s exactly what you dispute.<br><br>
      For a deep dive tailored to your situation, a paid Snapshot Plan goes way beyond this quick
      answer and lays out your next 90 days, step-by-step.
    </strong>
  `;
}

// Main Ask AI (Home page)
const askAiForm = document.getElementById("ask-ai-form");
const askAiInput = document.getElementById("ask-ai-input");
const askAiAnswer = document.getElementById("ask-ai-answer");
const askAiAnswerText = document.getElementById("ask-ai-answer-text");

if (askAiForm && askAiInput && askAiAnswer && askAiAnswerText) {
  askAiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = askAiInput.value.trim();
    if (!question) return;
    askAiAnswerText.innerHTML = handleAskAi(question, askAiAnswerText);
    askAiAnswer.classList.remove("hidden");
    askAiAnswer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Ask AI on contact page
const askAiFormContact = document.getElementById("ask-ai-form-contact");
const askAiInputContact = document.getElementById("ask-ai-input-contact");
const askAiAnswerContact = document.getElementById("ask-ai-answer-contact");
const askAiAnswerContactText = document.getElementById("ask-ai-answer-contact-text");

if (askAiFormContact && askAiInputContact && askAiAnswerContact && askAiAnswerContactText) {
  askAiFormContact.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = askAiInputContact.value.trim();
    if (!question) return;
    askAiAnswerContactText.innerHTML = handleAskAi(question, askAiAnswerContactText);
    askAiAnswerContact.classList.remove("hidden");
    askAiAnswerContact.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
