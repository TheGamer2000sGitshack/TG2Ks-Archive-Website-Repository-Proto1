// Simple ambient effects to make the page feel "alive"


// Fake server heartbeat
setInterval(() => {
const status = document.body;
status.style.filter = "brightness(1.02)";
setTimeout(() => {
status.style.filter = "brightness(1)";
}, 120);
}, 3000);


// Hover soundless pulse on list items
const items = document.querySelectorAll("ul li");
items.forEach(item => {
item.addEventListener("mouseenter", () => {
item.style.transform = "translateX(4px)";
});


item.addEventListener("mouseleave", () => {
item.style.transform = "translateX(0)";
});
});


// Simulated server log text
const log = document.createElement("div");
log.style.marginTop = "20px";
log.style.fontFamily = "Consolas, monospace";
log.style.fontSize = "12px";
log.style.color = "#7aa2c7";
log.textContent = "[SERVER] Initializing services...";
document.body.appendChild(log);


const messages = [
"[SERVER] Checking file integrity...",
"[SERVER] Loading assets...",
"[SERVER] Synchronizing nodes...",
"[SERVER] All systems operational."
];


let index = 0;
setInterval(() => {
if (index < messages.length) {
log.textContent = messages[index];
index++;
}
}, 2000);


