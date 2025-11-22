/* ==========================================================
   ELITE CREDIT / DIGITAL BOOK SITE - MAIN SCRIPT
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {
  /* --------------------------------------------------------
     1. MOBILE NAV TOGGLE  (optional – works if you add .menu-toggle)
     -------------------------------------------------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('nav-open');
    });
  }

  /* --------------------------------------------------------
     2. SMOOTH SCROLL FOR INTERNAL LINKS (href="#section-id")
     -------------------------------------------------------- */
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------
     3. SIMPLE FORM CHECK (optional – for an intake form)
        If you have a form with id="intake-form"
     -------------------------------------------------------- */
  const intakeForm = document.getElementById('intake-form');

  if (intakeForm) {
    intakeForm.addEventListener('submit', function (e) {
      const nameField = intakeForm.querySelector('[name="name"]');
      const phoneField = intakeForm.querySelector('[name="phone"]');
      const emailField = intakeForm.querySelector('[name="email"]');

      if (
        (nameField && !nameField.value.trim()) ||
        (phoneField && !phoneField.value.trim()) ||
        (emailField && !emailField.value.trim())
      ) {
        e.preventDefault();
        alert('Please fill in your name, phone, and email so we can contact you.');
      }
    });
  }

  /* --------------------------------------------------------
     4. ASK THE CREDIT GENIE
        Uses:
        - button#aiButton
        - textarea#aiInput
        - div#aiResponse
     -------------------------------------------------------- */
  const genieButton = document.getElementById('aiButton');
  const genieInput = document.getElementById('aiInput');
  const genieResponse = document.getElementById('aiResponse');

  if (genieButton && genieInput && genieResponse) {
    genieButton.addEventListener('click', function () {
      const question = genieInput.value.trim();

      // If the box is empty
      if (!question) {
        genieResponse.innerHTML = `
          <p><strong>🧞‍♂️ Credit Genie:</strong><br>
          Ask me anything about credit repair, collections, charge-offs,
          late payments, or rebuilding your score. I’m here to guide you.</p>
        `;
        return;
      }

      // Base response for any question
      let answer = `
        <p><strong>🧞‍♂️ Credit Genie:</strong></p>
        <p>Here’s the blueprint most people need to follow:</p>
        <ul>
          <li>📄 Step 1: Pull all 3 credit reports (Experian, Equifax, TransUnion).</li>
          <li>🔎 Step 2: Circle anything inaccurate, unverifiable, or outdated.</li>
          <li>✉️ Step 3: Dispute in writing, never just by phone.</li>
          <li>💳 Step 4: Build positive history (on-time payments, secured card, small lines).</li>
          <li>🚫 Step 5: No more late payments – they reset your progress.</li>
        </ul>
        <p>Your question:</p>
        <blockquote>${question}</blockquote>
        <p>When you’re ready, we’ll turn this into a step-by-step plan based on your reports.</p>
      `;

      const lowerQ = question.toLowerCase();

      // Extra: Collections
      if (lowerQ.includes('collection')) {
        answer += `
          <p><strong>Collection Tip:</strong><br>
          Don’t admit the debt on the phone. First send a written
          validation request and make them prove the debt is accurate,
          within the statute of limitations, and that they legally own it.</p>
        `;
      }

      // Extra: Late payments
      if (lowerQ.includes('late')) {
        answer += `
          <p><strong>Late Payment Strategy:</strong><br>
          If the account is now current and you have a decent history,
          send a goodwill letter asking them to remove the late mark as a
          one-time courtesy.</p>
        `;
      }

      // Extra: Charge-offs
      if (lowerQ.includes('charge') || lowerQ.includes('charge-off') || lowerQ.includes('charge off')) {
        answer += `
          <p><strong>Charge-Off Tip:</strong><br>
          Confirm who actually owns the debt now. Negotiate only after
          verification and try to get any deal in writing before paying.</p>
        `;
      }

      // Extra: Utilization / cards
      if (lowerQ.includes('utilization') || lowerQ.includes('maxed') || lowerQ.includes('credit card')) {
        answer += `
          <p><strong>Utilization Tip:</strong><br>
          Try to keep your reported balances under 30% of your limits,
          and under 10% if you want the best score boost.</p>
        `;
      }

      // Show the final response
      genieResponse.innerHTML = answer;
    });
  }
});
