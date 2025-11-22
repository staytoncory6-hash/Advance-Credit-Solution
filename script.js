// Elite AI Credit Repair – front-end logic only
// Educational use only. No legal, tax, or financial advice.

// Run once the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupSnapshotForm();
  setupStrategyForm();
  setupAskAi();
  setupCashAppBookButton();
});

/* -------------------------
   Snapshot form (index.html)
-------------------------- */
function setupSnapshotForm() {
  const form = document.querySelector('.snapshot-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('input[name="name"]');
    const name = nameInput ? nameInput.value.trim() : 'there';

    alert(
      `Thanks, ${name}! Your Snapshot intake was received.\n\n` +
      `Right now this form stores your info locally only. ` +
      `When you’re ready, you can connect it to email or a CRM.`
    );

    form.reset();
  });
}

/* ------------------------------
   Strategy Session form (contact)
------------------------------- */
function setupStrategyForm() {
  const form = document.querySelector('.strategy-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('input[name="name"]');
    const name = nameInput ? nameInput.value.trim() : 'there';

    alert(
      `Thanks, ${name}! Your request for a strategy session was received.\n\n` +
      `Right now this form is for demo purposes only. ` +
      `You can later hook it to email, Google Forms, or your CRM.`
    );

    form.reset();
  });
}

/* -----------------------------------
   Ask a Credit Repair Question (Q&A)
------------------------------------ */
function setupAskAi() {
  const button = document.getElementById('ask-ai-button');
  const questionBox = document.getElementById('ai-question');
  const answerBox = document.getElementById('ai-answer');

  if (!button || !questionBox || !answerBox) return;

  button.addEventListener('click', () => {
    const question = questionBox.value.trim();

    if (!question) {
      answerBox.textContent = 'Please type a credit repair question first.';
      return;
    }

    const answer = generateCreditAnswer(question);
    answerBox.innerHTML = answer;
  });
}

/**
 * Very simple “AI-style” answer generator.
 * - Only responds to CREDIT REPAIR questions.
 * - If the question looks unrelated, it refuses.
 * - All answers are EDUCATIONAL ONLY.
 */
function generateCreditAnswer(rawQuestion) {
  const q = rawQuestion.toLowerCase();

  // Keywords that must be present for us to answer
  const creditKeywords = [
    'credit',
    'collection',
    'collections',
    'charge off',
    'charge-off',
    'late payment',
    'late payments',
    'inquiry',
    'inquiries',
    'repossession',
    'repo',
    'bankruptcy',
    'tax lien',
    'dispute',
    'credit report',
    'credit score',
    'bureau',
    'transunion',
    'equifax',
    'experian'
  ];

  const mentionsCredit = creditKeywords.some((word) => q.includes(word));

  if (!mentionsCredit) {
    return (
      'This tool only answers questions related to credit repair and credit reporting.\n\n' +
      'Try asking something like:\n' +
      '• How long can a collection stay on my credit report?\n' +
      '• What happens if I ignore a charge-off?\n' +
      '• How do disputes with the credit bureaus work?'
    ).replace(/\n/g, '<br>');
  }

  // Very simple pattern-based answers
  if (q.includes('collection') || q.includes('collections')) {
    return (
      '<strong>Collections & Your Credit (Educational Only)</strong><br><br>' +
      'In general, a collection account can stay on your credit report for up to seven years ' +
      'from the date of the original delinquency, even if it is paid. Some lenders care more ' +
      'about recent activity than older collections. You can usually dispute a collection if ' +
      'you believe it is inaccurate, incomplete, or cannot be verified under the Fair Credit ' +
      'Reporting Act (FCRA).<br><br>' +
      'This is educational information only, not legal advice. For decisions about your ' +
      'specific situation, consider speaking with a qualified professional.'
    );
  }

  if (q.includes('late payment')) {
    return (
      '<strong>Late Payments (Educational Only)</strong><br><br>' +
      'Late payments typically begin to impact your credit once they are reported as 30 days ' +
      'late or more. The more recent and the more frequent the late payments, the more damage ' +
      'they can do to your scores. Some creditors may consider goodwill adjustments for ' +
      'one-time mistakes, especially if your history with them has been mostly positive.<br><br>' +
      'Nothing here is legal advice. Always review your own reports and statements carefully.'
    );
  }

  if (q.includes('inquiry')) {
    return (
      '<strong>Hard Inquiries (Educational Only)</strong><br><br>' +
      'Hard inquiries are created when you apply for new credit and give a lender permission ' +
      'to pull your report. Most stay on your credit report for about two years, but many ' +
      'scoring models only weigh them heavily for the first 12 months. Multiple auto or ' +
      'mortgage inquiries within a short “shopping window” may be treated as a single inquiry ' +
      'by some scoring models.<br><br>' +
      'This explanation is for education only and is not legal or financial advice.'
    );
  }

  if (q.includes('bankruptcy')) {
    return (
      '<strong>Bankruptcy (Educational Only)</strong><br><br>' +
      'A Chapter 7 bankruptcy can generally remain on a credit report for up to ten years; ' +
      'a Chapter 13 usually reports for about seven years from the filing date. During that ' +
      'time, many lenders view bankruptcy as a serious negative, but people can still rebuild ' +
      'credit over time by managing new accounts carefully and keeping utilization low.<br><br>' +
      'Always consult a qualified attorney or professional for guidance on your specific case.'
    );
  }

  if (q.includes('dispute') || q.includes('bureau')) {
    return (
      '<strong>Disputing Credit Report Items (Educational Only)</strong><br><br>' +
      'Under the FCRA, you generally have the right to dispute items on your credit report ' +
      'that you believe are inaccurate, incomplete, or not verifiable. Once you file a ' +
      'dispute, the credit bureau typically has about 30 days to investigate, contact the ' +
      'furnisher of the information, and respond. If the furnisher cannot verify the item, ' +
      'it should usually be corrected or removed.<br><br>' +
      'This process explanation is educational only and not legal advice.'
    );
  }

  // Generic educational answer if we don’t match specific patterns
  return (
    '<strong>General Credit Repair Education</strong><br><br>' +
    'Most of credit repair comes down to three core ideas:<br>' +
    '1) Making sure what is on your reports is accurate, complete, and verifiable under the law.<br>' +
    '2) Dealing with negative items strategically (disputes, pay-for-delete where appropriate, ' +
    'settlements, or waiting out time limits).<br>' +
    '3) Building positive credit going forward with on-time payments and responsible balances.<br><br>' +
    'Nothing in this answer is legal, tax, or financial advice. It is general education only, ' +
    'and you should review your own situation with a qualified professional before making decisions.'
  );
}

/* ---------------------------------
   Cash App Button for Digital Book
---------------------------------- */
function setupCashAppBookButton() {
  const button = document.getElementById('cashapp-book-button');
  if (!button) return;

  button.addEventListener('click', (e) => {
    e.preventDefault();

    // TODO: replace YOURCASHAPPNAME with your actual Cashtag
    // Example: https://cash.app/$EliteCredit/39.99
    const cashAppUrl = 'https://cash.app/$YOURCASHAPPNAME/39.99';

    if (cashAppUrl.includes('YOURCASHAPPNAME')) {
      alert(
        'Cash App link is not set yet.\n\n' +
        'Open script.js and replace $YOURCASHAPPNAME with your real Cashtag ' +
        'in the setupCashAppBookButton() function.'
      );
      return;
    }

    window.location.href = cashAppUrl;
  });
}
