// Site wide cursor
const custom_cursor = document.querySelector('.custom-cursor');

// Visible on site only
document.addEventListener('mouseenter', () => {
    custom_cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    custom_cursor.style.display = 'none';
});

//Tracks the mouse
document.addEventListener('mousemove', TrackCursor)

function TrackCursor(evt) {
    const w = custom_cursor.clientWidth;
    const h = custom_cursor.clientHeight;
    custom_cursor.style.transform = `translate(${evt.clientX}px, ${evt.clientY}px)`;
}

//Adds and removes the active class on click
document.addEventListener('mousedown', () => custom_cursor.classList.add('active'));
document.addEventListener('mouseup', () => custom_cursor.classList.remove('active'));