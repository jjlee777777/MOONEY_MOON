/* ===========================
   MOONEY MOON SCRIPT
=========================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");


/* ===========================
   ACTIVE MENU
=========================== */

function setActiveMenu() {
    let current = "";
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}


/* ===========================
   SMOOTH SCROLL
=========================== */

function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}


/* ===========================
   MENU CLICK
=========================== */

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector(".main-header").offsetHeight;
            const targetY = targetSection.offsetTop - headerHeight + 1;

            smoothScrollTo(targetY, 1300);
        }
    });
});


/* ===========================
   WINDOW EVENT
=========================== */

window.addEventListener("scroll", setActiveMenu);
window.addEventListener("load", setActiveMenu);

setActiveMenu();