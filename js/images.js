const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const caption = document.getElementById("lightboxCaption");
const thumbnailStrip = document.getElementById("thumbnailStrip");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeLightbox");
const slideshowBtn = document.getElementById("slideshowBtn");

const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

let currentIndex = 0;
let zoom = 1;
let slideshow = null;

/* ---------- Lightbox ---------- */
function openLightbox(index) {
    currentIndex = index;
    update();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    stopSlideshow();
    resetZoom();
}

function update() {
    lightboxImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].alt;
    updateThumbs();
}

/* ---------- Navigation ---------- */
function next() {
    currentIndex = (currentIndex + 1) % images.length;
    update();
}

function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    update();
}

/* ---------- Zoom ---------- */
function resetZoom() {
    zoom = 1;
    lightboxImg.style.transform = "scale(1)";
}

lightboxImg.addEventListener("wheel", e => {
    e.preventDefault();
    zoom += e.deltaY * -0.001;
    zoom = Math.min(Math.max(1, zoom), 3);
    lightboxImg.style.transform = `scale(${zoom})`;
}, { passive: false });

lightbox.addEventListener("wheel", e => e.preventDefault(), { passive: false });

/* ---------- Slideshow ---------- */
function startSlideshow() {
    slideshow = setInterval(next, 2500);
    slideshowBtn.textContent = "⏸";
}

function stopSlideshow() {
    clearInterval(slideshow);
    slideshow = null;
    slideshowBtn.textContent = "▶";
}

slideshowBtn.onclick = () => slideshow ? stopSlideshow() : startSlideshow();

/* ---------- Thumbnails ---------- */
images.forEach((img, i) => {
    const t = img.cloneNode();
    t.onclick = () => { currentIndex = i; update(); };
    thumbnailStrip.appendChild(t);
});

function updateThumbs() {
    [...thumbnailStrip.children].forEach((t, i) =>
        t.classList.toggle("active", i === currentIndex)
    );
}

/* ---------- Events ---------- */
images.forEach((img, i) =>
    img.addEventListener("click", () => openLightbox(i))
);

nextBtn.onclick = next;
prevBtn.onclick = prev;
closeBtn.onclick = closeLightbox;

document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
});

/* ---------- Theme ---------- */
function applyTheme(dark) {
    document.body.classList.toggle("dark", dark);
    icon.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem("theme", dark ? "dark" : "light");
}

applyTheme(localStorage.getItem("theme") === "dark");

toggle.onclick = () =>
    applyTheme(!document.body.classList.contains("dark"));