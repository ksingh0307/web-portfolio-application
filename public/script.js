

document.addEventListener("DOMContentLoaded", () => {
    // Simulate app loading (replace with real loading logic)
    setTimeout(() => {
      const splashScreen = document.getElementById('custom-splash-screen');
      if (splashScreen) {
        splashScreen.style.opacity = 0;
        splashScreen.style.transition = 'opacity 1s';
        setTimeout(() => {
          splashScreen.remove(); // Fully remove the splash screen from the DOM
        }, 1000); // Match fade-out duration
      }
    }, 3000); // Adjust to match your app's loading duration
});
  

function toggleMenu() {
    const mobileNav = document.getElementById("mobileNav");
    const burgerIcon = document.querySelector(".burger-icon");
  
    mobileNav.classList.toggle("active");
    burgerIcon.classList.toggle("active");
}
  
var msg = document.getElementById("msg");

// Simulated form submission
function submitForm() {
    // Validate the form fields
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const messageInput = document.getElementById('message').value.trim();
    const captchaInput = document.getElementById('captchaTextBox').value.trim();

    let isValid = true;

    // Name validation
    if (!nameInput) {
        showError('nameRequireError');
        isValid = false;
    } else {
        hideError('nameRequireError');
    }

    // Email validation
    if (!emailInput) {
        showError('emailRequireError');
        hideError('emailInvalidError');
        isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailInput)) {
        hideError('emailRequireError');
        showError('emailInvalidError');
        isValid = false;
    } else {
        hideError('emailRequireError');
        hideError('emailInvalidError');
    }

    // Message validation
    if (!messageInput) {
        showError('messageError');
        isValid = false;
    } else {
        hideError('messageError');
    }

    // Captcha validation
    if (captchaInput !== code) {
        msg.innerHTML = "Incorrect captcha.";
        createCaptcha(); // Generate a new captcha
        setTimeout(() => {
            msg.innerHTML = "";
        }, 5000);
        isValid = false;
    }

    // Show success message if all validations pass
    if (isValid) {
        msg.innerHTML = "Form submitted successfully!";
        setTimeout(() => {
            msg.innerHTML = "";
        }, 5000);
        document.forms['submit'].reset(); // Reset the form for demo
        createCaptcha(); // Generate a new captcha
    }
}

// Create a new captcha
function createCaptcha() {
    document.getElementById('captcha').innerHTML = "";
    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];

    for (var i = 0; i < lengthOtp; i++) {
        var index = Math.floor(Math.random() * charsArray.length);
        if (captcha.indexOf(charsArray[index]) === -1) {
            captcha.push(charsArray[index]);
        } else {
            i--;
        }
    }

    var canv = document.createElement("canvas");
    canv.id = "captchaCanvas";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);

    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv);
}

// Show error function
function showError(id) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.style.display = 'inline';
    }
}

// Hide error function
function hideError(id) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Form validation function
function validateForm() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const messageInput = document.getElementById('message').value.trim();

    let isValid = true;

    // Name validation
    if (!nameInput) {
        showError('nameRequireError');
        isValid = false;
    } else {
        hideError('nameRequireError');
    }

    // Email validation
    if (!emailInput) {
        showError('emailRequireError');
        hideError('emailInvalidError'); // Hide invalid error if field is empty
        isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailInput)) {
        hideError('emailRequireError'); // Hide required error if input exists
        showError('emailInvalidError'); // Show invalid email error
        isValid = false;
    } else {
        hideError('emailRequireError');
        hideError('emailInvalidError');
    }

    // Message validation
    if (!messageInput) {
        showError('messageError');
        isValid = false;
    } else {
        hideError('messageError');
    }

    // If all fields are valid, submit the form
    if (isValid) {
        submitForm(); // Call your function to submit the form
    }
}

// Real-time input validation for name
document.getElementById('nameInput').addEventListener('input', function () {
    if (this.value.trim()) {
        hideError('nameRequireError');
    }
});

// Real-time input validation for email
document.getElementById('emailInput').addEventListener('input', function () {
    const emailInput = this.value.trim();

    if (emailInput && /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailInput)) {
        hideError('emailRequireError');
        hideError('emailInvalidError');
    } else if (emailInput) {
        hideError('emailRequireError'); // Hide required error if input exists
        showError('emailInvalidError'); // Show invalid email error
    }
});

// Real-time input validation for message
document.getElementById('message').addEventListener('input', function () {
    if (this.value.trim()) {
        hideError('messageError');
    }
});

