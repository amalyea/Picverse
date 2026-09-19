const form = document.getElementById("form");
const nameInput = document.getElementById("firstname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById(
    "repeat-password-input"
);
const errorMessage = document.getElementById("error-message");

const existingSession = localStorage.getItem("picverseSession");

if (existingSession) {
    window.location.replace("home.html");
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    clearErrors();

    const isSignupPage =
        nameInput !== null && repeatPasswordInput !== null;

    if (isSignupPage) {
        await handleSignup();
    } else {
        await handleLogin();
    }
});

async function handleSignup() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const repeatedPassword = repeatPasswordInput.value;

    const errors = [];

    if (name === "") {
        errors.push("Name is required");
        markIncorrect(nameInput);
    }

    if (email === "") {
        errors.push("Email is required");
        markIncorrect(emailInput);
    } else if (!isValidEmail(email)) {
        errors.push("Please enter a valid email address");
        markIncorrect(emailInput);
    }

    if (password === "") {
        errors.push("Password is required");
        markIncorrect(passwordInput);
    } else if (password.length < 8) {
        errors.push("Password must contain at least 8 characters");
        markIncorrect(passwordInput);
    }

    if (repeatedPassword === "") {
        errors.push("Please repeat your password");
        markIncorrect(repeatPasswordInput);
    } else if (password !== repeatedPassword) {
        errors.push("Passwords do not match");
        markIncorrect(passwordInput);
        markIncorrect(repeatPasswordInput);
    }

    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    const existingAccount = getStoredAccount();

    if (existingAccount && existingAccount.email === email) {
        showErrors([
            "An account with this email already exists. Please log in."
        ]);

        markIncorrect(emailInput);
        return;
    }

    const passwordHash = await hashPassword(password);

    const account = {
        name: name,
        email: email,
        passwordHash: passwordHash
    };

    localStorage.setItem(
        "picverseAccount",
        JSON.stringify(account)
    );

    createSession(account);

    window.location.replace("home.html");
}

async function handleLogin() {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    const errors = [];

    if (email === "") {
        errors.push("Email is required");
        markIncorrect(emailInput);
    } else if (!isValidEmail(email)) {
        errors.push("Please enter a valid email address");
        markIncorrect(emailInput);
    }

    if (password === "") {
        errors.push("Password is required");
        markIncorrect(passwordInput);
    }

    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    const account = getStoredAccount();

    if (!account) {
        showErrors([
            "No account was found. Please create an account first."
        ]);

        return;
    }

    const passwordHash = await hashPassword(password);

    const emailMatches = account.email === email;
    const passwordMatches = account.passwordHash === passwordHash;

    if (!emailMatches || !passwordMatches) {
        showErrors(["Incorrect email or password"]);
        markIncorrect(emailInput);
        markIncorrect(passwordInput);

        return;
    }

    createSession(account);

    window.location.replace("home.html");
}

function createSession(account) {
    const session = {
        name: account.name,
        email: account.email,
        signedInAt: new Date().toISOString()
    };

    localStorage.setItem(
        "picverseSession",
        JSON.stringify(session)
    );
}

function getStoredAccount() {
    const storedAccount = localStorage.getItem("picverseAccount");

    if (!storedAccount) {
        return null;
    }

    try {
        return JSON.parse(storedAccount);
    } catch (error) {
        localStorage.removeItem("picverseAccount");
        return null;
    }
}

async function hashPassword(password) {
    const encodedPassword = new TextEncoder().encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        encodedPassword
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(function (byte) {
            return byte.toString(16).padStart(2, "0");
        })
        .join("");
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showErrors(errors) {
    errorMessage.textContent = errors.join(". ");
}

function markIncorrect(input) {
    if (input) {
        input.parentElement.classList.add("incorrect");
    }
}

function clearErrors() {
    errorMessage.textContent = "";
    const incorrectGroups = form.querySelectorAll(".incorrect");
    incorrectGroups.forEach(function (group) {
        group.classList.remove("incorrect");
    });
}

const allInputs = [
    nameInput,
    emailInput,
    passwordInput,
    repeatPasswordInput
].filter(function (input) {
    return input !== null;
});

allInputs.forEach(function (input) {
    input.addEventListener("input", function () {
        input.parentElement.classList.remove("incorrect");
        errorMessage.textContent = "";
    });
});