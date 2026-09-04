// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once animated to keep them visible
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all elements with fade-in-up class
const animatedElements = document.querySelectorAll('.fade-in-up');
animatedElements.forEach(el => observer.observe(el));

// Ensure top elements are visible immediately on load
document.addEventListener('DOMContentLoaded', () => {
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            setTimeout(() => {
                el.classList.add('visible');
            }, 100);
        }
    });
});

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // Close other open answers (optional, makes it behave like an accordion)
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            }
        });

        // Toggle current
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        
        if (question.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// ----------------------------------------------------
// SMART WHATSAPP REQUEST BUILDER LOGIC
// ----------------------------------------------------
const typeRadios = document.querySelectorAll('input[name="user_type"]');
const needsGoing = document.getElementById('needs-going');
const needsLiving = document.getElementById('needs-living');
const sendWhatsappBtn = document.getElementById('send-whatsapp-btn');
const customDetails = document.getElementById('custom-details');

// Toggle Needs Containers based on User Type
typeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        // Uncheck all pills when switching
        document.querySelectorAll('.need-pill input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        if(e.target.value === 'going') {
            needsGoing.classList.add('active');
            needsLiving.classList.remove('active');
        } else {
            needsLiving.classList.add('active');
            needsGoing.classList.remove('active');
        }
    });
});

// Build WhatsApp URL and send
sendWhatsappBtn.addEventListener('click', () => {
    const phoneNumber = '917207071874'; // Live SAFAR Business Number
    
    // Determine User Type
    const selectedType = document.querySelector('input[name="user_type"]:checked').value;
    const isGoing = selectedType === 'going';
    const introText = isGoing 
        ? "Hi SAFAR N MANZIL! I am currently in India and preparing to go to the Gulf." 
        : "Hi SAFAR N MANZIL! I am currently living in the Gulf and need help for my family in India.";

    // Get Selected Needs
    const activeContainer = isGoing ? needsGoing : needsLiving;
    const selectedCheckboxes = activeContainer.querySelectorAll('input[type="checkbox"]:checked');
    let needsList = [];
    selectedCheckboxes.forEach(cb => needsList.push(cb.value));

    // Construct Message
    let message = introText + "\n\n";
    
    if(needsList.length > 0) {
        message += "*I need help with:*\n";
        needsList.forEach(need => {
            message += "- " + need + "\n";
        });
        message += "\n";
    }

    // Add Details
    if(customDetails.value.trim() !== '') {
        message += "*Additional Details:*\n" + customDetails.value.trim() + "\n";
    }

    // Default catch if nothing selected
    if(needsList.length === 0 && customDetails.value.trim() === '') {
        message += "I would like to know more about your services.";
    }

    // Encode and redirect
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});
// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const drawerClose = document.getElementById('drawer-close');
const drawerLinks = document.querySelectorAll('.drawer-links a');

function openDrawer() {
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeDrawer() {
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openDrawer);
}
if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
}
if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
        if (e.target === mobileDrawer) {
            closeDrawer();
        }
    });
}
drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
});


// Sticky Navbar Logic removed
