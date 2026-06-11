document.addEventListener("DOMContentLoaded", () => {

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