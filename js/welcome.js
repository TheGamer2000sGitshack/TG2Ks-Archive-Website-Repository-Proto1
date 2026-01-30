// Responsive JS Enhancements

// Adjust blur strength based on screen width
function adjustBlur() {
    const elements = document.querySelectorAll('.hero, nav, footer, .logo');
    const blurValue = window.innerWidth < 600 ? '6px' : '12px';

    elements.forEach(el => {
        el.style.backdropFilter = `blur(${blurValue})`;
        el.style.webkitBackdropFilter = `blur(${blurValue})`;
    });
}

window.addEventListener('resize', adjustBlur);
window.addEventListener('load', adjustBlur);

// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        // Optional: smooth scroll if linking within page
        if (link.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            document.querySelector(link.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Dynamic ripple effect
document.querySelectorAll(".main-nav a").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const ripple = btn.querySelector(".ripple");

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        btn.style.setProperty("--ripple-x", `${x}px`);
        btn.style.setProperty("--ripple-y", `${y}px`);
    });
});


// Fade-in when page loads
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});

// Fade-out on link click
document.querySelectorAll("a").forEach(link => {
    // Only animate internal links
    if (link.hostname === window.location.hostname) {
        link.addEventListener("click", e => {
            e.preventDefault();
            const url = link.href;

            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = url;
            }, 400); // match CSS fade-out duration
        });
    }
});



// Optional: hover sound effect
// Add your sound file in /sounds/hover.mp3
/* and use the code below to enable it 
const hoverSound = new Audio("sounds/hover.mp3");

document.querySelectorAll("nav a").forEach(btn => {
    btn.addEventListener("mouseenter", () => hoverSound.play());
});
 @KingKong for code help his crying right now ahahahah */
