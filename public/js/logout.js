// basic logout functionality
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', () => {
        fetch('/logout', {
            method: 'POST',
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = '/login';
                } else {
                    
                    console.error('Logout failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
