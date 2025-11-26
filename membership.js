// member.js — Elite AI Credit Repair
// Handles member-only dashboard: loads & saves snapshots, protects page with auth, shows tips

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// 1) SAME FIREBASE CONFIG AS login.js
// Copy/paste the EXACT same firebaseConfig from login.js here:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// ❗ Replace EVERYTHING above with your real config — identical to login.js

// 2) INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3) DOM ELEMENTS (these IDs should match your member.html)
const authStatus = document.getElementById("auth-status");
const logoutBtn = document.getElementById("logout-btn");

const scoreTransunion = document.getElementById("score-transunion");
const scoreEquifax = document.getElementById("score-equifax");
const scoreExperian = document.getElementById("score-experian");

const issueLates = document.getElementById("issue-lates");
const issueCollections = document.getElementById("issue-collections");
const issueUtil = document.getElementById("issue-util");
const issueInquiries = document.getElementById("issue-inquiries");
const issueIdTheft = document.getElementById("issue-idtheft");

const mainGoal = document.getElementById("main-goal");

const saveSnapshotBtn = document.getElementById("save-snapshot-btn");
const saveStatus = document.getElementById("save-status");
const tipsList = document.getElementById("tips-list");

// Helper to show save messages
function showSaveStatus(text, type = "info") {
  if (!saveStatus) return;
  saveStatus.textContent = text;
  saveStatus.className = `auth-message ${type}`;
}

// 4) BUILD TIPS BASED ON SCORES + ISSUES
function buildTips(data) {
  const tips = [];
  const tu = Number(data.scoreTransunion || 0);
  const eq = Number(data.scoreEquifax || 0);
  const ex = Number(data.scoreExperian || 0);

  // Use the lowest non-zero score as "strength"
  const scores = [tu, eq, ex].filter((s) => s > 0);
  const minScore = scores.length ? Math.min(...scores) : null;

  if (minScore && minScore < 620) {
    tips.push(
      "Your scores may be in the fair/poor range. Focus on the basics: 3–6 months of perfect on-time payments and paying down revolving balances."
    );
  } else if (minScore && minScore >= 620 && minScore < 680) {
    tips.push(
      "You’re in rebuilding territory. Keep balances low, avoid new hard inquiries, and tackle the most damaging negative items first."
    );
  } else if (minScore && minScore >= 680) {
    tips.push(
      "You’re getting into stronger credit. Protect it by keeping utilization low (ideally under 10%) and maintaining 100% on-time payment history."
    );
  }

  if (data.issueLates) {
    tips.push(
      "Late payments: bring all accounts current and maintain 100% on-time payments going forward. Consider goodwill letters for one-time mistakes."
    );
  }
  if (data.issueCollections) {
    tips.push(
      "Collections/charge-offs: dispute anything inaccurate or unverifiable. For accurate debts, consider pay-for-delete arrangements in writing only."
    );
  }
  if (data.issueUtil) {
    tips.push(
      "High utilization: try to pay cards down below 30% of their limits, then work toward under 10%. This can give some of the fastest score improvements."
    );
  }
  if (data.issueInquiries) {
    tips.push(
      "Too many inquiries: stop applying for new credit unless absolutely necessary. Most hard pulls lose power after 12 months."
    );
  }
  if (data.issueIdTheft) {
    tips.push(
      "Identity theft: consider placing a fraud alert or freeze, file an identity theft report, and keep copies of all disputes and responses."
    );
  }

  if (!tips.length) {
    tips.push(
      "Update your scores and select any issues you’re dealing with above, then save your snapshot to see personalized tips here."
    );
  }

  return tips;
}

// 5) RENDER TIPS IN THE UL
function renderTips(data) {
  if (!tipsList) return;
  tipsList.innerHTML = "";
  const tips = buildTips(data);
  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

// 6) LOAD SNAPSHOT FROM FIRESTORE
async function loadSnapshot(user) {
  if (!user) return;
  try {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();

      if (scoreTransunion) scoreTransunion.value = data.scoreTransunion || "";
      if (scoreEquifax) scoreEquifax.value = data.scoreEquifax || "";
      if (scoreExperian) scoreExperian.value = data.scoreExperian || "";

      if (issueLates) issueLates.checked = !!data.issueLates;
      if (issueCollections) issueCollections.checked = !!data.issueCollections;
      if (issueUtil) issueUtil.checked = !!data.issueUtil;
      if (issueInquiries) issueInquiries.checked = !!data.issueInquiries;
      if (issueIdTheft) issueIdTheft.checked = !!data.issueIdTheft;

      if (mainGoal) mainGoal.value = data.mainGoal || "";

      renderTips(data);
    } else {
      renderTips({});
    }
  } catch (error) {
    console.error("Error loading snapshot:", error);
    renderTips({});
  }
}

// 7) SAVE SNAPSHOT TO FIRESTORE
async function saveSnapshot(user) {
  if (!user) return;

  const data = {
    scoreTransunion: scoreTransunion?.value || "",
    scoreEquifax: scoreEquifax?.value || "",
    scoreExperian: scoreExperian?.value || "",
    issueLates: !!issueLates?.checked,
    issueCollections: !!issueCollections?.checked,
    issueUtil: !!issueUtil?.checked,
    issueInquiries: !!issueInquiries?.checked,
    issueIdTheft: !!issueIdTheft?.checked,
    mainGoal: mainGoal?.value || "",
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, "users", user.uid), data, { merge: true });
    showSaveStatus("Snapshot saved.", "success");
    renderTips(data);
  } catch (error) {
    console.error("Error saving snapshot:", error);
    showSaveStatus("Error saving snapshot. Please try again.", "error");
  }
}

// 8) SAVE BUTTON CLICK
if (saveSnapshotBtn) {
  saveSnapshotBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
      showSaveStatus("You must be logged in to save your snapshot.", "error");
      return;
    }
    await saveSnapshot(user);
  });
}

// 9) LOGOUT BUTTON
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      // After logging out, send them back to login
      window.location.href = "login.html";
    } catch (error) {
      console.error("Logout error:", error);
    }
  });
}

// 🔒 10) PROTECT PAGE: REDIRECT IF NOT LOGGED IN
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in → go to login page
    window.location.href = "login.html";
    return;
  }

  // Logged in
  if (authStatus) {
    authStatus.textContent = `Logged in as: ${user.email}`;
  }
  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
  }

  // Load their saved snapshot
  loadSnapshot(user);
});
/* Mascot in membership header */
.mascot-icon {
  height: 20px;     /* YOU REQUESTED THIS SIZE */
  width: auto;
  margin-right: 0.35rem;
  display: inline-block;
  vertical-align: middle;
}

/* Make sure logo + mascot + text line up correctly */
.brand {
  display: flex;
  align-items: center;
}
