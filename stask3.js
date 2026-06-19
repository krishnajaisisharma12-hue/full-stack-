// script.js 
// Logic and interactive functions for Krishna Jaisi Sharma's ePortfolio

document.addEventListener("DOMContentLoaded", () => {
    // Execute initialization functions
    showWelcomeMessage();
    displayCurrentYear();
    
    // Set up observers and event listeners
    setupSkillAnimationObserver();
    window.addEventListener("scroll", toggleScrollToTopBtn);
});

/**
 * 1. Show Welcome Message
 * Uses Bootstrap Modal to welcome users. 
 * Session storage is used to prevent the modal from popping up on every refresh.
 */
function showWelcomeMessage() {
    if (!sessionStorage.getItem("welcomeShown")) {
        // Wait 1 second before showing the modal
        setTimeout(() => {
            const welcomeModalEl = document.getElementById('welcomeModal');
            if (welcomeModalEl) {
                const welcomeModal = new bootstrap.Modal(welcomeModalEl);
                welcomeModal.show();
                sessionStorage.setItem("welcomeShown", "true");
            }
        }, 1000);
    }
}

/**
 * 2. Toggle Dark Mode
 * Adds/removes a class on the body to switch CSS variables.
 * Also changes the button icon from moon to sun.
 */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    
    const btnIcon = document.querySelector(".navbar-nav .btn-outline-light i");
    if (btnIcon) {
        if (document.body.classList.contains("dark-mode")) {
            btnIcon.classList.remove("fa-moon");
            btnIcon.classList.add("fa-sun");
        } else {
            btnIcon.classList.remove("fa-sun");
            btnIcon.classList.add("fa-moon");
        }
    }
}

/**
 * 3. Animate Skills
 * Uses IntersectionObserver to trigger progress bar animations 
 * only when the user scrolls to the skills section.
 */
function setupSkillAnimationObserver() {
    const skillsSection = document.getElementById('skills');
    
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); 

        if (skillsSection) {
            observer.observe(skillsSection);
        }
    } else {
        // Fallback for older browsers: animate immediately
        animateSkills();
    }
}

// Applies the defined widths to the progress bars
function animateSkills() {
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute("data-width");
        if (targetWidth) {
            bar.style.width = targetWidth;
        }
    });
}

/**
 * 4. Scroll To Top Logic
 * Toggles visibility of the floating back-to-top button based on scroll position
 */
function toggleScrollToTopBtn() {
    const btn = document.getElementById("scrollTopBtn");
    if (btn) {
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }
}

// Smoothly scrolls back to top when button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * 5. Validate Contact Form
 * Basic client-side validation to ensure fields are filled and email is valid.
 */
function validateContactForm(event) {
    event.preventDefault(); 
    
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    
    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";
    
    // Check for empty fields
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all required fields before submitting.");
        return false;
    }
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    
    // Success scenario
    alert(`Thank you, ${name}! Your message has been processed successfully.`);
    document.querySelector(".contact-form").reset();
    return true;
}

/**
 * 6. Display Current Year
 * Automatically updates the copyright year in the footer.
 */
function displayCurrentYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
