// member.js — Elite AI Credit Repair
// Handles member-only dashboard: auth protection, snapshot save/load, and live personalized tips.

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

// ===============================
// 1) FIREBASE CONFIG
//    🔥 IMPORTANT 🔥
//    Replace this with the EXACT same firebaseConfig used in login.js
// ===============================
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPjNMpXSlG9AQaRNgqgMU2AzNDuVxPZ2w",
  authDomain: "elite-credit-7f331.firebaseapp.com",
  projectId: "elite-credit-7f331",
  storageBucket: "elite-credit-7f331.firebasestorage.app",
  messagingSenderId: "208721021996",
  appId: "1:208721021996:web:cf3bcaed72b99f72ef5589"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ===============================
// 2) INIT APP, AUTH, DB
// ===============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===============================
// 3) DOM HELPERS
// ===============================
const $ = (id) => document.getElementById(id);

const authStatus = $("auth-status");
const logoutBtn = $("logout-btn");

const scoreTransunion = $("score-transunion");
const scoreEquifax = $("score-equifax");
const scoreExperian = $("score-experian");

const issueLates = $("issue-lates");
const issueCollections = $("issue-collections");
const issueUtil = $("issue-util");
const issueInquiries = $("issue-inquiries");
const issueIdTheft = $("issue-idtheft");

const mainGoal = $("main-goal");

const saveSnapshotBtn = $("save-snapshot-btn");
const saveStatus = $("save-status");
const tipsList = $("tips-list");

// Optional: area to show "Last updated"
let lastUpdatedTextEl = document.querySelector(".snapshot-last-updated");

// If you want, you can add in your HTML:
// <p class="snapshot-last-updated"></p>

// ===============================
// 4) STATUS MESSAGE HELPERS
// ===============================
function setAuthStatus(text) {
  if (!authStatus) return;
  authStatus.textContent = text;
}

function showSaveStatus(text, type = "info") {
  if (!saveStatus) return;
  saveStatus.textContent = text;
  saveStatus.className = `auth-message ${type}`;
}

function formatDateTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ===============================
// 5) SNAPSHOT DATA HELPERS
// ===============================
function clampScore(value) {
  if (!value) return "";
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  if (num < 300) return 300;
  if (num > 850) return 850;
  return Math.round(num);
}

function getSnapshotFromForm() {
  return {
    scoreTransunion: scoreTransunion ? clampScore(scoreTransunion.value) : "",
    scoreEquifax: scoreEquifax ? clampScore(scoreEquifax.value) : "",
    scoreExperian: scoreExperian ? clampScore(scoreExperian.value) : "",
    issueLates: !!issueLates?.checked,
    issueCollections: !!issueCollections?.checked,
    issueUtil: !!issueUtil?.checked,
    issueInquiries: !!issueInquiries?.checked,
    issueIdTheft: !!issueIdTheft?.checked,
    mainGoal: mainGoal?.value?.trim() || "",
  };
}

// ===============================
// 6) BUILD PERSONALIZED TIPS
// ===============================
function buildTips(data) {
  const tips = [];
  const tu = Number(data.scoreTransunion || 0);
  const eq = Number(data.scoreEquifax || 0);
  const ex = Number(data.scoreExperian || 0);

  const scores = [tu, eq, ex].filter((s) => s > 0);
  const minScore = scores.length ? Math.min(...scores) : null;

  // Overall score band guidance
  if (minScore && minScore < 580) {
    tips.push(
      "Your scores might be in a rough spot right now. Your first mission: 3–6 months of perfect on-time payments and paying down any cards that are maxed."
    );
  } else if (minScore && minScore >= 580 && minScore < 640) {
    tips.push(
      "You’re in rebuilding territory. Tighten up spending, avoid new hard pulls, and knock out the most obviously wrong or damaging accounts first."
    );
  } else if (minScore && minScore >= 640 && minScore < 700) {
    tips.push(
      "You’re close to prime territory. Keep utilization low (under 30%, then under 10%) and clean up lingering negatives one by one."
    );
  } else if (minScore && minScore >= 700) {
    tips.push(
      "You’re in the stronger range. Your job now is defense: keep utilization low, protect your on-time history, and be picky about new credit."
    );
  }

  // Issues
  if (data.issueLates) {
    tips.push(
      "Late payments: bring every account current if you can. Going forward, 100% on-time payments are your new non-negotiable. Consider goodwill letters for one-time mistakes."
    );
  }
  if (data.issueCollections) {
    tips.push(
      "Collections / charge-offs: dispute anything that looks inaccurate, unverified, or past the reporting window. For accurate debts, negotiate in writing only — ask if they will delete or update to 'paid as agreed' after payment."
    );
  }
  if (data.issueUtil) {
    tips.push(
      "High utilization: pick one or two cards to attack first and pay them down below 30% of the limit. That alone can move your score faster than almost anything else."
    );
  }
  if (data.issueInquiries) {
    tips.push(
      "Too many inquiries: pause all applications for at least 6–12 months unless it’s absolutely necessary (housing, car, job). Let the old pulls age and lose their impact."
    );
  }
  if (data.issueIdTheft) {
    tips.push(
      "Identity theft / not mine: keep your paper trail tight. Consider a fraud alert or freeze, send disputes with police/FTC documents attached, and save copies of every letter."
    );
  }

  // Goal-based encouragement
  if (data.mainGoal) {
    tips.push(
      `Main goal: “${data.mainGoal}”. Every letter you send and every dollar you pay down is about that goal — not just chasing a number on a screen.`
    );
  }

  if (!tips.length) {
    tips.push(
      "Fill in your scores, check what you’re dealing with, and write your main goal. Then hit “Save My Snapshot” to see tailored tips here."
    );
  }

  return tips;
}

// ===============================
// 7) RENDER TIPS
// ===============================
function renderTips(data) {
  if (!tipsList) return;
  tipsList.innerHTML = "";

  const tips = buildTips(data);

  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    li.classList.add("tip-item");
    tipsList.appendChild(li);
  });
}

// ===============================
// 8) LOAD SNAPSHOT FROM FIRESTORE
// ===============================
async function loadSnapshot(user) {
  if (!user) return;

  try {
    showSaveStatus("Loading your snapshot...", "info");

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    let data = {};

    if (snap.exists()) {
      data = snap.data();

      if (scoreTransunion) scoreTransunion.value = data.scoreTransunion || "";
      if (scoreEquifax) scoreEquifax.value = data.scoreEquifax || "";
      if (scoreExperian) scoreExperian.value = data.scoreExperian || "";

      if (issueLates) issueLates.checked = !!data.issueLates;
      if (issueCollections) issueCollections.checked = !!data.issueCollections;
      if (issueUtil) issueUtil.checked = !!data.issueUtil;
      if (issueInquiries) issueInquiries.checked = !!data.issueInquiries;
      if (issueIdTheft) issueIdTheft.checked = !!data.issueIdTheft;

      if (mainGoal) mainGoal.value = data.mainGoal || "";

      if (lastUpdatedTextEl && data.updatedAt) {
        lastUpdatedTextEl.textContent = `Last updated: ${formatDateTime(
          data.updatedAt
        )}`;
      }

      showSaveStatus("Snapshot loaded.", "success");
    } else {
      showSaveStatus("No snapshot saved yet. Fill it out and hit “Save My Snapshot”.", "info");
    }

    renderTips(data);
  } catch (error) {
    console.error("Error loading snapshot:", error);
    showSaveStatus("Error loading snapshot. You can still fill it out and try saving.", "error");
    renderTips({});
  }
}

// ===============================
// 9) SAVE SNAPSHOT TO FIRESTORE
// ===============================
async function saveSnapshot(user) {
  if (!user) return;

  const data = {
    ...getSnapshotFromForm(),
    updatedAt: new Date().toISOString(),
  };

  try {
    showSaveStatus("Saving your snapshot...", "info");
    await setDoc(doc(db, "users", user.uid), data, { merge: true });
    showSaveStatus("Snapshot locked in. Keep going — future you will be glad you did.", "success");

    if (lastUpdatedTextEl && data.updatedAt) {
      lastUpdatedTextEl.textContent = `Last updated: ${formatDateTime(
        data.updatedAt
      )}`;
    }

    renderTips(data);
  } catch (error) {
    console.error("Error saving snapshot:", error);
    showSaveStatus("Error saving snapshot. Check your connection and try again.", "error");
  }
}

// ===============================
// 10) WIRE UP EVENTS
// ===============================
function wireUpFormLiveTips() {
  const liveInputs = [
    scoreTransunion,
    scoreEquifax,
    scoreExperian,
    issueLates,
    issueCollections,
    issueUtil,
    issueInquiries,
    issueIdTheft,
    mainGoal,
  ].filter(Boolean);

  liveInputs.forEach((el) => {
    const evt = el.tagName === "INPUT" && el.type === "checkbox" ? "change" : "input";
    el.addEventListener(evt, () => {
      const currentData = getSnapshotFromForm();
      renderTips(currentData);

      // Gentle reminder they haven’t saved yet
      showSaveStatus("Changes not saved yet. Hit “Save My Snapshot” to lock this in.", "info");
    });
  });
}

// SAVE BUTTON
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

// LOGOUT BUTTON
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "login.html";
    } catch (error) {
      console.error("Logout error:", error);
      showSaveStatus("Error logging out. Try again.", "error");
    }
  });
}

// ===============================
// 11) AUTH GUARD — PROTECT PAGE
// ===============================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in → go to login page
    window.location.href = "login.html";
    return;
  }

  // Logged in
  setAuthStatus(`Welcome back, ${user.email}`);
  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
  }

  wireUpFormLiveTips();
  loadSnapshot(user);
});
