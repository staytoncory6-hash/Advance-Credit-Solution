// login.js — Elite AI Credit Repair
// Handles signup, login, logout, and reset with Firebase Auth (v11 modular)

// 1) IMPORTS FROM FIREBASE CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
// ================== FIREBASE INITIALIZATION ==================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

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
const auth = getAuth(app);

// ================== END FIREBASE SETUP ==================



// 4) GRAB DOM ELEMENTS (these IDs should match your login.html)
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const resetForm = document.getElementById("reset-form");
const logoutBtn = document.getElementById("logout-btn");
const authStatus = document.getElementById("auth-status");
const authMessage = document.getElementById("auth-message");

// Helper to show messages in a single message box
function showMessage(text, type = "info") {
  if (!authMessage) return;
  authMessage.textContent = text;
  authMessage.className = `auth-message ${type}`;
}

// 5) SIGN UP HANDLER
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById("signup-email");
    const passEl = document.getElementById("signup-password");
    const email = emailEl?.value.trim();
    const password = passEl?.value.trim();

    if (!email || !password) {
      showMessage("Please enter both email and password to create an account.", "error");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showMessage("Account created! You are now logged in.", "success");
      signupForm.reset();

      // Redirect to member area after signup
      window.location.href = "member.html";
    } catch (error) {
      console.error("Signup error:", error);
      showMessage(cleanFirebaseError(error), "error");
    }
  });
}

// 6) LOGIN HANDLER
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById("login-email");
    const passEl = document.getElementById("login-password");
    const email = emailEl?.value.trim();
    const password = passEl?.value.trim();

    if (!email || !password) {
      showMessage("Please enter your email and password to log in.", "error");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Logged in successfully.", "success");
      loginForm.reset();

      // Redirect to member area after login
      window.location.href = "member.html";
    } catch (error) {
      console.error("Login error:", error);
      showMessage(cleanFirebaseError(error), "error");
    }
  });
}

// 7) PASSWORD RESET HANDLER
if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById("reset-email");
    const email = emailEl?.value.trim();

    if (!email) {
      showMessage("Enter your email to send a reset link.", "error");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("Password reset email sent. Check your inbox.", "success");
      resetForm.reset();
    } catch (error) {
      console.error("Reset error:", error);
      showMessage(cleanFirebaseError(error), "error");
    }
  });
}

// 8) LOGOUT HANDLER
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showMessage("You have been logged out.", "info");
      // Optional: send them back to login page
      // window.location.href = "login.html";
    } catch (error) {
      console.error("Logout error:", error);
      showMessage(cleanFirebaseError(error), "error");
    }
  });
}

// 9) AUTH STATE LISTENER – STATUS TEXT
onAuthStateChanged(auth, (user) => {
  if (!authStatus) return;

  if (user) {
    authStatus.textContent = `Logged in as: ${user.email}`;
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    authStatus.textContent = "You are currently logged out.";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

// 10) OPTIONAL: CLEANER ERROR MESSAGES
function cleanFirebaseError(error) {
  if (!error || !error.code) return "Something went wrong. Please try again.";

  switch (error.code) {
    case "auth/invalid-email":
      return "That email address looks invalid. Please check it and try again.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "There is already an account with that email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    default:
      return error.message || "An unknown error occurred.";
  }
}
