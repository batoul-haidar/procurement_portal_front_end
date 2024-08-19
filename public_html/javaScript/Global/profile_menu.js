document.addEventListener('DOMContentLoaded', () => {
    const userProfileBtn = document.getElementById('user_profile_btn');
    
    userProfileBtn.addEventListener('click', (event) => {
        event.stopPropagation();  // Prevent the click event from propagating to the window

        let dropdownContent = document.getElementById('dropdown_content');

        if (!dropdownContent) {
            // Create the dropdown menu
            dropdownContent = document.createElement('div');
            dropdownContent.id = 'dropdown_content';
            dropdownContent.className = 'dropdown-content';
            
            // Create the logout link
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.id = 'logout';
            logoutLink.textContent = 'Log Out';

            // Append the logout link to the dropdown content
            dropdownContent.appendChild(logoutLink);
            
            // Append the dropdown content to the body
            document.body.appendChild(dropdownContent);

            // Add event listener to the logout link
            logoutLink.addEventListener('click', window.logout);
        }
        
        // Position the dropdown menu near the button
        const rect = userProfileBtn.getBoundingClientRect();
        dropdownContent.style.top = `${rect.bottom + window.scrollY}px`;
        dropdownContent.style.left = `${rect.left + window.scrollX}px`;

        // Toggle the dropdown menu visibility
        dropdownContent.classList.toggle('show');
    });

    // Close the dropdown menu if clicked outside
    window.addEventListener('click', (event) => {
        const dropdownContent = document.getElementById('dropdown_content');
        if (dropdownContent && !dropdownContent.contains(event.target) && event.target !== userProfileBtn) {
            dropdownContent.classList.remove('show');
        }
    });
});
