/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener('DOMContentLoaded', () => {
    // Logout process
    async function logout(event) {
        event.preventDefault();
        try {
            // Perform the logout API call
            const response = await fetch('http://localhost:8080/procurement_portal_back_end/api/logout', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
            //    const result = await response.json();
              //  console.log('Logout successful:', result);
                // Redirect to a login page or home page
                window.location.href = '../../html/Global/log_in.html';
            } else {
                console.error('Logout failed:', response.statusText);
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    // Attach the logout function to the global scope for dynamic elements
    window.logout = logout;
});

/*
document.addEventListener('DOMContentLoaded', () => {
    const userProfileBtn = document.getElementById('user_profile_btn');
    const dropdownContent = document.getElementById('dropdown_content');
    const logoutLink = document.getElementById('logout');

    // Toggle the dropdown menu
    userProfileBtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    // Logout process
    logoutLink.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            // Perform the logout API call
            const response = await fetch('http://localhost:8080/procurement_portal_back_end/api/logout', {
                method: 'POST', // Adjust method and other options according to your API
                headers: {
                    'Content-Type': 'application/json'
                },
                credientials : 'include'
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Logout successful:', result);
                // Redirect to a login page or home page
                window.location.href = '../../javaSvript/Global/log_in.js';
            } else {
                console.error('Logout failed:', response.statusText);
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Close the dropdown menu if clicked outside
    window.addEventListener('click', (event) => {
        if (!event.target.matches('#user_profile_btn') && !event.target.closest('.dropdown')) {
            dropdownContent.classList.remove('show');
        }
    });
});
*/