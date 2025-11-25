// member.js — Elite AI Credit Repair auth
// Uses Firebase v11 modular SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// 🔐 1. YOUR FIREBASE CONFIG HERE
// Go to Firebase console > Project settings > General > Your apps > SDK setup and configuration
// and copy your actual config into this object:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// ❗❗ IMPORTANT:
// Replace EVERYTHING in firebaseConfig above with the exact values from Firebase.
// Do NOT leave any of the placeholders like YOUR_API_KEY_HERE.

// 2. Initialize Firebase + Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. Grab DOM elements
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const resetForm = document.getElementById("reset-form");
const logoutBtn = document.getElementById("logout-btn");
const authStatus = document.getElementById("auth-status");
const authMessage = document.getElementById("auth-message");

// Helper: show messages
function showMessage(text, type = "info") {
  if (!authMessage) return;
  authMessage.textContent = text;
  authMessage.className = `auth-message ${type}`;
}

// 4. SIGN UP
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showMessage("Account created! You are now logged in.", "success");
      signupForm.reset();
    } catch (error) {
      console.error("Signup error:", error);
      showMessage(error.message, "error");
    }
  });
}

// 5. LOGIN
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Logged in successfully.", "success");
      loginForm.reset();
    } catch (error) {
      console.error("Login error:", error);
      showMessage(error.message, "error");
    }
  });
}

// 6. RESET PASSWORD
if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reset-email").value.trim();

    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("Password reset email sent. Check your inbox.", "success");
      resetForm.reset();
    } catch (error) {
      console.error("Reset error:", error);
      showMessage(error.message, "error");
    }
  });
}

// 7. LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showMessage("You have been logged out.", "info");
    } catch (error) {
      console.error("Logout error:", error);
      showMessage(error.message, "error");
    }
  });
}

// 8. AUTH STATE LISTENER
onAuthStateChanged(auth, (user) => {
  if (!authStatus || !logoutBtn) return;

  if (user) {
    // Logged in
    authStatus.textContent = `Logged in as: ${user.email}`;
    logoutBtn.style.display = "inline-block";
  } else {
    // Logged out
    authStatus.textContent = "You are currently logged out.";
    logoutBtn.style.display = "none";
  }
});
