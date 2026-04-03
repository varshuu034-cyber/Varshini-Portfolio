/* ==================
   MAIN JAVASCRIPT
================== */

// 1. Mobile Menu Toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// 2. Active Section Highlight & Sticky Navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky navbar effect
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when clicking navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// 3. Typed.js Animation for Hero Section
const typed = new Typed('.multiple-text', {
    strings: ['Computer Science Student', 'AI Enthusiast', 'Python Programmer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// 4. ScrollReveal Initialization
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-content', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .education-column', { origin: 'right' });


// 5. Contact Form Submission (Fetch API to Flask DB)
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI state
    submitBtn.textContent = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    // Collect Data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const dataPayload = {
        name: name,
        email: email,
        message: message
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPayload)
        });

        const result = await response.json();

        if (response.ok) {
            formAlert.className = "form-alert success";
            formAlert.innerHTML = `<i class='bx bx-check-circle'></i> ${result.success}`;
            contactForm.reset();
        } else {
            formAlert.className = "form-alert error";
            formAlert.innerHTML = `<i class='bx bx-error-circle'></i> ${result.error || 'Something went wrong.'}`;
        }
    } catch (error) {
        formAlert.className = "form-alert error";
        formAlert.innerHTML = `<i class='bx bx-error-circle'></i> Server error. Please try connecting the backend later.`;
    } finally {
        submitBtn.textContent = "Send Message";
        submitBtn.style.opacity = "1";
        submitBtn.disabled = false;
        
        // Hide alert after 5 seconds
        setTimeout(() => {
            formAlert.style.display = "none";
        }, 5000);
    }
});
