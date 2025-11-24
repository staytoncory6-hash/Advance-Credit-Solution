// login.js
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

// We’ll grab the auth instance from the global we set in index.html
const auth = window.firebaseAuth;

// Get references to elements
const signupEmailInput = document.getElementById("signup-email");
const signupPasswordInput = document.getElementById("signup-password");
const signupBtn = document.getElementById("signup-btn");
const signupError = document.getElementById("signup-error");

const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

const authStatusText = document.getElementById("auth-status-text");
const logoutBtn = document.getElementById("logout-btn");

// Handle Sign Up
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    signupError.textContent = "";
    try {
      await createUserWithEmailAndPassword(
        auth,
        signupEmailInput.value,
        signupPasswordInput.value
      );
      signupError.textContent = "Account created! You are logged in.";
    } catch (error) {
      signupError.textContent = error.message;
    }
  });
}

// Handle Login
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    loginError.textContent = "";
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmailInput.value,
        loginPasswordInput.value
      );
      loginError.textContent = "";
      // Example: redirect to a members-only page
      // window.location.href = "dashboard.html";
    } catch (error) {
      loginError.textContent = error.message;
    }
  });
}

// Handle Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
  });
}

// Watch auth state changes (logged in/out)
onAuthStateChanged(auth, (user) => {
  if (user) {
    authStatusText.textContent = `Logged in as ${user.email}`;
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    authStatusText.textContent = "You are not logged in.";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCeB-_qx3SD9ABfbq0ZHI3A9cUNtjQhVZ0",
    authDomain: "elite-credit.firebaseapp.com",
    projectId: "elite-credit",
    storageBucket: "elite-credit.firebasestorage.app",
    messagingSenderId: "1010475492974",
    appId: "1:1010475492974:web:032c9b4a7a97c177dfe87f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
