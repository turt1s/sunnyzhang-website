const modeToggle = document.getElementById('mode-toggle');

function applyMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    modeToggle.textContent = isDark ? '☀️' : '🌙';
}

const savedMode = localStorage.getItem('darkMode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

applyMode(savedMode !== null ? savedMode === 'true' : prefersDark);

modeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyMode(isDark);
    localStorage.setItem('darkMode', isDark);
});

// name heading letter-hover effect
const nameHeading = document.getElementById('name-heading');

if (nameHeading) {
    const cleanText = nameHeading.textContent.trim().replace(/\s+/g, ' ');
    nameHeading.textContent = '';

    const letters = [...cleanText].map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        nameHeading.appendChild(span);
        return span;
    });

    const MAX_DISTANCE = 180;
    const MAX_STROKE = 1.3;

    nameHeading.addEventListener('mousemove', (event) => {
        letters.forEach((span) => {
            const rect = span.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
            const closeness = Math.max(0, 1 - distance / MAX_DISTANCE);
            const strokeWidth = (closeness * MAX_STROKE).toFixed(2);
            span.style.webkitTextStrokeWidth = `${strokeWidth}px`;
        });
    });

    nameHeading.addEventListener('mouseleave', () => {
        letters.forEach((span) => {
            span.style.webkitTextStrokeWidth = '0px';
        });
    });
}

// timeline tap-to-toggle for touch devices
const timelinePoints = document.querySelectorAll('.timeline-point');

timelinePoints.forEach((point) => {
    point.addEventListener('click', (event) => {
        const wasActive = point.classList.contains('active');
        timelinePoints.forEach((p) => p.classList.remove('active'));
        if (!wasActive) {
            point.classList.add('active');
        }
        event.stopPropagation();
    });
});

document.addEventListener('click', () => {
    timelinePoints.forEach((p) => p.classList.remove('active'));
});