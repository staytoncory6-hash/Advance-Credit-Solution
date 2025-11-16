document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll from hero CTA to intake form
  const cta = document.getElementById("cta-audit");
  const intakeSection = document.getElementById("intake");
  if (cta && intakeSection) {
    cta.addEventListener("click", () => {
      intakeSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Score slider logic
  const scoreRange = document.getElementById("scoreRange");
  const scoreValue = document.getElementById("scoreValue");
  const scoreMessage = document.getElementById("scoreMessage");

  function updateScoreMessage(score) {
    let msg = "";
    if (score < 580) {
      msg = "This range is considered challenged credit. Denials are common, but targeted disputes and new positive accounts over time can help.";
    } else if (score < 670) {
      msg = "Many people in this range are recovering from past issues. Cleaning up errors and managing balances can still move you up.";
    } else if (score < 740) {
      msg = "This is often seen as good credit. Small improvements and strong habits can still make a big difference with rates.";
    } else {
      msg = "This range is typically considered excellent. Our focus would be education and protecting the strong profile you already have.";
    }
    scoreMessage.textContent = msg;
  }

  if (scoreRange && scoreValue && scoreMessage) {
    updateScoreMessage(Number(scoreRange.value));
    scoreRange.addEventListener("input", (e) => {
      const val = Number(e.target.value);
      scoreValue.textContent = val;
      updateScoreMessage(val);
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  // Intake form fake submit (front-end only)
  const intakeForm = document.getElementById("intakeForm");
  if (intakeForm) {
    intakeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your information has been received by Advanced Credit Solution. We will follow up shortly.");
      intakeForm.reset();
    });
  }

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
