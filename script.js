// script.js – shared JS for all pages

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Ask AI (works on any page that has the elements)
  const form = document.getElementById('ask-ai-form');
  const questionBox = document.getElementById('ask-ai-question');
  const statusBox = document.getElementById('ask-ai-status');
  const answerBox = document.getElementById('ask-ai-answer');

  if (!form || !questionBox || !statusBox || !answerBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const question = questionBox.value.trim();
    if (!question) {
      statusBox.textContent = 'Type a question first so Elite AI knows what to answer.';
      answerBox.innerHTML = '';
      return;
    }

    statusBox.textContent = 'Thinking through your question…';

    const lower = question.toLowerCase();

    let answer = `
      <p><strong>🔮 Elite AI (Credit Education):</strong></p>
      <p>Here’s the basic blueprint most people need to follow:</p>
      <ul>
        <li>📄 Pull all 3 reports (Experian, Equifax, TransUnion).</li>
        <li>🔍 Mark anything inaccurate, incomplete, outdated, or not yours.</li>
        <li>✍️ Dispute in writing, never just by phone.</li>
        <li>📈 Build new positive history (on-time payments, low utilization).</li>
        <li>⛔ Protect your progress – avoid new late payments if you can.</li>
      </ul>
      <p><strong>Your question:</strong></p>
      <blockquote>${question}</blockquote>
    `;

    if (
      lower.includes('collection') ||
      lower.includes('collections') ||
      lower.includes('charge off') ||
      lower.includes('charge-off') ||
      lower.includes('chargeoff')
    ) {
      answer += `
        <p><strong>Collections / Charge-offs Strategy:</strong></p>
        <ul>
          <li>1️⃣ Confirm details on all 3 bureaus: balance, dates, creditor, status.</li>
          <li>2️⃣ If anything is wrong or can’t be verified, dispute it in writing.</li>
          <li>3️⃣ If you settle, try to get the deal in writing before you pay.</li>
          <li>4️⃣ Keep copies of all letters and proof of mailing.</li>
        </ul>
      `;
    }

    if (
      lower.includes('late payment') ||
      lower.includes('late payments') ||
      lower.includes('30 days late') ||
      lower.includes('60 days late') ||
      lower.includes('90 days late')
    ) {
      answer += `
        <p><strong>Late Payments Strategy:</strong></p>
        <ul>
          <li>1️⃣ If the late is wrong, dispute with the bureaus and the lender.</li>
          <li>2️⃣ If it’s accurate but rare, ask for a goodwill adjustment.</li>
          <li>3️⃣ Going forward, use autopay or reminders to protect your history.</li>
        </ul>
      `;
    }

    if (
      lower.includes('repo') ||
      lower.includes('repossession') ||
      lower.includes('repossessed')
    ) {
      answer += `
        <p><strong>Repossession Strategy:</strong></p>
        <ul>
          <li>1️⃣ Check balance, sale price, dates, and status on your reports.</li>
          <li>2️⃣ Dispute any errors or missing info as inaccurate or incomplete.</li>
          <li>3️⃣ Some lenders will discuss settlement—get any deal in writing first.</li>
        </ul>
      `;
    }

    if (
      lower.includes('public record') ||
      lower.includes('bankruptcy') ||
      lower.includes('judgment') ||
      lower.includes('tax lien')
    ) {
      answer += `
        <p><strong>Public Records Strategy:</strong></p>
        <p>
          Courts usually do not send data directly to the credit bureaus. Bureaus
          often buy that info from data-mining companies. If your report says the
          court is the source but the court confirms they don’t furnish data,
          that can raise accuracy questions under the Fair Credit Reporting Act.
        </p>
        <p>Dispute any incorrect or unverified public record in writing and keep all responses.</p>
      `;
    }

    answer += `
      <p><strong>Next step:</strong> Use this as education only. For each account,
      you’d build a specific plan based on whether it’s accurate, outdated, or
      cannot be verified.</p>
      <p><em>This is general credit education, not legal, tax, or accounting advice.</em></p>
    `;

    statusBox.textContent = 'Here’s your educational game plan:';
    answerBox.innerHTML = answer;
  });
});
