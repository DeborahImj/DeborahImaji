document.addEventListener("DOMContentLoaded", () => {

    // --- ACCORDION SYSTEM ---
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const currentItem = trigger.parentElement;
            const isActive = currentItem.classList.contains("active");

            // Close all active items cleanly
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".accordion-content").style.maxHeight = null;
            });

            // Toggle active state
            if (!isActive) {
                currentItem.classList.add("active");
                const content = currentItem.querySelector(".accordion-content");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Initialize height for the default open element
    const initialActive = document.querySelector(".accordion-item.active .accordion-content");
    if (initialActive) {
        initialActive.style.maxHeight = initialActive.scrollHeight + "px";
    }


    // --- ACTIVE LINK TRACKING (Intersection Observer) ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link:not(#faq-special-link)");
    const navbarContainer = document.querySelector(".navbar");
    const faqSpecialLink = document.getElementById("faq-special-link");

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });

                if (id === "projects" || id === "services" || id === "about" || id === "faq") {
                    faqSpecialLink.classList.add("show");
                    navbarContainer.classList.add("has-button");
                } else {
                    faqSpecialLink.classList.remove("show");
                    navbarContainer.classList.remove("has-button");
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // MOBILE NAVBAR

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener("click", () => {
    navbarContainer.classList.toggle("is-open");
});
});