const canvas = document.getElementById("dotBackground");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];

function createDots() {
    for (let i = 0; i < 60; i++) {
        dots.push({
            x: Math.random() * canvas.width * 1.2 - canvas.width * 0.1,
            y: canvas.height + Math.random() * canvas.height,
            radius: Math.random() * 0.5 + 0.54, // 0.6px to 1px size of dot
            speed: (Math.random() * 0.7 + 0.6) * 0.2, // speed
            color:
                Math.random() < 0.9
                    ? "rgba(0, 0, 0, 1)"
                    : "rgba(128,128,128,0.95)",
            drift: Math.random() * 0.6 - 0.4, // move left/right
        });
    }
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();

        // Move dot upward + drifting sideways
        dot.y -= dot.speed;
        dot.x += dot.drift;

        // Remove when reaching top
        if (dot.y < 0) {
            dot.y = canvas.height + Math.random() * 50; // reset to bottom
            dot.x = Math.random() * canvas.width * 1.2 - canvas.width * 0.1;
        }
    }
}

function animate() {
    drawDots();
    requestAnimationFrame(animate);
}

createDots();
animate();

// Resize canvas dynamically
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
