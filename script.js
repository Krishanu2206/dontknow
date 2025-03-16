// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars when they come into view
    animateSkillBarsOnScroll();
    
    // Add form submission handling
    setupFormSubmission();
    
    // Add scroll animations for sections
    addScrollAnimations();
});

// Function to animate skill bars when they come into view
function animateSkillBarsOnScroll() {
    const skillBars = document.querySelectorAll('.bar');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent;
                
                // Once animated, no need to observe anymore
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each skill bar
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Function to handle form submission
function setupFormSubmission() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // For demonstration purposes, we'll just log the form data
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => group.style.display = 'none');
            
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '20px';
            successMessage.style.color = '#4776E6';
            successMessage.style.fontWeight = 'bold';
            
            form.appendChild(successMessage);
            
            // In a real application, you would send the form data to a server here
        });
    }
}

// Function to add scroll animations for sections
function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(section);
    });
    
    // Add visible class style
    const style = document.createElement('style');
    style.textContent = `
        section.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add additional animation for the name SVG
    animateNameSVG();
}

// Function to add extra animation effects to the name SVG
function animateNameSVG() {
    const nameSVG = document.getElementById('name-svg');
    
    if (nameSVG) {
        // Add hover effect
        nameSVG.addEventListener('mouseover', () => {
            const nameText = document.querySelector('.name-text');
            nameText.style.filter = 'drop-shadow(0 0 8px rgba(71, 118, 230, 0.8))';
            nameText.style.transition = 'filter 0.5s ease';
        });
        
        nameSVG.addEventListener('mouseout', () => {
            const nameText = document.querySelector('.name-text');
            nameText.style.filter = 'none';
        });
    }
    
    // Add pulse animation to GitHub logo
    const githubLogo = document.querySelector('.github-logo');
    if (githubLogo) {
        setInterval(() => {
            githubLogo.style.transform = 'scale(1.2)';
            githubLogo.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                githubLogo.style.transform = 'scale(1)';
            }, 300);
        }, 5000);
    }
}