// login.js — uses Firebase v11 modular SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// 🔐 YOUR REAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDPjNMpXSlG9AQaRNgqgMU2AzNDuVxPZ2w",
  authDomain: "elite-credit-7f331.firebaseapp.com",
  projectId: "elite-credit-7f331",
  storageBucket: "elite-credit-7f331.firebasestorage.app",
  messagingSenderId: "208721021996",
  appId: "1:208721021996:web:cf3bcaed72b99f72ef5589",
};

// 🔧 INIT APP + AUTH
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ====== SIGN UP (CREATE ACCOUNT) ======
const signupEmailInput = document.getElementById("signup-email");
const signupPasswordInput = document.getElementById("signup-password");
const signupButton = document.getElementById("signup-button");
const signupError = document.getElementById("signup-error");

if (signupButton) {
  signupButton.addEventListener("click", async (e) => {
    e.preventDefault();
    signupError.textContent = "";

    const email = signupEmailInput.value.trim();
    const password = signupPasswordInput.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      signupError.style.color = "lime";
      signupError.textContent = "Account created! You can log in now.";
    } catch (err) {
      signupError.style.color = "red";
      signupError.textContent = "Error: " + err.message;
    }
  });
}

// ====== LOG IN ======
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");

if (loginButton) {
  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    loginError.textContent = "";

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      loginError.style.color = "lime";
      loginError.textContent = "Logged in! Redirecting...";
      // 👉 change this if you want a different page
      setTimeout(() => {
        window.location.href = "snapshot.html";
      }, 1500);
    } catch (err) {
      loginError.style.color = "red";
      loginError.textContent = "Error: " + err.message;
    }
  });
}

// ====== RESET PASSWORD ======
const resetEmailInput = document.getElementById("reset-email");
const resetButton = document.getElementById("reset-button");
const resetMessage = document.getElementById("reset-message");

if (resetButton) {
  resetButton.addEventListener("click", async (e) => {
    e.preventDefault();
    resetMessage.textContent = "";

    const email = resetEmailInput.value.trim();

    try {
      await sendPasswordResetEmail(auth, email);
      resetMessage.style.color = "lime";
      resetMessage.textContent = "Reset email sent. Check your inbox.";
    } catch (err) {
      resetMessage.style.color = "red";
      resetMessage.textContent = "Error: " + err.message;
    }
  });
}
