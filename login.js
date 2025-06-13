async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://localhost:7093/api/login/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password})
            });

        if (!response.ok) {
            document.getElementById("loginError").style.display = "block";
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);

        window.location.href = "index.html";

    } catch (error) {
        console.error("Login error:", error);
        document.getElementById("loginError").style.display = "block";
    }
} 