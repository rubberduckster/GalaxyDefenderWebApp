//Decodes the Jwt token
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
}

window.userInfo = null; // Default state

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    const loginLink = document.getElementById('loginLink');
    const loginIcon = document.querySelector('.loginImg');
    const loginText = document.querySelector('.login');
    const userIcon = document.querySelector('.userImg')

    if (token) {
        const payload = parseJwt(token);
    
        // Set global userInfo for use across all pages
        window.userInfo = {
            name: payload.unique_name || "User",
            isAdmin: payload.isAdmin === "1"
        };
    
        const userName = window.userInfo.name;
    

        if (loginText) {
            loginText.textContent = userName;
            loginText.style.pointerEvents = 'none';
            loginText.style.cursor = 'default';
        }

        if (loginIcon) {
            loginIcon.src = 'resources/LogoutIcon.png';
            loginIcon.style.cursor = 'pointer';

            loginLink.removeAttribute('href');

            loginIcon.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            });
        }
    }
});

function requireAdmin() {
    const check = setInterval(() => {
        if (!window.userInfo) {
            alert("You must be logged in to view this page.")
            window.location.href = 'login.html';
        } else if (!window.userInfo.isAdmin) {
            alert("Access denied: Admins only.")
            window.location.href = 'index.html'
        }
    }, 10)
}