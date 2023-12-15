document.addEventListener('DOMContentLoaded', () => {
    const userProfile = document.querySelector('.user-profile');

    // Fetch user profile data from the server
    fetch('/api/user/profile')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user profile data');
            }
        })
        .then((userData) => {
            // Display user profile data in the HTML
            const profileDetails = `
                <h2>User Profile</h2>
                <div class="profile-details">
                    <p><strong>Name:</strong> ${userData.name}</p>
                    <p><strong>Email:</strong> ${userData.email}</p>
                    <!-- Add more profile details as needed -->
                </div>
            `;
            userProfile.innerHTML = profileDetails;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
