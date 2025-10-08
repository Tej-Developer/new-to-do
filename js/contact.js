
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("success-message");

// Pre-fill if user is logged in
window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(
        sessionStorage.getItem("taskforge_current_user") || "null"
    );
    if (user) {
        nameInput.value = user.name;
        emailInput.value = user.email;
    }
});

// Clear errors on input
[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
        input.classList.remove("error");
        document.getElementById(`${input.id}-error`).classList.remove("show");
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    document
        .querySelectorAll(".error")
        .forEach((el) => el.classList.remove("error"));
    document
        .querySelectorAll(".error-text")
        .forEach((el) => el.classList.remove("show"));
    successMessage.classList.remove("show");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        nameInput.classList.add("error");
        document.getElementById("name-error").classList.add("show");
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailInput.classList.add("error");
        document.getElementById("email-error").classList.add("show");
        isValid = false;
    }

    // Validate message
    if (message.length < 10) {
        messageInput.classList.add("error");
        document.getElementById("message-error").classList.add("show");
        isValid = false;
    }

    if (!isValid) return;

    // Store message
    const contacts = JSON.parse(
        sessionStorage.getItem("taskforge_contacts") || "[]"
    );
    contacts.push({
        id: Date.now(),
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
    });
});
