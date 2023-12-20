// Attach event listeners when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email-login');
    const passwordInput = document.getElementById('password-login');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        // Basic login form validation

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = '/dashboard';
                } else {
                
                    console.error('Authentication failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
